import { REVERSE_STATUS_MAP } from '../../data/statuses.js';
import { taskPassesFilters } from '../../domain/filters.js';
import { getRowsForNavigation } from '../../domain/task-selectors.js';

export function getActiveOptions(attrKey) {
  const nav = window.navigationContext;
  const activeTabEl = document.querySelector('.js-overview-tab.is-active');
  const activeStatusKey = activeTabEl?.getAttribute('data-status');
  const activeTabName = REVERSE_STATUS_MAP[activeStatusKey] || 'К исполнению';
  const values = new Set();
  getRowsForNavigation(activeTabName, nav).forEach(task => {
    if (taskPassesFilters(task, { ignoreKey: attrKey }) && task[attrKey] !== undefined) {
      values.add(task[attrKey]);
    }
  });
  return Array.from(values).sort((a, b) => String(a).localeCompare(String(b)));
}



export function initMultiSelect() {
  document.querySelectorAll('.js-multi-select').forEach(ms => {
    const trigger = ms.querySelector('.js-ms-trigger');
    const clearBtn = ms.querySelector('.js-ms-clear');
    const dropdown = ms.querySelector('.ds-multi-select__dropdown') || document.createElement('div');
    if (!ms.querySelector('.ds-multi-select__dropdown')) { 
      dropdown.className = 'ds-multi-select__dropdown'; 
      ms.appendChild(dropdown); 
    }
    
    const key = ms.getAttribute('data-filter');
    const tagsContainer = ms.querySelector('.ds-multi-select__tags');
    const placeholder = ms.querySelector('.ds-multi-select__placeholder');

    function render() {
      const selected = window.activeFilters[key] || [];
      const currentOptions = getActiveOptions(key);
      
      if (currentOptions.length === 0) {
        dropdown.innerHTML = '<div class="ds-multi-select__option is-disabled" style="opacity: 0.5; cursor: default;">Нет доступных значений</div>';
      } else {
        dropdown.innerHTML = currentOptions.map(opt => `
          <div class="ds-multi-select__option ${selected.includes(opt) ? 'is-selected' : ''}" data-value="${opt}">
            ${opt}
          </div>
        `).join('');
      }
      
      const tagHtml = selected.slice(0, 1).map(opt => `
        <div class="ds-multi-select__tag">
          <span>${opt}</span>
          <span class="ds-multi-select__tag-remove" data-value="${opt}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="10" height="10"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </span>
        </div>
      `).join('');
      
      tagsContainer.innerHTML = tagHtml + (selected.length > 1 ? `<div class="ds-multi-select__tag">+${selected.length - 1}</div>` : '');
      if (placeholder) placeholder.style.display = selected.length > 0 ? 'none' : 'block';
      if (clearBtn) clearBtn.style.display = selected.length > 0 ? 'flex' : 'none';
      
      // Sync state back to dropdown classes
      ms.querySelectorAll('.ds-multi-select__option').forEach(el => {
        el.classList.toggle('is-selected', selected.includes(el.getAttribute('data-value')));
      });
    }

    trigger.onclick = (e) => {
      if (e.target.closest('.js-ms-clear') || e.target.closest('.ds-multi-select__tag-remove')) return;
      e.stopPropagation();
      document.querySelectorAll('.js-multi-select').forEach(other => { if (other !== ms) other.classList.remove('is-open'); });
      ms.classList.toggle('is-open');
      if (ms.classList.contains('is-open')) render();
    };

    if (clearBtn) {
      clearBtn.onclick = (e) => {
        e.stopPropagation();
        window.activeFilters[key] = [];
        render();
        window.updateFilterIndicators?.();
      };
    }

    dropdown.onclick = (e) => {
      const opt = e.target.closest('.ds-multi-select__option');
      if (!opt) return;
      e.stopPropagation();
      const val = opt.getAttribute('data-value');
      let selected = window.activeFilters[key];
      if (!Array.isArray(selected)) selected = [];
      
      if (selected.includes(val)) {
        window.activeFilters[key] = selected.filter(v => v !== val);
      } else {
        window.activeFilters[key] = [...selected, val];
      }
      render();
      window.updateFilterIndicators?.();
    };

    ms.addEventListener('click', e => {
      const rem = e.target.closest('.ds-multi-select__tag-remove');
      if (rem) {
        e.stopPropagation();
        const val = rem.getAttribute('data-value');
        window.activeFilters[key] = window.activeFilters[key].filter(v => v !== val);
        render();
        window.updateFilterIndicators?.();
      }
    });

    render();
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.js-multi-select').forEach(ms => ms.classList.remove('is-open'));
  });
}
