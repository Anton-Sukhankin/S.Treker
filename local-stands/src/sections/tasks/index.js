import { createButton, createDrawer, createModal, createToast } from '@s-tracker/ui';
import { createLegoDocumentForm } from '../../shared/lego-document-form/index.js';

const DEFAULT_WIDTH = 740;
const MIN_WIDTH = 520;
const MAX_WIDTH = 1100;

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function icon(paths, viewBox = '0 0 20 20') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('task-icon');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  paths.forEach(definition => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', definition.tag || 'path');
    Object.entries(definition).forEach(([name, value]) => { if (name !== 'tag') path.setAttribute(name, value); });
    svg.append(path);
  });
  return svg;
}

const icons = {
  close: () => icon([{ d: 'M5 5l10 10M15 5 5 15' }]),
  save: () => icon([{ d: 'M4 3.5h10.3L16.5 5.7v10.8h-13v-13Z' }, { d: 'M6.5 3.5v5h7v-5M6.5 16.5v-5h7v5' }]),
  history: () => icon([{ d: 'M4.2 6.7A6.5 6.5 0 1 1 3.5 10' }, { d: 'M4.2 3.5v3.2H1' }, { d: 'M10 6.5V10l2.6 1.6' }]),
  comment: () => icon([{ d: 'M4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 3v-3A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4Z' }]),
  back: () => icon([{ d: 'm11.5 5-5 5 5 5' }, { d: 'M7 10h7' }]),
  chevron: () => icon([{ d: 'm5 7.5 5 5 5-5' }]),
  task: () => icon([
    { tag: 'rect', x: '5', y: '3.5', width: '14', height: '17', rx: '2' },
    { d: 'M9 3.5h6v3H9zM8.5 11l1.5 1.5 3-3M8.5 16l1.5 1.5 3-3M15.5 11h1M15.5 16h1' },
  ], '0 0 24 24'),
};

function iconButton(label, iconNode, onClick, variant = 'outlined') {
  const button = createButton({ label, ariaLabel: label, icon: iconNode, iconOnly: true, variant, onClick });
  button.title = label;
  return button;
}

function statusTag(status) {
  const tag = el('span', 'stand-status-tag', status);
  tag.setAttribute('aria-label', `Статус: ${status}`);
  return tag;
}

export function createTasksSection({ task, onOpenTask } = {}) {
  const element = el('section', 'stand-tasks-section');
  element.setAttribute('aria-labelledby', 'stand-tasks-title');
  const heading = el('h1', 'stand-page-title', 'Задачи');
  heading.id = 'stand-tasks-title';
  const description = el('p', 'stand-page-description', 'Локальная точка входа в карточку задачи. Это не список задач основного S-Tracker.');
  const row = el('article', 'stand-task-row');
  const main = el('div', 'stand-task-row__main');
  main.append(el('span', 'stand-task-row__id', task.id), el('strong', 'stand-task-row__title', task.title));
  const meta = el('div', 'stand-task-row__meta');
  const openButton = createButton({ label: 'Открыть карточку', variant: 'primary', onClick: () => onOpenTask?.(openButton) });
  meta.append(statusTag(task.status), openButton);
  row.append(main, meta);
  element.append(heading, description, row);
  return { element, setEntryEnabled: enabled => { openButton.disabled = !enabled; } };
}

function infoItem(label, value, wide = false) {
  const item = el('div', `stand-task-info__item${wide ? ' stand-task-info__item--wide' : ''}`);
  const description = el('dd', 'stand-task-info__value');
  if (value instanceof Node) description.append(value); else description.textContent = value;
  item.append(el('dt', 'stand-task-info__label', label), description);
  return item;
}

function historyView(items) {
  if (!items.length) return el('p', 'stand-empty-state', 'Изменений нет. История появится после первого изменения задачи.');
  const list = el('ol', 'stand-history-list');
  items.forEach(item => {
    const row = el('li', 'stand-history-list__item');
    row.append(el('span', 'stand-history-list__marker'));
    const copy = el('div', 'stand-history-list__copy');
    copy.append(el('p', 'stand-history-list__text', item.text), el('p', 'stand-history-list__meta', `${item.date} · ${item.time}`));
    row.append(copy);
    list.append(row);
  });
  return list;
}

function commentsView(items) {
  if (!items.length) return el('p', 'stand-empty-state', 'Комментариев нет. Комментарии к задаче пока не добавлены.');
  const list = el('ul', 'stand-comments-list');
  items.forEach(item => {
    const row = el('li', 'stand-comment');
    row.append(el('span', 'stand-comment__avatar', item.initials));
    const body = el('div', 'stand-comment__body');
    const top = el('div', 'stand-comment__top');
    const author = el('div', 'stand-comment__author');
    author.append(el('strong', 'stand-comment__name', item.name), el('span', 'stand-comment__role', item.role));
    const time = el('time', 'stand-comment__time', `${item.date} · ${item.time}`);
    top.append(author, time);
    body.append(top, el('p', 'stand-comment__text', item.text));
    row.append(body);
    list.append(row);
  });
  return list;
}

export function createTaskCardDrawer({ task, state, onDrawerClosed } = {}) {
  const toast = createToast({ duration: 3000 });
  const content = el('div', 'stand-task-drawer');
  const defaultView = el('div', 'stand-task-drawer__default');
  const takeover = el('section', 'stand-task-takeover');
  takeover.hidden = true;
  content.append(defaultView, takeover);

  const about = el('section', 'stand-accordion stand-task-about');
  const aboutHeader = el('div', 'stand-accordion__header');
  const aboutToggle = el('button', 'stand-accordion__toggle');
  aboutToggle.type = 'button';
  aboutToggle.setAttribute('aria-expanded', 'true');
  aboutToggle.setAttribute('aria-controls', 'task-about-content');
  const aboutChevron = icons.chevron();
  aboutChevron.classList.add('task-icon--chevron');
  aboutToggle.append(aboutChevron, el('h2', 'stand-accordion__title', 'О задаче'));
  const aboutActions = el('div', 'stand-accordion__actions');
  aboutHeader.append(aboutToggle, aboutActions);
  const aboutContent = el('div', 'stand-task-about__content');
  aboutContent.id = 'task-about-content';
  const info = el('dl', 'stand-task-info__grid');
  info.append(
    infoItem('Исполнитель', task.assignee),
    infoItem('Статус', statusTag(task.status)),
    infoItem('Срок исполнения', task.dueDate),
    el('div', 'stand-task-info__item stand-task-info__item--empty'),
    infoItem('Описание', task.description, true),
  );
  aboutContent.append(info);
  about.append(aboutHeader, aboutContent);

  const form = createLegoDocumentForm({ form: task.form, state, onStateChange: updateFooter });
  defaultView.append(about, form.element);

  const footer = el('div', 'stand-task-footer');
  const saveButton = iconButton('Сохранить', icons.save(), () => {
    state.saveDraft();
    form.refresh();
    updateFooter();
    toast.show({ message: 'Черновик сохранен. Шаг останется активным до подтверждения.' });
  });
  const confirmButton = createButton({ label: 'Подтвердить шаг', variant: 'primary', onClick: confirmActiveStep });
  footer.append(saveButton, confirmButton);

  let closeConfirmation;
  const modalText = el('p', 'stand-close-dialog__text', 'Изменения в полях шага не сохранены.');
  closeConfirmation = createModal({
    title: 'Несохраненные изменения',
    content: modalText,
    actions: [
      { label: 'Остаться', variant: 'outlined', onClick: () => closeConfirmation.close() },
      { label: 'Выйти без сохранения', variant: 'primary', className: 'stand-danger-button', onClick: () => {
        state.discardDraft();
        form.refresh();
        closeConfirmation.close();
        drawer.close();
      } },
    ],
  });

  const drawer = createDrawer({
    id: 'task-card-drawer', title: task.title, content, footer,
    closeLabel: 'Закрыть карточку задачи', onClose: () => onDrawerClosed?.(),
  });
  drawer.element.style.width = `${DEFAULT_WIDTH}px`;

  const headerPane = drawer.element.querySelector('.ds-drawer__header-pane');
  const taskTile = el('span', 'stand-task-header__icon');
  taskTile.setAttribute('aria-hidden', 'true');
  taskTile.append(icons.task());
  const heading = el('h1', 'stand-task-header__title');
  heading.id = 'task-card-drawer-title';
  const title = el('span', 'stand-task-header__name', task.title);
  title.title = task.title;
  heading.append(el('span', 'stand-task-header__id', task.id), el('span', 'stand-task-header__dot'), title);
  const titleGroup = el('div', 'stand-task-header__group');
  titleGroup.append(taskTile, heading);
  drawer.element.setAttribute('aria-labelledby', heading.id);
  const closeButton = iconButton('Закрыть карточку задачи', icons.close(), requestClose, 'text');
  headerPane.replaceChildren(titleGroup, closeButton);

  const resizer = el('div', 'stand-task-resizer');
  resizer.tabIndex = 0;
  resizer.setAttribute('role', 'separator');
  resizer.setAttribute('aria-label', 'Изменить ширину карточки задачи');
  resizer.setAttribute('aria-orientation', 'vertical');
  resizer.setAttribute('aria-valuemin', String(MIN_WIDTH));
  resizer.setAttribute('aria-valuemax', String(MAX_WIDTH));
  drawer.element.prepend(resizer);
  let resizing = null;
  const clampWidth = value => {
    const maximum = Math.max(320, Math.min(MAX_WIDTH, window.innerWidth - 24));
    return Math.min(maximum, Math.max(Math.min(MIN_WIDTH, maximum), Math.round(value)));
  };
  const setWidth = value => {
    const width = clampWidth(value);
    drawer.element.style.width = `${width}px`;
    resizer.setAttribute('aria-valuenow', String(width));
    resizer.setAttribute('aria-valuetext', `${width} пикселей`);
  };
  setWidth(DEFAULT_WIDTH);
  resizer.addEventListener('pointerdown', event => {
    resizing = { pointerId: event.pointerId, startX: event.clientX, startWidth: drawer.element.getBoundingClientRect().width };
    resizer.setPointerCapture(event.pointerId);
    resizer.classList.add('is-resizing');
    document.body.classList.add('is-resizing-task-drawer');
  });
  resizer.addEventListener('pointermove', event => {
    if (!resizing) return;
    setWidth(resizing.startWidth + resizing.startX - event.clientX);
  });
  const stopResize = event => {
    if (!resizing) return;
    if (resizer.hasPointerCapture(event.pointerId)) resizer.releasePointerCapture(event.pointerId);
    resizing = null;
    resizer.classList.remove('is-resizing');
    document.body.classList.remove('is-resizing-task-drawer');
  };
  resizer.addEventListener('pointerup', stopResize);
  resizer.addEventListener('pointercancel', stopResize);
  resizer.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    setWidth(drawer.element.getBoundingClientRect().width + (event.key === 'ArrowLeft' ? 20 : -20));
  });

  aboutToggle.addEventListener('click', () => {
    const expanded = aboutToggle.getAttribute('aria-expanded') === 'true';
    aboutToggle.setAttribute('aria-expanded', String(!expanded));
    aboutContent.hidden = expanded;
    aboutChevron.classList.toggle('is-collapsed', expanded);
  });

  function showTakeover(view, trigger) {
    defaultView.hidden = true;
    takeover.hidden = false;
    takeover.replaceChildren();
    const header = el('div', 'stand-task-takeover__header');
    const back = createButton({
      label: view === 'history' ? 'История изменений' : 'Комментарии',
      ariaLabel: 'Вернуться к карточке задачи', icon: icons.back(), variant: 'text', className: 'stand-task-takeover__back',
      onClick: () => { takeover.hidden = true; defaultView.hidden = false; trigger?.focus?.(); },
    });
    header.append(back);
    takeover.append(header, view === 'history' ? historyView(task.history) : commentsView(task.comments));
    back.focus();
  }
  let historyButton;
  let commentsButton;
  historyButton = iconButton('История изменений', icons.history(), () => showTakeover('history', historyButton));
  commentsButton = iconButton('Комментарии', icons.comment(), () => showTakeover('comments', commentsButton));
  aboutActions.append(historyButton, commentsButton);

  function updateFooter() {
    if (!confirmButton) return;
    const snapshot = state.getSnapshot();
    confirmButton.disabled = !snapshot.activeStepComplete;
    confirmButton.textContent = snapshot.activeStep === task.form.steps.length - 1 ? 'Завершить задачу' : 'Подтвердить шаг';
    confirmButton.title = snapshot.activeStepComplete
      ? (snapshot.activeStep === task.form.steps.length - 1 ? 'Завершить задачу' : `Подтвердить шаг «${task.form.steps[snapshot.activeStep].label}»`)
      : 'Заполните обязательные поля активного шага.';
  }

  function confirmActiveStep() {
    const before = state.getSnapshot();
    const result = state.confirmActiveStep();
    if (!result.ok) return;
    form.refresh();
    updateFooter();
    toast.show({ message: before.activeStep === task.form.steps.length - 1
      ? 'Все доступные этапы подтверждены. Задача завершена.'
      : `Шаг «${task.form.steps[before.activeStep].label}» подтвержден.` });
  }

  function requestClose() {
    if (state.hasUnsavedChanges()) closeConfirmation.open(closeButton);
    else drawer.close();
  }

  drawer.overlay.addEventListener('click', event => {
    event.stopImmediatePropagation();
    requestClose();
  }, true);
  const onKeydown = event => {
    if (event.key !== 'Escape' || !drawer.element.classList.contains('is-active')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    requestClose();
  };
  document.addEventListener('keydown', onKeydown, true);
  updateFooter();

  return {
    mount(target = document.body) {
      drawer.mount(target);
      target.append(closeConfirmation.element, toast.element);
    },
    open(trigger) {
      takeover.hidden = true;
      defaultView.hidden = false;
      form.refresh();
      updateFooter();
      drawer.open(trigger);
    },
    destroy() {
      document.removeEventListener('keydown', onKeydown, true);
      drawer.destroy();
      closeConfirmation.element.remove();
      toast.element.remove();
    },
  };
}
