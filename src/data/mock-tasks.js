import {
  getMockLayoutsByLabel,
  getTaskRowByPosition
} from '../domain/task-selectors.js';
import { USERS } from './task-model.js';
import { formatUserShortLabel } from './users.js';

export const MOCK_LAYOUTS = getMockLayoutsByLabel();
export const ASSIGNEES = USERS.map(formatUserShortLabel);
export const SYS_DATA = {};

export function generateTask(tabName, sysId, i) {
  return getTaskRowByPosition(tabName, sysId, i);
}
