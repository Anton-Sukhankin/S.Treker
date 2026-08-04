import './shared-styles.js';

import { taskCardMock } from '../data/task-card-mock.js';
import { createTaskCardState } from '../domain/task-card-state.js';
import { createPrototypeShell } from '../shell/index.js';
import { createTaskCardDrawer, createTasksSection } from '../sections/tasks/index.js';

const mount = document.querySelector('#section-prototype');
if (!mount) throw new Error('Не найден контейнер прототипа раздела «Задачи».');

const taskState = createTaskCardState(taskCardMock);
let taskEntry;
const taskDrawer = createTaskCardDrawer({
  task: taskCardMock,
  state: taskState,
  onDrawerClosed: () => taskEntry?.setEntryEnabled(true),
});

taskEntry = createTasksSection({
  task: taskCardMock,
  onOpenTask: trigger => {
    taskEntry.setEntryEnabled(false);
    taskDrawer.open(trigger);
  },
});

const shell = createPrototypeShell({
  title: 'Задачи',
  content: taskEntry.element,
  activeSection: 'tasks',
});

mount.replaceChildren(shell.element);
taskDrawer.mount();
