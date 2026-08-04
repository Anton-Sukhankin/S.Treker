import { createFieldShell, setAttributes } from './dom.js';

let selectSequence = 0;

export function createSelect({
  id = `ds-select-${++selectSequence}`,
  label,
  description,
  options = [],
  value = '',
  placeholder,
  required = false,
  disabled = false,
  attributes = {},
  onChange,
} = {}) {
  const shell = createFieldShell({ id, label, description, required });
  const select = document.createElement('select');
  select.id = id;
  select.className = 'ds-select';
  select.required = required;
  select.disabled = disabled;
  setAttributes(select, attributes);

  if (placeholder) {
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = required;
    select.append(placeholderOption);
  }

  options.forEach(option => {
    const optionElement = document.createElement('option');
    const normalized = typeof option === 'object' ? option : { value: option, label: option };
    optionElement.value = normalized.value;
    optionElement.textContent = normalized.label;
    optionElement.disabled = Boolean(normalized.disabled);
    select.append(optionElement);
  });
  select.value = value;

  if (shell.descriptionElement) {
    select.setAttribute('aria-describedby', shell.descriptionElement.id);
  }
  shell.element.append(select);
  if (shell.descriptionElement) shell.element.append(shell.descriptionElement);
  if (onChange) select.addEventListener('change', event => onChange(event.target.value, event));

  return {
    element: shell.element,
    select,
    setValue(nextValue) {
      select.value = nextValue ?? '';
    },
  };
}
