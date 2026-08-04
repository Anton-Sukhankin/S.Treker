import { createButton, createInput, createSelect } from '@s-tracker/ui';

const el = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
};

function icon(name, size = 20) {
  const definitions = {
    back: ['path', { d: 'm15 18-6-6 6-6' }],
    check: ['path', { d: 'm5 12 4 4L19 6' }],
    'chevron-right': ['path', { d: 'm9 18 6-6-6-6' }],
    close: ['path', { d: 'M6 6l12 12M18 6 6 18' }],
    download: ['path', { d: 'M12 3v12m0 0 4-4m-4 4-4-4M5 20h14' }],
    file: ['path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5' }],
    upload: ['path', { d: 'M12 16V4m0 0L7 9m5-5 5 5M4 20h16' }],
  };
  const [tag, attributes] = definitions[name] ?? definitions.file;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([key, value]) => path.setAttribute(key, value));
  svg.append(path);
  return svg;
}

function dictionaryLabel(form, stepId, fieldName, value) {
  const dictionaryMap = {
    'need.constructionObject': 'constructionObjects',
    'need.needType': 'needTypes',
    'counterparty.counterparty': 'counterparties',
    'counterparty.contractType': 'contractTypes',
    'budget.currency': 'currencies',
    'budget.vatRate': 'vatRates',
    'budget.cfo': 'cfo',
    'budget.turnoverArticle': 'turnoverArticles',
    'budget.budgetUnit': 'budgetUnits',
    'payment.paymentScheme': 'paymentSchemes',
    'payment.paymentBasis': 'paymentBases',
    'schedule.serviceFrequency': 'serviceFrequencies',
    'schedule.resultFormat': 'resultFormats',
  };
  const dictionary = form.dictionaries[dictionaryMap[`${stepId}.${fieldName}`]] ?? [];
  return dictionary.find(option => option.value === value)?.label ?? String(value ?? '');
}

function formatSummaryValue(form, stepId, fieldName, value, stepValues) {
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
  if (!String(value ?? '').trim()) return '—';
  if (stepId === 'budget' && fieldName === 'vatRate' && !stepValues.includesVat) return '—';
  if (fieldName === 'amount') {
    const amount = Number(String(value).replace(/\s/g, '').replace(',', '.'));
    if (!Number.isNaN(amount)) {
      const symbol = { RUB: '₽', USD: '$', EUR: '€' }[stepValues.currency] ?? stepValues.currency;
      return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount)} ${symbol}`.trim();
    }
  }
  if (fieldName === 'vatRate' || fieldName === 'advancePercent') return `${value}%`;
  if (fieldName === 'defermentDays') return `${value} дней`;
  if (fieldName === 'startDate' || fieldName === 'endDate') {
    const date = new Date(`${value}T00:00:00`);
    if (!Number.isNaN(date.getTime())) return new Intl.DateTimeFormat('ru-RU').format(date);
  }
  return dictionaryLabel(form, stepId, fieldName, value) || String(value);
}

function appendFieldError(control, message) {
  if (!message) return;
  control.element.classList.add('has-error');
  control.select?.setAttribute('aria-invalid', 'true');
  const error = el('p', 'ds-field__error', message);
  error.id = `${control.select.id}-error`;
  error.setAttribute('role', 'alert');
  control.select.setAttribute('aria-describedby', error.id);
  control.element.append(error);
}

export function createLegoDocumentForm({
  form,
  state,
  mode = 'embedded',
  documentTitle,
  onStateChange,
  onBack,
  onClose,
  onComplete,
  onNotice,
} = {}) {
  const standalone = mode === 'standalone';
  const element = el('section', `stand-lego-flow is-${mode}`);

  const changed = (stepId, name, value, { rerender = false } = {}) => {
    state.setDraftValue(stepId, name, value);
    if (rerender) render();
    onStateChange?.(state.getSnapshot());
  };

  const createTextField = ({ stepId, name, label, value, placeholder, type = 'text', required, hint, error, attributes, sanitize, full = false, suffix }) => {
    const control = createInput({
      id: `lego-${mode}-${stepId}-${name}`,
      label,
      description: hint,
      value,
      placeholder,
      type,
      required,
      error,
      attributes,
      onInput: nextValue => changed(stepId, name, sanitize ? sanitize(nextValue) : nextValue),
      onChange: type === 'date' ? nextValue => changed(stepId, name, nextValue) : undefined,
    });
    control.element.classList.add('stand-lego-field');
    control.element.classList.toggle('is-full', full);
    if (suffix) {
      const wrapper = el('div', 'stand-lego-control-with-suffix');
      const suffixElement = el('span', 'stand-lego-control-with-suffix__value', suffix);
      suffixElement.setAttribute('aria-hidden', 'true');
      control.input.replaceWith(wrapper);
      wrapper.append(control.input, suffixElement);
    }
    return control.element;
  };

  const createSelectField = ({ stepId, name, label, value, placeholder, options, required, error, rerender = false }) => {
    const control = createSelect({
      id: `lego-${mode}-${stepId}-${name}`,
      label,
      value,
      placeholder,
      options,
      required,
      onChange: (nextValue, event) => {
        event.target.classList.toggle('is-placeholder', !nextValue);
        changed(stepId, name, nextValue, { rerender });
      },
    });
    control.element.classList.add('stand-lego-field');
    control.select.querySelector('option[value=""]')?.removeAttribute('disabled');
    control.select.classList.toggle('is-placeholder', !value);
    appendFieldError(control, error);
    return control.element;
  };

  const createTextAreaField = ({ stepId, name, label, value, placeholder, hint }) => {
    const field = el('div', 'stand-lego-field ds-field is-full');
    const labelElement = el('label', 'ds-field__label', label);
    const textarea = el('textarea', 'stand-lego-textarea');
    textarea.id = `lego-${mode}-${stepId}-${name}`;
    labelElement.htmlFor = textarea.id;
    textarea.value = value;
    textarea.placeholder = placeholder;
    textarea.addEventListener('input', event => changed(stepId, name, event.target.value));
    field.append(labelElement, textarea);
    if (hint) field.append(el('p', 'ds-field__description', hint));
    return field;
  };

  const createToggle = ({ stepId, name, checked, label, description, bordered = false }) => {
    const row = el('div', `stand-lego-toggle-row${bordered ? ' is-bordered' : ''}`);
    const button = el('button', `stand-lego-toggle${checked ? ' is-on' : ''}`);
    const labelId = `lego-${mode}-${stepId}-${name}-toggle-label`;
    const descriptionId = `lego-${mode}-${stepId}-${name}-toggle-description`;
    button.type = 'button';
    button.setAttribute('role', 'switch');
    button.setAttribute('aria-checked', String(checked));
    button.setAttribute('aria-labelledby', labelId);
    if (description) button.setAttribute('aria-describedby', descriptionId);
    button.append(el('span', 'stand-lego-toggle__thumb'));
    button.addEventListener('click', () => changed(stepId, name, !checked, { rerender: true }));
    const copy = el('span', 'stand-lego-toggle-row__copy');
    const labelElement = el('span', 'stand-lego-toggle-row__label', label);
    labelElement.id = labelId;
    copy.append(labelElement);
    if (description) {
      const descriptionElement = el('span', 'stand-lego-toggle-row__description', description);
      descriptionElement.id = descriptionId;
      copy.append(descriptionElement);
    }
    copy.addEventListener('click', () => button.click());
    row.append(button, copy);
    return row;
  };

  function renderNeed(container, values, errors) {
    container.append(
      createTextField({ stepId: 'need', name: 'contractSubject', label: 'Предмет договора', required: true, value: values.contractSubject, placeholder: 'Например, поставка офисной мебели', error: errors.contractSubject, full: true }),
      createSelectField({ stepId: 'need', name: 'constructionObject', label: 'Объект строительства (справочник)', required: true, value: values.constructionObject, placeholder: 'Выберите значение', options: form.dictionaries.constructionObjects, error: errors.constructionObject }),
      createSelectField({ stepId: 'need', name: 'needType', label: 'Вид потребности', required: true, value: values.needType, options: form.dictionaries.needTypes }),
      createTextAreaField({ stepId: 'need', name: 'details', label: 'Дополнительное описание', value: values.details, placeholder: 'Добавьте детали потребности', hint: 'Уточните объём, назначение или особые требования.' }),
    );
  }

  function renderCounterparty(container, values, errors) {
    if (values.isKnown) {
      container.append(createSelectField({ stepId: 'counterparty', name: 'counterparty', label: 'Контрагент (справочник)', required: true, value: values.counterparty, placeholder: 'Выберите организацию', options: form.dictionaries.counterparties, error: errors.counterparty }));
    }
    container.append(createSelectField({ stepId: 'counterparty', name: 'contractType', label: 'Тип договора', required: true, value: values.contractType, placeholder: 'Выберите тип договора', options: form.dictionaries.contractTypes, error: errors.contractType }));
    if (values.isKnown) {
      container.append(createTextField({ stepId: 'counterparty', name: 'contactPerson', label: 'Контактное лицо', value: values.contactPerson, placeholder: 'Фамилия, имя, должность', hint: 'Необязательное поле' }));
    }
    const toggles = el('div', 'stand-lego-toggle-stack is-full');
    toggles.append(
      createToggle({ stepId: 'counterparty', name: 'isKnown', checked: values.isKnown, label: 'Контрагент уже определён', description: 'Отключите, если поставщик будет выбран позднее в процессе.' }),
      createToggle({ stepId: 'counterparty', name: 'requiresAccreditation', checked: values.requiresAccreditation, label: 'Требуется аккредитация', description: 'Добавляет проверку поставщика перед заключением договора.' }),
    );
    container.append(toggles);
  }

  function renderBudget(container, values, errors) {
    container.classList.add('is-budget');
    const cost = el('section', 'stand-lego-field-group is-full');
    cost.setAttribute('aria-label', 'Параметры стоимости');
    cost.append(
      createTextField({ stepId: 'budget', name: 'amount', label: 'Сумма', required: true, value: values.amount, placeholder: '0,00', error: errors.amount, attributes: { inputmode: 'decimal' }, sanitize: value => value.replace(/[^0-9.,\s]/g, ''), suffix: '₽' }),
      createSelectField({ stepId: 'budget', name: 'currency', label: 'Валюта (справочник)', required: true, value: values.currency, options: form.dictionaries.currencies, error: errors.currency }),
      createToggle({ stepId: 'budget', name: 'includesVat', checked: values.includesVat, label: 'Сумма включает НДС', description: 'При включении потребуется указать применимую ставку.', bordered: true }),
    );
    if (values.includesVat) {
      cost.append(createSelectField({ stepId: 'budget', name: 'vatRate', label: 'Ставка НДС', required: true, value: values.vatRate, placeholder: 'Выберите ставку', options: form.dictionaries.vatRates, error: errors.vatRate }));
    }
    const budget = el('section', 'stand-lego-field-group is-full');
    budget.setAttribute('aria-label', 'Параметры бюджета');
    budget.append(
      createSelectField({ stepId: 'budget', name: 'cfo', label: 'ЦФО (справочник)', required: true, value: values.cfo, placeholder: 'Выберите ЦФО', options: form.dictionaries.cfo, error: errors.cfo }),
      createSelectField({ stepId: 'budget', name: 'turnoverArticle', label: 'Статья оборотов', required: true, value: values.turnoverArticle, placeholder: 'Выберите статью', options: form.dictionaries.turnoverArticles, error: errors.turnoverArticle }),
      createSelectField({ stepId: 'budget', name: 'budgetUnit', label: 'БЮ (справочник)', required: true, value: values.budgetUnit, placeholder: 'Выберите бюджетную единицу', options: form.dictionaries.budgetUnits, error: errors.budgetUnit }),
    );
    container.append(cost, budget);
  }

  function renderPayment(container, values, errors) {
    const hasAdvance = ['advance', 'combined'].includes(values.paymentScheme);
    container.append(
      createSelectField({ stepId: 'payment', name: 'paymentScheme', label: 'Схема оплаты', required: true, value: values.paymentScheme, placeholder: 'Выберите схему', options: form.dictionaries.paymentSchemes, error: errors.paymentScheme, rerender: true }),
      hasAdvance
        ? createTextField({ stepId: 'payment', name: 'advancePercent', label: 'Размер аванса', required: true, value: values.advancePercent, placeholder: 'Например, 30', error: errors.advancePercent, attributes: { inputmode: 'numeric' }, sanitize: value => value.replace(/\D/g, '').slice(0, 3) })
        : createTextField({ stepId: 'payment', name: 'defermentDays', label: 'Отсрочка платежа', value: values.defermentDays, placeholder: 'Например, 15', hint: 'Количество календарных дней после приёмки', attributes: { inputmode: 'numeric' }, sanitize: value => value.replace(/\D/g, '') }),
      createSelectField({ stepId: 'payment', name: 'paymentBasis', label: 'Основание платежа', required: true, value: values.paymentBasis, placeholder: 'Выберите основание', options: form.dictionaries.paymentBases, error: errors.paymentBasis }),
    );
    if (standalone) {
      container.append(createTextAreaField({ stepId: 'payment', name: 'specialTerms', label: 'Особые условия', value: values.specialTerms, placeholder: 'Например, удержание гарантийной суммы или особый график платежей' }));
    }
  }

  function createFileField(values) {
    const field = el('div', 'stand-lego-file-field stand-lego-field ds-field is-full');
    const label = el('span', 'ds-field__label', 'Техническое задание');
    const input = el('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx';
    input.hidden = true;
    const choose = el('button', 'stand-lego-file-picker');
    choose.type = 'button';
    const tile = el('span', 'stand-lego-file-picker__icon');
    tile.append(icon(values.attachmentName ? 'file' : 'upload'));
    const copy = el('span', 'stand-lego-file-picker__copy');
    copy.append(
      el('span', 'stand-lego-file-picker__title', values.attachmentName || 'Выберите файл или перетащите его сюда'),
      el('span', 'stand-lego-file-picker__description', values.attachmentName ? 'Нажмите, чтобы заменить файл' : 'Файл прикрепится к текущему шагу'),
    );
    choose.append(tile, copy);
    choose.addEventListener('click', () => input.click());
    input.addEventListener('change', event => changed('schedule', 'attachmentName', event.target.files?.[0]?.name ?? '', { rerender: true }));
    field.append(label, input, choose, el('p', 'ds-field__description', 'PDF, DOCX или XLSX до 50 МБ'));
    return field;
  }

  function renderSchedule(container, values, errors) {
    container.append(
      createSelectField({ stepId: 'schedule', name: 'serviceFrequency', label: 'Периодичность', required: true, value: values.serviceFrequency, options: form.dictionaries.serviceFrequencies, error: errors.serviceFrequency }),
      createSelectField({ stepId: 'schedule', name: 'resultFormat', label: 'Формат результата', required: true, value: values.resultFormat, placeholder: 'Выберите формат', options: form.dictionaries.resultFormats, error: errors.resultFormat }),
      createTextField({ stepId: 'schedule', name: 'startDate', label: 'Плановая дата начала', type: 'date', value: values.startDate, hint: 'Необязательное поле' }),
      createTextField({ stepId: 'schedule', name: 'endDate', label: 'Плановая дата завершения', type: 'date', required: true, value: values.endDate, error: errors.endDate }),
      createTextField({ stepId: 'schedule', name: 'deliveryAddress', label: 'Адрес или место исполнения', value: values.deliveryAddress, placeholder: 'Укажите адрес объекта или место передачи результата', hint: 'Необязательное поле', full: true }),
      createFileField(values),
    );
  }

  function renderStepFields(container, snapshot) {
    const step = form.steps[snapshot.activeStep];
    const values = snapshot.values[step.id];
    if (step.id === 'need') renderNeed(container, values, snapshot.errors);
    else if (step.id === 'counterparty') renderCounterparty(container, values, snapshot.errors);
    else if (step.id === 'budget') renderBudget(container, values, snapshot.errors);
    else if (step.id === 'payment') renderPayment(container, values, snapshot.errors);
    else renderSchedule(container, values, snapshot.errors);
  }

  function createStageRail(snapshot) {
    const navigation = el('nav', 'stand-lego-flow__stages');
    navigation.setAttribute('aria-label', 'Этапы заполнения формы');
    const list = el('ol', 'stand-lego-stage-grid');
    form.steps.forEach((step, index) => {
      const completed = snapshot.completedSteps.includes(index);
      const active = snapshot.activeStep === index;
      const available = index <= snapshot.highestUnlockedStep || completed;
      const item = el('li', 'stand-lego-stage-grid__item');
      const button = el('button', 'stand-lego-stage-card');
      button.type = 'button';
      button.disabled = !available;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-complete', completed);
      if (active) button.setAttribute('aria-current', 'step');
      button.setAttribute('aria-label', `Шаг ${index + 1}: ${step.label}`);
      const marker = el('span', 'stand-lego-stage-card__marker');
      if (completed) marker.append(icon('check', 17));
      else marker.textContent = String(index + 1);
      const copy = el('span', 'stand-lego-stage-card__copy');
      copy.append(
        el('span', 'stand-lego-stage-card__title', step.label),
        el('span', 'stand-lego-stage-card__state', active ? 'Текущий этап' : completed ? 'Этап подтверждён' : available ? 'Доступен' : 'Будет доступен позже'),
      );
      button.append(marker, copy);
      button.addEventListener('click', () => {
        state.selectStep(index);
        render();
        onStateChange?.(state.getSnapshot());
        window.requestAnimationFrame(() => element.querySelector('.stand-lego-flow__scroll')?.scrollTo({ top: 0, behavior: 'smooth' }));
      });
      item.append(button);
      list.append(item);
    });
    navigation.append(list);
    return navigation;
  }

  function createFormHeader() {
    const header = el('header', 'stand-lego-flow__header');
    const brand = el('div', 'stand-lego-flow__brand');
    const tile = el('span', 'stand-lego-flow__brand-icon');
    tile.append(icon('file'));
    brand.append(tile, el('h1', 'stand-lego-flow__title', form.title));
    const actions = el('div', 'stand-lego-flow__header-actions');
    if (onBack) actions.append(createButton({ label: 'Вернуться к выбору', variant: 'text', size: 'small', icon: icon('back', 18), onClick: onBack }));
    if (onClose) actions.append(createButton({ label: 'Закрыть', ariaLabel: 'Закрыть форму Lego', variant: 'text', size: 'small', icon: icon('close'), iconOnly: true, onClick: onClose }));
    header.append(brand, actions);
    return header;
  }

  function moveForward() {
    const result = state.confirmActiveStep();
    render();
    onStateChange?.(result.snapshot);
    if (!result.ok) {
      window.requestAnimationFrame(() => element.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    window.requestAnimationFrame(() => {
      element.querySelector('.stand-lego-flow__scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
      element.querySelector('.stand-lego-flow__content input, .stand-lego-flow__content select, .stand-lego-flow__content textarea')?.focus({ preventScroll: true });
    });
  }

  function renderForm(snapshot) {
    const view = el('div', 'stand-lego-flow__form-view');
    if (standalone) view.append(createFormHeader());
    view.append(createStageRail(snapshot));
    const scroll = el('div', 'stand-lego-flow__scroll');
    const content = el('div', 'stand-lego-flow__content');
    const step = form.steps[snapshot.activeStep];
    const stepCopy = el('div', 'stand-lego-flow__step-copy');
    stepCopy.append(el('h2', 'stand-lego-flow__step-title', step.label), el('p', 'stand-lego-flow__step-description', step.description));
    const surface = el('section', 'stand-lego-surface');
    surface.setAttribute('aria-label', `${step.label}: поля формы`);
    const fields = el('div', 'stand-lego-fields');
    renderStepFields(fields, snapshot);
    surface.append(fields);
    content.append(stepCopy, surface);
    scroll.append(content);
    view.append(scroll);
    if (standalone) {
      const footer = el('footer', 'stand-lego-flow__footer');
      footer.append(createButton({
        label: snapshot.activeStep === form.steps.length - 1 ? 'Завершить заполнение' : 'Подтвердить и продолжить',
        variant: 'primary',
        icon: icon(snapshot.activeStep === form.steps.length - 1 ? 'check' : 'chevron-right', 18),
        iconPosition: 'end',
        onClick: moveForward,
      }));
      view.append(footer);
    }
    return view;
  }

  function renderSummary(snapshot) {
    const summary = el('div', 'stand-lego-summary');
    const header = el('header', 'stand-lego-summary__header');
    const titleGroup = el('div', 'stand-lego-summary__title-group');
    const titleLine = el('div', 'stand-lego-summary__title-line');
    titleLine.append(el('h1', 'stand-lego-summary__title', form.summaryTitle));
    const status = el('span', 'stand-lego-summary__status');
    status.append(el('span', 'stand-lego-summary__status-dot'), document.createTextNode('Печатная форма сформирована'));
    titleLine.append(status);
    titleGroup.append(titleLine, el('p', 'stand-lego-summary__subtitle', form.summarySubtitle));
    const actions = el('div', 'stand-lego-summary__header-actions');
    actions.append(
      createButton({ label: 'Верифицировать', variant: 'outlined', onClick: () => onNotice?.('Документ отправлен на верификацию') }),
      createButton({ label: 'Скачать', variant: 'primary', onClick: () => onNotice?.('Печатная форма подготовлена к скачиванию') }),
    );
    if (onClose) actions.append(createButton({ label: 'Закрыть', ariaLabel: 'Закрыть сводку Lego', variant: 'text', size: 'small', icon: icon('close'), iconOnly: true, onClick: onClose }));
    header.append(titleGroup, actions);

    const body = el('div', 'stand-lego-summary__body');
    const scroll = el('div', 'stand-lego-summary__scroll');
    const content = el('div', 'stand-lego-summary__content');
    const intro = el('div', 'stand-lego-summary__intro');
    intro.append(el('p', 'stand-lego-summary__eyebrow', 'Результат заполнения'), el('h2', '', 'Данные по этапам'), el('p', '', 'Проверьте значения перед сохранением документа. Каждый блок соответствует одному завершённому этапу.'));
    content.append(intro);
    form.summarySections.forEach(sectionDefinition => {
      const card = el('section', 'stand-lego-summary-card');
      const cardTitle = el('h3', 'stand-lego-summary-card__title', sectionDefinition.title);
      cardTitle.id = `stand-lego-summary-${sectionDefinition.id}`;
      card.setAttribute('aria-labelledby', cardTitle.id);
      card.append(cardTitle);
      const list = el('dl', 'stand-lego-summary-card__grid');
      const sectionValues = snapshot.values[sectionDefinition.id];
      sectionDefinition.fields.forEach(field => {
        const cell = el('div', 'stand-lego-summary-card__cell');
        cell.append(
          el('dt', 'stand-lego-summary-card__label', field.label),
          el('dd', 'stand-lego-summary-card__value', formatSummaryValue(form, sectionDefinition.id, field.key, sectionValues[field.key], sectionValues)),
        );
        list.append(cell);
      });
      card.append(list);
      content.append(card);
    });
    scroll.append(content);

    const aside = el('aside', 'stand-lego-summary__aside');
    aside.setAttribute('aria-label', 'Действия со сводкой');
    const asideCopy = el('div', 'stand-lego-summary__aside-copy');
    asideCopy.append(
      el('p', 'stand-lego-summary__eyebrow', 'Финальная проверка'),
      el('h2', '', 'Сводка готова к проверке'),
      el('p', '', 'Сверьте параметры слева. Если всё верно, сохраните сформированный документ в текущий пакет. Для исправления данных вернитесь к этапам.'),
    );
    const asideActions = el('div', 'stand-lego-summary__aside-actions');
    asideActions.append(
      createButton({ label: 'Сохранить документ', variant: 'primary', onClick: () => onComplete?.({ values: snapshot.values, documentTitle }) }),
      createButton({ label: 'Вернуться к редактированию', variant: 'outlined', onClick: () => { state.returnToEdit(); render(); onStateChange?.(state.getSnapshot()); } }),
    );
    const illustration = el('img', 'stand-lego-summary__illustration');
    illustration.src = new URL('../../assets/summary-review-illustration.png', import.meta.url).href;
    illustration.alt = 'Проверка сформированного документа';
    const note = el('p', 'stand-lego-summary__note', 'После сохранения документ появится в выбранном пакете и сохранит связь с Lego-шаблоном.');
    aside.append(asideCopy, asideActions, illustration, note);
    body.append(scroll, aside);
    summary.append(header, body);
    return summary;
  }

  function renderEmbedded(snapshot) {
    const wrapper = el('div', 'stand-lego-embedded');
    const header = el('div', 'stand-accordion__header');
    const toggle = el('button', 'stand-accordion__toggle');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'true');
    const chevron = el('span', 'stand-lego-embedded__chevron', '⌄');
    toggle.append(chevron, el('h2', 'stand-accordion__title', form.title));
    header.append(toggle);
    const content = el('div', 'stand-lego-embedded__content');
    content.append(createStageRail(snapshot));
    const step = form.steps[snapshot.activeStep];
    const stepCopy = el('div', 'stand-lego-flow__step-copy');
    stepCopy.append(el('h3', 'stand-lego-flow__step-title', step.label), el('p', 'stand-lego-flow__step-description', step.description));
    const surface = el('section', 'stand-lego-surface');
    const fields = el('div', 'stand-lego-fields');
    renderStepFields(fields, snapshot);
    surface.append(fields);
    content.append(stepCopy, surface);
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
      chevron.classList.toggle('is-collapsed', expanded);
    });
    wrapper.append(header, content);
    return wrapper;
  }

  function render() {
    const snapshot = state.getSnapshot();
    element.replaceChildren(
      standalone
        ? (snapshot.view === 'summary' ? renderSummary(snapshot) : renderForm(snapshot))
        : renderEmbedded(snapshot),
    );
  }

  render();
  return {
    element,
    refresh: render,
    focus() {
      element.querySelector('input, select, textarea, button')?.focus({ preventScroll: true });
    },
  };
}
