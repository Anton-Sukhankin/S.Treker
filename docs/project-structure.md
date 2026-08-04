# Структура проекта S-Tracker

Этот документ описывает физическую структуру текущего прототипа S-Tracker: где находятся исходники, документация, данные, стили, публичные ресурсы и результат сборки.

Документ не заменяет:

- `docs/components/README.md` - карту интерфейсных компонентов;
- `docs/component-code-map.md` - связь компонентов с файлами реализации;
- `docs/agent-context-routing.md` - маршрут выбора контекста для AI-агента и субагентов.

## Дерево проекта

```text
S-Tracker/
├─ index.html
├─ src/
│  ├─ main.js
│  ├─ data/
│  │  ├─ task-model.js
│  │  ├─ mock-tasks.js
│  │  ├─ attributes.js
│  │  ├─ statuses.js
│  │  ├─ task-statuses.js
│  │  └─ users.js
│  ├─ domain/
│  │  ├─ columns.js
│  │  ├─ filters.js
│  │  ├─ grouping.js
│  │  ├─ pagination.js
│  │  ├─ state.js
│  │  └─ task-selectors.js
│  ├─ features/
│  │  ├─ columns/
│  │  ├─ filters/
│  │  ├─ grouping/
│  │  ├─ pagination/
│  │  ├─ search/
│  │  │  └─ runtime/
│  │  │     ├─ data/
│  │  │     ├─ domain/
│  │  │     └─ ui/
│  │  ├─ sidebar/
│  │  ├─ task-selection/
│  │  └─ tasks/
│  ├─ ui/
│  │  ├─ basic-controls.js
│  │  ├─ empty-state.js
│  │  ├─ icons.js
│  │  └─ toast.js
│  └─ styles/
│     ├─ main.css
│     ├─ base/
│     ├─ components/
│     ├─ features/
│     ├─ layout/
│     ├─ overrides/
│     └─ patterns/
├─ docs/
│  ├─ README.md
│  ├─ project-structure.md
│  ├─ agent-context-routing.md
│  ├─ documentation-standards.md
│  ├─ documentation-standards-audit.md
│  ├─ component-code-map.md
│  ├─ glossary.md
│  ├─ components/
│  │  ├─ README.md
│  │  ├─ app-header/
│  │  ├─ search-workspace/
│  │  ├─ documents-list/
│  │  ├─ document-bulk-actions/
│  │  ├─ document-package-selector/
│  │  ├─ document-relations-drawer/
│  │  ├─ search-filters/
│  │  ├─ search-filter-templates/
│  │  ├─ document-column-settings/
│  │  ├─ filters/
│  │  ├─ toolbar/
│  │  ├─ left-navigation/
│  │  ├─ queues/
│  │  ├─ tasks/
│  │  ├─ column-settings/
│  │  │  ├─ README.md
│  │  │  ├─ attribute-library/
│  │  │  └─ presets/
│  │  ├─ bulk-actions/
│  │  └─ pagination/
│  ├─ entities/
│  ├─ subagents/
│  ├─ templates/
│  └─ user-flows/
├─ skills/
│  ├─ component-spec-audit/
│  └─ frontend-code-audit/
├─ public/
│  └─ avatars/
├─ assets/
│  └─ avatar-originals/
├─ local-stands/
│  ├─ open-local-stand.cmd
│  ├─ start-local-stands.cmd
│  ├─ tasks/
│  │  ├─ index.html
│  │  └─ open.cmd
│  ├─ documents/
│  │  ├─ index.html
│  │  └─ open.cmd
│  └─ document-templates/
│     ├─ index.html
│     └─ open.cmd
├─ dist/
├─ node_modules/
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ PROJECT-OVERVIEW.md
├─ AGENTS.md
```

## Назначение веток

| Ветка | Роль в проекте | Как использовать |
|---|---|---|
| `index.html` | Статическая разметка страницы и точка подключения `/src/main.js`. | Проверять при изменении корневого DOM, точек монтирования или порядка подключений. |
| `src/` | Рабочий код прототипа. | Основные изменения функциональности, поведения и внешнего вида выполняются здесь. |
| `docs/` | Спецификация интерфейса, поведения, состояния, пользовательских путей и правил работы агента. | Использовать как продуктовый источник перед изменением кода или генерацией интерфейса. |
| `skills/` | Проектные исходники Codex skills, связанные с методологией работы над S-Tracker. | Редактировать как источник методики; установленную рабочую копию синхронизировать в папку Codex skills, если skill должен быть доступен Codex как системный. |
| `public/` | Публичные ресурсы, доступные приложению без обработки сборщиком. | Использовать для оптимизированных ассетов, которые нужны интерфейсу во время работы. |
| `assets/` | Исходные ресурсы, которые сохранены для будущей обработки или замены. | Не использовать как основной runtime-источник, если ресурс уже подготовлен в `public/`. |
| `local-stands/` | Независимые Vite-стенды разделов и launchers для их открытия в браузере. | Двойной клик по `open.cmd` внутри раздела запускает или переиспользует локальный сервер и открывает URL этого раздела. |
| `dist/` | Результат сборки. | Не править вручную. Пересоздается командой сборки. |
| `node_modules/` | Установленные зависимости. | Не править вручную. Восстанавливается через пакетный менеджер. |

## Рабочий код

`src/main.js` инициализирует состояние приложения и подключает поведение после загрузки страницы.

### `src/data/`

Хранит данные и справочники прототипа.

Ключевой файл: `src/data/task-model.js`. Он является главным источником модели задач, бизнес-доменов, очередей, атрибутов и значений.

### `src/domain/`

Хранит правила выборки, фильтрации, колонок, пагинации, группировки и сборки строк таблицы.

Этот слой нужен, чтобы UI не придумывал данные и правила самостоятельно.

### `src/features/`

Хранит поведение крупных продуктовых областей:

- `features/tasks/tasks-view.js` - карточный и табличный список задач, счетчики, строки и карточки;
- `features/sidebar/sidebar.js` - левая навигация, счетчики, бизнес-домены, группы и закладки;
- `features/filters/` - дровер фильтров и мультиселекты;
- `features/columns/columns-drawer.js` - настройки колонок, библиотека атрибутов и пресеты;
- `features/task-selection/floating-action-bar.js` - выбор задач и массовые действия;
- `features/pagination/pagination-controls.js` - элементы пагинации;
- `features/search/search-section.js` - переключение верхних разделов `Задачи` / `Поиск` и показ рабочей области документного поиска;
- `features/search/runtime/` - данные, domain-логика, UI-модули и контроллер документного поиска;
- `features/grouping/grouping-controls.js` - действия группировки в заголовке таблицы.

## Документный поиск

Mock-данные документов находятся в `src/features/search/runtime/db.js`. Они принадлежат только разделу `Поиск` и не входят в общий слой `src/data/`, потому что текущий прототип не объединяет модель документов с моделью задач.

| Ветка | Роль |
|---|---|
| `index.html` | Содержит `#js-esm-search-section` и разметку рабочей области поиска документов. |
| `src/features/search/search-section.js` | Переключает `Задачи` / `Поиск`, закрывает task-слои перед входом в поиск и показывает рабочую область поиска. |
| `src/features/search/runtime/db.js` | Изолированные mock-данные документов и связей для раздела `Поиск`. |
| `src/features/search/runtime/data/search-model.js` | Дерево пакетов, типы документов и базовая конфигурация колонок. |
| `src/features/search/runtime/domain/packages.js` | Чистые функции дерева пакетов. |
| `src/features/search/runtime/domain/filtering.js` | Чистые функции проверки документа по условиям фильтрации и поиска связанных документов. |
| `src/features/search/runtime/domain/table-view.js` | Чистые функции сортировки, дат и разбиения таблицы на страницы. |
| `src/features/search/runtime/ui/lucide-fallback.js` | Локальный fallback иконок. |
| `src/features/search/runtime/ui/documents-table.js` | UI-рендер строк таблицы документов, чекбоксов выбора, индикаторов и меню строки. |
| `src/features/search/runtime/ui/document-selection.js` | Выбранный набор документов, счетчик и видимость плавающей панели действий. |
| `src/features/search/runtime/ui/document-package-selector.js` | Дерево выбора пакетов в модальном окне добавления выбранных документов в пакет. |
| `src/features/search/runtime/ui/document-bulk-actions.js` | Обработчики кнопок массовой панели и модального окна добавления в пакет. |
| `src/features/search/runtime/ui/document-relations-drawer.js` | Правый дровер связей документа, таблица связей, вложенная навигация и действия строк. |
| `src/features/search/runtime/ui/search-filters.js` | Сбор условий поиска документов, сброс значений фильтров и состояние фильтров для шаблонов. |
| `src/features/search/runtime/ui/dynamic-attribute-filters.js` | Дополнительные атрибутные фильтры, значения атрибутов для шаблонов и восстановление атрибутов из шаблона. |
| `src/features/search/runtime/ui/search-filter-templates.js` | Сохранение, чтение и text-safe рендер карточек шаблонов поиска. |
| `src/features/search/runtime/ui/document-column-settings.js` | Правая панель настроек колонок документов, черновик колонок, saved views текущей сессии, закрепление и применение к таблице. |
| `src/features/search/runtime/ui/feedback-overlays.js` | Toast-сообщения для подтверждения действий поиска документов. |
| `src/features/search/runtime/ui/search-calendar.js` | Календарь периода документа и дат в атрибутных фильтрах. |
| `src/features/search/runtime/search-runtime.js` | Основной контроллер поиска документов; связывает feature-модули и не хранит UI-конструктор дополнительных атрибутов. |
| `src/styles/features/search-workspace.css` | Стили рабочей области поиска документов, изолированные внутри `#js-esm-search-section`. |

### `src/ui/`

Хранит небольшие общие UI-помощники и фрагменты, которые используются несколькими feature-модулями.

`src/ui/components/` является общей компонентной базой текущего vanilla/Vite-прототипа. `registry.js` содержит стабильные идентификаторы и потребителей, `index.js` является общей точкой экспорта, а файлы `*.stories.js` показывают реальные состояния компонентов в корневом Storybook. Подробный контракт находится в `docs/component-library.md`.

### `src/styles/`

Хранит CSS, разделенный по ответственности:

- `styles/main.css` - основной файл подключения CSS-слоев;
- `styles/base/tokens.css` - токены и базовые правила страницы;
- `styles/layout/app-shell.css` - оболочка приложения, header, sidebar и основной layout;
- `styles/components/core-ui.css` - переиспользуемые UI-классы;
- `styles/components/component-library.css` - общие состояния и служебная компоновка компонентов и Storybook;
- `styles/patterns/drawers-filters-actions.css` - крупные паттерны вроде дроверов, фильтров и панелей действий;
- `styles/features/task-workspace.css` - стили рабочей области задач;
- `styles/features/task-card-drawer.css` - изолированные стили карточки задачи, её аккордеонов, takeover-режимов и Lego-формы;
- `styles/features/search-workspace.css` - стили рабочей области поиска документов;
- `styles/overrides/user-zone.css` - поздние переопределения, изолированные до нормализации.

## Документация

`docs/` является общей спецификацией для команды, главного AI-агента и субагентов.

| Документ или папка | Роль |
|---|---|
| `docs/README.md` | Верхняя карта документации. |
| `docs/project-structure.md` | Физическая структура проекта и назначение веток. |
| `docs/agent-context-routing.md` | Правила выбора ограниченного пакета контекста для агента и субагентов. |
| `docs/documentation-standards.md` | Нормативный стандарт подготовки документации интерфейса. |
| `docs/documentation-standards-audit.md` | Чекпоинт последней проверки соответствия документации стандарту. |
| `docs/component-code-map.md` | Мост между компонентными спецификациями и файлами реализации. |
| `docs/components/` | Спецификации интерфейсных компонентов. |
| `docs/entities/` | Минимальный словарь общих интерфейсных данных прототипа. |
| `docs/user-flows/` | Сквозные пользовательские пути. |
| `docs/templates/` | Шаблоны создания и аудита документации. |
| `docs/subagents/` | Профили временных субагентов для повторяемых задач с ограниченным контекстом. |
| `docs/glossary.md` | Словарь терминов проекта. |

## Компонентная документация

Актуальная карта компонентов находится в `docs/components/README.md`.

Основные компонентные комплекты:

- `app-header/`;
- `search-workspace/`;
- `documents-list/`;
- `document-bulk-actions/`;
- `document-package-selector/`;
- `document-relations-drawer/`;
- `search-filters/`;
- `search-filter-templates/`;
- `document-column-settings/`;
- `filters/`;
- `toolbar/`;
- `left-navigation/`;
- `queues/`;
- `tasks/`;
- `column-settings/`;
- `bulk-actions/`;
- `pagination/`.

`column-settings/` является родительским компонентным комплексом. Внутри него есть дочерние комплекты:

- `column-settings/presets/`;
- `column-settings/attribute-library/`.

Каждый крупный компонент описывается комплектом:

- `01-structure.md` - структура, зоны, элементы, границы и связи;
- `02-behavior.md` - действия пользователя и реакции интерфейса;
- `03-data-states-rules.md` - данные, состояния, правила, владельцы состояния и контракты.

## Как агенту читать структуру проекта

1. Для общего понимания проекта читать `AGENTS.md`, `PROJECT-OVERVIEW.md`, `docs/README.md` и этот файл.
2. Для выбора ограниченного пакета контекста читать `docs/agent-context-routing.md`.
3. Для интерфейсной задачи читать `docs/components/README.md`, затем комплект конкретного компонента.
4. Для создания нового комплекта документации добавлять `docs/templates/component-template.md`.
5. Для проверки или исправления компонентной документации использовать профиль `docs/subagents/component-documentation-auditor.md` и skill `component-spec-audit`.
6. Для аудита frontend-кода использовать skill `frontend-code-audit`, `docs/component-code-map.md` при необходимости и только релевантные файлы реализации.
7. Для реализации функциональности добавлять `docs/component-code-map.md` и только релевантные файлы `src/`.
8. Не передавать субагенту всю папку `docs/`, всю папку `docs/components/` или все дерево `src/`.

## Что редактировать

| Задача | Где вносить изменения |
|---|---|
| Изменить данные, атрибуты, домены, очереди или значения задач | `src/data/` |
| Изменить правила фильтрации, колонок, пагинации или выборки задач | `src/domain/` |
| Изменить поведение интерфейсной области | `src/features/` |
| Изменить общий UI-фрагмент или helper | `src/ui/` |
| Изменить внешний вид | `src/styles/` |
| Изменить спецификацию компонента | `docs/components/<component>/` |
| Изменить сквозной пользовательский путь | `docs/user-flows/` |
| Изменить общий словарь интерфейсных данных | `docs/entities/` |
| Изменить шаблон создания компонентной спецификации | `docs/templates/component-template.md` |
| Изменить профиль субагента аудита документации | `docs/subagents/component-documentation-auditor.md` |
| Зафиксировать новый результат проверки документации | `docs/documentation-standards-audit.md` |
| Изменить связь компонентов с кодом | `docs/component-code-map.md` |

## Что не редактировать вручную

- `dist/` - результат сборки;
- `node_modules/` - установленные зависимости;
- `.vite/` - служебный кэш Vite, если появляется локально;
- `.npm-cache/` - служебный кэш npm, если появляется локально.

## Команды

- `npm.cmd run dev` - запускает локальный Vite-сервер.
- `npm.cmd run build -- --emptyOutDir` - проверяет production-сборку.

## Правило сохранения поведения

Текущая реализация сохраняет существующую DOM-структуру и CSS-классы, чтобы не ломать рабочие сценарии прототипа.

Перед изменением структуры, классов или расположения логики нужно проверить влияние на:

- список задач и режим `Все задачи`;
- переключение бизнес-доменов;
- статусы над таблицей;
- поиск и фильтры;
- настройки колонок;
- библиотеку атрибутов;
- пресеты колонок;
- массовые действия;
- пагинацию;
- связь данных, фильтров, колонок и таблицы.
