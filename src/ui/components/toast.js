import { createButton } from './button.js';

export function createToast({ duration = 3000 } = {}) {
  const element = document.createElement('div');
  element.className = 'ds-toast';
  element.setAttribute('role', 'status');
  element.setAttribute('aria-live', 'polite');
  element.setAttribute('aria-atomic', 'true');

  const content = document.createElement('div');
  content.className = 'ds-toast__content';
  const titleElement = document.createElement('strong');
  titleElement.className = 'ds-toast__title';
  const messageElement = document.createElement('span');
  messageElement.className = 'ds-toast__message';
  const closeButton = createButton({ label: 'Закрыть', variant: 'text', size: 'small', ariaLabel: 'Закрыть уведомление', className: 'ds-toast__close' });
  content.append(titleElement, messageElement);
  element.append(content, closeButton);

  let timeoutId = null;
  const hide = () => {
    window.clearTimeout(timeoutId);
    element.classList.remove('is-active');
  };
  const show = ({ title = '', message = '' } = {}) => {
    window.clearTimeout(timeoutId);
    titleElement.textContent = title;
    titleElement.hidden = !title;
    messageElement.textContent = message;
    element.classList.add('is-active');
    if (duration > 0) timeoutId = window.setTimeout(hide, duration);
  };
  closeButton.addEventListener('click', hide);

  return { element, show, hide };
}
