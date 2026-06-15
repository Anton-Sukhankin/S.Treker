import { createDefaultFilters, resetFilters } from '../../domain/filters.js';

const DOMAIN_FILTER_KEYS = {
  ecm: ['docType', 'contractor', 'sum'],
  tracker: ['unit', 'sla'],
  control: ['object', 'criticality']
};

const PANEL_FILTER_KEYS = ['id', 'title', 'docType', 'contractor', 'sum', 'unit', 'sla', 'object', 'criticality'];

function isEmptyFilterValue(value) {
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === 'object') return value.from === null && value.to === null;
  return value === undefined || value === null || value === '';
}

function getActiveDomainId() {
  const nav = window.navigationContext || { type: 'all', id: 'all' };
  if ((nav.type === 'system' || nav.type === 'grouped-value') && nav.id && nav.id !== 'all') return nav.id;
  return 'all';
}

function shouldShowDomainSection(domainId) {
  const activeDomainId = getActiveDomainId();
  return activeDomainId === 'all' || activeDomainId === domainId;
}

function clearHiddenDomainFilters() {
  const activeDomainId = getActiveDomainId();
  if (activeDomainId === 'all') return;

  Object.entries(DOMAIN_FILTER_KEYS).forEach(([domainId, keys]) => {
    if (domainId === activeDomainId) return;
    keys.forEach(key => {
      const fresh = createDefaultFilters()[key];
      if (fresh !== undefined) window.activeFilters[key] = fresh;
    });
  });
}

function parseMoneyValue(value) {
  const digits = String(value || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

function formatMoneyValue(value, withCurrency = false) {
  if (value === null || value === undefined || value === '') return '';
  const formatted = new Intl.NumberFormat('ru-RU').format(value);
  return withCurrency ? `${formatted} ₽` : formatted;
}

function readMoneyRangeConfig(range) {
  return {
    key: range.getAttribute('data-filter') || 'sum',
    min: Number(range.getAttribute('data-min')) || 0,
    max: Number(range.getAttribute('data-max')) || 20000000,
    step: Number(range.getAttribute('data-step')) || 10000
  };
}

function clampMoneyValue(value, min, max, step) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const rounded = Math.round(value / step) * step;
  return Math.min(max, Math.max(min, rounded));
}

function updateMoneyRange(range, nextValue, changedType) {
  const { key, min, max, step } = readMoneyRangeConfig(range);
  const current = window.activeFilters?.[key] || { from: null, to: null };
  let from = Object.prototype.hasOwnProperty.call(nextValue, 'from') ? nextValue.from : current.from;
  let to = Object.prototype.hasOwnProperty.call(nextValue, 'to') ? nextValue.to : current.to;

  from = clampMoneyValue(from, min, max, step);
  to = clampMoneyValue(to, min, max, step);

  if (from !== null && to !== null && from > to) {
    if (changedType === 'to') from = to;
    else to = from;
  }

  if (!window.activeFilters) return;
  window.activeFilters[key] = { from, to };
}

function renderMoneyRange(range) {
  const { key, min, max } = readMoneyRangeConfig(range);
  const value = window.activeFilters?.[key] || { from: null, to: null };
  const from = value.from;
  const to = value.to;
  const lower = from ?? min;
  const upper = to ?? max;
  const rangeSize = Math.max(1, max - min);
  const lowerPercent = ((lower - min) / rangeSize) * 100;
  const upperPercent = ((upper - min) / rangeSize) * 100;
  const focusedInput = range.querySelector('.js-money-range-input:focus');

  range.querySelectorAll('.js-money-range-input').forEach(input => {
    const type = input.getAttribute('data-type');
    const rawValue = type === 'from' ? from : to;
    input.value = formatMoneyValue(rawValue, focusedInput === input ? false : true);
  });

  range.querySelectorAll('.js-money-range-thumb').forEach(thumb => {
    const type = thumb.getAttribute('data-type');
    thumb.value = type === 'from' ? lower : upper;
  });

  const fill = range.querySelector('.js-money-range-fill');
  if (fill) {
    fill.style.left = `${lowerPercent}%`;
    fill.style.width = `${Math.max(0, upperPercent - lowerPercent)}%`;
  }

  range.querySelectorAll('.js-money-range-preset').forEach(preset => {
    const presetFrom = parseMoneyValue(preset.getAttribute('data-from'));
    const presetTo = parseMoneyValue(preset.getAttribute('data-to'));
    preset.classList.toggle('is-active', presetFrom === from && presetTo === to);
  });
}

function renderMoneyRangeControls(drawer) {
  drawer.querySelectorAll('.js-money-range').forEach(renderMoneyRange);
}

function syncMoneyRangeFiltersFromUI(drawer) {
  drawer.querySelectorAll('.js-money-range').forEach(range => {
    const fromInput = range.querySelector('.js-money-range-input[data-type="from"]');
    const toInput = range.querySelector('.js-money-range-input[data-type="to"]');
    updateMoneyRange(range, {
      from: parseMoneyValue(fromInput?.value),
      to: parseMoneyValue(toInput?.value)
    }, 'from');
    renderMoneyRange(range);
  });
}

function initMoneyRangeControls(drawer, onChange) {
  drawer.querySelectorAll('.js-money-range').forEach(range => {
    renderMoneyRange(range);

    range.querySelectorAll('.js-money-range-input').forEach(input => {
      input.addEventListener('focus', () => renderMoneyRange(range));
      input.addEventListener('blur', () => renderMoneyRange(range));
      input.addEventListener('input', () => {
        const type = input.getAttribute('data-type');
        updateMoneyRange(range, { [type]: parseMoneyValue(input.value) }, type);
        renderMoneyRange(range);
        onChange?.();
      });
    });

    range.querySelectorAll('.js-money-range-thumb').forEach(thumb => {
      thumb.addEventListener('input', () => {
        const { min, max } = readMoneyRangeConfig(range);
        const type = thumb.getAttribute('data-type');
        const rawValue = Number(thumb.value);
        const value = type === 'from'
          ? (rawValue <= min ? null : rawValue)
          : (rawValue >= max ? null : rawValue);
        updateMoneyRange(range, { [type]: value }, type);
        renderMoneyRange(range);
        onChange?.();
      });
    });

    range.querySelectorAll('.js-money-range-preset').forEach(preset => {
      preset.addEventListener('click', () => {
        updateMoneyRange(range, {
          from: parseMoneyValue(preset.getAttribute('data-from')),
          to: parseMoneyValue(preset.getAttribute('data-to'))
        }, 'preset');
        renderMoneyRange(range);
        onChange?.();
      });
    });
  });
}

export function initFilterDrawer({ updateSidebarCounts, reverseStatusMap }) {
  const REVERSE_STATUS_MAP = reverseStatusMap;
  const ov = document.getElementById('filter-overlay');
  const dr = document.getElementById('filter-drawer');
  if (!ov || !dr) return;

  function updateDomainSections() {
    dr.querySelectorAll('[data-filter-domain]').forEach(section => {
      section.style.display = shouldShowDomainSection(section.getAttribute('data-filter-domain')) ? '' : 'none';
    });
  }

  function countActive() {
    let count = 0;
    const f = window.activeFilters || {};
    PANEL_FILTER_KEYS.forEach(key => {
      const value = f[key];
      if (Array.isArray(value)) {
        if (value.length > 0) count++;
      }
      else if (!isEmptyFilterValue(value)) count++;
    });

    const el = document.getElementById('js-filter-count');
    if (el) el.textContent = count;

    document.querySelectorAll('.js-btn-open-filters').forEach(filterBtn => {
      filterBtn.classList.toggle('is-active-filter', count > 0);
      filterBtn.classList.toggle('has-active-filters', count > 0);
      filterBtn.querySelectorAll('.js-filter-reset-count').forEach(counter => {
        counter.textContent = count;
      });
    });

    document.querySelectorAll('.ds-button__badge').forEach(b => {
      b.style.display = 'none';
    });
  }

  function rerenderAfterFilterChange() {
    const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
    window.renderTab(REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению');
    updateSidebarCounts();
  }

  function resetFilterControlValues() {
    const currentSearch = window.activeFilters?.search || '';
    resetFilters(window.activeFilters);
    window.activeFilters.search = currentSearch;

    dr.querySelectorAll('input').forEach(i => {
      if (i.type === 'checkbox') i.checked = false;
      else i.value = '';
    });
    dr.querySelectorAll('.ds-multi-select__tags').forEach(t => { t.innerHTML = ''; });
    dr.querySelectorAll('.ds-multi-select__placeholder').forEach(p => { p.style.display = 'block'; });
    dr.querySelectorAll('.js-ms-clear').forEach(btn => { btn.style.display = 'none'; });
    dr.querySelectorAll('.ds-multi-select__option.is-selected').forEach(opt => opt.classList.remove('is-selected'));
    dr.querySelectorAll('.js-multi-select.is-open').forEach(ms => ms.classList.remove('is-open'));
    renderMoneyRangeControls(dr);
    countActive();
  }

  function resetPanelFilters() {
    resetFilterControlValues();
  }

  function resetPanelFiltersAndApply() {
    resetFilterControlValues();
    ov.classList.remove('is-active');
    dr.classList.remove('is-active');
    rerenderAfterFilterChange();
  }

  window.updateFilterIndicators = countActive;

  window.applyFilters = (options = {}) => {
    syncMoneyRangeFiltersFromUI(dr);
    clearHiddenDomainFilters();

    countActive();
    if (!options.keepDrawerOpen) {
      ov.classList.remove('is-active');
      dr.classList.remove('is-active');
    }

    rerenderAfterFilterChange();
  };

  document.querySelectorAll('.js-filter-apply').forEach(b => {
    b.onclick = () => window.applyFilters();
  });

  document.querySelectorAll('.js-filter-reset').forEach(b => b.onclick = () => {
    resetPanelFilters();
  });

  document.querySelectorAll('.js-btn-open-filters').forEach(b => b.onclick = () => {
    updateDomainSections();
    clearHiddenDomainFilters();
    renderMoneyRangeControls(dr);
    countActive();
    ov.classList.add('is-active');
    dr.classList.add('is-active');
  });

  document.querySelectorAll('.js-filter-close, #filter-overlay').forEach(b => b.onclick = () => {
    ov.classList.remove('is-active');
    dr.classList.remove('is-active');
  });

  document.querySelectorAll('.js-filter-reset-indicator').forEach(indicator => {
    indicator.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      resetPanelFiltersAndApply();
    });
  });

  initMoneyRangeControls(dr, countActive);
}
