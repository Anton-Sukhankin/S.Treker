import './shared-styles.js';

import { createNotImplementedSection, createPrototypeShell } from '../shell/index.js';

const mount = document.querySelector('#section-prototype');
if (!mount) throw new Error('Не найден контейнер прототипа раздела «Шаблоны документов».');

const section = createNotImplementedSection(
  'Шаблоны документов',
  'Отдельная точка запуска подготовлена. Интерфейс будет реализован по спецификации раздела «Шаблоны документов».',
);
const shell = createPrototypeShell({
  title: 'Шаблоны документов',
  content: section.element,
  activeSection: 'document-templates',
});

mount.replaceChildren(shell.element);
