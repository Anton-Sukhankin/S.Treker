import { getTaskRows } from './task-selectors.js';

export function buildAttributeGroups(domainId, attr) {
  const valueMap = {};
  const nullGroup = { value: 'Без значения', count: 0, taskIds: [] };

  getTaskRows({ domainId }).forEach(task => {
    const val = task[attr];

    if (val === undefined || val === null || val === '') {
      nullGroup.count++;
      nullGroup.taskIds.push(task.id);
    } else {
      if (!valueMap[val]) {
        valueMap[val] = { value: val, count: 0, taskIds: [] };
      }
      valueMap[val].count++;
      valueMap[val].taskIds.push(task.id);
    }
  });

  const groups = Object.values(valueMap);
  if (nullGroup.count > 0) groups.push(nullGroup);

  return {
    domainId,
    attribute: attr,
    groups,
    isExpanded: true
  };
}
