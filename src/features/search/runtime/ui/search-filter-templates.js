export function readTemplates(storageKey) {
        try {
            const value = localStorage.getItem(storageKey);
            const parsed = JSON.parse(value || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
            return [];
        }
    }

export function writeTemplates(storageKey, templates) {
        localStorage.setItem(storageKey, JSON.stringify(templates));
    }

export function createTemplateData(options) {
        return {
            name: options.name,
            date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }),
            ...options.filterState,
            attributes: options.attributes
        };
    }

    function createIcon(name) {
        const icon = document.createElement('i');
        icon.dataset.lucide = name;
        return icon;
    }

    function createTemplateCard(template, index, callbacks) {
        const card = document.createElement('div');
        card.className = 'saved-template-card';

        const content = document.createElement('div');
        content.className = 'template-card-content';

        const title = document.createElement('div');
        title.className = 'template-card-title';
        title.textContent = template.name || '';
        content.appendChild(title);

        const date = document.createElement('div');
        date.className = 'template-card-date';
        date.textContent = `Создано: ${template.date || ''}`;
        content.appendChild(date);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-template-btn';
        deleteButton.title = 'Удалить';
        deleteButton.appendChild(createIcon('trash-2'));

        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            callbacks.onDelete(index);
        });

        card.addEventListener('click', () => {
            callbacks.onApply(template);
        });

        card.appendChild(content);
        card.appendChild(deleteButton);
        return card;
    }

export function renderTemplateList(options) {
        const list = document.getElementById(options.listId);
        const empty = document.getElementById(options.emptyId);
        if (!list || !empty) return;

        if (options.templates.length === 0) {
            empty.style.display = 'flex';
            list.style.display = 'none';
            list.replaceChildren();
            return;
        }

        empty.style.display = 'none';
        list.style.display = 'flex';

        const fragment = document.createDocumentFragment();
        options.templates.forEach((template, index) => {
            fragment.appendChild(createTemplateCard(template, index, {
                onDelete: options.onDelete,
                onApply: options.onApply
            }));
        });
        list.replaceChildren(fragment);

        if (window.lucide) window.lucide.createIcons();
    }
