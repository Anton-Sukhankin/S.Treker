export function appendContent(target, content) {
  if (content === undefined || content === null) return;

  if (content instanceof Node) {
    target.append(content);
    return;
  }

  target.append(document.createTextNode(String(content)));
}

export function setAttributes(element, attributes = {}) {
  Object.entries(attributes).forEach(([name, value]) => {
    if (value === undefined || value === null || value === false) return;
    element.setAttribute(name, value === true ? '' : String(value));
  });
}

export function createFieldShell({ id, label, description, required = false }) {
  const element = document.createElement('div');
  element.className = 'ds-field';

  if (label) {
    const labelElement = document.createElement('label');
    labelElement.className = 'ds-field__label';
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    if (required) {
      const marker = document.createElement('span');
      marker.className = 'ds-field__required';
      marker.textContent = ' *';
      marker.setAttribute('aria-hidden', 'true');
      labelElement.append(marker);
    }
    element.append(labelElement);
  }

  let descriptionElement = null;
  if (description) {
    descriptionElement = document.createElement('div');
    descriptionElement.className = 'ds-field__description';
    descriptionElement.id = `${id}-description`;
    descriptionElement.textContent = description;
  }

  const errorElement = document.createElement('div');
  errorElement.className = 'ds-field__error';
  errorElement.id = `${id}-error`;
  errorElement.hidden = true;

  return { element, descriptionElement, errorElement };
}
