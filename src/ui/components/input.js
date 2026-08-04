import { createFieldShell, setAttributes } from './dom.js';

let inputSequence = 0;

export function createInput({
  id = `ds-input-${++inputSequence}`,
  label,
  description,
  error,
  value = '',
  placeholder = '',
  type = 'text',
  required = false,
  disabled = false,
  readOnly = false,
  attributes = {},
  onInput,
  onChange,
} = {}) {
  const shell = createFieldShell({ id, label, description, required });
  const input = document.createElement('input');
  input.id = id;
  input.className = 'ds-input';
  input.type = type;
  input.value = value;
  input.placeholder = placeholder;
  input.required = required;
  input.disabled = disabled;
  input.readOnly = readOnly;
  setAttributes(input, attributes);

  if (shell.descriptionElement) {
    input.setAttribute('aria-describedby', shell.descriptionElement.id);
  }

  shell.element.append(input);
  if (shell.descriptionElement) shell.element.append(shell.descriptionElement);
  shell.element.append(shell.errorElement);

  const setError = message => {
    const hasError = Boolean(message);
    input.setAttribute('aria-invalid', String(hasError));
    shell.element.classList.toggle('has-error', hasError);
    shell.errorElement.hidden = !hasError;
    shell.errorElement.textContent = message || '';
    const describedBy = [
      shell.descriptionElement?.id,
      hasError ? shell.errorElement.id : null,
    ].filter(Boolean).join(' ');
    if (describedBy) input.setAttribute('aria-describedby', describedBy);
  };

  setError(error);
  if (onInput) input.addEventListener('input', event => onInput(event.target.value, event));
  if (onChange) input.addEventListener('change', event => onChange(event.target.value, event));

  return {
    element: shell.element,
    input,
    setValue(nextValue) {
      input.value = nextValue ?? '';
    },
    setError,
  };
}
