import { createButton } from './button.js';

let drawerSequence = 0;
const OPEN_DRAWERS = [];
let modalLockCount = 0;
let previousBodyOverflow = '';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(element) {
  return Array.from(element.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(control => !control.hidden && control.getAttribute('aria-hidden') !== 'true');
}

function lockDocumentScroll() {
  if (modalLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  modalLockCount += 1;
}

function unlockDocumentScroll() {
  modalLockCount = Math.max(0, modalLockCount - 1);
  if (modalLockCount === 0) document.body.style.overflow = previousBodyOverflow;
}

export function createDrawer({
  id = `ds-drawer-${++drawerSequence}`,
  title,
  content,
  footer,
  expanded = false,
  placement = 'right',
  modal = true,
  showOverlay = modal,
  focusOnOpen = true,
  closeOnOverlay = showOverlay,
  closeOnEscape = true,
  closeLabel = 'Закрыть панель',
  onOpen,
  onClose,
} = {}) {
  if (!['right', 'bottom'].includes(placement)) {
    throw new Error(`Unknown drawer placement: ${placement}`);
  }

  const overlay = document.createElement('div');
  overlay.className = 'ds-drawer-overlay';

  const element = document.createElement('aside');
  element.id = id;
  element.className = `ds-drawer ds-drawer--${placement}${expanded ? ' is-expanded' : ''}`;
  element.setAttribute('role', 'dialog');
  element.setAttribute('aria-modal', String(modal));
  element.setAttribute('aria-hidden', 'true');
  element.tabIndex = -1;

  const header = document.createElement('header');
  header.className = 'ds-drawer__header';
  const headerPane = document.createElement('div');
  headerPane.className = 'ds-drawer__header-pane ds-drawer__header-pane--full';
  const heading = document.createElement('h2');
  heading.className = 'ds-drawer__title';
  heading.id = `${id}-title`;
  heading.textContent = title || '';
  element.setAttribute('aria-labelledby', heading.id);
  const closeButton = createButton({ label: 'Закрыть', variant: 'text', size: 'small', ariaLabel: closeLabel });
  headerPane.append(heading, closeButton);
  header.append(headerPane);

  const body = document.createElement('div');
  body.className = 'ds-drawer__content';
  if (content instanceof Node) body.append(content);

  element.append(header, body);
  if (footer instanceof Node) {
    const footerElement = document.createElement('footer');
    footerElement.className = 'ds-drawer__footer';
    footerElement.append(footer);
    element.append(footerElement);
  }

  let returnFocus = null;
  let opened = false;

  const open = trigger => {
    if (opened) return;
    opened = true;
    returnFocus = trigger || document.activeElement;
    if (showOverlay) overlay.classList.add('is-active');
    element.classList.add('is-active');
    element.setAttribute('aria-hidden', 'false');
    OPEN_DRAWERS.push(api);
    if (modal) lockDocumentScroll();
    if (focusOnOpen) {
      window.requestAnimationFrame(() => {
        const [firstControl] = getFocusableElements(element);
        (firstControl || element).focus({ preventScroll: true });
      });
    }
    onOpen?.();
  };

  const close = ({ restoreFocus = true } = {}) => {
    if (!opened) return;
    opened = false;
    overlay.classList.remove('is-active');
    element.classList.remove('is-active');
    element.setAttribute('aria-hidden', 'true');
    const drawerIndex = OPEN_DRAWERS.lastIndexOf(api);
    if (drawerIndex >= 0) OPEN_DRAWERS.splice(drawerIndex, 1);
    if (modal) unlockDocumentScroll();
    if (restoreFocus) returnFocus?.focus?.({ preventScroll: true });
    onClose?.();
  };

  const handleKeydown = event => {
    if (!opened || OPEN_DRAWERS.at(-1) !== api) return;
    const activeNativeModal = document.querySelector('dialog[open]');
    if (activeNativeModal && !element.contains(activeNativeModal)) return;
    if (event.key === 'Tab' && modal) {
      const controls = getFocusableElements(element);
      if (controls.length === 0) {
        event.preventDefault();
        element.focus({ preventScroll: true });
        return;
      }
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  };

  closeButton.addEventListener('click', close);
  if (closeOnOverlay) overlay.addEventListener('click', close);
  document.addEventListener('keydown', handleKeydown);

  const api = {
    element,
    overlay,
    open,
    close,
    isOpen() {
      return opened;
    },
    mount(target = document.body) {
      if (showOverlay) target.append(overlay);
      target.append(element);
    },
    destroy() {
      close({ restoreFocus: false });
      document.removeEventListener('keydown', handleKeydown);
      overlay.remove();
      element.remove();
    },
  };

  return api;
}
