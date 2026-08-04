# Раздел `Документы`

Здесь реализована нативная миграция рабочего пространства документов: дерево пакетов, список и пагинация, массовый выбор, немодальная детальная карточка, атрибуты, файлы, меню действий и нижний drawer создания локального документа. Runtime действующей вкладки `Поиск` не используется.

Источники и спецификации:

- паспорт раздела: `docs/sections/documents/README.md`;
- источники: `references/evidence/documents/README.md`;
- компонент: `docs/components/documents-workspace/`;
- picker создания: `docs/components/new-document-type-picker/`;
- сквозной путь: `docs/user-flows/create-document-from-documents-workspace.md`.

Просмотр файла и редактирование атрибутов остаются следующими инкрементами. Picker создания использует общие Button, Input и Drawer через `@s-tracker/ui`, а Lego-вариант повторно использует `shared/lego-document-form`.
