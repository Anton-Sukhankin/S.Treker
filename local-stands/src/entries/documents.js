import './shared-styles.js';
import '../styles/documents-workspace.css';

import { createPrototypeShell } from '../shell/index.js';
import { createDocumentsSection } from '../sections/documents/index.js';

const mount = document.querySelector('#section-prototype');
if (!mount) throw new Error('Не найден контейнер прототипа раздела «Документы».');

const section = createDocumentsSection();
const shell = createPrototypeShell({
  title: 'Документы',
  content: section.element,
  activeSection: 'documents',
});

mount.replaceChildren(shell.element);
section.mount();
