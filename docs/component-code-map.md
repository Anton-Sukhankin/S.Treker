# Карта связей компонентов и кода

Этот документ показывает, где находится описание компонента и какие файлы проекта обычно связаны с его работой.

Карта не заменяет спецификацию компонента. Главный источник по интерфейсу находится в `docs/components/<component>/`.

Общие контролы и паттерны находятся в `src/ui/components/`; их реестр и правила подключения описаны в `docs/component-library.md`. Feature-файл остается владельцем продуктовых данных и результата действия, даже если видимый контрол создается общей компонентной базой.

## Как читать

- `Компонент` - пользовательская область интерфейса.
- `Документация` - действующая спецификация компонента.
- `Поведение` - файлы, где чаще всего находится логика.
- `Данные` - файлы, откуда приходят данные или правила.
- `Стили` - файлы, где чаще всего находится внешний вид.

## Действующие спецификации

| Компонент | Документация | Поведение | Данные | Стили |
|---|---|---|---|---|
| Верхняя навигация приложения | `docs/components/app-header/01-structure.md`; `docs/components/app-header/02-behavior.md`; `docs/components/app-header/03-data-states-rules.md` | `src/features/search/search-section.js`, `src/main.js`, `index.html` | Активный раздел хранится в состоянии DOM верхней навигации текущего прототипа | `src/styles/layout/app-shell.css`, `src/styles/components/core-ui.css` |
| Рабочая область поиска | `docs/components/search-workspace/01-structure.md`; `docs/components/search-workspace/02-behavior.md`; `docs/components/search-workspace/03-data-states-rules.md` | `src/features/search/search-section.js`, `src/features/search/runtime/search-runtime.js`, `index.html` | `src/features/search/runtime/db.js`, `src/features/search/runtime/data/search-model.js`, `src/features/search/runtime/domain/packages.js`, `src/features/search/runtime/domain/filtering.js`, `src/features/search/runtime/domain/table-view.js` | `src/styles/layout/app-shell.css`, `src/styles/features/search-workspace.css` |
| Список документов | `docs/components/documents-list/01-structure.md`; `docs/components/documents-list/02-behavior.md`; `docs/components/documents-list/03-data-states-rules.md` | `src/features/search/runtime/ui/documents-table.js`, `src/features/search/runtime/search-runtime.js` | `src/features/search/runtime/db.js`, `src/features/search/runtime/data/search-model.js`, `src/features/search/runtime/domain/filtering.js`, `src/features/search/runtime/domain/table-view.js` | `src/styles/features/search-workspace.css` |
| Массовые действия документов | `docs/components/document-bulk-actions/01-structure.md`; `docs/components/document-bulk-actions/02-behavior.md`; `docs/components/document-bulk-actions/03-data-states-rules.md` | `src/features/search/runtime/ui/document-selection.js`, `src/features/search/runtime/ui/document-bulk-actions.js`, `src/features/search/runtime/search-runtime.js` | `src/features/search/runtime/db.js`, `src/features/search/runtime/data/search-model.js` | `src/styles/features/search-workspace.css` |
| Выбор пакетов документов | `docs/components/document-package-selector/01-structure.md`; `docs/components/document-package-selector/02-behavior.md`; `docs/components/document-package-selector/03-data-states-rules.md` | `src/features/search/runtime/ui/document-package-selector.js`, `src/features/search/runtime/ui/document-bulk-actions.js` | `src/features/search/runtime/data/search-model.js`; выбранный набор документов из `document-bulk-actions` | `src/styles/features/search-workspace.css` |
| Дровер связей документа | `docs/components/document-relations-drawer/01-structure.md`; `docs/components/document-relations-drawer/02-behavior.md`; `docs/components/document-relations-drawer/03-data-states-rules.md` | `src/features/search/runtime/ui/document-relations-drawer.js`, `src/features/search/runtime/search-runtime.js` | `src/features/search/runtime/db.js`, `src/features/search/runtime/data/search-model.js` | `src/styles/features/search-workspace.css` |
| Фильтры поиска документов | `docs/components/search-filters/01-structure.md`; `docs/components/search-filters/02-behavior.md`; `docs/components/search-filters/03-data-states-rules.md` | `src/features/search/runtime/ui/search-filters.js`, `src/features/search/runtime/search-runtime.js` | `src/features/search/runtime/db.js`, `src/features/search/runtime/data/search-model.js`, `src/features/search/runtime/domain/filtering.js`, `src/features/search/runtime/domain/packages.js` | `src/styles/features/search-workspace.css` |
| Шаблоны поиска документов | `docs/components/search-filter-templates/01-structure.md`; `docs/components/search-filter-templates/02-behavior.md`; `docs/components/search-filter-templates/03-data-states-rules.md` | `src/features/search/runtime/ui/search-filter-templates.js`, `src/features/search/runtime/ui/search-filters.js`, `src/features/search/runtime/search-runtime.js` | `localStorage` текущего браузера; значения фильтров из `src/features/search/runtime/ui/search-filters.js` | `src/styles/features/search-workspace.css` |
| Настройки колонок документов | `docs/components/document-column-settings/01-structure.md`; `docs/components/document-column-settings/02-behavior.md`; `docs/components/document-column-settings/03-data-states-rules.md` | `src/features/search/runtime/ui/document-column-settings.js`, `src/features/search/runtime/search-runtime.js` | `src/features/search/runtime/data/search-model.js`; текущая сессия браузера для сохраненных видов колонок | `src/styles/features/search-workspace.css` |
| Фильтры | `docs/components/filters/01-structure.md`; `docs/components/filters/02-behavior.md`; `docs/components/filters/03-data-states-rules.md` | `src/features/filters/filter-drawer.js`, `src/features/filters/multi-select.js`, `src/ui/basic-controls.js` | `src/domain/filters.js`, `src/domain/task-selectors.js`, `src/data/task-model.js` | `src/styles/patterns/drawers-filters-actions.css`, `src/styles/components/core-ui.css`, `src/styles/features/task-workspace.css` |
| Панель инструментов списка задач | `docs/components/toolbar/01-structure.md`; `docs/components/toolbar/02-behavior.md`; `docs/components/toolbar/03-data-states-rules.md` | `src/ui/basic-controls.js`, `src/features/tasks/tasks-view.js`, `src/features/filters/filter-drawer.js`, `src/features/columns/columns-drawer.js` | `src/domain/filters.js`, `src/data/statuses.js`, `src/domain/task-selectors.js` | `src/styles/layout/app-shell.css`, `src/styles/components/core-ui.css`, `src/styles/overrides/user-zone.css` |
| Левая навигация | `docs/components/left-navigation/01-structure.md`; `docs/components/left-navigation/02-behavior.md`; `docs/components/left-navigation/03-data-states-rules.md` | `src/features/sidebar/sidebar.js`, `src/features/grouping/grouping-controls.js`, `src/features/task-selection/floating-action-bar.js`, `src/ui/basic-controls.js` | `src/data/task-model.js`, `src/domain/task-selectors.js`, `src/domain/filters.js`, `src/domain/grouping.js` | `src/styles/layout/app-shell.css`, `src/styles/components/core-ui.css`, `src/styles/overrides/user-zone.css` |
| Очереди | `docs/components/queues/01-structure.md`; `docs/components/queues/02-behavior.md`; `docs/components/queues/03-data-states-rules.md` | `src/features/tasks/tasks-view.js`, `src/features/task-selection/floating-action-bar.js` | `src/data/statuses.js`, `src/data/task-model.js`, `src/domain/task-selectors.js` | `src/styles/components/core-ui.css`, `src/styles/features/task-workspace.css` |
| Список задач | `docs/components/tasks/01-structure.md`; `docs/components/tasks/02-behavior.md`; `docs/components/tasks/03-data-states-rules.md` | `src/features/tasks/tasks-view.js`, `src/features/task-selection/floating-action-bar.js`, `src/features/pagination/pagination-controls.js`, `src/ui/basic-controls.js` | `src/data/task-model.js`, `src/data/mock-tasks.js`, `src/data/task-statuses.js`, `src/data/users.js`, `src/domain/task-selectors.js`, `src/domain/columns.js`, `src/domain/filters.js`, `src/domain/pagination.js` | `src/styles/components/core-ui.css`, `src/styles/patterns/drawers-filters-actions.css`, `src/styles/overrides/user-zone.css` |
| Карточка задачи | `docs/components/task-card-drawer/01-structure.md`; `docs/components/task-card-drawer/02-behavior.md`; `docs/components/task-card-drawer/03-data-states-rules.md`; дочерний комплект `docs/components/task-card-drawer/lego-document-form/` | `src/features/task-card/task-card-drawer.js`, `src/features/task-card/lego-document-form.js`, `src/main.js`, `src/features/search/search-section.js` | `src/data/task-card-details.js`, `src/domain/task-card-details.js`, `src/domain/task-card-state.js`, `src/domain/task-selectors.js` | `src/styles/features/task-card-drawer.css`, общие контролы `src/styles/components/component-library.css` |
| Настройки колонок | `docs/components/column-settings/README.md`; `docs/components/column-settings/01-structure.md`; `docs/components/column-settings/02-behavior.md`; `docs/components/column-settings/03-data-states-rules.md` | `src/features/columns/columns-drawer.js`, `src/ui/basic-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js`, `src/data/attributes.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css`, `src/styles/components/core-ui.css` |
| Библиотека атрибутов | `docs/components/column-settings/attribute-library/01-structure.md`; `docs/components/column-settings/attribute-library/02-behavior.md`; `docs/components/column-settings/attribute-library/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css`, `src/styles/components/core-ui.css` |
| Пресеты колонок | `docs/components/column-settings/presets/01-structure.md`; `docs/components/column-settings/presets/02-behavior.md`; `docs/components/column-settings/presets/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css`, `src/styles/components/core-ui.css` |
| Массовые действия | `docs/components/bulk-actions/01-structure.md`; `docs/components/bulk-actions/02-behavior.md`; `docs/components/bulk-actions/03-data-states-rules.md` | `src/features/task-selection/floating-action-bar.js`, `src/features/tasks/tasks-view.js`, `src/features/sidebar/sidebar.js` | `src/domain/state.js`, `src/domain/task-selectors.js`, `src/data/mock-tasks.js` | `src/styles/patterns/drawers-filters-actions.css`, `src/styles/overrides/user-zone.css`, `src/styles/components/core-ui.css` |
| Пагинация | `docs/components/pagination/01-structure.md`; `docs/components/pagination/02-behavior.md`; `docs/components/pagination/03-data-states-rules.md` | `src/features/pagination/pagination-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/pagination.js`, `src/domain/task-selectors.js`, `src/domain/filters.js` | `src/styles/components/core-ui.css` |

## Документный поиск

Документный поиск работает внутри основной структуры S-Tracker. Разметка находится в `index.html`, переключение разделов выполняет `src/features/search/search-section.js`, runtime поиска находится в `src/features/search/runtime`, стили поиска подключены через `src/styles/features/search-workspace.css`.

Mock-данные документов остаются в `src/features/search/runtime/db.js`. Этот набор данных принадлежит разделу `Поиск`, не используется списком задач и не переносится в `src/data/task-model.js` без отдельной задачи на объединение продуктовых моделей.

| Область поиска | Файлы | Роль |
|---|---|---|
| Mock-данные документов | `src/features/search/runtime/db.js` | Формирует текущий изолированный набор документов и связей для раздела `Поиск`. |
| Модель поиска | `src/features/search/runtime/data/search-model.js` | Хранит дерево пакетов, типы документов и базовую конфигурацию колонок. |
| Domain-функции пакетов | `src/features/search/runtime/domain/packages.js` | Возвращают ids ветки, путь пакета, поиск узла пакета и проверку совпадения в дереве. |
| Domain-функции фильтрации | `src/features/search/runtime/domain/filtering.js` | Проверяют документ по условиям поиска, фильтров, доступности, атрибутов и возвращают связанные документы. |
| Domain-функции таблицы | `src/features/search/runtime/domain/table-view.js` | Возвращают timestamp даты, отсортированный набор документов, строки текущей страницы и количество страниц. |
| Fallback иконок | `src/features/search/runtime/ui/lucide-fallback.js` | Отрисовывает локальные SVG-иконки, если внешний lucide недоступен. |
| UI-рендер строк таблицы документов | `src/features/search/runtime/ui/documents-table.js` | Строит строки таблицы документов, чекбоксы выбора, индикаторы, меню строки и пустое состояние text-safe способом. |
| Выбор документов | `src/features/search/runtime/ui/document-selection.js` | Хранит выбранный набор документов, синхронизирует счетчик и видимость плавающей панели. |
| Выбор пакетов документов | `src/features/search/runtime/ui/document-package-selector.js` | Строит дерево пакетов в модальном окне, хранит выбранные целевые пакеты и раскрытые ветки дерева. |
| Массовые действия документов | `src/features/search/runtime/ui/document-bulk-actions.js` | Подписывает кнопки плавающей панели и модального окна на действия выбранного набора. |
| Дровер связей документа | `src/features/search/runtime/ui/document-relations-drawer.js` | Открывает правый drawer связей, строит таблицу связанных документов, хранит историю вложенных переходов и подписывает действия строк. |
| Фильтры поиска документов | `src/features/search/runtime/ui/search-filters.js` | Считывает условия поиска, сбрасывает значения фильтров и формирует состояние фильтров для шаблона. |
| Динамические атрибутные фильтры | `src/features/search/runtime/ui/dynamic-attribute-filters.js` | Создает дополнительные атрибутные фильтры, хранит их локальные значения для шаблонов и восстанавливает атрибуты из сохраненного шаблона. |
| Шаблоны поиска документов | `src/features/search/runtime/ui/search-filter-templates.js` | Читает и записывает сохраненные шаблоны, собирает карточки шаблонов text-safe способом. |
| Настройки колонок документов | `src/features/search/runtime/ui/document-column-settings.js` | Открывает правую панель настроек, хранит черновик колонок, saved views текущей сессии, закрепление, порядок и применение к таблице. |
| Feedback overlays | `src/features/search/runtime/ui/feedback-overlays.js` | Показывает toast-сообщения text-safe способом для компонентов-владельцев действий. |
| Календарь поиска | `src/features/search/runtime/ui/search-calendar.js` | Открывает календарь периода документа и дат в атрибутных фильтрах; выбранная дата передается фильтрам поиска. |
| Основной контроллер | `src/features/search/runtime/search-runtime.js` | Координирует фильтрацию, таблицу, пагинацию и события поиска документов; динамические атрибутные фильтры подключает через отдельный UI-модуль. |
| Стили поиска | `src/styles/features/search-workspace.css` | Применяются внутри `#js-esm-search-section`. |

## Области без отдельной спецификации

Следующие области не создают самостоятельный экспортируемый комплект `docs/components/<component>/`, если у них нет отдельного пользовательского сценария.

| Область | Где описывать |
|---|---|
| Рабочая область задач | В спецификациях компонентов, которые размещаются внутри рабочей области задач: `toolbar`, `queues`, `tasks`, `pagination`. |
| Действия | В компоненте-владельце действия: `toolbar`, `bulk-actions`, `column-settings`, `left-navigation` или другом соответствующем компоненте. |
| Обратная связь | В компоненте, где пользователь видит результат: `tasks`, `filters`, `bulk-actions`, `column-settings` или другом соответствующем компоненте. |

Если такая область получает самостоятельный пользовательский сценарий и будет передаваться как отдельный экспортируемый контекст, сначала обновить `docs/documentation-standards.md` и `docs/components/README.md`, затем создать комплект `01/02/03`.

## Правило обновления

Перед изменением кода компонента агент проверяет строку этого компонента в карте и определяет, какие связанные документы могут измениться.

| Изменение в коде | Что обновить |
|---|---|
| Меняется видимая структура, состав зон, элементы или границы компонента | `01-structure.md` соответствующего компонента. |
| Меняется действие пользователя или реакция интерфейса | `02-behavior.md`; если сценарий проходит через несколько компонентов, также соответствующий файл `docs/user-flows/`. |
| Меняются состояния, счетчики, правила видимости, данные или контракты между компонентами | `03-data-states-rules.md`; при изменении сущностей также проверить `docs/entities/`. |
| Логика компонента переносится в другой файл или появляется новый файл реализации | Обновить строку компонента в этой карте. |
| Изменяется физическая структура проекта | Обновить `docs/project-structure.md`, при необходимости `docs/README.md`. |

Если для компонента еще нет новой спецификации, сначала создать ее в новом формате по `docs/documentation-standards.md`, а затем вносить изменение.

Если после изменения документации проводится повторная проверка соответствия стандарту, обновить `docs/documentation-standards-audit.md`.
