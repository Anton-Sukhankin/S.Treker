import {
  DOCUMENT_ATTRIBUTE_DEFINITIONS,
  DOCUMENT_ATTRIBUTE_VALUES,
  DOCUMENT_FILE_TEMPLATES,
} from '../data/documents-workspace-mock.js';
import { hashDocumentSeed } from './documents-table.js';

const isContractDocument = document => document.type === 'Соглашение' || document.type === 'Договор';

const getContractValue = (document, value) => (
  isContractDocument(document) ? value : DOCUMENT_ATTRIBUTE_VALUES.notApplicable
);

const getReferenceNumber = document => document.number
  .replace(/[^A-ZА-Я0-9-]/gi, '')
  .slice(-18);

function getAttributeValue(key, document, packageName, selectedVersion) {
  const values = DOCUMENT_ATTRIBUTE_VALUES;

  switch (key) {
    case 'type': return document.type;
    case 'name': return document.name;
    case 'number': return document.number;
    case 'date': return document.date;
    case 'contractPlannedDate': return getContractValue(document, values.contractPlannedDate);
    case 'documentKind': return isContractDocument(document)
      ? values.contractDocumentKind
      : values.generalDocumentKind;
    case 'contractType': return getContractValue(
      document,
      document.type === 'Соглашение' ? values.agreementContractType : values.serviceContractType,
    );
    case 'organization': return values.organization;
    case 'author': return values.author;
    case 'organizationPowerOfAttorneyNumber': return getContractValue(
      document,
      values.organizationPowerOfAttorneyNumber,
    );
    case 'counterparty': return getContractValue(document, values.counterparty);
    case 'otherTerms': return getContractValue(document, values.otherTerms);
    case 'counterpartyPowerOfAttorneyDate': return getContractValue(
      document,
      values.counterpartyPowerOfAttorneyDate,
    );
    case 'organizationPowerOfAttorneyDate': return getContractValue(
      document,
      values.organizationPowerOfAttorneyDate,
    );
    case 'bankAccounts': return getContractValue(document, values.bankAccounts);
    case 'trackerBusinessKey': {
      const referenceNumber = getReferenceNumber(document);
      return `DOC-${referenceNumber || document.id.toUpperCase()}`;
    }
    case 'masterSystemGuid': {
      const guidPart = hashDocumentSeed(document.id).toString(16).padStart(8, '0');
      return `${guidPart}-7d1c-4dc1-b4d9-b11bed0ec64e`;
    }
    case 'locked': return values.locked;
    case 'contractKind': return getContractValue(document, values.contractKind);
    case 'organizationRepresentative': return getContractValue(
      document,
      values.organizationRepresentative,
    );
    case 'representativeBasisType': return getContractValue(document, values.representativeBasisType);
    case 'standardContract': return getContractValue(document, values.standardContract);
    case 'masterSystem': return values.masterSystem;
    case 'counterpartyPowerOfAttorneyNumber': return getContractValue(
      document,
      values.counterpartyPowerOfAttorneyNumber,
    );
    case 'project': return values.project;
    case 'businessUnit': return values.businessUnit;
    case 'contractSubject': return getContractValue(document, values.contractSubject);
    case 'counterpartySelectionMethod': return getContractValue(
      document,
      values.counterpartySelectionMethod,
    );
    case 'counterpartyEmail': return getContractValue(document, values.counterpartyEmail);
    case 'status': return selectedVersion === document.version
      ? values.currentStatus
      : values.archivedStatus;
    case 'specializations': return values.specializations;
    case 'package': return packageName;
    default: return '';
  }
}

export function getDocumentVersions(document) {
  if (!document) return [];
  const versionCount = Math.max(1, Math.floor(Number(document.version) || 1));
  return Array.from({ length: versionCount }, (_, index) => {
    const number = versionCount - index;
    return Object.freeze({
      number,
      date: document.date,
      label: `Версия ${number} от ${document.date}`,
      isCurrent: number === versionCount,
    });
  });
}

export function createDocumentAttributes(document, packageName = 'Документы', selectedVersion = document?.version) {
  if (!document) return [];

  return DOCUMENT_ATTRIBUTE_DEFINITIONS.map(definition => Object.freeze({
    label: definition.label,
    value: getAttributeValue(definition.key, document, packageName, selectedVersion),
    ...(definition.technical ? { technical: true } : {}),
  }));
}

export function createDocumentFiles(document) {
  if (!document) return [];
  const compactName = document.name.length > 54
    ? `${document.name.slice(0, 51)}…`
    : document.name;

  return DOCUMENT_FILE_TEMPLATES.map(template => Object.freeze({
    id: `${document.id}-${template.key}`,
    name: template.key === 'main' ? `${compactName}.${template.extension}` : template.name,
    format: template.format,
    size: template.size,
  }));
}

export function createDocumentDetail(document, {
  packageName = 'Документы',
  selectedVersion = document?.version,
} = {}) {
  if (!document) return null;

  const versions = getDocumentVersions(document);
  const availableVersionNumbers = new Set(versions.map(version => version.number));
  const normalizedSelectedVersion = availableVersionNumbers.has(Number(selectedVersion))
    ? Number(selectedVersion)
    : document.version;
  const attributes = createDocumentAttributes(document, packageName, normalizedSelectedVersion);
  const files = createDocumentFiles(document);

  return {
    document,
    selectedVersion: normalizedSelectedVersion,
    versions,
    attributes,
    files,
    selectedFileId: files[0]?.id ?? null,
  };
}
