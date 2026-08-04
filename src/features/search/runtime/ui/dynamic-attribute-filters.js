const TAG_FILTER_TYPES = new Set(['contractor', 'specialist', 'status']);

    function createTagSelectHtml(values, escapeHtml) {
        return `
            <div class="tag-select-container attr-tag-select">
                <div class="tags-wrapper attr-tags-wrapper"></div>
                <input type="text" class="tag-hidden-input attr-field" placeholder="Поиск...">
                <div class="select-icons">
                    <i data-lucide="chevron-down" class="icon-chevron"></i>
                    <i data-lucide="search" class="icon-search"></i>
                </div>
                <div class="tag-dropdown attr-dropdown">
                    ${values.map(value => `
                        <label class="tag-option">
                            <input type="checkbox" class="attr-tag-cb esm-checkbox" value="${escapeHtml(value)}">
                            <span>${escapeHtml(value)}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function createFieldHtml(type, options) {
        const documents = options.getDocuments();

        if (type === 'contractor') {
            return createTagSelectHtml([...new Set(documents.map(document => document.contractor))], options.escapeHtml);
        }

        if (type === 'status') {
            return createTagSelectHtml(['Проект', 'Согласование', 'Подписан', 'В архиве'], options.escapeHtml);
        }

        if (type === 'amount') {
            return '<div class="attr-input-group"><input type="number" class="attr-field amount-min" placeholder="От"><input type="number" class="attr-field amount-max" placeholder="До"></div>';
        }

        if (type === 'specialist') {
            return createTagSelectHtml([...new Set(documents.map(document => document.specialist))], options.escapeHtml);
        }

        if (type === 'endDate') {
            return `
                <div class="date-period-container attr-date-select">
                    <div class="input-with-icon">
                        <i data-lucide="calendar" style="color: #94a3b8;"></i>
                        <input type="text" class="form-control attr-field" placeholder="Поиск по дате..." readonly style="padding-left:36px;">
                    </div>
                </div>
            `;
        }

        return '';
    }

export function createDynamicAttributeFiltersController(options) {
        const container = document.getElementById(options.containerId);
        const menu = document.getElementById(options.menuId);
        const addButton = document.getElementById(options.addButtonId);
        const addButtonContainer = document.querySelector(options.addButtonContainerSelector);

        if (!container || !menu || !addButton || !addButtonContainer) {
            return null;
        }

        function updateMenuVisibility() {
            const addedTypes = Array.from(container.querySelectorAll('.attribute-item')).map(item => item.dataset.attr);
            let allHidden = true;

            menu.querySelectorAll('.menu-item').forEach(menuItem => {
                const type = menuItem.dataset.attr;
                if (addedTypes.includes(type)) {
                    menuItem.style.display = 'none';
                    return;
                }

                menuItem.style.display = 'block';
                allHidden = false;
            });

            addButton.disabled = allHidden;
        }

        function renderTags(wrapper, dropdown, input) {
            const checked = Array.from(dropdown.querySelectorAll('.attr-tag-cb:checked'));
            wrapper.innerHTML = '';
            input.placeholder = checked.length > 0 ? '' : 'Поиск...';

            checked.slice(0, 1).forEach(checkbox => {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.innerHTML = `<span>${options.escapeHtml(checkbox.value)}</span><button type="button" class="close-tag" aria-label="Удалить значение ${options.escapeHtml(checkbox.value)}"><i data-lucide="x" style="width:14px; height:14px;"></i></button>`;
                wrapper.appendChild(tag);
            });

            if (checked.length > 1) {
                const counter = document.createElement('div');
                counter.className = 'tag counter-tag';
                counter.textContent = `+ ${checked.length - 1}`;
                wrapper.appendChild(counter);
            }

            if (window.lucide) window.lucide.createIcons();
        }

        function bindTagSelect(item) {
            const tagSelect = item.querySelector('.attr-tag-select');
            const dropdown = item.querySelector('.attr-dropdown');
            const tagsWrapper = item.querySelector('.attr-tags-wrapper');
            const input = item.querySelector('.tag-hidden-input');
            tagSelect.setAttribute('role', 'combobox');
            tagSelect.setAttribute('aria-expanded', 'false');
            tagSelect.tabIndex = 0;

            tagSelect.addEventListener('click', event => {
                event.stopPropagation();
                if (!tagSelect.classList.contains('open')) options.closeAllDropdowns(tagSelect);
                const isOpen = tagSelect.classList.toggle('open');
                tagSelect.setAttribute('aria-expanded', String(isOpen));
            });
            tagSelect.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                if (event.target !== tagSelect) return;
                event.preventDefault();
                tagSelect.click();
            });

            input.addEventListener('input', () => {
                const value = input.value.toLowerCase();
                dropdown.querySelectorAll('.tag-option').forEach(option => {
                    option.style.display = option.textContent.toLowerCase().includes(value) ? 'flex' : 'none';
                });
            });

            dropdown.addEventListener('click', event => event.stopPropagation());

            dropdown.querySelectorAll('.attr-tag-cb').forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    renderTags(tagsWrapper, dropdown, input);
                    options.applyFilters();
                });
            });

            tagsWrapper.addEventListener('click', event => {
                const closeButton = event.target.closest('.close-tag');
                if (!closeButton) return;

                event.stopPropagation();
                const tag = closeButton.closest('.tag');
                const name = tag.querySelector('span').textContent;
                const checkbox = Array.from(dropdown.querySelectorAll('.attr-tag-cb')).find(item => item.value === name);
                if (!checkbox) return;

                checkbox.checked = false;
                renderTags(tagsWrapper, dropdown, input);
                options.applyFilters();
            });
        }

        function addAttributeBlock(type, label, config = {}) {
            const item = document.createElement('div');
            item.className = `attribute-item attr-${type}`;
            item.dataset.attr = type;
            item.innerHTML = `
                <div class="attr-header">
                    <span class="attr-label">${options.escapeHtml(label)}</span>
                    <button type="button" class="remove-attr" aria-label="Удалить фильтр ${options.escapeHtml(label)}"><i data-lucide="trash-2"></i></button>
                </div>
                ${createFieldHtml(type, options)}
            `;

            item.addEventListener('click', event => {
                if (!event.target.closest('.remove-attr')) return;

                item.remove();
                updateMenuVisibility();
                options.applyFilters();
            });

            item.querySelectorAll('.attr-field').forEach(field => {
                field.addEventListener('input', options.applyFilters);
            });

            item.querySelectorAll('select').forEach(select => {
                select.addEventListener('change', options.applyFilters);
            });

            if (TAG_FILTER_TYPES.has(type)) {
                bindTagSelect(item);
            }

            if (type === 'endDate') {
                const input = item.querySelector('.attr-field');
                if (options.searchCalendar && input) options.searchCalendar.attachInput(input);
            }

            container.appendChild(item);
            if (window.lucide) window.lucide.createIcons();
            if (config.apply !== false) options.applyFilters();
            return item;
        }

        function collectTemplateAttributes() {
            return Array.from(container.querySelectorAll('.attribute-item')).map(item => {
                const type = item.dataset.attr;
                const label = item.querySelector('.attr-label').textContent;
                const values = {};

                if (type === 'amount') {
                    values.min = item.querySelector('.amount-min').value;
                    values.max = item.querySelector('.amount-max').value;
                } else if (type === 'endDate') {
                    values.date = item.querySelector('.attr-field').value;
                } else {
                    values.checked = Array.from(item.querySelectorAll('.attr-tag-cb:checked')).map(checkbox => checkbox.value);
                }

                return { type, label, values };
            });
        }

        function restoreTemplateAttributes(attributes = []) {
            container.innerHTML = '';

            attributes.forEach(attribute => {
                const item = addAttributeBlock(attribute.type, attribute.label, { apply: false });
                if (!item) return;

                if (attribute.type === 'amount') {
                    item.querySelector('.amount-min').value = attribute.values.min;
                    item.querySelector('.amount-max').value = attribute.values.max;
                    return;
                }

                if (attribute.type === 'endDate') {
                    item.querySelector('.attr-field').value = attribute.values.date;
                    return;
                }

                const dropdown = item.querySelector('.attr-dropdown');
                const checkedValues = attribute.values.checked || [];
                dropdown.querySelectorAll('.attr-tag-cb').forEach(checkbox => {
                    checkbox.checked = checkedValues.includes(checkbox.value);
                });
                renderTags(item.querySelector('.attr-tags-wrapper'), dropdown, item.querySelector('.tag-hidden-input'));
            });

            updateMenuVisibility();
            options.applyFilters();
        }

        function closeDropdownsExcept(exceptContainer = null) {
            if (exceptContainer !== addButtonContainer) addButtonContainer.classList.remove('open');

            container.querySelectorAll('.attr-tag-select').forEach(tagSelect => {
                if (exceptContainer !== tagSelect) {
                    tagSelect.classList.remove('open');
                    tagSelect.setAttribute('aria-expanded', 'false');
                }
            });

            container.querySelectorAll('.attr-date-select').forEach(dateSelect => {
                if (exceptContainer !== dateSelect) dateSelect.classList.remove('open');
            });
        }

        addButton.addEventListener('click', event => {
            if (addButton.disabled) return;

            event.stopPropagation();
            if (!addButtonContainer.classList.contains('open')) options.closeAllDropdowns(addButtonContainer);
            addButtonContainer.classList.toggle('open');
        });

        menu.addEventListener('click', event => {
            const item = event.target.closest('.menu-item');
            if (!item) return;

            addAttributeBlock(item.dataset.attr, item.textContent);
            addButtonContainer.classList.remove('open');
            updateMenuVisibility();
        });

        updateMenuVisibility();

        return Object.freeze({
            closeDropdownsExcept,
            collectTemplateAttributes,
            restoreTemplateAttributes,
            updateMenuVisibility
        });
    }
