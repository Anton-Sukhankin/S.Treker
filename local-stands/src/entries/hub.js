import './shared-styles.js';

import { createStandHub } from '../shell/index.js';

const mount = document.querySelector('#local-stands-hub');
if (!mount) throw new Error('Не найден контейнер каталога локальных прототипов.');

const hub = createStandHub({
  prototypes: [
    {
      title: 'Задачи',
      description: 'Точка входа в карточку задачи, правый drawer и встроенная Lego-форма.',
      href: './tasks/',
      status: 'Реализован первый срез',
    },
    {
      title: 'Документы',
      description: 'Дерево пакетов, список с пагинацией и немодальная детальная карточка документа.',
      href: './documents/',
      status: 'Реализован первый срез',
    },
    {
      title: 'Шаблоны документов',
      description: 'Будущий прототип каталога и первоначальной настройки Lego-шаблона.',
      href: './document-templates/',
      status: 'Подготовлена точка запуска',
    },
  ],
});

mount.replaceChildren(hub.element);
