export const STATUS_MAP = { 'К исполнению': 'todo', 'В работе': 'in_progress', 'Обработаны мной': 'done', 'К назначению': 'to_assign', 'Наблюдаю': 'review', 'Инициированы мной': 'initiated' };
export const REVERSE_STATUS_MAP = Object.fromEntries(Object.entries(STATUS_MAP).map(([k,v])=>[v,k]));
export const STATUS_LABELS = REVERSE_STATUS_MAP;
