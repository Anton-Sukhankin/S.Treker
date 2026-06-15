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
| Настройки колонок | `docs/components/columns/01-structure.md`; `docs/components/columns/02-behavior.md`; `docs/components/columns/03-data-states-rules.md` | `src/features/columns/columns-drawer.js`, `src/ui/basic-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js`, `src/data/attributes.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Библиотека атрибутов | `docs/components/attribute-library/01-structure.md`; `docs/components/attribute-library/02-behavior.md`; `docs/components/attribute-library/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js`, `src/data/task-model.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Пресеты колонок | `docs/components/column-presets/01-structure.md`; `docs/components/column-presets/02-behavior.md`; `docs/components/column-presets/03-data-states-rules.md` | `src/features/columns/columns-drawer.js` | `src/domain/columns.js`, `src/domain/task-selectors.js` | `src/styles/features/task-workspace.css`, `src/styles/patterns/drawers-filters-actions.css` |
| Массовые действия | `docs/components/bulk-actions/01-structure.md`; `docs/components/bulk-actions/02-behavior.md`; `docs/components/bulk-actions/03-data-states-rules.md` | `src/features/task-selection/floating-action-bar.js`, `src/features/tasks/tasks-view.js`, `src/features/sidebar/sidebar.js` | `src/domain/state.js`, `src/domain/task-selectors.js`, `src/data/mock-tasks.js` | `src/styles/patterns/drawers-filters-actions.css`, `src/styles/overrides/user-zone.css`, `src/styles/components/core-ui.css` |
| Пагинация | `docs/components/pagination/01-structure.md`; `docs/components/pagination/02-behavior.md`; `docs/components/pagination/03-data-states-rules.md` | `src/features/pagination/pagination-controls.js`, `src/features/tasks/tasks-view.js` | `src/domain/pagination.js`, `src/domain/task-selectors.js`, `src/domain/filters.js` | `src/styles/components/core-ui.css` |

## Компоненты без новой спецификации

Эти области есть в прототипе, но их старые документы удалены как наследие. Для них нужно создать новые спецификации по стандарту из `docs/documentation-standards.md`:

- рабочая область;
- действия;
- обратная связь.

## Правило обновления

Если меняется интерфейс компонента, обновить соответствующий файл спецификации в `docs/components`.

Если для компонента еще нет новой спецификации, сначала создать ее в новом формате, а затем вносить изменение.

Если меняется расположение логики в коде, обновить эту карту.
