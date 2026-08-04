import { appendContent } from './dom.js';

export function bindSegmentedControl(element, { value, onChange } = {}) {
  const items = Array.from(element.querySelectorAll('.ds-segmented-control__item'));

  const getItemValue = item => item.dataset.value || item.dataset.view || item.dataset.status || '';
  const setValue = nextValue => {
    items.forEach(item => {
      const isActive = getItemValue(item) === nextValue;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
  };

  items.forEach(item => {
    item.type = 'button';
    item.addEventListener('click', event => {
      const nextValue = getItemValue(item);
      setValue(nextValue);
      onChange?.(nextValue, event);
    });
  });

  const initialValue = value || getItemValue(items.find(item => item.classList.contains('is-active'))) || getItemValue(items[0]);
  setValue(initialValue);
  return { element, getValue: () => getItemValue(items.find(item => item.classList.contains('is-active'))), setValue };
}

export function createSegmentedControl({ label, items = [], value, onChange } = {}) {
  const element = document.createElement('div');
  element.className = 'ds-segmented-control';
  element.setAttribute('role', 'group');
  if (label) element.setAttribute('aria-label', label);

  items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'ds-segmented-control__item';
    button.dataset.value = item.value;
    if (item.ariaLabel) button.setAttribute('aria-label', item.ariaLabel);
    if (item.icon) appendContent(button, item.icon);
    if (item.label) appendContent(button, item.label);
    element.append(button);
  });

  return bindSegmentedControl(element, { value, onChange });
}
