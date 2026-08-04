import { createButton, createDrawer, createInput } from '@s-tracker/ui';
import { filterDocumentCreationOptions } from '../../domain/document-creation-options.js';
import { createDocumentCreationForm } from './document-creation-form.js';
import { createDocumentsIcon } from './documents-list.js';

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

export function createNewDocumentTypePickerDrawer({
  options = [],
  onOptionSelect,
  onSubmitDocument,
  onNotice,
  onClose,
} = {}) {
  const content = createElement('div', 'document-picker');
  const drawer = createDrawer({
    id: 'new-document-type-picker-drawer',
    title: 'Загрузка нового документа',
    content,
    placement: 'bottom',
    modal: true,
    showOverlay: true,
    focusOnOpen: false,
    closeLabel: 'Закрыть выбор типа документа',
    onClose,
  });

  const headerPane = drawer.element.querySelector('.ds-drawer__header-pane');
  const heading = drawer.element.querySelector('.ds-drawer__title');
  const closeButton = headerPane?.querySelector('button');
  const headingCopy = createElement('div', 'document-picker__heading-copy');
  const subtitle = createElement('p', 'document-picker__subtitle', 'Выберите вариант создания документа');
  const description = createElement(
    'p',
    'document-picker__description',
    'В списке показаны стандартные ECM-формы и опубликованные Lego-шаблоны.',
  );
  headingCopy.append(heading, subtitle, description);
  closeButton?.classList.add('document-picker__close');
  closeButton?.replaceChildren(createDocumentsIcon('x', 25));
  if (headerPane && closeButton) headerPane.replaceChildren(headingCopy, closeButton);

  let packageName = 'Документы';
  let query = '';
  let selectedId = null;
  let searchInput = null;
  let statusMessage = null;

  function syncDrawerTopOffset() {
    const workspaceHeader = document.querySelector('.stand-header');
    const headerBottom = workspaceHeader
      ? Math.min(window.innerHeight, Math.max(0, workspaceHeader.getBoundingClientRect().bottom))
      : 0;
    drawer.element.style.setProperty('--document-picker-top-offset', `${Math.round(headerBottom)}px`);
  }

  const handleViewportResize = () => {
    if (drawer.isOpen()) syncDrawerTopOffset();
  };

  window.addEventListener('resize', handleViewportResize);
  window.visualViewport?.addEventListener('resize', handleViewportResize);

  function setHeader({ picker = true, title } = {}) {
    heading.textContent = title || (picker ? 'Загрузка нового документа' : 'Создание документа');
    subtitle.textContent = picker ? 'Выберите вариант создания документа' : 'Заполните данные документа';
    description.textContent = picker
      ? 'В списке показаны стандартные ECM-формы и опубликованные Lego-шаблоны.'
      : `Документ будет добавлен в пакет «${packageName}» после сохранения.`;
  }

  function selectRow(optionId) {
    selectedId = optionId;
    content.querySelectorAll('[data-creation-option]').forEach(row => {
      const selected = row.dataset.creationOption === selectedId;
      row.classList.toggle('is-selected', selected);
      row.setAttribute('aria-selected', String(selected));
    });
  }

  function renderCatalog() {
    drawer.element.classList.remove('is-lego-flow');
    content.classList.remove('is-lego-flow');
    setHeader({ picker: true });
    const catalog = createElement('section', 'document-picker__catalog');
    catalog.setAttribute('aria-label', 'Выбор типа документа или шаблона');

    const searchShell = createElement('div', 'document-picker__search');
    const input = createInput({
      id: 'new-document-type-search',
      value: query,
      placeholder: 'Найти тип документа или шаблон...',
      attributes: { 'aria-label': 'Поиск типа документа или шаблона', autocomplete: 'off' },
      onInput(value) {
        query = value;
        renderRows();
      },
    });
    searchInput = input.input;
    searchShell.append(createDocumentsIcon('search', 23), input.element);
    const clearSearch = createButton({
      icon: createDocumentsIcon('x', 18),
      iconOnly: true,
      ariaLabel: 'Очистить поиск',
      variant: 'text',
      size: 'small',
      className: 'document-picker__clear-search',
      onClick: () => {
        query = '';
        input.setValue('');
        renderRows();
        input.input.focus();
      },
    });
    searchShell.append(clearSearch);

    const count = createElement('p', 'document-picker__count');
    count.setAttribute('aria-live', 'polite');
    const modeHint = createElement(
      'p',
      'document-picker__mode-hint',
      'Для пошагового заполнения выберите вариант с источником «Lego-шаблон» и нажмите «Открыть этапы».',
    );
    const columns = createElement('div', 'document-picker__columns');
    columns.append(
      createElement('span', '', 'Тип документа / шаблон'),
      createElement('span', 'document-picker__source-heading', 'Источник / Тип'),
      createElement('span', 'sr-only', 'Действие'),
    );
    const list = createElement('div', 'document-picker__list');
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', 'Доступные варианты создания документа');
    statusMessage = createElement('p', 'document-picker__status');
    statusMessage.setAttribute('role', 'alert');
    statusMessage.hidden = true;
    catalog.append(searchShell, count, modeHint, columns, list, statusMessage);
    content.replaceChildren(catalog);

    function choose(option) {
      selectRow(option.id);
      onOptionSelect?.(option);
    }

    function renderRows() {
      const filteredOptions = filterDocumentCreationOptions(options, query);
      clearSearch.hidden = !query;
      count.replaceChildren(
        document.createTextNode('Найдено: '),
        createElement('strong', '', filteredOptions.length),
      );
      if (!filteredOptions.some(option => option.id === selectedId)) {
        selectedId = filteredOptions[0]?.id ?? null;
      }
      list.replaceChildren();

      if (filteredOptions.length === 0) {
        const empty = createElement('div', 'document-picker__empty');
        const icon = createElement('span', 'document-picker__empty-icon');
        icon.append(createDocumentsIcon('search', 22));
        empty.append(
          icon,
          createElement('h3', '', 'Ничего не найдено'),
          createElement('p', '', 'Измените поисковый запрос.'),
          createButton({
            label: 'Сбросить поиск',
            variant: 'text',
            onClick: () => {
              query = '';
              input.setValue('');
              renderRows();
              input.input.focus();
            },
          }),
        );
        list.append(empty);
        return;
      }

      filteredOptions.forEach(option => {
        const selected = option.id === selectedId;
        const row = createElement('article', `document-picker__row${selected ? ' is-selected' : ''}`);
        row.dataset.creationOption = option.id;
        row.tabIndex = 0;
        row.setAttribute('role', 'option');
        row.setAttribute('aria-selected', String(selected));
        row.addEventListener('click', () => selectRow(option.id));
        row.addEventListener('dblclick', () => choose(option));
        row.addEventListener('keydown', event => {
          if (!['Enter', ' '].includes(event.key)) return;
          event.preventDefault();
          choose(option);
        });

        const primary = createElement('div', 'document-picker__primary');
        const typeIcon = createElement('span', `document-picker__type-icon is-${option.source}`);
        typeIcon.append(createDocumentsIcon(option.source === 'ecm' ? 'file' : 'layers', 23));
        const nameCopy = createElement('div', 'document-picker__name-copy');
        const name = createElement('h3', 'document-picker__name', option.name);
        name.title = option.name;
        const nameMeta = createElement(
          'p',
          'document-picker__name-meta',
          `${option.sourceLabel} · ${option.name}`,
        );
        nameMeta.title = `${option.sourceLabel} · ${option.name}`;
        nameCopy.append(name, nameMeta);
        primary.append(typeIcon, nameCopy);
        const source = createElement('div', `document-picker__source is-${option.source}`);
        source.append(createDocumentsIcon(option.source === 'ecm' ? 'file' : 'layers', 22));
        const sourceCopy = createElement('div', 'document-picker__source-copy');
        const sourceLabel = createElement('p', '', option.sourceLabel);
        sourceLabel.title = option.sourceLabel;
        const sourceType = createElement('p', '', option.name);
        sourceType.title = option.name;
        sourceCopy.append(sourceLabel, sourceType);
        source.append(sourceCopy);
        const chooseButton = createButton({
          label: option.source === 'lego' ? 'Открыть этапы' : 'Выбрать',
          ariaLabel: option.source === 'lego'
            ? `Открыть этапы Lego-шаблона «${option.name}»`
            : `Выбрать стандартную ECM-форму «${option.name}»`,
          variant: 'primary',
          className: 'document-picker__choose',
          onClick: event => {
            event.stopPropagation();
            choose(option);
          },
        });
        row.append(primary, source, chooseButton);
        list.append(row);
      });
    }

    renderRows();
  }

  function showCatalog({ preserveQuery = false } = {}) {
    if (!preserveQuery) query = '';
    statusMessage = null;
    const available = filterDocumentCreationOptions(options, query);
    selectedId = available[0]?.id ?? null;
    renderCatalog();
    window.requestAnimationFrame(() => searchInput?.focus({ preventScroll: true }));
  }

  function showCreation(option) {
    const isLego = option?.source === 'lego';
    drawer.element.classList.toggle('is-lego-flow', isLego);
    content.classList.toggle('is-lego-flow', isLego);
    setHeader({ picker: false, title: 'Создание документа' });
    const form = createDocumentCreationForm({
      option,
      packageName,
      onBack: () => showCatalog({ preserveQuery: true }),
      onClose: () => drawer.close(),
      onNotice,
      onSubmit: values => onSubmitDocument?.({ option, values }),
    });
    content.replaceChildren(form.element);
    window.requestAnimationFrame(() => form.focus());
  }

  renderCatalog();

  return {
    element: drawer.element,
    overlay: drawer.overlay,
    mount(target = document.body) {
      drawer.mount(target);
    },
    open(trigger, context = {}) {
      packageName = context.packageName || 'Документы';
      showCatalog();
      syncDrawerTopOffset();
      drawer.open(trigger);
    },
    close() {
      drawer.close();
    },
    showCreation,
    showError(message) {
      showCatalog({ preserveQuery: true });
      if (statusMessage) {
        statusMessage.textContent = message;
        statusMessage.hidden = false;
      }
    },
    isOpen() {
      return drawer.isOpen();
    },
    destroy() {
      window.removeEventListener('resize', handleViewportResize);
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
      drawer.destroy();
    },
  };
}
