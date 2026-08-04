import { createLegoDocumentState } from './lego-document-state.js';

export function createTaskCardState(task) {
  return createLegoDocumentState({ form: task.form, summaryEnabled: false });
}
