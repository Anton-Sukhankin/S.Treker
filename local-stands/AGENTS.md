# Локальные стенды S-Tracker

## Область действия

Инструкции действуют для runtime-файлов в `local-stands/`: корневого каталога прототипов `index.html`, разделовых `tasks/index.html`, `documents/index.html`, `document-templates/index.html`, конфигурации и `src/`.

## Назначение

`local-stands/` — единый корень независимо запускаемых локальных прототипов, которые еще не мигрированы в основной S-Tracker. Каждый раздел имеет собственную HTML-точку входа, но переиспользует общие runtime-модули. Продуктовая документация и референсы находятся в `local-stands/document-workflows/`.

## Границы

1. Runtime-код, mock-данные, стили и конфигурация стенда находятся в `local-stands/src/` и корне `local-stands/`.
2. Рабочие исходники вариантов MagicPath находятся в `local-stands/magicpath/`; они не входят в runtime Vite, не импортируются стендом и не считаются мигрируемым кодом без отдельного решения.
3. Спецификации, пользовательские пути, исследование и референсы находятся в `local-stands/document-workflows/`.
4. Основной S-Tracker не импортирует runtime стенда до отдельной миграционной задачи.
5. Стенд не импортирует feature-, domain- и data-модули основного S-Tracker. Разрешено переиспользовать только общую UI-базу через `@s-tracker/ui` и ее стили.
6. Не подключать React, Tend UI, Material UI и новые зависимости в runtime стенда без прямой команды пользователя. React-исходники, созданные MagicPath внутри `local-stands/magicpath/`, не меняют технологию Vite-стенда.

## Перед изменением поведения

Проверить применимый комплект в `document-workflows/docs/components/`, связанный flow в `document-workflows/docs/user-flows/` и правила `document-workflows/AGENTS.md`. После изменения видимого поведения синхронизировать эти документы.
