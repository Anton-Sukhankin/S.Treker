import {
  ATTRIBUTE_DEFINITIONS,
  BUSINESS_DOMAINS,
  CURRENT_ROLE_ID,
  DOMAIN_ATTRIBUTES,
  ROLE_DOMAIN_ACCESS,
  TASKS,
  TASK_ATTRIBUTE_VALUES,
  TASK_LAYOUTS_BY_QUEUE,
  TASK_QUEUES,
  USERS
} from '../data/task-model.js';
import { getTaskStatus } from '../data/task-statuses.js';
import {
  formatUserDisplayName,
  formatUserFullName,
  formatUserShortLabel
} from '../data/users.js';

const attributeByKey = Object.fromEntries(ATTRIBUTE_DEFINITIONS.map(attr => [attr.key, attr]));
const queueById = Object.fromEntries(TASK_QUEUES.map(queue => [queue.id, queue]));
const queueByLabel = Object.fromEntries(TASK_QUEUES.map(queue => [queue.label, queue]));
const userById = Object.fromEntries(USERS.map(user => [user.id, user]));

const valuesByTaskId = TASK_ATTRIBUTE_VALUES.reduce((acc, item) => {
  if (!acc[item.taskId]) acc[item.taskId] = {};
  acc[item.taskId][item.attributeKey] = item.value;
  return acc;
}, {});

function cloneColumn(column) {
  return { ...column };
}

function byOrder(a, b) {
  return (a.order || 0) - (b.order || 0);
}

function toColumn(domainAttr) {
  const definition = attributeByKey[domainAttr.attributeKey];
  if (!definition) return null;
  return {
    key: definition.key,
    label: definition.label,
    width: domainAttr.width || '160px',
    sticky: Boolean(domainAttr.sticky),
    valueType: definition.valueType,
    dictionaryId: definition.dictionaryId,
    businessDomainId: domainAttr.businessDomainId,
    inAttributeLibrary: Boolean(domainAttr.inAttributeLibrary),
    visibleByDefault: Boolean(domainAttr.visibleByDefault)
  };
}

export function getQueueByLabel(label) {
  return queueByLabel[label] || queueById[label] || TASK_QUEUES[0];
}

export function getVisibleBusinessDomains(roleId = CURRENT_ROLE_ID) {
  const allowed = new Set(
    ROLE_DOMAIN_ACCESS
      .filter(item => item.roleId === roleId)
      .map(item => item.businessDomainId)
  );

  return BUSINESS_DOMAINS
    .filter(domain => domain.isActive && allowed.has(domain.id))
    .sort(byOrder)
    .map(domain => ({ ...domain }));
}

export function getVisibleBusinessDomainIds(roleId = CURRENT_ROLE_ID) {
  return getVisibleBusinessDomains(roleId).map(domain => domain.id);
}

export function getAttributeDefinition(attributeKey) {
  const definition = attributeByKey[attributeKey];
  return definition ? { ...definition } : null;
}

export function getDomainAttributes(domainId, options = {}) {
  const { includeLibrary = false, onlyLibrary = false } = options;
  return DOMAIN_ATTRIBUTES
    .filter(item => item.businessDomainId === domainId)
    .filter(item => {
      if (onlyLibrary) return item.inAttributeLibrary;
      if (includeLibrary) return true;
      return item.visibleByDefault;
    })
    .sort(byOrder)
    .map(toColumn)
    .filter(Boolean)
    .map(cloneColumn);
}

export function getDefaultDomainAttributes(domainId) {
  return getDomainAttributes(domainId, { includeLibrary: false });
}

export function getDomainAttributeLibrary(domainId) {
  return getDomainAttributes(domainId, { onlyLibrary: true });
}

export function getNavigationAttributeLibrary(navId) {
  const visibleDomainIds = getVisibleBusinessDomainIds();
  const domainIds = navId === 'all' || !visibleDomainIds.includes(navId) ? visibleDomainIds : [navId];
  const seen = new Set();
  const result = [];

  domainIds.forEach(domainId => {
    getDomainAttributeLibrary(domainId).forEach(attr => {
      if (seen.has(attr.key)) return;
      seen.add(attr.key);
      result.push(attr);
    });
  });

  return result;
}

export function getColumnByKey(navId, attributeKey) {
  const visibleDomainIds = getVisibleBusinessDomainIds();
  const domainIds = navId === 'all' || !visibleDomainIds.includes(navId) ? visibleDomainIds : [navId];
  for (const domainId of domainIds) {
    const match = getDomainAttributes(domainId, { includeLibrary: true }).find(attr => attr.key === attributeKey);
    if (match) return match;
  }

  const definition = attributeByKey[attributeKey];
  return definition ? { key: definition.key, label: definition.label, width: '160px', sticky: false } : null;
}

export function getUnionDomainAttributes(domainIds = getVisibleBusinessDomainIds()) {
  const base = [
    { key: 'cb', label: '', width: '60px', sticky: true },
    { key: 'id', label: '№', width: '140px', sticky: true },
    { key: 'title', label: 'Наименование', width: '300px', sticky: true },
    { key: 'sys', label: 'Система', width: '180px', sticky: false }
  ];
  const seen = new Set(base.map(attr => attr.key));

  domainIds.forEach(domainId => {
    getDefaultDomainAttributes(domainId).forEach(attr => {
      if (seen.has(attr.key)) return;
      seen.add(attr.key);
      base.push(attr);
    });
  });

  return base.map(cloneColumn);
}

export function getLayoutByQueueLabel(queueLabel) {
  const queue = getQueueByLabel(queueLabel);
  const layout = TASK_LAYOUTS_BY_QUEUE[queue.id] || {};
  return { ...layout };
}

export function getMockLayoutsByLabel() {
  return Object.fromEntries(
    TASK_QUEUES.map(queue => [queue.label, { ...(TASK_LAYOUTS_BY_QUEUE[queue.id] || {}) }])
  );
}

export function getTaskValue(task, attributeKey) {
  if (!task) return undefined;
  const values = valuesByTaskId[task.id] || {};

  if (attributeKey === 'id') return task.id;
  if (attributeKey === 'title') return task.title;
  if (attributeKey === 'sys') return task.businessDomainId;
  if (attributeKey === 'status') return getTaskStatus(task.taskStatusId).label;
  if (attributeKey === 'assignee') return values.assignee || formatUserShortLabel(userById[task.assigneeId]) || task.assigneeId;
  if (attributeKey === 'author') return formatUserDisplayName(userById[task.createdBy]) || values.author || task.createdBy;

  return values[attributeKey];
}

export function getTaskUser(userId) {
  const user = userById[userId];
  if (!user) return null;
  return {
    ...user,
    label: formatUserShortLabel(user),
    displayName: formatUserDisplayName(user),
    fullName: formatUserFullName(user)
  };
}

export function toTaskRow(task) {
  const queue = queueById[task.queueId] || TASK_QUEUES[0];
  const taskStatus = getTaskStatus(task.taskStatusId);
  const values = valuesByTaskId[task.id] || {};
  const row = {
    id: task.id,
    title: task.title,
    status: taskStatus.label,
    statusId: taskStatus.id,
    taskStatusId: taskStatus.id,
    taskStatusColor: taskStatus.color,
    queueId: task.queueId,
    queue: queue.label,
    queueLabel: queue.label,
    legacyStatusId: task.statusId,
    statusCls: taskStatus.tagClass,
    taskStatusCls: taskStatus.tagClass,
    assignee: getTaskValue(task, 'assignee'),
    regDate: getTaskValue(task, 'regDate'),
    sys: task.businessDomainId,
    businessDomainId: task.businessDomainId,
    createdBy: task.createdBy,
    assigneeId: task.assigneeId,
    observerIds: [...task.observerIds],
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    isOverdue: Boolean(task.flags?.isOverdue),
    isNew: Boolean(task.flags?.isNew)
  };

  Object.entries(values).forEach(([key, value]) => {
    row[key] = value;
  });

  row.status = taskStatus.label;
  row.queue = queue.label;
  row.queueLabel = queue.label;
  row.author = getTaskValue(task, 'author');
  row.authorInfo = getTaskUser(task.createdBy);
  row.assignee = getTaskValue(task, 'assignee');
  row.assigneeInfo = getTaskUser(task.assigneeId);
  return row;
}

export function getTaskRows(options = {}) {
  const { queueLabel, queueId, domainId, roleId = CURRENT_ROLE_ID } = options;
  const visibleDomainIds = new Set(getVisibleBusinessDomainIds(roleId));
  const resolvedQueueId = queueId || (queueLabel ? getQueueByLabel(queueLabel)?.id : null);

  return TASKS
    .filter(task => visibleDomainIds.has(task.businessDomainId))
    .filter(task => !resolvedQueueId || task.queueId === resolvedQueueId)
    .filter(task => !domainId || domainId === 'all' || task.businessDomainId === domainId)
    .map(toTaskRow);
}

export function getTaskRowByPosition(queueLabel, domainId, index) {
  return getTaskRows({ queueLabel, domainId })[index] || null;
}

export function getRowsForNavigation(queueLabel, navigationContext = window.navigationContext) {
  let rows = getTaskRows({ queueLabel });
  const nav = navigationContext || { type: 'all', id: 'all' };

  if (nav.type === 'custom-group') {
    const group = (window.customGroups || []).flatMap(item => {
      if (item.type === 'bookmark' && Array.isArray(item.groups)) return item.groups;
      return [item];
    }).find(item => item.id === nav.id);
    const ids = new Set(group?.taskIds || []);
    return rows.filter(task => ids.has(task.id));
  }

  if (nav.type === 'system' && nav.id !== 'all') {
    rows = rows.filter(task => task.businessDomainId === nav.id);
  }

  if (nav.type === 'grouped-value') {
    if (nav.id !== 'all') rows = rows.filter(task => task.businessDomainId === nav.id);
    rows = rows.filter(task => {
      const value = task[nav.attr];
      if (nav.val === 'Без значения') return value === undefined || value === null || value === '';
      return String(value) === String(nav.val);
    });
  }

  return rows;
}

export function getFilterOptions(attributeKey, options = {}) {
  const rows = getTaskRows(options);
  const values = new Set();
  rows.forEach(row => {
    const value = row[attributeKey];
    if (value !== undefined && value !== null && value !== '') values.add(value);
  });
  return Array.from(values).sort((a, b) => String(a).localeCompare(String(b), 'ru'));
}
