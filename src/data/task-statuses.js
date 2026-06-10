export const TASK_STATUSES = [
  {
    id: 'new',
    label: 'Новая',
    color: 'cyan',
    tagClass: 'ds-tag--task-status-new'
  },
  {
    id: 'assigned',
    label: 'Назначена',
    color: 'purple',
    tagClass: 'ds-tag--task-status-assigned'
  },
  {
    id: 'in_progress',
    label: 'В работе',
    color: 'blue',
    tagClass: 'ds-tag--task-status-in-progress'
  },
  {
    id: 'assignment_removed',
    label: 'Назначение снято',
    color: 'gray',
    tagClass: 'ds-tag--task-status-assignment-removed'
  },
  {
    id: 'completed',
    label: 'Завершена',
    color: 'green',
    tagClass: 'ds-tag--task-status-completed'
  },
  {
    id: 'cancelled',
    label: 'Отменена',
    color: 'dark-gray',
    tagClass: 'ds-tag--task-status-cancelled'
  },
  {
    id: 'rejected',
    label: 'Отклонена',
    color: 'red',
    tagClass: 'ds-tag--task-status-rejected'
  }
];

export const TASK_STATUS_BY_ID = Object.fromEntries(
  TASK_STATUSES.map(status => [status.id, status])
);

export function getTaskStatus(statusId) {
  return TASK_STATUS_BY_ID[statusId] || TASK_STATUSES[0];
}
