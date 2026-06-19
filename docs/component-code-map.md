# Карта связей компонентов и кода

Этот документ показывает, где находится описание компонента и какие файлы проекта обычно связаны с его работой.

Карта не заменяет спецификацию компонента. Главный источник по интерфейсу находится в `docs/components/<component>/`.

## Как читать

- `Компонент` - пользовательская область интерфейса.
- `Документация` - действующая спецификация компонента.
- `Поведение` - файлы, где чаще всего находится логика.
- `Данные` - файлы, откуда приходят данные или правила.
- `Стили` - файлы, где чаще всего находится внешний вид.

## Действующие спецификации

| Компонент | Документация | Поведение | Данные | Стили |
|---|---|---|---|---|
| Фильтры | `docs/components/filters/01-structure.md`; `docs/components/filters/02-behavior.md`; `docs/components/filters/03-data-states-rules.md` | `src/features/filters/filter-drawer.js`, `src/features/filters/multi-select.js`, `src/ui/basic-controls.js` | `src/domain/filters.js`, `src/domain/task-selectors.js`, `src/data/task-model.js` | `src/styles/patterns/drawers-filters-actions.css`, `src/styles/components/core-ui.css` |
| Панель инструментов списка задач | `docs/components/toolbar/01-structure.md`; `docs/components/toolbar/02-behavior.md`; `docs/components/toolbar/03-data-states-rules.md` | `src/ui/basic-controls.js`, `src/features/tasks/tasks-view.js`, `src/features/filters/filter-drawer.js`, `src/features/columns/columns-drawer.js` | `src/domain/filters.js`, `src/data/statuses.js`, `src/domain/task-selectors.js` | `src/styles/layout/app-shell.css`, `src/styles/components/core-ui.css`, `src/styles/overrides/user-zone.css` |
| Левая навигация | `docs/components/left-navigation/01-structure.md`; `docs/components/left-navigation/02-behavior.md`; `docs/components/left-navigation/03-data-states-rules.md` | `src/features/sidebar/sidebar.js`, `src/features/grouping/grouping-controls.js`, `src/features/task-selection/floating-action-bar.js`, `src/ui/basic-controls.js` | `src/data/task-model.js`, `src/domain/task-selectors.js`, `src/domain/filters.js`, `src/domain/grouping.js` | `src/styles/layout/app-shell.css`, `src/styles/components/core-ui.css`, `src/styles/overrides/user-zone.css` |
| Очереди | `docs/components/queues/01-structure.md`; `docs/components/queues/02-behavior.md`; `docs/components/queues/03-data-states-rules.md` | `src/features/tasks/tasks-view.js`, `src/features/task-selection/floating-action-bar.js` | `src/data/statuses.js`, `src/data/task-model.js`, `src/domain/task-selectors.js` | `src/styles/components/core-ui.css`, `src/styles/features/task-workspace.css` |
| Список задач | `docs/components/tasks/01-structure.md`; `docs/components/tasks/02-behavior.md`; `docs/components/tasks/03-data-states-rules.md` | `src/features/tasks/tasks-view.js`, `src/features/task-selection/floating-action-bar.js`, `src/features/pagination/pagination-controls.js`, `src/ui/basic-controls.js` | `src/data/task-model.js`, `src/data/mock-tasks.js`, `src/data/task-statuses.js`, `src/data/users.js`, `src/domain/task-selectors.js`, `src/domain/columns.js`, `src/domain/filters.js`, `src/domain/pagination.js` | `src/styles/components/core-ui.css`, `src/styles/patterns/drawers-filters-actions.css`, `src/styles/overrides/user-zone.css` |
| Настройки колонок | `docs/components/column-settings/README.md`; `docs/components/column-settings/01-structure.md`; `docs/components/column-settings/02-behavior.md`; `docs/components/column-settings/03-data-states-rules.md` | `src/features/columns/columns-drawer.js`, `src/ui/basic-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js`, `src/data/attributes.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Библиотека атрибутов | `docs/components/column-settings/attribute-library/01-structure.md`; `docs/components/column-settings/attribute-library/02-behavior.md`; `docs/components/column-settings/attribute-library/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Пресеты колонок | `docs/components/column-settings/presets/01-structure.md`; `docs/components/column-settings/presets/02-behavior.md`; `docs/components/column-settings/presets/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Массовые действия | `docs/components/bulk-actions/01-structure.md`; `docs/components/bulk-actions/02-behavior.md`; `docs/components/bulk-actions/03-data-states-rules.md` | `src/features/task-selection/floating-action-bar.js`, `src/features/tasks/tasks-view.js`, `src/features/sidebar/sidebar.js` | `src/domain/state.js`, `src/domain/task-selectors.js`, `src/data/mock-tasks.js` | `src/styles/patterns/drawers-filters-actions.css`, `src/styles/overrides/user-zone.css`, `src/styles/components/core-ui.css` |
| Пагинация | `docs/components/pagination/01-structure.md`; `docs/components/pagination/02-behavior.md`; `docs/components/pagination/03-data-states-rules.md` | `src/features/pagination/pagination-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/pagination.js`, `src/domain/task-selectors.js`, `src/domain/filters.js` | `src/styles/components/core-ui.css` |

## Компоненты без новой спецификации

Эти области есть в прототипе, но их старые документы удалены как наследие. Для них нужно создать новые спецификации по стандарту из `docs/documentation-standards.md`:

- рабочая область;
- действия;
- обратная связь.

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
