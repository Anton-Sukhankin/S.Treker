import {
  getConfigurableDefaultColumns,
  getDefaultColumnsForSettings,
  getLibraryAttributesForNavigation,
  isLibraryColumn,
  normalizeColumnState,
  repairColumnState
} from '../../domain/columns.js';

const FIXED_COLUMN_KEYS = ['cb', 'id', 'title'];

export function initColumnsDrawer({ updateSidebarCounts, reverseStatusMap }) {
  const REVERSE_STATUS_MAP = reverseStatusMap;
  const ov = document.getElementById('columns-overlay');
  const dr = document.getElementById('columns-drawer');
  if (!ov || !dr) return;

  if (!window.columnPresets) window.columnPresets = {};
  if (!window.activeColumnPreset) window.activeColumnPreset = {};

  const draftColumnState = {};
  const draftActiveColumnPreset = {};

  function cloneState(state) {
    return Array.isArray(state) ? state.map(item => ({ ...item })) : [];
  }

  function getBaseState(navId) {
    return getConfigurableDefaultColumns(navId).map(column => ({
      key: column.key,
      visible: true
    }));
  }

  function getSafePresetState(navId, presetName) {
    const state = window.columnPresets?.[navId]?.[presetName];
    return normalizeColumnState(navId, state) || getBaseState(navId);
  }

  function getCommittedState(navId) {
    repairColumnState(navId);
    return normalizeColumnState(navId, window.customColumnState?.[navId]) || getBaseState(navId);
  }

  function beginDraft(navId) {
    draftColumnState[navId] = cloneState(getCommittedState(navId));
    draftActiveColumnPreset[navId] = window.activeColumnPreset[navId] || 'base';
  }

  function getDraftState(navId) {
    if (!draftColumnState[navId]) beginDraft(navId);
    return draftColumnState[navId];
  }

  function setDraftState(navId, state) {
    draftColumnState[navId] = normalizeColumnState(navId, state) || getBaseState(navId);
  }

  function collectDrawerState() {
    const state = [];
    document.querySelectorAll('#js-draggable-columns-list .ds-column-row').forEach(row => {
      state.push({
        key: row.getAttribute('data-key'),
        visible: row.querySelector('.js-col-cb').checked
      });
    });
    return state;
  }

  function syncDraftFromDrawer(navId) {
    const state = collectDrawerState();
    if (state.length > 0) setDraftState(navId, state);
  }

  function getDraftBaseCols(navId) {
    const baseCols = getDefaultColumnsForSettings(navId);
    const keys = new Set(baseCols.map(column => column.key));
    const next = [...baseCols];

    getDraftState(navId).forEach(item => {
      if (keys.has(item.key)) return;
      const attr = getLibraryAttributesForNavigation(navId).find(column => column.key === item.key);
      if (!attr) return;
      next.push(attr);
      keys.add(item.key);
    });

    return next;
  }

  function getDraftActivePreset(navId) {
    return draftActiveColumnPreset[navId] || window.activeColumnPreset[navId] || 'base';
  }

  function renderPresetDropdown() {
    const navId = window.navigationContext.id;
    const active = getDraftActivePreset(navId);
    const presets = window.columnPresets[navId] || {};
    const dd = dr.querySelector('.js-preset-dropdown');
    const current = dr.querySelector('.js-preset-current span');
    if (!dd || !current) return;

    current.textContent = active === 'base' ? 'Базовое отображение' : active;

    let html = `<div class="ds-preset-option ${active === 'base' ? 'is-active' : ''} js-preset-option" data-preset="base">
      <span class="ds-preset-option-name">Базовое отображение</span>
    </div>`;

    Object.keys(presets).forEach(pName => {
      html += `<div class="ds-preset-option ${active === pName ? 'is-active' : ''} js-preset-option" data-preset="${pName}">
        <span class="ds-preset-option-name">${pName}</span>
        <div class="ds-preset-option-delete js-preset-delete" title="Удалить" data-preset="${pName}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </div>
      </div>`;
    });

    dd.innerHTML = html;
  }

  function checkChanges() {
    const navId = window.navigationContext.id;
    const activeName = getDraftActivePreset(navId);
    const presets = window.columnPresets[navId] || {};
    const baseState = activeName === 'base' ? getBaseState(navId) : (presets[activeName] || getBaseState(navId));
    const currentState = collectDrawerState();
    const isChanged = JSON.stringify(baseState) !== JSON.stringify(currentState);
    const saveBtn = dr.querySelector('.js-preset-save-btn');

    if (!saveBtn) return;
    if (isChanged) {
      saveBtn.removeAttribute('disabled');
    } else {
      saveBtn.setAttribute('disabled', 'true');
    }
  }

  function getVisibleStateMap(navId) {
    const stateMap = {};
    getDraftState(navId).forEach((item, index) => {
      stateMap[item.key] = { order: index, visible: item.visible };
    });
    return stateMap;
  }

  function renderColumnsDrawer() {
    const container = document.getElementById('columns-visibility-sections');
    const navId = window.navigationContext.id;
    if (!container) return;

    const stateMap = getVisibleStateMap(navId);
    const configurable = getDraftBaseCols(navId)
      .filter(column => !FIXED_COLUMN_KEYS.includes(column.key))
      .sort((a, b) => {
        const aOrder = stateMap[a.key] !== undefined ? stateMap[a.key].order : 999;
        const bOrder = stateMap[b.key] !== undefined ? stateMap[b.key].order : 999;
        return aOrder - bOrder;
      })
      .map(column => ({
        ...column,
        _tempVisible: stateMap[column.key] !== undefined ? stateMap[column.key].visible : true
      }));

    let html = '<div class="ds-filter-section"><div class="ds-filter-options" id="js-draggable-columns-list">';

    configurable.forEach(column => {
      const returnIconHtml = isLibraryColumn(navId, column.key)
        ? `<div class="js-return-to-library" data-key="${column.key}" title="Вернуть в библиотеку" style="cursor: pointer; margin-right: 8px; color: #6B7280; display: flex; align-items: center;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </div>`
        : '';

      html += `
      <label class="ds-checkbox ds-column-row" data-key="${column.key}" draggable="true" style="cursor: grab;">
        <div class="ds-column-row__content">
          <input type="checkbox" class="js-col-cb" value="${column.key}" ${column._tempVisible ? 'checked' : ''}>
          <span class="ds-checkbox__box"></span>
          <span class="ds-checkbox__label">${column.label}</span>
        </div>
        <div style="display: flex; align-items: center;">
          ${returnIconHtml}
          <div class="ds-drag-handle" style="cursor: grab; display: flex;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </div>
        </div>
      </label>`;
    });

    html += '</div></div>';
    container.innerHTML = html;

    renderPresetDropdown();
    checkChanges();
    updateLibraryResetButton();
    bindColumnListInteractions(navId);
  }

  function bindColumnListInteractions(navId) {
    const list = document.getElementById('js-draggable-columns-list');
    if (!list) return;
    let draggingEl = null;

    list.querySelectorAll('.ds-column-row').forEach(row => {
      row.addEventListener('dragstart', e => {
        draggingEl = row;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
        setTimeout(() => row.classList.add('is-dragging'), 0);
      });

      row.addEventListener('dragend', () => {
        draggingEl?.classList.remove('is-dragging');
        draggingEl = null;
        syncDraftFromDrawer(navId);
        checkChanges();
      });

      row.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
          list.appendChild(draggingEl);
        } else {
          list.insertBefore(draggingEl, afterElement);
        }
      });
    });

    list.querySelectorAll('.js-col-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        syncDraftFromDrawer(navId);
        checkChanges();
      });
    });

    list.querySelectorAll('.js-return-to-library').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const key = btn.getAttribute('data-key');
        syncDraftFromDrawer(navId);
        setDraftState(navId, getDraftState(navId).filter(item => item.key !== key));
        renderColumnsDrawer();
        renderLibrary();
        checkChanges();
        updateLibraryResetButton();
      });
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.ds-column-row:not(.is-dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  dr.querySelector('.js-preset-dropdown-trigger')?.addEventListener('click', e => {
    if (e.target.closest('.js-preset-dropdown')) return;
    const dd = dr.querySelector('.js-preset-dropdown');
    if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.js-preset-dropdown-trigger')) {
      const dd = dr.querySelector('.js-preset-dropdown');
      if (dd) dd.style.display = 'none';
    }
  });

  dr.addEventListener('click', e => {
    const delBtn = e.target.closest('.js-preset-delete');
    if (delBtn) {
      e.stopPropagation();
      const presetName = delBtn.getAttribute('data-preset');
      const navId = window.navigationContext.id;
      if (window.columnPresets[navId]) delete window.columnPresets[navId][presetName];
      if (window.activeColumnPreset[navId] === presetName) {
        window.activeColumnPreset[navId] = 'base';
      }

      if (getDraftActivePreset(navId) === presetName) {
        draftActiveColumnPreset[navId] = 'base';
        setDraftState(navId, getBaseState(navId));
        renderColumnsDrawer();
        if (dr.classList.contains('is-expanded')) renderLibrary();
      } else {
        renderPresetDropdown();
        checkChanges();
      }
      return;
    }

    const opt = e.target.closest('.js-preset-option');
    if (opt) {
      const presetName = opt.getAttribute('data-preset');
      const navId = window.navigationContext.id;
      draftActiveColumnPreset[navId] = presetName;
      setDraftState(navId, presetName === 'base' ? getBaseState(navId) : getSafePresetState(navId, presetName));
      const dd = dr.querySelector('.js-preset-dropdown');
      if (dd) dd.style.display = 'none';
      renderColumnsDrawer();
      if (dr.classList.contains('is-expanded')) renderLibrary();
    }
  });

  const pModal = document.getElementById('js-modal-preset');
  const pInput = document.getElementById('js-preset-name-input');

  dr.querySelector('.js-preset-save-btn')?.addEventListener('click', () => {
    if (!pInput || !pModal) return;
    pInput.value = '';
    pModal.showModal();
  });

  document.querySelectorAll('.js-modal-preset-close').forEach(btn => {
    btn.addEventListener('click', () => pModal?.close());
  });

  document.querySelector('.js-btn-preset-submit')?.addEventListener('click', () => {
    if (!pInput || !pModal) return;
    const name = pInput.value.trim();
    if (!name) return;
    const navId = window.navigationContext.id;
    if (!window.columnPresets[navId]) window.columnPresets[navId] = {};

    syncDraftFromDrawer(navId);
    window.columnPresets[navId][name] = normalizeColumnState(navId, getDraftState(navId)) || getBaseState(navId);
    draftActiveColumnPreset[navId] = name;
    setDraftState(navId, window.columnPresets[navId][name]);

    renderPresetDropdown();
    checkChanges();
    pModal.close();
  });

  document.querySelectorAll('.js-btn-open-columns').forEach(btn => {
    btn.addEventListener('click', () => {
      beginDraft(window.navigationContext.id);
      renderColumnsDrawer();
      ov.classList.add('is-active');
      dr.classList.add('is-active');
    });
  });

  document.querySelectorAll('.js-columns-close').forEach(btn => {
    btn.addEventListener('click', () => {
      ov.classList.remove('is-active');
      dr.classList.remove('is-active');
      closeLibrary();
    });
  });

  function openLibrary() {
    dr.classList.add('is-expanded');
    dr.querySelector('.js-open-library')?.classList.add('is-active');
    renderLibrary();
    updateLibraryResetButton();
  }

  function closeLibrary() {
    dr.classList.remove('is-expanded');
    dr.querySelector('.js-open-library')?.classList.remove('is-active');
    updateLibraryResetButton();
  }

  function hasAddedLibraryAttributes(navId) {
    return getDraftBaseCols(navId).some(column => isLibraryColumn(navId, column.key));
  }

  function updateLibraryResetButton() {
    const navId = window.navigationContext.id;
    const resetBtn = dr.querySelector('.js-library-reset');
    if (!resetBtn) return;
    resetBtn.disabled = !hasAddedLibraryAttributes(navId);
  }

  dr.querySelector('.js-open-library')?.addEventListener('click', () => {
    if (dr.classList.contains('is-expanded')) {
      closeLibrary();
    } else {
      openLibrary();
    }
  });

  function renderLibrary() {
    const list = document.getElementById('js-library-list');
    if (!list) return;
    const navId = window.navigationContext.id;
    const available = getLibraryAttributesForNavigation(navId);
    const draftKeys = new Set(getDraftState(navId).map(item => item.key));
    const query = document.querySelector('.js-library-search')?.value.toLowerCase() || '';
    const filtered = available.filter(attr => attr.label.toLowerCase().includes(query));

    let html = '';
    filtered.forEach(attr => {
      const isAdded = draftKeys.has(attr.key);
      const actionTitle = isAdded ? 'Вернуть в библиотеку' : 'Добавить в колонки';
      const actionIcon = isAdded
        ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6B7280" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2.2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

      html += `
        <div class="ds-library-item">
          <div class="ds-library-item__label">${attr.label}</div>
          <button class="js-library-item-action" data-key="${attr.key}" data-added="${isAdded ? 'true' : 'false'}" title="${actionTitle}">
            ${actionIcon}
          </button>
        </div>
      `;
    });

    if (filtered.length === 0) {
      html = '<div style="padding: 20px; text-align: center; color: var(--color-text-secondary); font-size: 0.875rem;">Атрибуты не найдены</div>';
    }

    list.innerHTML = html;
    updateLibraryResetButton();
  }

  document.querySelector('.js-library-search')?.addEventListener('input', renderLibrary);

  document.getElementById('js-library-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.js-library-item-action');
    if (!btn) return;

    const key = btn.getAttribute('data-key');
    const navId = window.navigationContext.id;
    const attr = getLibraryAttributesForNavigation(navId).find(item => item.key === key);
    if (!attr) return;

    syncDraftFromDrawer(navId);
    if (getDraftState(navId).some(item => item.key === key)) {
      setDraftState(navId, getDraftState(navId).filter(item => item.key !== key));
    } else {
      setDraftState(navId, [...getDraftState(navId), { key, visible: true }]);
    }

    renderColumnsDrawer();
    renderLibrary();
    checkChanges();
    updateLibraryResetButton();
  });

  dr.querySelector('.js-library-reset')?.addEventListener('click', () => {
    const navId = window.navigationContext.id;
    if (!hasAddedLibraryAttributes(navId)) return;

    syncDraftFromDrawer(navId);
    setDraftState(navId, getDraftState(navId).filter(item => !isLibraryColumn(navId, item.key)));

    renderColumnsDrawer();
    renderLibrary();
    checkChanges();
    updateLibraryResetButton();
  });

  document.querySelector('.js-columns-apply')?.addEventListener('click', () => {
    const navId = window.navigationContext.id;
    if (!window.customColumnState) window.customColumnState = {};

    syncDraftFromDrawer(navId);
    window.customColumnState[navId] = normalizeColumnState(navId, getDraftState(navId)) || getBaseState(navId);
    window.activeColumnPreset[navId] = getDraftActivePreset(navId);

    ov.classList.remove('is-active');
    dr.classList.remove('is-active');
    closeLibrary();

    const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
    window.renderTab(REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению');
    updateSidebarCounts?.();
  });

  document.querySelectorAll('.js-columns-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      const navId = window.navigationContext.id;
      draftActiveColumnPreset[navId] = 'base';
      setDraftState(navId, getBaseState(navId));
      renderColumnsDrawer();
      renderLibrary();
      checkChanges();
      updateLibraryResetButton();
    });
  });
}
