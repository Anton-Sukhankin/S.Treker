# Общая Lego-форма

Каталог содержит единственную runtime-реализацию Lego-формы локального стенда. Она показывает пять этапов в двух режимах:

- `standalone` — внутри нижнего drawer раздела `Документы`, с собственными header, навигацией, прокручиваемой формой, footer и сводкой;
- `embedded` — внутри аккордеона карточки задачи, где footer и финальный результат принадлежат карточке.

Оба режима используют одну модель из `src/domain/lego-document-state.js` и конфигурацию из `src/data/task-card-mock.js`. React/Tailwind-исходник MagicPath остаётся визуальным источником и не импортируется в runtime.

При изменении реализации синхронизировать:

- `docs/components/lego-document-form/`;
- `docs/user-flows/create-document-from-documents-workspace.md`;
- `docs/user-flows/complete-document-form-in-task.md`;
- контракты `new-document-type-picker` и `task-card-drawer`, если меняется внешний результат формы.
