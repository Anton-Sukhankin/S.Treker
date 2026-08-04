import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const toolDirectory = dirname(fileURLToPath(import.meta.url));
const rawDirectory = resolve(toolDirectory, '../raw/screenshots');
const componentsDirectory = resolve(toolDirectory, '../../docs/components');

const assets = [
  ['documents/IMG-DOCS-001-documents-workspace-list.png', 'documents-workspace/assets/documents-workspace-list.png', { left: 0, top: 82, width: 1907, height: 840 }],
  ['documents/IMG-DOCS-002-document-detail-card.png', 'documents-workspace/assets/documents-workspace-detail.png', { left: 520, top: 0, width: 1391, height: 900 }],
  ['documents/IMG-DOCS-003-document-file-preview.png', 'documents-workspace/assets/documents-workspace-file-preview.png', { left: 0, top: 0, width: 1910, height: 910 }],
  ['documents/IMG-DOCS-004-document-attributes-editing.png', 'documents-workspace/assets/documents-workspace-attribute-edit.png', { left: 0, top: 0, width: 1912, height: 900 }],
  ['documents/IMG-DOCS-005-new-document-type-picker.png', 'documents-workspace/assets/documents-workspace-create-picker.png', { left: 0, top: 0, width: 1910, height: 900 }],
  ['shared/lego-document-form/IMG-LEGO-001-document-creation-form-step-1.png', 'lego-document-form/assets/lego-document-form-standalone-step.png', { left: 430, top: 20, width: 1440, height: 850 }],
  ['shared/lego-document-form/IMG-LEGO-002-filled-fields-and-print-form-status.png', 'lego-document-form/assets/lego-document-form-summary.png', { left: 500, top: 0, width: 1340, height: 890 }],
  ['shared/lego-document-form/IMG-LEGO-003-print-form-verification.png', 'lego-document-form/assets/lego-document-form-print-verification.png', { left: 35, top: 95, width: 1790, height: 735 }],
  ['tasks/IMG-TASKS-001-task-card-with-embedded-form-step-1.png', 'task-card-drawer/assets/task-card-fixed-context.png', { left: 0, top: 80, width: 1892, height: 450 }],
  ['tasks/IMG-TASKS-001-task-card-with-embedded-form-step-1.png', 'lego-document-form/assets/lego-document-form-embedded-step-1.png', { left: 400, top: 500, width: 1492, height: 430 }],
  ['tasks/IMG-TASKS-002-embedded-form-step-3.png', 'lego-document-form/assets/lego-document-form-embedded-step-3.png', { left: 420, top: 60, width: 1435, height: 760 }],
  ['document-templates/IMG-TEMPLATES-001-template-catalog.png', 'document-templates-workspace/assets/document-templates-catalog.png', { left: 0, top: 80, width: 1912, height: 820 }],
  ['document-templates/IMG-TEMPLATES-002-lego-template-attribute-basket.png', 'document-templates-workspace/assets/document-template-attribute-basket.png', { left: 390, top: 160, width: 1120, height: 660 }],
];

for (const [sourceName, targetRelativePath, crop] of assets) {
  const targetPath = resolve(componentsDirectory, targetRelativePath);
  await mkdir(dirname(targetPath), { recursive: true });
  await sharp(resolve(rawDirectory, sourceName))
    .extract(crop)
    .png({ compressionLevel: 9 })
    .toFile(targetPath);
}

console.log(`Prepared ${assets.length} component assets.`);
