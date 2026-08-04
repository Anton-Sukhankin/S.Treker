import { createInput, createSelect } from '../../ui/components/index.js';

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function createChevron() {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 20 20');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '1.7');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.classList.add('task-icon', 'task-icon--chevron');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm5 7.5 5 5 5-5');
  icon.append(path);
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function createSourceLimitedState(title, detail, observedValue) {
  const box = el('div', 'stand-source-limited');
  box.append(el('span', 'stand-source-limited__tag', 'Состав требует уточнения'));
  box.append(el('h4', 'stand-source-limited__title', title));
  box.append(el('p', 'stand-source-limited__text', detail));
  if (observedValue) box.append(el('p', 'stand-source-limited__observed', `Наблюдавшееся значение: ${observedValue}`));
  return box;
}

export function createLegoDocumentForm({ form, state, onStateChange } = {}) {
  const element = el('section', 'stand-lego-form stand-accordion');
  const header = el('div', 'stand-accordion__header');
  const toggle = el('button', 'stand-accordion__toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', 'task-steps-content');
  const chevron = createChevron();
  const heading = el('h2', 'stand-accordion__title', form.title);
  toggle.append(chevron, heading);
  const progress = el('span', 'stand-progress-tag');
  header.append(toggle, progress);

  const content = el('div', 'stand-lego-form__content');
  content.id = 'task-steps-content';
  const steps = el('ol', 'stand-stage-grid');
  const formCard = el('div', 'stand-active-step');
  content.append(steps, formCard);
  element.append(header, content);

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    content.hidden = expanded;
    chevron.classList.toggle('is-collapsed', expanded);
  });

  const changed = (name, value, { rerender = false } = {}) => {
    state.setDraftValue(name, value);
    if (rerender) render();
    onStateChange?.();
  };

  function renderNeed(values) {
    const subject = createInput({
      id: 'task-form-contract-subject',
      label: 'Предмет договора',
      required: true,
      value: values.contractSubject,
      placeholder: 'Опишите предмет договора',
      onInput: value => changed('contractSubject', value),
    });
    const object = createSelect({
      id: 'task-form-construction-object',
      label: 'Объект строительства (справочник)',
      required: true,
      value: values.constructionObject,
      placeholder: 'Выберите значение',
      options: form.constructionObjects,
      onChange: value => changed('constructionObject', value),
    });
    formCard.append(subject.element, object.element);
  }

  function renderBudget(values) {
    const title = el('h3', 'stand-active-step__title', 'Стоимость и бюджет');
    const amount = createInput({
      id: 'task-form-amount',
      label: 'Сумма',
      required: true,
      value: values.amount,
      placeholder: 'Введите сумму',
      attributes: { inputmode: 'decimal' },
      onInput: value => changed('amount', value),
    });
    const vatRow = el('div', 'stand-switch-row');
    const vatLabel = el('span', 'stand-switch-row__label');
    vatLabel.append('Сумма включает НДС ', el('span', 'stand-required', '*'));
    const vat = el('button', 'stand-switch');
    vat.type = 'button';
    vat.setAttribute('role', 'switch');
    vat.setAttribute('aria-checked', String(values.vatIncluded));
    vat.setAttribute('aria-label', 'Сумма включает НДС');
    vat.classList.toggle('is-on', values.vatIncluded);
    vat.append(el('span', 'stand-switch__thumb'));
    vat.addEventListener('click', () => changed('vatIncluded', !values.vatIncluded, { rerender: true }));
    vatRow.append(vatLabel, vat);
    formCard.append(title, amount.element, vatRow);
    if (values.vatIncluded) {
      const rate = createInput({
        id: 'task-form-vat-rate',
        label: 'Ставка НДС',
        required: true,
        value: values.vatRate,
        placeholder: 'Введите ставку НДС',
        attributes: { inputmode: 'decimal' },
        onInput: value => changed('vatRate', value),
      });
      formCard.append(rate.element);
    }
    const currency = createSelect({
      id: 'task-form-currency',
      label: 'Валюта (справочник)',
      required: true,
      value: values.currency,
      placeholder: 'Выберите значение',
      options: form.currencies,
      onChange: value => changed('currency', value),
    });
    formCard.append(currency.element);
    ['ЦФО (справочник)', 'Статья оборотов', 'БЮ (справочник)'].forEach((label, index) => {
      formCard.append(createSelect({
        id: `task-form-source-limited-${index}`,
        label,
        required: true,
        disabled: true,
        placeholder: 'Значения справочника не зафиксированы',
        options: [],
      }).element);
    });
    formCard.append(el('p', 'stand-source-note', 'Недоступные справочники показаны в составе шага, но не участвуют в демонстрационной валидации до уточнения значений.'));
  }

  function render() {
    const snapshot = state.getSnapshot();
    progress.textContent = `Шаг ${snapshot.activeStep + 1} из ${form.steps.length}`;
    steps.replaceChildren();
    form.steps.forEach((step, index) => {
      const completed = snapshot.completedSteps.includes(index);
      const active = snapshot.activeStep === index;
      const available = index <= snapshot.highestUnlockedStep || completed;
      const item = el('li', 'stand-stage-grid__item');
      const button = el('button', 'stand-stage-card');
      button.type = 'button';
      button.disabled = !available;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-complete', completed);
      if (active) button.setAttribute('aria-current', 'step');
      button.setAttribute('aria-label', `Шаг ${index + 1}: ${step.label}`);
      const marker = el('span', 'stand-stage-card__marker', completed ? '✓' : String(index + 1));
      const copy = el('span', 'stand-stage-card__copy');
      copy.append(
        el('span', 'stand-stage-card__title', step.label),
        el('span', 'stand-stage-card__state', active ? 'Текущий этап' : completed ? 'Этап подтверждён' : available ? 'Доступен' : 'Будет доступен позже'),
      );
      button.append(marker, copy);
      button.addEventListener('click', () => {
        state.selectStep(index);
        render();
        onStateChange?.();
      });
      item.append(button);
      steps.append(item);
    });

    formCard.replaceChildren();
    const step = form.steps[snapshot.activeStep];
    if (snapshot.activeStep === 0) renderNeed(snapshot.values);
    else if (snapshot.activeStep === 1) formCard.append(createSourceLimitedState(
      'Поля этапа «Контрагент» не перечислены в доступных материалах',
      'Навигация и состояние этапа реализованы. Атрибуты и значения справочников будут добавлены после появления подтверждённого источника.',
    ));
    else if (snapshot.activeStep === 2) renderBudget(snapshot.values);
    else if (snapshot.activeStep === 3) formCard.append(createSourceLimitedState(
      'Поля этапа «Условия оплаты» не перечислены в доступных материалах',
      'Этап участвует в последовательности и сохраняет статус. Поля, обязательность и справочные значения не добавляются без подтверждённого референса.',
    ));
    else formCard.append(createSourceLimitedState(
      'Для этапа подтверждён только контекст сроков и формата',
      'Полный атрибутивный состав отсутствует в доступных кадрах и транскрипции.',
      step.observedValue,
    ));
  }

  render();
  return { element, refresh: render };
}
