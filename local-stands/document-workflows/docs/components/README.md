# Компоненты локального стенда

| Компонент | Назначение | Комплект |
|---|---|---|
| `task-card-drawer/` | Стендовая точка входа, правый drawer карточки задачи и граница рабочей области. | `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md` |
| `documents-workspace/` | Пакеты, список документов, детальная карточка, файлы и создание. | `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md` |
| `new-document-type-picker/` | Нижний drawer выбора ECM-формы или опубликованного Lego-шаблона. | `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md`, `assets/` |
| `document-templates-workspace/` | Каталог шаблонов и начальная настройка до черновика. | `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md` |
| `lego-document-form/` | Общая пошаговая форма для самостоятельного и встроенного режимов. | `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md` |

Папка одного компонента является его экспортируемым контекстом. Исследовательские документы и спецификации соседних компонентов добавляются в рабочий пакет только при явной межкомпонентной задаче.
