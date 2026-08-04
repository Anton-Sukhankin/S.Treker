# Реестр подготовленных визуальных эталонов

## Назначение

Реестр связывает каждый экспортируемый PNG компонента с неизмененным исходным кадром и evidence-записью. Координаты обрезки являются параметрами подготовки материала, а не правилами интерфейса.

Эталоны из материалов встречи воспроизводятся скриптом `tools/prepare-component-assets.mjs`: он только обрезает исходный PNG. Снимки локальной визуальной приемки создаются непосредственно из маршрута `/tasks/` и перечисляются отдельно.

## Эталоны раздела «Документы»

| Локальный эталон | Исходник | Обрезка `x,y,w,h` | Evidence | Назначение |
|---|---|---|---|---|
| `../docs/components/documents-workspace/assets/documents-workspace-list.png` | `IMG-DOCS-001` | `0,82,1907,840` | `DOC-E-001` | Дерево пакетов, действия и таблица документов. |
| `../docs/components/documents-workspace/assets/documents-workspace-detail.png` | `IMG-DOCS-002` | `520,0,1391,900` | `DOC-E-002` | Детальная карточка с атрибутами и файлами. |
| `../docs/components/documents-workspace/assets/documents-workspace-file-preview.png` | `IMG-DOCS-003` | `0,0,1910,910` | `DOC-E-003` | Просмотр PDF и список файлов. |
| `../docs/components/documents-workspace/assets/documents-workspace-attribute-edit.png` | `IMG-DOCS-004` | `0,0,1912,900` | `DOC-E-004` | Полная форма редактирования атрибутов. |
| `../docs/components/documents-workspace/assets/documents-workspace-create-picker.png` | `IMG-DOCS-005` | `0,0,1910,900` | `DOC-E-005` | Выбор способа создания документа. |

## Эталоны общей Lego-формы

| Локальный эталон | Исходник | Обрезка `x,y,w,h` | Evidence | Назначение |
|---|---|---|---|---|
| `../docs/components/lego-document-form/assets/lego-document-form-standalone-step.png` | `IMG-LEGO-001` | `430,20,1440,850` | `LEGO-E-001` | Первый шаг в самостоятельном режиме. |
| `../docs/components/lego-document-form/assets/lego-document-form-summary.png` | `IMG-LEGO-002` | `500,0,1340,890` | `LEGO-E-002` | Сводка и сформированная печатная форма. |
| `../docs/components/lego-document-form/assets/lego-document-form-print-verification.png` | `IMG-LEGO-003` | `35,95,1790,735` | `LEGO-E-003` | Подстановки и предпросмотр печати. |
| `../docs/components/lego-document-form/assets/lego-document-form-embedded-step-1.png` | `IMG-TASKS-001` | `400,500,1492,430` | `LEGO-E-004` | Первый шаг внутри карточки задачи. |
| `../docs/components/lego-document-form/assets/lego-document-form-embedded-step-3.png` | `IMG-TASKS-002` | `420,60,1435,760` | `LEGO-E-005` | Третий шаг и состояния индикатора. |

## Эталоны карточки задачи

### Материал, подготовленный из источника встречи

| Локальный эталон | Исходник | Обрезка `x,y,w,h` | Evidence | Ограничение |
|---|---|---|---|---|
| `../docs/components/task-card-drawer/assets/task-card-fixed-context.png` | `IMG-TASKS-001` | `0,80,1892,450` | `TASK-E-001`, `TASK-E-004` | Подтверждает состав верхней части, но не размер и слой drawer. |

### Материалы локальной визуальной приемки

| Локальный материал | Источник | Статус | Назначение |
|---|---|---|---|
| `../docs/components/task-card-drawer/assets/task-card-drawer-entry-point.png` | Нативный маршрут `/tasks/`, drawer закрыт | Готов | Фиксирует единственную демонстрационную точку входа стенда. |
| `../docs/components/task-card-drawer/assets/task-card-drawer-step-1.png` | Нативный маршрут `/tasks/`, drawer `740 px`, первый шаг активен | Готов | Фиксирует утвержденные header/footer, два аккордеона, сетку `3+2` и поля первого шага. |
| `../docs/components/task-card-drawer/assets/task-card-drawer-step-3.png` | Нативный маршрут `/tasks/`, активен третий шаг | Готов | Фиксирует завершенность первых этапов и финансовый состав третьего шага. |
| `../docs/components/task-card-drawer/assets/task-card-drawer-history.png` | Нативный режим истории | Готов | История заменяет основную контентную область под неизменным header. |
| `../docs/components/task-card-drawer/assets/task-card-drawer-comments.png` | Нативный режим комментариев | Готов | Список комментариев занимает контентную высоту карточки. |
| `../docs/components/task-card-drawer/assets/task-card-drawer-design-qa-comparison.png` | Ранний срез до миграции MagicPath | Архивный | Не используется как актуальный эталон утвержденной карточки. |

Полноэкранный кадр встречи не используется для подмены геометрии drawer. Актуальные локальные снимки относятся к ревизии MagicPath `434620812218216448` и нативному runtime после миграции.

## Эталоны раздела «Шаблоны документов»

| Локальный эталон | Исходник | Обрезка `x,y,w,h` | Evidence | Назначение |
|---|---|---|---|---|
| `../docs/components/document-templates-workspace/assets/document-templates-catalog.png` | `IMG-TEMPLATES-001` | `0,80,1912,820` | `TPL-E-001` | Дерево типов и каталог шаблонов. |
| `../docs/components/document-templates-workspace/assets/document-template-attribute-basket.png` | `IMG-TEMPLATES-002` | `390,160,1120,660` | `TPL-E-002` | Корзина атрибутов и создание черновика. |

## Правило обновления

При замене исходного изображения сначала создается новый ID и запись SHA-256 в `context-register.md`, затем обновляются evidence, параметры обрезки и компонентный `01-structure.md`. Существующий эталон не перезаписывается материалом с другой семантикой под тем же идентификатором.
