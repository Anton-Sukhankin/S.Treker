import { TASK_CARD_DETAIL_TEMPLATE } from '../data/task-card-details.js';

export function getTaskCardDetails(taskRow) {
  if (!taskRow) return null;
  return {
    id: taskRow.id,
    title: taskRow.title,
    status: taskRow.status,
    assignee: taskRow.assignee || 'Исполнитель не назначен',
    dueDate: taskRow.dueDate || 'Срок не установлен',
    description: TASK_CARD_DETAIL_TEMPLATE.description,
    history: TASK_CARD_DETAIL_TEMPLATE.history,
    comments: TASK_CARD_DETAIL_TEMPLATE.comments,
    form: TASK_CARD_DETAIL_TEMPLATE.form,
  };
}
