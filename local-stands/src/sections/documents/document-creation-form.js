import { createButton, createInput } from '@s-tracker/ui';
import { legoDocumentFormMock } from '../../data/task-card-mock.js';
import { createLegoDocumentState } from '../../domain/lego-document-state.js';
import { createLegoDocumentForm } from '../../shared/lego-document-form/index.js';

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

export function createDocumentCreationForm({
  option,
  packageName,
  onBack,
  onClose,
  onNotice,
  onSubmit,
} = {}) {
  if (option?.source === 'lego') {
    const element = createElement('div', 'document-creation-form document-creation-form--lego');
    const legoState = createLegoDocumentState({ form: legoDocumentFormMock, summaryEnabled: true });
    const legoForm = createLegoDocumentForm({
      form: legoDocumentFormMock,
      state: legoState,
      mode: 'standalone',
      documentTitle: option.name,
      onBack,
      onClose,
      onNotice,
      onComplete({ values }) {
        onSubmit?.({ name: option.name, number: '', legoValues: values });
      },
    });
    element.append(legoForm.element);
    return {
      element,
      focus() {
        legoForm.focus();
      },
    };
  }

  const element = createElement('form', 'document-creation-form');
  element.noValidate = true;

  const intro = createElement('div', 'document-creation-form__intro');
  intro.append(
    createElement('p', 'document-creation-form__eyebrow', option?.sourceLabel),
    createElement('h3', 'document-creation-form__title', option?.name),
    createElement('p', 'document-creation-form__context', `Пакет: ${packageName}`),
  );

  const fields = createElement('div', 'document-creation-form__fields');
  let documentName = option?.name ?? '';
  let documentNumber = '';
  const nameField = createInput({
    id: 'new-document-name',
    label: 'Наименование документа',
    value: documentName,
    required: true,
    onInput(value) {
      documentName = value;
      if (value.trim()) nameField.setError('');
    },
  });
  const numberField = createInput({
    id: 'new-document-number',
    label: 'Номер документа',
    value: '',
    placeholder: 'Будет сформирован автоматически, если не указан',
    onInput(value) {
      documentNumber = value;
    },
  });
  const typeField = createInput({
    id: 'new-document-type',
    label: 'Тип документа',
    value: option?.documentTypeLabel ?? '',
    readOnly: true,
  });
  fields.append(nameField.element, numberField.element, typeField.element);

  fields.append(createElement(
    'p',
    'document-creation-form__note',
    'Стандартная ECM-форма создаст документ в выбранном пакете. В локальном прототипе серверное сохранение не выполняется.',
  ));

  const actions = createElement('div', 'document-creation-form__actions');
  actions.append(
    createButton({
      label: 'Вернуться к выбору',
      variant: 'outlined',
      onClick: () => onBack?.(),
    }),
    createButton({
      label: 'Сохранить документ',
      variant: 'primary',
      type: 'submit',
    }),
  );

  element.append(intro, fields, actions);
  element.addEventListener('submit', event => {
    event.preventDefault();
    const normalizedName = documentName.trim();
    if (!normalizedName) {
      nameField.setError('Введите наименование документа.');
      nameField.input.focus();
      return;
    }
    onSubmit?.({
      name: normalizedName,
      number: documentNumber.trim(),
    });
  });

  return {
    element,
    focus() {
      nameField.input.focus({ preventScroll: true });
      nameField.input.select();
    },
  };
}
