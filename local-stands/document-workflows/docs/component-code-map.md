# Карта документации и runtime локального стенда

Документ связывает компонентные спецификации локального контура с фактическими владельцами реализации. Он не входит в экспортируемый комплект компонента.

## Lego и создание документа

| Документированный блок | Runtime-владелец | Данные и состояние | Стили и активы | Точки интеграции |
|---|---|---|---|---|
| `lego-document-form` | `local-stands/src/shared/lego-document-form/index.js` | `local-stands/src/domain/lego-document-state.js`; конфигурация `legoDocumentFormMock` в `local-stands/src/data/task-card-mock.js` | `local-stands/src/styles/stand.css`; `local-stands/src/assets/summary-review-illustration.png` | Самостоятельный режим создаёт `document-creation-form.js`; встроенный режим создаёт раздел `tasks`. |
| `new-document-type-picker` | `local-stands/src/sections/documents/new-document-type-picker-drawer.js` | Каталог вариантов и текущий пакет передаёт runtime раздела `documents` | `local-stands/src/styles/documents-workspace.css` | После выбора передаёт вариант в `document-creation-form.js`; drawer остаётся тем же. |
| ECM-форма создания | `local-stands/src/sections/documents/document-creation-form.js` | Локальные значения наименования, номера и типа | `local-stands/src/styles/documents-workspace.css` | Передаёт созданную строку владельцу `documents-workspace`. |
| `documents-workspace` | `local-stands/src/sections/documents/index.js` и дочерние модули раздела | `local-stands/src/data/documents-workspace-mock.js`; domain-модули документов | Стили раздела `documents` и общие стили стенда | Открывает picker, сохраняет текущий пакет, добавляет локальную строку результата. |

## Карточка задачи

| Документированный блок | Runtime-владелец | Данные и состояние | Стили | Контракт с Lego |
|---|---|---|---|---|
| `task-card-drawer` | `local-stands/src/sections/tasks/index.js` | `local-stands/src/data/task-card-mock.js` | `local-stands/src/styles/stand.css` | Передаёт общий form-конфиг и state во встроенный режим; владеет footer и toast. |
| Адаптер состояния задачи | `local-stands/src/domain/task-card-state.js` | Делегирует `local-stands/src/domain/lego-document-state.js` с отключённой сводкой | Не применимо | Сохраняет прежний импорт раздела задачи без второй реализации правил формы. |

## Визуальный источник

| Источник | Роль | Runtime-статус |
|---|---|---|
| `local-stands/magicpath/lego-form/standalone-steps/` | Зафиксированная ревизия MagicPath для визуальной сверки и трассируемости | Не импортируется, не является HTML-точкой входа и не участвует в Vite-сборке. |

## Когда обновлять карту

- Перемещён runtime-владелец формы, picker, карточки задачи или состояния Lego.
- Изменена точка создания самостоятельного или встроенного режима.
- Добавлена либо удалена HTML-точка входа.
- Визуальный источник перенесён в архив или удалён после отдельной безопасной проверки.
