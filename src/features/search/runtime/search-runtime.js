/**
 * Основной контроллер интерфейса ESM
 * Итерация 4.8 (Сохранение состояния веток при выборе)
 */
import { esmDocuments } from './db.js';
import { BASE_STATE as SEARCH_BASE_STATE, COLUMN_ORDER, DOCUMENT_TYPES, TREE_DATA } from './data/search-model.js';
import { createPagination } from '../../../ui/components/pagination.js';
import * as filteringDomain from './domain/filtering.js';
import * as packageDomain from './domain/packages.js';
import * as tableViewDomain from './domain/table-view.js';
import * as documentBulkActionsUi from './ui/document-bulk-actions.js';
import * as documentColumnSettingsUi from './ui/document-column-settings.js';
import * as documentPackageSelectorUi from './ui/document-package-selector.js';
import * as documentRelationsDrawerUi from './ui/document-relations-drawer.js';
import * as documentSelectionUi from './ui/document-selection.js';
import * as documentsTableUi from './ui/documents-table.js';
import * as dynamicAttributeFiltersUi from './ui/dynamic-attribute-filters.js';
import * as feedbackOverlaysUi from './ui/feedback-overlays.js';
import * as searchCalendarUi from './ui/search-calendar.js';
import * as searchFilterTemplatesUi from './ui/search-filter-templates.js';
import * as searchFiltersUi from './ui/search-filters.js';
import './ui/lucide-fallback.js';

let isInitialized = false;

const INITIAL_ORDER = [...COLUMN_ORDER];
    const BASE_STATE = {
        active: [...SEARCH_BASE_STATE.active],
        pinned: [...SEARCH_BASE_STATE.pinned],
        order: [...SEARCH_BASE_STATE.order]
    };

    const REL_ICON_SVG = `<svg class="rel-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 3.44772 2.44772 3 3 3H8C8.55228 3 9 3.44772 9 4V6H12H15V4C15 3.44772 15.4477 3 16 3H21C21.5523 3 22 3.44772 22 4V10C22 10.5523 21.5523 11 21 11H16C15.4477 11 15 10.5523 15 10V8H13V16H15V14C15 13.4477 16 13H21C21.5523 13 22 13.4477 22 14V20C22 20.5523 21.5523 21 21 21H16C15.4477 21 15 20.5523 15 20V18H12C11.4477 18 11 17.5523 11 17V8H9V10C9 10.5523 8.55228 11 8 11H3C2.44772 11 2 10.5523 2 10V4ZM17 17V19H20V15H17V17ZM20 9H17V7V5H20V9ZM7 5V7V9H4V5H7Z" fill="currentColor"/></svg>`;
    const MARK_FOR_DELETION_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 4.44772 6.44772 4 7 4H13V8.00003C13 8.55231 13.4477 9.00003 14 9.00003H18V14C18 14.5523 18.4477 15 19 15C19.5523 15 20 14.5523 20 14V8.00793V8C20 7.73478 19.8946 7.48043 19.7071 7.29289L14.7071 2.29289C14.6114 2.1972 14.4983 2.1229 14.3753 2.07308C14.2572 2.02527 14.1299 2 14 2H7C5.34315 2 4 3.34315 4 5V19C4 20.6569 5.34315 22 7 22H12C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20H7C6.44772 20 6 19.5523 6 19V5ZM16.2929 18.2929C16.6834 17.9024 17.3166 17.9024 17.7071 18.2929L19 19.5858L20.2929 18.2929C20.6834 17.9024 21.3166 17.9024 21.7071 18.2929C22.0976 18.6834 22.0976 19.3166 21.7071 19.7071L20.4142 21L21.7071 22.2929C22.0976 22.6834 22.0976 23.3166 21.7071 23.7071C21.3165 24.0976 20.6834 24.0976 20.2929 23.7071L19 22.4142L17.7071 23.7071C17.3166 24.0976 16.6834 24.0976 16.2929 23.7071C15.9024 23.3165 15.9024 22.6834 16.2929 22.2929L17.5858 21L16.2929 19.7071C15.9024 19.3166 15.9024 18.6834 16.2929 18.2929Z" fill="currentColor"/></svg>`;

    const treeHeader = document.querySelector('.tree-select-header');
    const treeContainer = document.querySelector('.tree-select-container');
    const treeDropdown = document.getElementById('tree-dropdown');
    const treeInput = document.getElementById('package-search-input');
    const tagSelectContainer = document.querySelector('.tag-select-container');
    const tagDropdown = document.getElementById('tag-dropdown');
    const tagInput = document.getElementById('tag-filter-input');
    const tagsWrapper = document.getElementById('tags-wrapper');
    const treeTagsWrapper = document.getElementById('tree-tags-wrapper');
    const attributesList = document.getElementById('attributes-list');
    const addFilterBtn = document.getElementById('add-filter-btn');

    let currentSortField = null;
    let currentSortDir = 'asc'; // 'asc' or 'desc'

    let selectedPackageIds = new Set();
    const availablePackageIds = new Set(esmDocuments.flatMap(document => [
        document.packageId,
        ...(Array.isArray(document.packageIds) ? document.packageIds : [])
    ]).filter(Boolean));
    let expandedNodeIds = new Set(); // Отслеживание развернутых папок
    let selectedTypes = new Set();
    let lastSelectedPackageName = '';
    let currentPage = 1;
    const pageSize = 20;
    let lastFilteredData = [];
    let documentColumnSettings = null;
    let dynamicAttributeFilters = null;
    let feedbackOverlays = null;
    let searchCalendar = null;
    const documentSelection = documentSelectionUi.createDocumentSelectionController({
        bar: 'floating-actions',
        countDisplay: 'floating-count',
        unmarkButton: 'bulk-unmark'
    });
    let activeColumns = [...BASE_STATE.active];
    let pinnedColumns = new Set(BASE_STATE.pinned);

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function getBranchIds(nodeId, nodes = TREE_DATA) {
        return packageDomain.getBranchIds(nodeId, nodes);
    }

    function renderTree(nodes, container, level = 0, query = '', ancestors = []) {
        container.innerHTML = '';
        nodes.forEach((node, index) => {
            const isLast = index === nodes.length - 1;
            const hasMatch = query && node.name.toLowerCase().includes(query.toLowerCase());
            const hasMatchInChildren = node.children && checkMatchRecursive(node.children, query);
            if (query && !hasMatch && !hasMatchInChildren) return;

            const nodeWrapper = document.createElement('div');
            nodeWrapper.className = 'tree-node';

            // Узел развернут если: идет поиск (и есть совпадение ниже) ИЛИ он в списке развернутых
            const isInitiallyExpanded = (query && (hasMatchInChildren || hasMatch)) || expandedNodeIds.has(node.id);
            if (isInitiallyExpanded) nodeWrapper.classList.add('expanded');

            const row = document.createElement('div');
            row.className = 'tree-node-row';
            row.tabIndex = 0;
            row.setAttribute('role', 'treeitem');
            row.setAttribute('aria-label', node.name);
            if (node.children) row.setAttribute('aria-expanded', String(isInitiallyExpanded));
            if (selectedPackageIds.has(node.id)) row.classList.add('active');

            let structureHtml = '';
            for (let i = 0; i < level; i++) {
                structureHtml += `<div class="tree-struct-item ${ancestors[i] === 'line' ? 'tree-struct-line' : 'tree-struct-empty'}"></div>`;
            }
            if (level > 0) structureHtml += `<div class="tree-struct-item ${isLast ? 'tree-struct-branch-end' : 'tree-struct-branch'}"></div>`;

            const folderIcon = node.children ? (nodeWrapper.classList.contains('expanded') ? 'folder-minus' : 'folder-plus') : 'folder';

            row.innerHTML = `
                <div class="tree-node-inner">
                    <div class="tree-checkbox-container"><input type="checkbox" class="esm-checkbox" ${selectedPackageIds.has(node.id) ? 'checked' : ''}></div>
                    <div class="tree-content-area">
                        ${structureHtml}
                        <i data-lucide="${folderIcon}" style="width:18px; height:18px; color:${node.children ? 'var(--accent)' : '#888'};" class="tree-folder-icon"></i>
                        <span class="tree-node-label">${escapeHtml(node.name)}</span>
                    </div>
                </div>
            `;

            const cb = row.querySelector('.esm-checkbox');
            cb.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePackageSelection(node.id, node.name, cb.checked);
            });

            row.addEventListener('click', (e) => {
                e.stopPropagation();
                if (node.children && !e.target.closest('.esm-checkbox')) {
                    const isNowExpanded = nodeWrapper.classList.toggle('expanded');
                    row.setAttribute('aria-expanded', String(isNowExpanded));
                    if (isNowExpanded) expandedNodeIds.add(node.id); else expandedNodeIds.delete(node.id);

                    row.querySelector('.tree-folder-icon').setAttribute('data-lucide', isNowExpanded ? 'folder-minus' : 'folder-plus');
                    if (window.lucide) window.lucide.createIcons();
                } else if (!e.target.closest('.esm-checkbox')) {
                    cb.checked = !cb.checked;
                    togglePackageSelection(node.id, node.name, cb.checked);
                }
            });
            row.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                row.click();
            });

            nodeWrapper.appendChild(row);
            if (node.children) {
                const content = document.createElement('div');
                content.className = 'tree-node-content';
                const nextAncestors = [...ancestors]; nextAncestors[level] = isLast ? 'empty' : 'line';
                renderTree(node.children, content, level + 1, query, nextAncestors);
                nodeWrapper.appendChild(content);
            }
            container.appendChild(nodeWrapper);
        });
        if (window.lucide) window.lucide.createIcons();
    }

    function checkMatchRecursive(nodes, query) {
        return packageDomain.checkMatchRecursive(nodes, query);
    }

    function togglePackageSelection(id, name, isSelected) {
        const allRelatedIds = getBranchIds(id);
        if (isSelected) {
            allRelatedIds.forEach(bid => selectedPackageIds.add(bid));
            lastSelectedPackageName = name;
        } else {
            allRelatedIds.forEach(bid => selectedPackageIds.delete(bid));
        }
        updateSearchInputs();
        renderTree(TREE_DATA, treeDropdown); // Перерисовка сохранит expandedNodeIds
        applyFilters();
    }

    function initTagSelect() {
        DOCUMENT_TYPES.forEach(type => {
            const opt = document.createElement('label');
            opt.className = 'tag-option';
            opt.innerHTML = `<input type="checkbox" class="esm-checkbox" value="${escapeHtml(type)}"><span>${escapeHtml(type)}</span>`;
            opt.addEventListener('click', event => event.stopPropagation());
            opt.querySelector('.esm-checkbox').addEventListener('change', event => toggleType(type, event.target.checked));
            tagDropdown.appendChild(opt);
        });
    }

    function toggleType(type, isSelected) {
        if (isSelected) selectedTypes.add(type); else selectedTypes.delete(type);
        updateTags();
        applyFilters();
    }

    function updateTags() {
        tagsWrapper.innerHTML = '';
        const types = Array.from(selectedTypes);

        // Скрываем плейсхолдер если выбраны элементы
        if (types.length > 0) {
            tagInput.placeholder = '';
        } else {
            tagInput.placeholder = 'Выберите типы...';
        }

        if (types.length > 2) {
            tagSelectContainer.classList.add('has-counter');
        } else {
            tagSelectContainer.classList.remove('has-counter');
        }

        types.slice(0, 2).forEach(t => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `<span>${escapeHtml(t)}</span><button type="button" class="close-tag" aria-label="Удалить тип ${escapeHtml(t)}"><i data-lucide="x" style="width:12px;"></i></button>`;
            tag.querySelector('.close-tag').addEventListener('click', (e) => {
                e.stopPropagation(); toggleType(t, false);
                const cb = tagDropdown.querySelector(`input[value="${t}"]`); if (cb) cb.checked = false;
            });
            tagsWrapper.appendChild(tag);
        });
        if (selectedTypes.size > 2) {
            const overflowTypes = types.slice(2);
            const counter = document.createElement('div');
            counter.className = 'tag counter-tag';
            counter.innerHTML = `
                <span class="counter-tag-value">+ ${overflowTypes.length}</span>
                <button type="button" class="close-tag counter-clear" aria-label="Удалить все скрытые типы документов">
                    <i data-lucide="x"></i>
                </button>
                <div class="overflow-types-popover" role="list" aria-label="Дополнительно выбранные типы документов">
                    ${overflowTypes.map(type => `
                        <div class="overflow-type-item" role="listitem">
                            <span title="${escapeHtml(type)}">${escapeHtml(type)}</span>
                            <button type="button" class="close-tag overflow-type-remove" data-type="${escapeHtml(type)}" aria-label="Удалить тип ${escapeHtml(type)}">
                                <i data-lucide="x"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            counter.querySelector('.counter-clear').addEventListener('click', event => {
                event.stopPropagation();
                overflowTypes.forEach(type => {
                    selectedTypes.delete(type);
                    const checkbox = tagDropdown.querySelector(`input[value="${type}"]`);
                    if (checkbox) checkbox.checked = false;
                });
                updateTags();
                applyFilters();
            });

            counter.querySelectorAll('.overflow-type-remove').forEach(button => {
                button.addEventListener('click', event => {
                    event.stopPropagation();
                    const type = button.dataset.type;
                    selectedTypes.delete(type);
                    const checkbox = tagDropdown.querySelector(`input[value="${type}"]`);
                    if (checkbox) checkbox.checked = false;
                    updateTags();
                    applyFilters();
                });
            });
            tagsWrapper.appendChild(counter);
        }
        if (window.lucide) window.lucide.createIcons();
    }

    function applyFilters() {
        const filters = searchFiltersUi.collectSearchFilters({
            fullTextSearchId: 'full-text-search',
            dateInputId: 'date-period-input',
            searchRelatedToggleId: 'search-related-toggle',
            myDocsToggleId: 'my-docs-toggle',
            selectedPackageIds,
            availablePackageIds,
            selectedTypes
        });

        // 1. Первый проход: Основные фильтры
        let filtered = esmDocuments.filter(doc => filteringDomain.matchesDocumentFilters(doc, filters));

        // Сброс признака вторичности перед возможным переназначением
        esmDocuments.forEach(d => delete d.isSecondaryConnection);

        // 2. Второй проход: Добавление связанных документов (если включено)
        if (filters.searchRelated && filtered.length > 0) {
            const secondaryDocs = filteringDomain.getSecondaryConnectionDocs(esmDocuments, filtered, {
                isDocumentAvailable: doc => !filters.myDocsOnly || doc.myDocument === true
            });
            secondaryDocs.forEach(doc => doc.isSecondaryConnection = true);
            filtered = [...filtered, ...secondaryDocs];
        }

        lastFilteredData = applySort(filtered);
        documentSelection.retainDocuments(lastFilteredData);
        currentPage = 1;
        renderTable(lastFilteredData);
        renderPaginationControls(lastFilteredData.length);
        updateFloatingBar();
    }

    function parseDateCustom(dateStr) {
        return tableViewDomain.parseDateCustom(dateStr);
    }

    function applySort(data) {
        return tableViewDomain.sortDocuments(data, {
            sortField: currentSortField,
            sortDir: currentSortDir
        });
    }

    function findPackagePath(id, nodes = TREE_DATA, path = []) {
        return packageDomain.findPackagePath(id, nodes, path);
    }

    function renderTable(data) {
        const tableBody = document.getElementById('table-body');
        if (!tableBody) return;

        const pageData = tableViewDomain.getPageItems(data, { currentPage, pageSize });

        documentsTableUi.renderDocumentRows(tableBody, pageData, {
            activeColumns,
            pinnedColumns,
            selectedDocumentIds: documentSelection.selectedIds,
            markForDeletionSvg: MARK_FOR_DELETION_SVG,
            findPackagePath,
            getPluralForm,
            onOpenRelations: doc => {
                openRelatedDrawer(doc);
            },
            onToggleDeletion: doc => {
                    doc.markedForDeletion = !doc.markedForDeletion;
                    applyFilters();
                    updateFloatingBar();
                    
                    const action = doc.markedForDeletion ? 'отмечена на удаление' : 'пометка снята';
                    showToast('Пометка на удаление', `Позиция № ${doc.number} ${action}`);
            },
            onSelectionChange: () => {
                documentsTableUi.syncSelectAll(
                    document.getElementById('select-all'),
                    pageData,
                    documentSelection.selectedIds,
                    () => {
                        renderTable(data);
                        updateFloatingBar();
                    }
                );
                updateFloatingBar();
            }
        });

        if (window.lucide) window.lucide.createIcons();
        updatePinnedOffsets();
        document.getElementById('count-total').textContent = data.length;
        
        documentsTableUi.syncSelectAll(document.getElementById('select-all'), pageData, documentSelection.selectedIds, () => {
            renderTable(data);
            updateFloatingBar();
        });
    }

    function updatePinnedOffsets() {
        const table = document.getElementById('esm-table');
        const headerRow = table?.querySelector('thead tr');
        if (!table || !headerRow) return;

        const checkboxCell = headerRow.querySelector('th.col-checkbox');
        let leftOffset = checkboxCell ? checkboxCell.getBoundingClientRect().width : 44;

        activeColumns.forEach((colId, index) => {
            const headerCell = headerRow.querySelector(`th[data-sort="${colId}"]`);
            const isPinned = pinnedColumns.has(colId);

            if (!isPinned) {
                if (headerCell) headerCell.style.left = '';
                return;
            }

            const leftValue = `${Math.round(leftOffset)}px`;
            if (headerCell) headerCell.style.left = leftValue;

            table.querySelectorAll('tbody tr').forEach(row => {
                const bodyCell = row.children[index + 1];
                if (bodyCell && bodyCell.classList.contains('pinned-col')) {
                    bodyCell.style.left = leftValue;
                }
            });

            if (headerCell && headerCell.getBoundingClientRect().width > 0) {
                leftOffset += headerCell.getBoundingClientRect().width;
            }
        });
    }

    function updateFloatingBar() {
        documentSelection.syncFloatingBar(esmDocuments);
    }

    function renderPaginationControls(totalItems) {
        const totalPages = tableViewDomain.getTotalPages(totalItems, pageSize);
        const container = document.querySelector('.pagination-controls');
        if (!container) return;

        container.replaceChildren();
        if (totalPages <= 1) return;

        const pagination = createPagination({
            currentPage,
            totalPages,
            label: 'Страницы результатов поиска',
            onChange: page => {
                currentPage = page;
                renderTable(lastFilteredData);
                renderPaginationControls(totalItems);
            }
        });
        container.append(pagination.element);
    }

    function updateSearchInputs() {
        treeTagsWrapper.innerHTML = '';
        const optionsContainer = document.getElementById('package-options-container');
        const relatedCb = document.getElementById('search-related-toggle');

        if (selectedPackageIds.size === 0) {
            treeInput.value = '';
            treeInput.placeholder = 'Корень системы / Документы';
            if (optionsContainer) optionsContainer.style.display = 'none';
            if (relatedCb) relatedCb.checked = false;
        } else {
            treeInput.value = '';
            treeInput.placeholder = '';
            if (optionsContainer) optionsContainer.style.display = 'flex';

            const tag = document.createElement('div');
            tag.className = 'tag package-count-tag';
            const count = selectedPackageIds.size;
            tag.innerHTML = `<span>Выбрано: ${count}</span><button type="button" class="close-tag" aria-label="Очистить выбранные пакеты"><i data-lucide="x" style="width:12px;"></i></button>`;

            tag.querySelector('.close-tag').addEventListener('click', (e) => {
                e.stopPropagation();
                selectedPackageIds.clear();
                updateSearchInputs();
                renderTree(TREE_DATA, treeDropdown);
                applyFilters();
            });

            treeTagsWrapper.appendChild(tag);
        }
        if (window.lucide) window.lucide.createIcons();
    }

    // Симуляция множественных связей для некоторых документов
    esmDocuments.forEach((doc, idx) => {
        // Документ 1: в двух папках (1 квартал и ОРД)
        if (idx === 1) doc.packageIds = ['a-q1', 'ord'];
        // Документ 4: в трех папках (2 квартал, Кредитные, Пакеты не найдены -> заменим на реальные)
        if (idx === 4) doc.packageIds = ['a-q2', 'cr-sber', 'hr-docs'];
        // Документ 10: для разнообразия
        if (idx === 10) doc.packageIds = ['c-order', 'expertise', 'rns'];
    });

    function getPluralForm(n, form1, form2, form5) {
        n = Math.abs(n) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return form5;
        if (n1 > 1 && n1 < 5) return form2;
        if (n1 === 1) return form1;
        return form5;
    }

    const documentRelationsDrawer = documentRelationsDrawerUi.createDocumentRelationsDrawerController({
        overlayId: 'drawer-overlay',
        drawerId: 'related-drawer',
        subtitleId: 'drawer-subtitle',
        iconContainerId: 'drawer-type-icon',
        tableId: 'related-table',
        tableBodyId: 'related-table-body',
        selectAllSelector: '.drawer-select-all',
        getDocuments: () => esmDocuments,
        parseDate: parseDateCustom,
        findPackagePath,
        getPluralForm,
        onToggleDeletion: doc => {
            doc.markedForDeletion = !doc.markedForDeletion;
            applyFilters();
            updateFloatingBar();

            const action = doc.markedForDeletion ? 'отмечена на удаление' : 'пометка снята';
            showToast('Пометка на удаление', `Позиция № ${doc.number} ${action}`);
        }
    });

    function openRelatedDrawer(sourceDocs) {
        documentRelationsDrawer.open(sourceDocs);
    }

    function closeRelatedDrawer() {
        documentRelationsDrawer.close();
    }

    function openSettingsDrawer() {
        if (documentColumnSettings) {
            documentColumnSettings.openDrawer();
        }
    }

    function closeSettingsDrawer() {
        if (documentColumnSettings) {
            documentColumnSettings.closeDrawer();
        }
    }

    function findPackageById(id, nodes = TREE_DATA) {
        return packageDomain.findPackageById(id, nodes);
    }

    function showToast(title, message) {
        if (feedbackOverlays) {
            feedbackOverlays.showToast(title, message);
        }
    }

export function initEsmSearchApp() {
        if (isInitialized) return;
        if (!document.getElementById('esm-search-root') && !document.getElementById('js-esm-integrated-root')) return;

        isInitialized = true;

        feedbackOverlays = feedbackOverlaysUi.createFeedbackOverlayController({
            toastContainerId: 'toast-container',
            onCreateIcons: () => {
                if (window.lucide) window.lucide.createIcons();
            }
        });

        documentColumnSettings = documentColumnSettingsUi.createDocumentColumnSettingsController({
            overlayId: 'drawer-overlay',
            drawerId: 'settings-drawer',
            openButtonId: 'open-settings-btn',
            closeButtonId: 'close-settings-drawer',
            libraryToggleButtonId: 'library-toggle-btn',
            panesSelector: '.settings-panes-container',
            mainListSelector: '.settings-accordion-content',
            libraryListSelector: '.additional-attributes-list',
            librarySearchSelector: '.settings-search-input',
            defaultButtonId: 'settings-default-btn',
            applyButtonId: 'settings-apply-btn',
            tableSelector: '#esm-table',
            viewDropdownId: 'settings-view-dropdown',
            viewSaveButtonId: 'settings-view-save-btn',
            saveViewOverlayId: 'save-view-overlay',
            viewTemplateInputId: 'view-template-name',
            confirmSaveViewButtonId: 'confirm-save-view',
            closeSaveViewButtonId: 'close-save-view-modal',
            cancelSaveViewButtonId: 'cancel-save-view',
            baseState: BASE_STATE,
            initialOrder: INITIAL_ORDER,
            pinnedColumns,
            getLastFilteredData: () => lastFilteredData,
            onApplyColumns: ({ active, pinned }) => {
                activeColumns = [...active];
                pinnedColumns.clear();
                pinned.forEach(columnId => pinnedColumns.add(columnId));
            },
            onRenderTable: renderTable,
            onCreateIcons: () => {
                if (window.lucide) window.lucide.createIcons();
            }
        });
        documentColumnSettings.attachEventListeners();

        document.getElementById('drawer-overlay').addEventListener('click', () => {
            closeRelatedDrawer();
            closeSettingsDrawer();
        });

        // Table sorting logic (Main Grid - Event Delegation)
        const esmTableHead = document.querySelector('#esm-table thead');
        if (esmTableHead) {
            const sortByHeader = th => {
                const sortField = th.dataset.sort;
                if (currentSortField === sortField) {
                    currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSortField = sortField;
                    currentSortDir = 'asc';
                }

                document.querySelectorAll('#esm-table th.sortable').forEach(header => {
                    header.removeAttribute('data-sort-dir');
                    header.setAttribute('aria-sort', 'none');
                    const icon = header.querySelector('.sort-icon');
                    if (icon) {
                        if (header.dataset.sort === 'name') {
                            icon.setAttribute('data-lucide', 'arrow-down-a-z');
                        } else {
                            icon.setAttribute('data-lucide', 'arrow-down');
                        }
                    }
                });

                th.setAttribute('data-sort-dir', currentSortDir);
                th.setAttribute('aria-sort', currentSortDir === 'asc' ? 'ascending' : 'descending');
                const activeIcon = th.querySelector('.sort-icon');
                if (activeIcon) {
                    if (sortField === 'name') {
                        activeIcon.setAttribute('data-lucide', currentSortDir === 'asc' ? 'arrow-down-a-z' : 'arrow-up-z-a');
                    } else {
                        activeIcon.setAttribute('data-lucide', currentSortDir === 'asc' ? 'arrow-down' : 'arrow-up');
                    }
                }
                
                lastFilteredData = applySort(lastFilteredData);
                renderTable(lastFilteredData);
                if (window.lucide) window.lucide.createIcons();
            };

            esmTableHead.querySelectorAll('.sortable').forEach(header => {
                header.tabIndex = 0;
                header.setAttribute('aria-sort', 'none');
            });
            esmTableHead.addEventListener('click', event => {
                const header = event.target.closest('.sortable');
                if (header) sortByHeader(header);
            });
            esmTableHead.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                const header = event.target.closest('.sortable');
                if (!header) return;
                event.preventDefault();
                sortByHeader(header);
            });
        }

        // Sidebar tabs logic
        const activateSidebarTab = tab => {
            document.querySelectorAll('.sidebar-tab').forEach(item => {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
                item.tabIndex = -1;
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.tabIndex = 0;
            const targetId = tab.getAttribute('data-target');
            document.querySelectorAll('.sidebar-view').forEach(view => {
                view.classList.remove('active-view');
            });
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active-view');

            if (targetId === 'templates-view') renderSavedTemplates();
        };
        document.querySelectorAll('.sidebar-tab').forEach(tab => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', String(tab.classList.contains('active')));
            tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
            tab.addEventListener('click', () => activateSidebarTab(tab));
            tab.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                activateSidebarTab(tab);
            });
        });

        renderTree(TREE_DATA, treeDropdown);
        initTagSelect();
        lastFilteredData = esmDocuments;
        applyFilters();

        document.getElementById('full-text-search').addEventListener('input', applyFilters);
        document.getElementById('search-related-toggle').addEventListener('change', applyFilters);
        document.getElementById('my-docs-toggle').addEventListener('change', applyFilters);

        searchCalendar = searchCalendarUi.createSearchCalendarController({
            inputId: 'date-period-input',
            dropdownId: 'esm-calendar-dropdown',
            rangeToggleId: 'range-mode-toggle',
            clearButtonId: 'date-period-clear',
            onBeforeOpen: container => closeAllDropdowns(container),
            onSelectDate: () => applyFilters()
        });
        searchCalendar.init();

        function closeAllDropdowns(exceptContainer = null) {
            if (exceptContainer !== treeContainer) {
                treeContainer.classList.remove('open');
                treeHeader.setAttribute('aria-expanded', 'false');
            }
            if (exceptContainer !== tagSelectContainer) {
                tagSelectContainer.classList.remove('open');
                tagSelectContainer.setAttribute('aria-expanded', 'false');
            }
            
            const dateInputMainContainer = document.querySelector('#date-period-input')?.closest('.date-period-container');
            if (exceptContainer !== dateInputMainContainer) {
                if (dateInputMainContainer) dateInputMainContainer.classList.remove('open');
            }

            if (dynamicAttributeFilters) {
                dynamicAttributeFilters.closeDropdownsExcept(exceptContainer);
            }

            if (searchCalendar) searchCalendar.closeIfExcept(exceptContainer);
            
            document.querySelectorAll('.menu-container.open').forEach(m => {
                if (exceptContainer !== m) m.classList.remove('open');
            });
        }

        treeDropdown.setAttribute('role', 'tree');
        treeHeader.setAttribute('role', 'button');
        treeHeader.tabIndex = 0;
        treeHeader.setAttribute('aria-expanded', 'false');
        const toggleTreeDropdown = event => {
            event.stopPropagation();
            if (!treeContainer.classList.contains('open')) closeAllDropdowns(treeContainer);
            const isOpen = treeContainer.classList.toggle('open');
            treeHeader.setAttribute('aria-expanded', String(isOpen));
        };
        treeHeader.addEventListener('click', toggleTreeDropdown);
        treeHeader.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            toggleTreeDropdown(event);
        });

        tagSelectContainer.setAttribute('role', 'combobox');
        tagSelectContainer.setAttribute('aria-expanded', 'false');
        tagSelectContainer.tabIndex = 0;
        tagSelectContainer.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (!e.target.closest('.close-tag')) { 
                if (!tagSelectContainer.classList.contains('open')) closeAllDropdowns(tagSelectContainer);
                const isOpen = tagSelectContainer.classList.toggle('open');
                tagSelectContainer.setAttribute('aria-expanded', String(isOpen));
            } 
        });
        tagSelectContainer.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            if (event.target !== tagSelectContainer) return;
            event.preventDefault();
            tagSelectContainer.click();
        });
        
        // События плавающей панели
        const documentPackageSelector = documentPackageSelectorUi.createDocumentPackageSelectorController({
            treeContainerId: 'move-package-tree',
            applyButtonId: 'apply-move-package',
            treeData: TREE_DATA,
            onCreateIcons: () => { if (window.lucide) window.lucide.createIcons(); }
        });

        documentBulkActionsUi.bindDocumentBulkActions({
            selection: documentSelection,
            getDocuments: () => esmDocuments,
            bulkMoveButton: 'bulk-move-to-package',
            moveModal: 'move-package-overlay',
            moveCount: 'move-package-count',
            applyMoveButton: 'apply-move-package',
            closeMoveButton: 'close-move-package-modal',
            cancelMoveButton: 'cancel-move-package',
            bulkDeleteButton: 'bulk-delete',
            bulkUnmarkButton: 'bulk-unmark',
            bulkResetButton: 'bulk-reset',
            bulkCollectRelationsButton: 'bulk-collect-relations',
            resetMoveTarget: documentPackageSelector.reset,
            getMoveTargetIds: documentPackageSelector.getSelectedIds,
            getPackageName: id => findPackageById(id)?.name || '',
            renderPackageSelector: documentPackageSelector.render,
            renderCurrentTable: () => {
                renderTable(lastFilteredData);
            },
            applyFilters,
            openRelatedDrawer,
            showToast,
            getPluralForm
        });

        document.addEventListener('click', (e) => {
            const calendarDropdown = document.getElementById('esm-calendar-dropdown');
            if (calendarDropdown && calendarDropdown.contains(e.target)) return;
            closeAllDropdowns();
        });
        treeDropdown.addEventListener('click', e => e.stopPropagation());
        tagDropdown.addEventListener('click', e => e.stopPropagation());

        treeInput.addEventListener('input', () => renderTree(TREE_DATA, treeDropdown, 0, treeInput.value));
        tagInput.addEventListener('input', () => {
            const val = tagInput.value.toLowerCase();
            tagDropdown.querySelectorAll('.tag-option').forEach(opt => opt.style.display = opt.textContent.toLowerCase().includes(val) ? 'flex' : 'none');
        });

        dynamicAttributeFilters = dynamicAttributeFiltersUi.createDynamicAttributeFiltersController({
            containerId: 'dynamic-attributes-container',
            menuId: 'attribute-selection-menu',
            addButtonId: 'add-filter-btn',
            addButtonContainerSelector: '.add-filter-container',
            getDocuments: () => esmDocuments,
            applyFilters,
            closeAllDropdowns,
            searchCalendar,
            escapeHtml
        });

        const closeDrawerBtn = document.getElementById('close-drawer');
        if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeRelatedDrawer);

        const drawerOverlay = document.getElementById('drawer-overlay');
        if (drawerOverlay) drawerOverlay.addEventListener('click', closeRelatedDrawer);

        function resetAllFilters() {
            searchFiltersUi.resetFilterValues({
                fullTextSearchId: 'full-text-search',
                dateInputId: 'date-period-input',
                myDocsToggleId: 'my-docs-toggle',
                selectedPackageIds,
                selectedTypes
            });

            updateSearchInputs();
            updateTags();
            searchCalendar?.sync();
            renderTree(TREE_DATA, treeDropdown);
            applyFilters();
        }

        const resetTopBtn = document.getElementById('reset-filters-top');
        if (resetTopBtn) {
            resetTopBtn.addEventListener('click', resetAllFilters);
        }

        const resetBtnSidebar = document.getElementById('clear-btn-sidebar');
        if (resetBtnSidebar) {
            resetBtnSidebar.addEventListener('click', resetAllFilters);
        }

        const saveTopBtn = document.getElementById('save-filters-top');
        if (saveTopBtn) {
            saveTopBtn.addEventListener('click', () => {
                // Download logic here
            });
        }
        // Template saving logic
        const saveBtnSidebar = document.getElementById('save-btn-sidebar');
        const defaultFooterActions = document.getElementById('default-footer-actions');
        const saveTemplateBlock = document.getElementById('save-template-block');
        const cancelTemplateBtn = document.getElementById('cancel-template-btn');
        const confirmTemplateBtn = document.getElementById('confirm-template-btn');
        const templateNameInput = document.getElementById('template-name-input');
        
        const savedTemplatesList = document.getElementById('saved-templates-list');
        const emptyTemplatesState = document.getElementById('empty-templates-state');
        let savedTemplates = searchFilterTemplatesUi.readTemplates('esm_saved_templates');
        renderSavedTemplates();

        if (saveBtnSidebar) {
            saveBtnSidebar.addEventListener('click', () => {
                defaultFooterActions.style.display = 'none';
                saveTemplateBlock.style.display = 'flex';
                templateNameInput.value = '';
                templateNameInput.focus();
            });
        }

        if (cancelTemplateBtn) {
            cancelTemplateBtn.addEventListener('click', () => {
                saveTemplateBlock.style.display = 'none';
                defaultFooterActions.style.display = 'flex';
            });
        }

        if (confirmTemplateBtn) {
            confirmTemplateBtn.addEventListener('click', () => {
                const name = templateNameInput.value.trim();
                if (!name) return;

                const filterState = searchFiltersUi.getTemplateFilterState({
                    fullTextSearchId: 'full-text-search',
                    dateInputId: 'date-period-input',
                    searchRelatedToggleId: 'search-related-toggle',
                    myDocsToggleId: 'my-docs-toggle',
                    selectedPackageIds,
                    selectedTypes
                });

                const attributes = dynamicAttributeFilters ? dynamicAttributeFilters.collectTemplateAttributes() : [];

                // Form JSON representing current state
                const templateData = searchFilterTemplatesUi.createTemplateData({
                    name,
                    filterState,
                    attributes
                });

                savedTemplates.push(templateData);
                searchFilterTemplatesUi.writeTemplates('esm_saved_templates', savedTemplates);
                renderSavedTemplates();

                saveTemplateBlock.style.display = 'none';
                defaultFooterActions.style.display = 'flex';
            });
        }

        function renderSavedTemplates() {
            searchFilterTemplatesUi.renderTemplateList({
                templates: savedTemplates,
                listId: 'saved-templates-list',
                emptyId: 'empty-templates-state',
                onDelete: index => {
                    savedTemplates.splice(index, 1);
                    searchFilterTemplatesUi.writeTemplates('esm_saved_templates', savedTemplates);
                    renderSavedTemplates();
                },
                onApply: template => {
                    // Restore state
                    searchFiltersUi.applyTemplateFilterState({
                        fullTextSearchId: 'full-text-search',
                        dateInputId: 'date-period-input',
                        searchRelatedToggleId: 'search-related-toggle',
                        myDocsToggleId: 'my-docs-toggle',
                        selectedPackageIds,
                        selectedTypes
                    }, template);

                    if (dynamicAttributeFilters) {
                        dynamicAttributeFilters.restoreTemplateAttributes(template.attributes || []);
                    }

                    // Switch back to filters view
                    const filterTab = document.querySelector('.sidebar-tab[data-target="filters-view"]');
                    if (filterTab) filterTab.click();

                    updateSearchInputs();
                    updateTags();
                    searchCalendar?.sync();
                    renderTree(TREE_DATA, treeDropdown);
                    applyFilters();
                }
            });
        }

        window.addEventListener('resize', updatePinnedOffsets);
        if (window.lucide) window.lucide.createIcons();
    }
