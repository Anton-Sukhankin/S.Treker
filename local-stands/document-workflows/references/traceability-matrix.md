# Матрица трассируемости

Матрица показывает маршрут контекста до компонента и текущего runtime. Она не повторяет требования из `docs/components/`.

| Интерфейс или состояние | Сырые источники | Evidence | Спецификация или flow | Runtime стенда |
|---|---|---|---|---|
| Точка входа и правый drawer задачи | `DEC-USER-001`, `IMG-TASKS-001` как контекст состава | `TASK-E-005`, `TASK-E-001` | `task-card-drawer/01/02/03` | `../src/sections/tasks/` |
| Верхний контекст карточки задачи | `IMG-TASKS-001`, видео `00:20:34–00:22:20`, транскрипция того же интервала | `TASK-E-001`, `TASK-E-004` | `task-card-drawer/01/03` | `../src/sections/tasks/` |
| Первый шаг встроенной формы | `IMG-TASKS-001`, видео `00:10:34` | `TASK-E-001`, `LEGO-E-004` | `lego-document-form/01/02/03`; flow `complete-document-form-in-task` | `../src/shared/lego-document-form/` |
| Состояние третьего шага | `IMG-TASKS-002`, видео `00:11:20` | `TASK-E-002`, `LEGO-E-005` | `lego-document-form/01/03` | План волны 2. |
| Список документов пакета | `IMG-DOCS-001`, видео `00:00:43` | `DOC-E-001` | `documents-workspace/01/03` | План волны 3. |
| Детальная карточка и файлы | `IMG-DOCS-002`, `IMG-DOCS-003` | `DOC-E-002`, `DOC-E-003` | `documents-workspace/01/02/03` | План волны 3. |
| Редактирование атрибутов | `IMG-DOCS-004`, видео `00:01:49` | `DOC-E-004` | `documents-workspace/01/02/03` | План волны 3. |
| Выбор способа создания | `IMG-DOCS-005`, видео `00:03:38–00:04:20` | `DOC-E-005` | `documents-workspace/01/02`; flow `create-document-from-documents-workspace` | План волны 3. |
| Самостоятельный первый шаг | `IMG-LEGO-001`, видео `00:04:21–00:05:51` | `LEGO-E-001` | `lego-document-form/01/02/03` | План волны 3 на общей реализации. |
| Сводка и печатная форма | `IMG-LEGO-002`, видео `00:05:57` | `LEGO-E-002` | `lego-document-form/01/02/03`; два flow | План волны 2–3. |
| Верификация печати | `IMG-LEGO-003`, видео `00:06:24` | `LEGO-E-003` | `lego-document-form/01/02/03` | План волны 3. |
| Каталог шаблонов | `IMG-TEMPLATES-001`, видео `00:15:00–00:16:19` | `TPL-E-001` | `document-templates-workspace/01/02/03` | План волны 4. |
| Корзина атрибутов | `IMG-TEMPLATES-002`, видео `00:17:16–00:19:33` | `TPL-E-002` | `document-templates-workspace/01/02/03`; flow `create-document-template-draft` | План волны 4. |
| Граница полного редактора | Видео и транскрипция `00:20:04–00:20:27` | `TPL-E-005` | Ограничения `document-templates-workspace/02/03` | Runtime отсутствует до отдельной спецификации. |

Пути `../src/` указаны относительно `document-workflows/` и ведут в общий runtime многостраничного стенда `local-stands/src/`; разделовые HTML-точки входа находятся в корне `local-stands/`.
