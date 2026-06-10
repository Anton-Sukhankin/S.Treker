import { STATUS_MAP } from './statuses.js';
import { TASK_STATUSES } from './task-statuses.js';
import {
  CURRENT_USER_ID,
  USERS,
  USER_DICTIONARY_OPTIONS,
  formatUserShortLabel
} from './users.js';

export const CURRENT_ROLE_ID = 'role-contract-manager';
export { CURRENT_USER_ID, USERS };

export const BUSINESS_DOMAINS = [
  { id: 'ecm', label: 'Строительные договоры', description: 'Согласование и сопровождение строительных договоров', order: 10, isActive: true },
  { id: 'tracker', label: 'Закупки ТМЦ', description: 'Задачи по заявкам, поставкам и закупкам ТМЦ', order: 20, isActive: true },
  { id: 'control', label: 'Поручения СД', description: 'Контроль поручений и замечаний строительного директора', order: 30, isActive: true }
];

export const ROLES = [
  {
    id: CURRENT_ROLE_ID,
    label: 'Менеджер задач',
    currentUserId: CURRENT_USER_ID,
    description: 'Роль по умолчанию для текущего прототипа'
  }
];

export const ROLE_DOMAIN_ACCESS = [
  { roleId: CURRENT_ROLE_ID, businessDomainId: 'ecm' },
  { roleId: CURRENT_ROLE_ID, businessDomainId: 'tracker' },
  { roleId: CURRENT_ROLE_ID, businessDomainId: 'control' }
];

export const TASK_QUEUES = Object.entries(STATUS_MAP).map(([label, id], index) => ({
  id,
  label,
  meaning: id,
  order: index + 1
}));

export const ATTRIBUTE_DEFINITIONS = [
  { id: 'attr-cb', key: 'cb', label: '', valueType: 'control', dictionaryId: null, isSystem: true },
  { id: 'attr-id', key: 'id', label: '№', valueType: 'string', dictionaryId: null, isSystem: true },
  { id: 'attr-title', key: 'title', label: 'Наименование', valueType: 'string', dictionaryId: null, isSystem: true },
  { id: 'attr-sys', key: 'sys', label: 'Система', valueType: 'dictionary', dictionaryId: 'businessDomains', isSystem: true },
  { id: 'attr-status', key: 'status', label: 'Статус', valueType: 'dictionary', dictionaryId: 'taskStatuses', isSystem: true },
  { id: 'attr-assignee', key: 'assignee', label: 'Исполнитель', valueType: 'dictionary', dictionaryId: 'users', isSystem: true },
  { id: 'attr-reg-date', key: 'regDate', label: 'Дата создания', valueType: 'date', dictionaryId: null, isSystem: true },
  { id: 'attr-doc-type', key: 'docType', label: 'Тип документа', valueType: 'dictionary', dictionaryId: 'documentTypes', isSystem: false },
  { id: 'attr-contractor', key: 'contractor', label: 'Контрагент', valueType: 'dictionary', dictionaryId: 'contractors', isSystem: false },
  { id: 'attr-sum', key: 'sum', label: 'Сумма', valueType: 'number', dictionaryId: null, isSystem: false },
  { id: 'attr-author', key: 'author', label: 'Автор', valueType: 'dictionary', dictionaryId: 'users', isSystem: false },
  { id: 'attr-project', key: 'project', label: 'Проект', valueType: 'dictionary', dictionaryId: 'projects', isSystem: false },
  { id: 'attr-unit', key: 'unit', label: 'Бизнес-Юнит', valueType: 'dictionary', dictionaryId: 'businessUnits', isSystem: false },
  { id: 'attr-dep', key: 'dep', label: 'Подразделение', valueType: 'dictionary', dictionaryId: 'departments', isSystem: false },
  { id: 'attr-sla', key: 'sla', label: 'SLA', valueType: 'dictionary', dictionaryId: 'slaStates', isSystem: false },
  { id: 'attr-due-date', key: 'dueDate', label: 'Срок', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-remark-type', key: 'remarkType', label: 'Тип замечания', valueType: 'dictionary', dictionaryId: 'remarkTypes', isSystem: false },
  { id: 'attr-object', key: 'object', label: 'Объект', valueType: 'dictionary', dictionaryId: 'objects', isSystem: false },
  { id: 'attr-criticality', key: 'criticality', label: 'Критичность', valueType: 'dictionary', dictionaryId: 'criticality', isSystem: false },
  { id: 'attr-phase', key: 'phase', label: 'Этап', valueType: 'dictionary', dictionaryId: 'phases', isSystem: false },
  { id: 'attr-check-date', key: 'checkDate', label: 'Дата проверки', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-internal-id', key: 'internal_id', label: 'Внутренний номер договора', valueType: 'string', dictionaryId: null, isSystem: false },
  { id: 'attr-legal-entity', key: 'legal_entity', label: 'Юридическое лицо', valueType: 'dictionary', dictionaryId: 'legalEntities', isSystem: false },
  { id: 'attr-vat-rate', key: 'vat_rate', label: 'Ставка НДС', valueType: 'dictionary', dictionaryId: 'vatRates', isSystem: false },
  { id: 'attr-currency', key: 'currency', label: 'Валюта договора', valueType: 'dictionary', dictionaryId: 'currencies', isSystem: false },
  { id: 'attr-start-date', key: 'start_date', label: 'Дата начала действия', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-end-date', key: 'end_date', label: 'Дата окончания действия', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-fact-reg-date', key: 'fact_reg_date', label: 'Дата фактической регистрации', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-scan-link', key: 'scan_link', label: 'Ссылка на скан-копию', valueType: 'url', dictionaryId: null, isSystem: false },
  { id: 'attr-payment-terms', key: 'payment_terms', label: 'Условия оплаты', valueType: 'string', dictionaryId: null, isSystem: false },
  { id: 'attr-add-agreement-type', key: 'add_agreement_type', label: 'Тип доп. соглашения', valueType: 'dictionary', dictionaryId: 'agreementTypes', isSystem: false },
  { id: 'attr-contractor-resp', key: 'contractor_resp', label: 'Ответственный от контрагента', valueType: 'string', dictionaryId: null, isSystem: false },
  { id: 'attr-warranty-period', key: 'warranty_period', label: 'Гарантийный срок', valueType: 'string', dictionaryId: null, isSystem: false },
  { id: 'attr-project-phase', key: 'project_phase', label: 'Этап реализации проекта', valueType: 'dictionary', dictionaryId: 'projectPhases', isSystem: false },
  { id: 'attr-estimate-link', key: 'estimate_link', label: 'Ссылка на связанные сметы', valueType: 'url', dictionaryId: null, isSystem: false },
  { id: 'attr-requester', key: 'requester', label: 'Инициатор заявки', valueType: 'dictionary', dictionaryId: 'users', isSystem: false },
  { id: 'attr-supplier', key: 'supplier', label: 'Поставщик', valueType: 'dictionary', dictionaryId: 'contractors', isSystem: false },
  { id: 'attr-delivery-date', key: 'deliveryDate', label: 'Дата поставки', valueType: 'date', dictionaryId: null, isSystem: false },
  { id: 'attr-priority', key: 'priority', label: 'Приоритет', valueType: 'dictionary', dictionaryId: 'priorities', isSystem: false },
  { id: 'attr-procurement-stage', key: 'procurementStage', label: 'Этап закупки', valueType: 'dictionary', dictionaryId: 'procurementStages', isSystem: false },
  { id: 'attr-control-owner', key: 'controlOwner', label: 'Ответственный контролер', valueType: 'dictionary', dictionaryId: 'users', isSystem: false },
  { id: 'attr-resolution-plan', key: 'resolutionPlan', label: 'План устранения', valueType: 'string', dictionaryId: null, isSystem: false },
  { id: 'attr-inspection-area', key: 'inspectionArea', label: 'Зона проверки', valueType: 'dictionary', dictionaryId: 'inspectionAreas', isSystem: false }
];

export const DOMAIN_ATTRIBUTES = [
  { businessDomainId: 'ecm', attributeKey: 'cb', visibleByDefault: true, inAttributeLibrary: false, width: '60px', order: 10, sticky: true },
  { businessDomainId: 'ecm', attributeKey: 'id', visibleByDefault: true, inAttributeLibrary: false, width: '140px', order: 20, sticky: true },
  { businessDomainId: 'ecm', attributeKey: 'title', visibleByDefault: true, inAttributeLibrary: false, width: '300px', order: 30, sticky: true },
  { businessDomainId: 'ecm', attributeKey: 'docType', visibleByDefault: true, inAttributeLibrary: false, width: '160px', order: 40, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'contractor', visibleByDefault: true, inAttributeLibrary: false, width: '200px', order: 50, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'sum', visibleByDefault: true, inAttributeLibrary: false, width: '120px', order: 60, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'regDate', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 70, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'author', visibleByDefault: true, inAttributeLibrary: false, width: '240px', order: 80, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'project', visibleByDefault: true, inAttributeLibrary: false, width: '160px', order: 90, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'status', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 100, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'internal_id', visibleByDefault: false, inAttributeLibrary: true, width: '180px', order: 210, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'legal_entity', visibleByDefault: false, inAttributeLibrary: true, width: '200px', order: 220, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'vat_rate', visibleByDefault: false, inAttributeLibrary: true, width: '120px', order: 230, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'currency', visibleByDefault: false, inAttributeLibrary: true, width: '140px', order: 240, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'start_date', visibleByDefault: false, inAttributeLibrary: true, width: '160px', order: 250, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'end_date', visibleByDefault: false, inAttributeLibrary: true, width: '160px', order: 260, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'fact_reg_date', visibleByDefault: false, inAttributeLibrary: true, width: '190px', order: 270, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'scan_link', visibleByDefault: false, inAttributeLibrary: true, width: '180px', order: 280, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'payment_terms', visibleByDefault: false, inAttributeLibrary: true, width: '200px', order: 290, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'add_agreement_type', visibleByDefault: false, inAttributeLibrary: true, width: '180px', order: 300, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'contractor_resp', visibleByDefault: false, inAttributeLibrary: true, width: '210px', order: 310, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'warranty_period', visibleByDefault: false, inAttributeLibrary: true, width: '150px', order: 320, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'project_phase', visibleByDefault: false, inAttributeLibrary: true, width: '180px', order: 330, sticky: false },
  { businessDomainId: 'ecm', attributeKey: 'estimate_link', visibleByDefault: false, inAttributeLibrary: true, width: '190px', order: 340, sticky: false },

  { businessDomainId: 'tracker', attributeKey: 'cb', visibleByDefault: true, inAttributeLibrary: false, width: '60px', order: 10, sticky: true },
  { businessDomainId: 'tracker', attributeKey: 'id', visibleByDefault: true, inAttributeLibrary: false, width: '140px', order: 20, sticky: true },
  { businessDomainId: 'tracker', attributeKey: 'title', visibleByDefault: true, inAttributeLibrary: false, width: '300px', order: 30, sticky: true },
  { businessDomainId: 'tracker', attributeKey: 'unit', visibleByDefault: true, inAttributeLibrary: false, width: '160px', order: 40, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'regDate', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 50, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'assignee', visibleByDefault: true, inAttributeLibrary: false, width: '210px', order: 60, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'dep', visibleByDefault: true, inAttributeLibrary: false, width: '180px', order: 70, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'sla', visibleByDefault: true, inAttributeLibrary: false, width: '100px', order: 80, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'dueDate', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 90, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'status', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 100, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'requester', visibleByDefault: false, inAttributeLibrary: true, width: '190px', order: 210, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'supplier', visibleByDefault: false, inAttributeLibrary: true, width: '190px', order: 220, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'deliveryDate', visibleByDefault: false, inAttributeLibrary: true, width: '160px', order: 230, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'priority', visibleByDefault: false, inAttributeLibrary: true, width: '130px', order: 240, sticky: false },
  { businessDomainId: 'tracker', attributeKey: 'procurementStage', visibleByDefault: false, inAttributeLibrary: true, width: '180px', order: 250, sticky: false },

  { businessDomainId: 'control', attributeKey: 'cb', visibleByDefault: true, inAttributeLibrary: false, width: '60px', order: 10, sticky: true },
  { businessDomainId: 'control', attributeKey: 'id', visibleByDefault: true, inAttributeLibrary: false, width: '140px', order: 20, sticky: true },
  { businessDomainId: 'control', attributeKey: 'title', visibleByDefault: true, inAttributeLibrary: false, width: '300px', order: 30, sticky: true },
  { businessDomainId: 'control', attributeKey: 'remarkType', visibleByDefault: true, inAttributeLibrary: false, width: '160px', order: 40, sticky: false },
  { businessDomainId: 'control', attributeKey: 'object', visibleByDefault: true, inAttributeLibrary: false, width: '160px', order: 50, sticky: false },
  { businessDomainId: 'control', attributeKey: 'contractor', visibleByDefault: true, inAttributeLibrary: false, width: '180px', order: 60, sticky: false },
  { businessDomainId: 'control', attributeKey: 'criticality', visibleByDefault: true, inAttributeLibrary: false, width: '120px', order: 70, sticky: false },
  { businessDomainId: 'control', attributeKey: 'phase', visibleByDefault: true, inAttributeLibrary: false, width: '140px', order: 80, sticky: false },
  { businessDomainId: 'control', attributeKey: 'checkDate', visibleByDefault: true, inAttributeLibrary: false, width: '140px', order: 90, sticky: false },
  { businessDomainId: 'control', attributeKey: 'status', visibleByDefault: true, inAttributeLibrary: false, width: '170px', order: 100, sticky: false },
  { businessDomainId: 'control', attributeKey: 'controlOwner', visibleByDefault: false, inAttributeLibrary: true, width: '210px', order: 210, sticky: false },
  { businessDomainId: 'control', attributeKey: 'resolutionPlan', visibleByDefault: false, inAttributeLibrary: true, width: '220px', order: 220, sticky: false },
  { businessDomainId: 'control', attributeKey: 'inspectionArea', visibleByDefault: false, inAttributeLibrary: true, width: '170px', order: 230, sticky: false },
  { businessDomainId: 'control', attributeKey: 'priority', visibleByDefault: false, inAttributeLibrary: true, width: '130px', order: 240, sticky: false }
];

export const ATTRIBUTE_VALUE_DICTIONARIES = {
  businessDomains: BUSINESS_DOMAINS.map(({ id, label }) => ({ id, label })),
  taskQueues: TASK_QUEUES.map(({ id, label }) => ({ id, label })),
  taskStatuses: TASK_STATUSES.map(({ id, label }) => ({ id, label })),
  users: USER_DICTIONARY_OPTIONS,
  documentTypes: ['Договор', 'Приказ', 'Акт', 'Спецификация', 'Доп. соглашение'],
  contractors: ['ООО "СтройПроект"', 'ОАО "ИнвестГрупп"', 'ИП Иванов А.А.', 'ЗАО "РегионИнвест"', 'ООО "Монолит"', 'ПАО "ГлавСтрой"', 'ООО "Вектор"', 'ИП Петров'],
  projects: ['ЖК Аура', 'ЖК Северный', 'ТЦ Мегаполис', 'ЖК Восток'],
  businessUnits: ['СД-Монолит', 'СД-Девелопмент', 'ИЦ-Инвест', 'ТехСтрой'],
  departments: ['Frontend', 'Backend', 'QA', 'DevOps', 'Аналитика'],
  slaStates: ['Ok', 'Breached', 'Warning'],
  remarkTypes: ['Дефект', 'Отклонение РД', 'Нарушение ТБ', 'Брак', 'Опоздание'],
  objects: ['ЖК Аура', 'ЖК Северный', 'ТЦ Мегаполис', 'ЖК Восток'],
  criticality: ['Критично', 'Существенно', 'Незначительно'],
  phases: ['СМР', 'ПНР', 'Проектирование', 'Передача'],
  legalEntities: ['СД Девелопмент', 'СД Монолит', 'ИЦ Инвест'],
  vatRates: ['20%', '10%', 'Без НДС'],
  currencies: ['RUB', 'USD', 'EUR'],
  agreementTypes: ['Изменение суммы', 'Изменение срока', 'Изменение объема'],
  projectPhases: ['Проектирование', 'Закупка', 'Строительство', 'Ввод'],
  priorities: ['Высокий', 'Средний', 'Низкий'],
  procurementStages: ['Заявка', 'Согласование', 'Тендер', 'Поставка'],
  inspectionAreas: ['Монолит', 'Фасад', 'Инженерные сети', 'Отделка']
};

export const TASK_LAYOUTS_BY_QUEUE = {
  todo: { ecm: 42, tracker: 49, control: 43 },
  in_progress: { ecm: 39, tracker: 44, control: 38 },
  done: { ecm: 37, tracker: 41, control: 36 },
  to_assign: { ecm: 38, tracker: 40, control: 39 },
  review: { ecm: 40, tracker: 38, control: 37 },
  initiated: { ecm: 36, tracker: 42, control: 37 }
};

const TASK_TITLE_SETS = {
  ecm: [
    'Оптимизация индексов',
    'Дашборд аналитики',
    'Согласование бюджета договора',
    'Проверка пакета строительной документации',
    'Подготовка дополнительного соглашения по договору',
    'Уточнение условий оплаты по договору поставки',
    'Проверка лимита финансирования по строительному договору',
    'Согласование графика выполнения работ по корпусу проекта',
    'Проверка замечаний подрядчика к проектной документации объекта строительства комплекса',
    'Подготовка комплекта документов для регистрации строительного договора',
    'Финальная проверка условий договора перед передачей в юридический отдел компании'
  ],
  tracker: [
    'Баг фильтрации',
    'Сборка релиз-кандидата',
    'Обновление карточки заявки',
    'Проверка поставщика перед закупкой',
    'Согласование заявки на закупку материалов',
    'Уточнение сроков поставки по заявке снабжения',
    'Проверка остатков материалов перед формированием заказа',
    'Согласование условий оплаты с поставщиком строительных материалов',
    'Подготовка сравнительной таблицы предложений по закупке ТМЦ для комиссии',
    'Проверка закрывающих документов по поставке материалов на строительный объект подрядчику'
  ],
  control: [
    'Выгрузка отчетов',
    'Аудит безопасности объекта',
    'Проверка перекрытий секции',
    'Приемка монолита после устранения замечаний',
    'Инспекция техники безопасности на строительной площадке',
    'Контроль устранения замечаний по исполнительной документации',
    'Проверка качества отделочных работ в местах общего пользования',
    'Согласование плана корректирующих мероприятий по результатам проверки',
    'Контроль выполнения предписаний подрядчика по замечаниям строительного надзора проекта',
    'Финальная проверка готовности объекта перед передачей управляющей компании заказчику проекта'
  ]
};

const TASK_STATUS_ROTATION_BY_QUEUE = {
  todo: ['new', 'assigned', 'assignment_removed'],
  in_progress: ['in_progress', 'assigned', 'rejected'],
  done: ['completed', 'cancelled', 'rejected'],
  to_assign: ['new', 'assignment_removed', 'assigned'],
  review: ['in_progress', 'assigned', 'completed'],
  initiated: ['new', 'assigned', 'completed']
};

const DOMAIN_VALUE_SETS = {
  ecm: {
    docType: ATTRIBUTE_VALUE_DICTIONARIES.documentTypes,
    contractor: ATTRIBUTE_VALUE_DICTIONARIES.contractors.slice(0, 4),
    project: ['ЖК Аура', 'ЖК Северный', 'ТЦ Мегаполис'],
    legal_entity: ATTRIBUTE_VALUE_DICTIONARIES.legalEntities,
    vat_rate: ATTRIBUTE_VALUE_DICTIONARIES.vatRates,
    currency: ATTRIBUTE_VALUE_DICTIONARIES.currencies,
    add_agreement_type: ATTRIBUTE_VALUE_DICTIONARIES.agreementTypes,
    project_phase: ATTRIBUTE_VALUE_DICTIONARIES.projectPhases
  },
  tracker: {
    unit: ATTRIBUTE_VALUE_DICTIONARIES.businessUnits,
    dep: ATTRIBUTE_VALUE_DICTIONARIES.departments,
    sla: ATTRIBUTE_VALUE_DICTIONARIES.slaStates,
    supplier: ATTRIBUTE_VALUE_DICTIONARIES.contractors.slice(0, 5),
    priority: ATTRIBUTE_VALUE_DICTIONARIES.priorities,
    procurementStage: ATTRIBUTE_VALUE_DICTIONARIES.procurementStages
  },
  control: {
    remarkType: ATTRIBUTE_VALUE_DICTIONARIES.remarkTypes,
    object: ATTRIBUTE_VALUE_DICTIONARIES.objects,
    contractor: ATTRIBUTE_VALUE_DICTIONARIES.contractors.slice(4),
    criticality: ATTRIBUTE_VALUE_DICTIONARIES.criticality,
    phase: ATTRIBUTE_VALUE_DICTIONARIES.phases,
    inspectionArea: ATTRIBUTE_VALUE_DICTIONARIES.inspectionAreas,
    priority: ATTRIBUTE_VALUE_DICTIONARIES.priorities
  }
};

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function dateString(day) {
  return `${String(day).padStart(2, '0')}.11.2026`;
}

function isoDate(day) {
  return `2026-11-${String(day).padStart(2, '0')}`;
}

function createSeeds() {
  const tasks = [];
  const values = [];
  const queues = TASK_QUEUES;
  const userIds = USERS.map(user => user.id);
  const overduePositions = { ecm: [1, 2, 3], tracker: [1, 2, 3], control: [1, 2] };

  const addValue = (taskId, attributeKey, value) => {
    values.push({ taskId, attributeKey, value });
  };

  queues.forEach((queue, queueIndex) => {
    const layout = TASK_LAYOUTS_BY_QUEUE[queue.id] || {};
    Object.entries(layout).forEach(([businessDomainId, count]) => {
      for (let index = 0; index < count; index++) {
        const seed = queueIndex * 100 + index * 3 + (businessDomainId === 'ecm' ? 1 : businessDomainId === 'tracker' ? 2 : 3);
        const isOverdue = queue.id === 'todo' && overduePositions[businessDomainId]?.includes(index);
        const taskId = `${businessDomainId.toUpperCase()}-${1000 + seed}`;
        const assigneeId = pick(userIds, seed);
        const authorId = pick(userIds, seed, 1);
        const taskStatusId = pick(TASK_STATUS_ROTATION_BY_QUEUE[queue.id] || TASK_STATUSES.map(status => status.id), seed);
        const title = pick(TASK_TITLE_SETS[businessDomainId], seed);
        const createdDay = isOverdue ? 1 : 15;

        tasks.push({
          id: taskId,
          title,
          businessDomainId,
          queueId: queue.id,
          statusId: queue.id,
          taskStatusId,
          createdBy: authorId,
          assigneeId,
          observerIds: [pick(userIds, seed, 2), pick(userIds, seed, 3)],
          createdAt: isoDate(createdDay),
          updatedAt: isoDate(isOverdue ? 2 : 18),
          sourceIndex: index,
          flags: {
            isOverdue,
            isNew: index === 0 || seed % 15 === 0
          }
        });

        addValue(taskId, 'regDate', dateString(createdDay));
        addValue(taskId, 'assignee', formatUserShortLabel(pick(USERS, seed)));
        addValue(taskId, 'author', formatUserShortLabel(pick(USERS, seed, 1)));

        if (businessDomainId === 'ecm') {
          addValue(taskId, 'docType', pick(DOMAIN_VALUE_SETS.ecm.docType, seed));
          addValue(taskId, 'contractor', pick(DOMAIN_VALUE_SETS.ecm.contractor, seed));
          addValue(taskId, 'project', pick(DOMAIN_VALUE_SETS.ecm.project, seed));
          addValue(taskId, 'sum', 100000 + seed * 5000);
          addValue(taskId, 'internal_id', `CD-${2026}-${String(seed).padStart(4, '0')}`);
          addValue(taskId, 'legal_entity', pick(DOMAIN_VALUE_SETS.ecm.legal_entity, seed));
          addValue(taskId, 'vat_rate', pick(DOMAIN_VALUE_SETS.ecm.vat_rate, seed));
          addValue(taskId, 'currency', pick(DOMAIN_VALUE_SETS.ecm.currency, seed));
          addValue(taskId, 'start_date', dateString(5 + (seed % 10)));
          addValue(taskId, 'end_date', dateString(18 + (seed % 9)));
          addValue(taskId, 'fact_reg_date', dateString(3 + (seed % 12)));
          addValue(taskId, 'scan_link', `scan-${taskId}.pdf`);
          addValue(taskId, 'payment_terms', seed % 2 === 0 ? 'Аванс 30%, постоплата 70%' : 'Постоплата 100%');
          addValue(taskId, 'add_agreement_type', pick(DOMAIN_VALUE_SETS.ecm.add_agreement_type, seed));
          addValue(taskId, 'contractor_resp', pick(['Петров П.П.', 'Сидоров С.С.', 'Иванова И.И.'], seed));
          addValue(taskId, 'warranty_period', `${12 + (seed % 4) * 6} мес.`);
          addValue(taskId, 'project_phase', pick(DOMAIN_VALUE_SETS.ecm.project_phase, seed));
          addValue(taskId, 'estimate_link', `estimate-${taskId}.xlsx`);
        }

        if (businessDomainId === 'tracker') {
          addValue(taskId, 'unit', pick(DOMAIN_VALUE_SETS.tracker.unit, seed));
          addValue(taskId, 'dep', pick(DOMAIN_VALUE_SETS.tracker.dep, seed));
          addValue(taskId, 'sla', pick(DOMAIN_VALUE_SETS.tracker.sla, seed));
          addValue(taskId, 'dueDate', dateString(isOverdue ? 5 : 25));
          addValue(taskId, 'requester', formatUserShortLabel(pick(USERS, seed, 2)));
          addValue(taskId, 'supplier', pick(DOMAIN_VALUE_SETS.tracker.supplier, seed));
          addValue(taskId, 'deliveryDate', dateString(10 + (seed % 15)));
          addValue(taskId, 'priority', pick(DOMAIN_VALUE_SETS.tracker.priority, seed));
          addValue(taskId, 'procurementStage', pick(DOMAIN_VALUE_SETS.tracker.procurementStage, seed));
        }

        if (businessDomainId === 'control') {
          addValue(taskId, 'object', pick(DOMAIN_VALUE_SETS.control.object, seed));
          addValue(taskId, 'remarkType', pick(DOMAIN_VALUE_SETS.control.remarkType, seed));
          addValue(taskId, 'contractor', pick(DOMAIN_VALUE_SETS.control.contractor, seed));
          addValue(taskId, 'criticality', pick(DOMAIN_VALUE_SETS.control.criticality, seed));
          addValue(taskId, 'phase', pick(DOMAIN_VALUE_SETS.control.phase, seed));
          addValue(taskId, 'checkDate', dateString(isOverdue ? 2 : 20));
          addValue(taskId, 'controlOwner', formatUserShortLabel(pick(USERS, seed, 3)));
          addValue(taskId, 'resolutionPlan', seed % 2 === 0 ? 'Подготовить корректирующие мероприятия' : 'Проверить выполнение подрядчиком');
          addValue(taskId, 'inspectionArea', pick(DOMAIN_VALUE_SETS.control.inspectionArea, seed));
          addValue(taskId, 'priority', pick(DOMAIN_VALUE_SETS.control.priority, seed));
        }
      }
    });
  });

  return { tasks, values };
}

const seed = createSeeds();

export const TASKS = seed.tasks;
export const TASK_ATTRIBUTE_VALUES = seed.values;
