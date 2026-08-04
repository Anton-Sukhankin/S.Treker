import { createCheckbox } from './checkbox.js';

let multiSelectSequence = 0;

export function createMultiSelect({
  id = `ds-multi-select-${++multiSelectSequence}`,
  label,
  placeholder = 'Выберите значения',
  options = [],
  values = [],
  disabled = false,
  onChange,
} = {}) {
  const element = document.createElement('div');
  element.className = 'ds-multi-select';

  const trigger = document.createElement('button');
  trigger.id = id;
  trigger.type = 'button';
  trigger.className = 'ds-multi-select__control';
  trigger.disabled = disabled;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-haspopup', 'true');
  if (label) trigger.setAttribute('aria-label', label);

  const tags = document.createElement('span');
  tags.className = 'ds-multi-select__tags';
  trigger.append(tags);

  const dropdown = document.createElement('div');
  dropdown.className = 'ds-multi-select__dropdown';
  dropdown.setAttribute('role', 'group');
  if (label) dropdown.setAttribute('aria-label', label);

  let selected = new Set(values);
  const renderTags = () => {
    tags.replaceChildren();
    if (selected.size === 0) {
      const placeholderElement = document.createElement('span');
      placeholderElement.className = 'ds-multi-select__placeholder';
      placeholderElement.textContent = placeholder;
      tags.append(placeholderElement);
      return;
    }

    const selectedLabels = options
      .filter(option => selected.has(typeof option === 'object' ? option.value : option))
      .map(option => typeof option === 'object' ? option.label : option);
    const firstTag = document.createElement('span');
    firstTag.className = 'ds-multi-select__tag';
    firstTag.textContent = selectedLabels[0];
    tags.append(firstTag);

    if (selectedLabels.length > 1) {
      const counter = document.createElement('span');
      counter.className = 'ds-multi-select__tag';
      counter.textContent = `+${selectedLabels.length - 1}`;
      tags.append(counter);
    }
  };

  const emitChange = event => onChange?.(Array.from(selected), event);
  options.forEach(option => {
    const normalized = typeof option === 'object' ? option : { value: option, label: option };
    const checkbox = createCheckbox({
      label: normalized.label,
      value: normalized.value,
      checked: selected.has(normalized.value),
      disabled: Boolean(normalized.disabled),
      onChange: (checked, event) => {
        if (checked) selected.add(normalized.value);
        else selected.delete(normalized.value);
        renderTags();
        emitChange(event);
      },
    });
    checkbox.element.classList.add('ds-multi-select__option');
    dropdown.append(checkbox.element);
  });

  const setOpen = open => {
    element.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) dropdown.querySelector('input:not(:disabled)')?.focus();
  };
  trigger.addEventListener('click', event => {
    event.stopPropagation();
    setOpen(!element.classList.contains('is-open'));
  });
  dropdown.addEventListener('click', event => event.stopPropagation());

  const handleDocumentClick = () => setOpen(false);
  const handleKeydown = event => {
    if (event.key === 'Escape' && element.classList.contains('is-open')) {
      setOpen(false);
      trigger.focus();
    }
  };
  document.addEventListener('click', handleDocumentClick);
  element.addEventListener('keydown', handleKeydown);

  element.append(trigger, dropdown);
  renderTags();

  return {
    element,
    trigger,
    getValues: () => Array.from(selected),
    setValues(nextValues = []) {
      selected = new Set(nextValues);
      dropdown.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = selected.has(input.value);
      });
      renderTags();
    },
    setOpen,
    destroy() {
      document.removeEventListener('click', handleDocumentClick);
    },
  };
}
