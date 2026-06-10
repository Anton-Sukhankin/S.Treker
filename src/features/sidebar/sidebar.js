import { MOCK_LAYOUTS, generateTask } from '../../data/mock-tasks.js';
import { REVERSE_STATUS_MAP } from '../../data/statuses.js';
import { getBaseColumnsForSettings } from '../../domain/columns.js';
import { skipFilters } from '../../domain/filters.js';
import { getVisibleBusinessDomainIds } from '../../domain/task-selectors.js';
import { EMPTY_STATE_HTML } from '../../ui/empty-state.js';
import { TASK_METAPHOR_ICON } from '../../ui/icons.js';

export function initSidebarNavigation() {
  const mt = document.getElementById('js-main-title');
  document.addEventListener('click', e => {
      const stoggle = e.target.closest('.js-subgroup-toggle');
      if (stoggle) {
          e.preventDefault();
          const block = stoggle.closest('.nav-subgroup-block');
          if (block) {
              const domainId = block.getAttribute('data-domain');
              const attr = block.getAttribute('data-attr');
              const isExpanded = block.classList.contains('is-expanded');
              
              if (isExpanded) {
                  block.classList.remove('is-expanded');
              } else {
                  block.classList.add('is-expanded');
              }
              
              const g = window.generatedGroups.find(x => x.domainId === domainId && x.attribute === attr);
              if (g) {
                  g.isExpanded = !isExpanded;
              }
          }
          return;
      }
      
      const resetBtn = e.target.closest('.js-reset-domain-groups');
      if (resetBtn) {
          e.preventDefault(); e.stopPropagation();
          const domainEl = resetBtn.closest('.js-sidebar-system');
          const domainId = domainEl.getAttribute('data-system');
          window.generatedGroups = window.generatedGroups.filter(g => g.domainId !== domainId);
          if (window.navigationContext.id === domainId && (window.navigationContext.type === 'grouped-value' || window.navigationContext.type === 'attribute-group')) {
              window.navigationContext = { type: domainId === 'all' ? 'all' : 'system', id: domainId };
              if (mt) mt.textContent = domainEl.querySelector('.nav-label')?.textContent || domainId;
              const sl = REVERSE_STATUS_MAP[document.querySelector('.js-status-tabs .js-overview-tab.is-active')?.getAttribute('data-status')] || 'К исполнению';
              window.renderTab(sl);
          }
          renderSidebarGroupings();
          return;
      }
      
      const deleteItemBtn = e.target.closest('.js-delete-group-item');
      if (deleteItemBtn) {
          e.preventDefault(); e.stopPropagation();
          const item = deleteItemBtn.closest('.nav-subgroup-item');
          const domainId = item.getAttribute('data-domain');
          const attr = item.getAttribute('data-attr');
          const val = item.getAttribute('data-val');
          const g = window.generatedGroups.find(x => x.domainId === domainId && x.attribute === attr);
          if (g) {
              g.groups = g.groups.filter(sg => sg.value !== val);
              if (g.groups.length === 0) window.generatedGroups = window.generatedGroups.filter(x => x !== g);
          }
          if (window.navigationContext.id === domainId && window.navigationContext.attr === attr && window.navigationContext.val === val) {
              window.navigationContext = { type: domainId === 'all' ? 'all' : 'system', id: domainId };
              if (mt) {
                  const dEl = document.querySelector(`.js-sidebar-system[data-system="${domainId}"]`);
                  mt.textContent = dEl?.querySelector('.nav-label')?.textContent || domainId;
              }
              const sl = REVERSE_STATUS_MAP[document.querySelector('.js-status-tabs .js-overview-tab.is-active')?.getAttribute('data-status')] || 'К исполнению';
              window.renderTab(sl);
          }
          renderSidebarGroupings();
          return;
      }

      const deleteCustomGroupBtn = e.target.closest('.js-delete-custom-group');
      if (deleteCustomGroupBtn) {
          e.preventDefault(); e.stopPropagation();
          const item = deleteCustomGroupBtn.closest('.js-sidebar-system');
          const groupId = item.getAttribute('data-system');
          
          window.customGroups = window.customGroups.filter(g => g.id !== groupId);
          
          if (window.navigationContext.id === groupId) {
              window.navigationContext = { type: 'all', id: 'all' };
              if (mt) mt.textContent = 'Все задачи';
              const sl = REVERSE_STATUS_MAP[document.querySelector('.js-status-tabs .js-overview-tab.is-active')?.getAttribute('data-status')] || 'К исполнению';
              window.renderTab(sl);
          }
          updateSidebarCounts();
          return;
      }
      
      const sitem = e.target.closest('.js-subgroup-item');
      if (sitem) {
          e.preventDefault();
          document.querySelectorAll('.js-sidebar-system, .js-subgroup-item').forEach(i => i.classList.remove('is-active'));
          sitem.classList.add('is-active');
          const domainId = sitem.getAttribute('data-domain');
          const attr = sitem.getAttribute('data-attr');
          const val = sitem.getAttribute('data-val');
          window.navigationContext = { type: 'grouped-value', id: domainId, attr, val };
          
          const domainLabel = document.querySelector(`.js-sidebar-system[data-system="${domainId}"] .nav-label`)?.textContent || 'Все задачи';
          if (mt) mt.textContent = `${domainLabel} • ${val}`;
          
          const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
          const sl = REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению';
          window.renderTab(sl);
          updateSidebarCounts();
          return;
      }

      const domainExpand = e.target.closest('.js-domain-expand');
      if (domainExpand) {
         e.preventDefault();
         const it_dom = domainExpand.closest('.js-sidebar-system');
         if (!it_dom) return;
         const isExpanded = it_dom.getAttribute('data-state') === 'expanded';
         it_dom.setAttribute('data-state', isExpanded ? 'collapsed' : 'expanded');
         
         const wrapper = it_dom.closest('.nav-domain-wrapper');
         if (wrapper) {
             const subgroups = wrapper.querySelector('.nav-domain-subgroups');
             if (subgroups) {
                 subgroups.style.display = isExpanded ? 'none' : 'block';
             }
         }
         
         const expandActions = it_dom.querySelectorAll('.js-domain-expand');
         expandActions.forEach(el => el.title = isExpanded ? 'раскрыть' : 'свернуть');
         
         const hIcon = it_dom.querySelector('.hover-icon');
         if (hIcon) {
             const up = hIcon.querySelector('.chevron-up');
             const down = hIcon.querySelector('.chevron-down');
             if (up) up.style.display = isExpanded ? 'none' : 'block';
             if (down) down.style.display = isExpanded ? 'block' : 'none';
         }
         return;
      }

      const it = e.target.closest('.js-sidebar-system');
      if (it) {
          e.preventDefault();
          document.querySelectorAll('.js-sidebar-system, .js-subgroup-item').forEach(i => i.classList.remove('is-active'));
          it.classList.add('is-active');
          const id = it.getAttribute('data-system'); 
          const type = it.getAttribute('data-type') || 'system';
          window.navigationContext = { type, id };
          if (mt) mt.textContent = it.querySelector('.nav-label')?.textContent || id;
          
          const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
          const sl = REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению';
          window.renderTab(sl);
          updateSidebarCounts();
      }
  });
}



export function updateSidebarCounts() {
  const t = { all: 0 };
  getVisibleBusinessDomainIds().forEach(domainId => { t[domainId] = 0; });
  window.validTaskIds = new Set();
  window.globalValidTaskIds = new Set();
  window.__taskDataMap = {}; // Cache for sum and overdue counts
  
  // Get current active tab name
  const activeTabEl = document.querySelector('.js-overview-tab.is-active');
  const activeStatusKey = activeTabEl?.getAttribute('data-status');
  const activeTabName = REVERSE_STATUS_MAP[activeStatusKey] || 'К исполнению';

  // 1. Calculate GLOBAL filtered totals for the sidebar (across all tabs)
  const excludedStatuses = ['Обработаны мной', 'Наблюдаю', 'Инициированы мной'];
  
  Object.keys(MOCK_LAYOUTS).forEach(tabName => {
    const layout = MOCK_LAYOUTS[tabName];
    Object.keys(layout).forEach(sid => {
      const max = layout[sid] || 0;
      for (let i = 0; i < max; i++) {
        const task = generateTask(tabName, sid, i);
        if (!skipFilters(task)) {
          // Store data for sidebar groupings
          window.__taskDataMap[task.id] = {
            sum: task.sum,
            isOverdue: task.isOverdue,
            isNew: task.isNew,
            status: task.status,
            queue: tabName
          };
          
          // CRITICAL: Exclude specific statuses from all global/sidebar counts
          if (excludedStatuses.includes(tabName)) continue;

          window.globalValidTaskIds.add(task.id);
          if (t[sid] !== undefined) t[sid]++;
          t.all++;
          
          // Also mark as valid if it belongs to the CURRENT active tab
          if (tabName === activeTabName) {
            window.validTaskIds.add(task.id);
          }
        }
      }
    });
  });

  // 4. Update Sidebar Badges
  document.querySelectorAll('.js-sidebar-system').forEach(it => {
    const id = it.getAttribute('data-system'); 
    const b = it.querySelector('.ds-badge:not(.expand-action)');
    if (b && t[id] !== undefined) {
      b.innerHTML = TASK_METAPHOR_ICON + t[id];
      // Force neutral color for sidebar items as requested
      b.classList.remove('is-overdue');
    }
  });

  renderCustomGroups();
  renderSidebarGroupings();
}



export function renderSidebarGroupings() {
  document.querySelectorAll('#js-sidebar-systems .js-sidebar-system, .js-sidebar-system[data-system="all"]').forEach(domainEl => {
     const domainId = domainEl.getAttribute('data-system');
     const groupings = window.generatedGroups.filter(g => g.domainId === domainId);
     
     let wrapper = domainEl.closest('.nav-domain-wrapper');
     if (!wrapper) {
         wrapper = document.createElement('div');
         wrapper.className = 'nav-domain-wrapper';
         domainEl.parentNode.insertBefore(wrapper, domainEl);
         wrapper.appendChild(domainEl);
         
         if (!domainEl.querySelector('.expand-action')) {
             const badgeNode = domainEl.querySelector('.ds-badge');
             let actionWrapper = domainEl.querySelector('.nav-item-actions');
             
             if (!actionWrapper) {
                 actionWrapper = document.createElement('div');
                 actionWrapper.className = 'nav-item-actions';
                 if (badgeNode) {
                     badgeNode.parentNode.insertBefore(actionWrapper, badgeNode);
                     actionWrapper.appendChild(badgeNode);
                 } else {
                     domainEl.appendChild(actionWrapper);
                 }
             }

             const expandAction = document.createElement('div');
             expandAction.className = 'expand-action js-domain-expand ds-badge';
             expandAction.title = 'свернуть/развернуть';
             expandAction.innerHTML = `<svg class="nav-item-action" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" style="opacity:0.6; margin-right: 4px;"><path d="M7 8C7 7.44772 7.44772 7 8 7H10C10.5523 7 11 7.44772 11 8V10C11 10.5523 10.5523 11 10 11H8C7.44772 11 7 10.5523 7 10V8Z" fill="currentColor"/><path d="M8 13C7.44772 13 7 13.4477 7 14V16C7 16.5523 7.44772 17 8 17H10C10.5523 17 11 16.5523 11 16V14C11 13.4477 10.5523 13 10 13H8Z" fill="currentColor"/><path d="M13 8C13 7.44772 13.4477 7 14 7H16C16.5523 7 17 7.44772 17 8V10C17 10.5523 16.5523 11 16 11H14C13.4477 11 13 10.5523 13 10V8Z" fill="currentColor"/><path d="M14 13C13.4477 13 13 13.4477 13 14V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V14C17 13.4477 16.5523 13 16 13H14Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5Z" fill="currentColor"/></svg><span class="js-group-count">0</span>`;
             
             if (badgeNode) {
                 actionWrapper.insertBefore(expandAction, badgeNode);
             } else {
                 actionWrapper.appendChild(expandAction);
             }
         }

         const iconContainer = domainEl.querySelector('.nav-icon');
         if (iconContainer && !domainEl.querySelector('.hover-icon')) {
             const origSvg = iconContainer.querySelector('svg');
             if (origSvg) origSvg.classList.add('original-icon');
             const hoverIcon = document.createElement('div');
             hoverIcon.className = 'hover-icon ds-collapse-indicator js-domain-expand';
             hoverIcon.title = 'свернуть/развернуть';
             hoverIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" class="chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" class="chevron-down" style="display:none;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
             iconContainer.appendChild(hoverIcon);
         }
     }
     
     let subgroupsContainer = wrapper.querySelector('.nav-domain-subgroups');
     if (!subgroupsContainer) {
         subgroupsContainer = document.createElement('div');
         subgroupsContainer.className = 'nav-domain-subgroups';
         wrapper.appendChild(subgroupsContainer);
     }
     
     if (groupings.length === 0) {
         subgroupsContainer.innerHTML = '';
         subgroupsContainer.style.display = 'none';
         wrapper.classList.remove('has-grouping');
         const rBtn = domainEl.querySelector('.reset-all-groups');
         if (rBtn) rBtn.remove();
         domainEl.removeAttribute('data-state');
         return;
     }

     wrapper.classList.add('has-grouping');
     
     if (!domainEl.querySelector('.reset-all-groups')) {
         const resetIcon = document.createElement('div');
         resetIcon.className = 'nav-action-icon reset-all-groups js-reset-domain-groups';
         resetIcon.title = 'Сбросить все группировки';
         resetIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`;
         domainEl.appendChild(resetIcon);
     }
     
     let html = '';
     let totalGroupValues = 0;
     groupings.forEach(g => {
         const list = getBaseColumnsForSettings(domainId);
         const match = list.find(l => l.key === g.attribute);
         const attrLabel = match ? match.label : g.attribute;
         
         const isExpandedAttr = g.isExpanded !== false;
         html += `
           <div class="nav-subgroup-block ${isExpandedAttr ? 'is-expanded' : ''}" data-domain="${domainId}" data-attr="${g.attribute}">
             <div class="nav-subgroup-header js-subgroup-toggle">
               <span class="nav-subgroup-header-text">По ${attrLabel.toLowerCase()}</span>
               <svg class="ds-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"></polyline></svg>
             </div>
             <div class="nav-subgroup-list" style="display: flex;">
         `;
         
         const sortedGroups = [...g.groups].sort((a,b) => {
             if (a.value === 'Без значения') return 1;
             if (b.value === 'Без значения') return -1;
             return 0;
         });
         
         sortedGroups.forEach(sg => {
            const isActive = window.navigationContext.type === 'grouped-value' && window.navigationContext.id === domainId && window.navigationContext.attr === g.attribute && window.navigationContext.val === sg.value;
            let realCount = sg.count;
            if (window.globalValidTaskIds && Array.isArray(sg.taskIds)) {
                realCount = sg.taskIds.filter(id => window.globalValidTaskIds.has(id)).length;
            }
            if (realCount === 0) return;
            totalGroupValues++;

             const escapedVal = String(sg.value).replace(/"/g, '&quot;');
             
             // Calculate additional metrics (Sum and Overdue)
             let subgroupSum = 0;
             let subgroupOverdue = 0;
             let subgroupNew = 0;
             if (Array.isArray(sg.taskIds)) {
                sg.taskIds.forEach(id => {
                   if (window.globalValidTaskIds.has(id)) {
                      const d = window.__taskDataMap[id];
                      if (d) {
                         subgroupSum += (parseFloat(d.sum) || 0);
                         if (d.isOverdue) subgroupOverdue++;
                         if (d.isNew) subgroupNew++;
                      }
                   }
                });
             }

             // Format Sum: if >= 1,000,000 replace six zeros with 'млн. ₽'
             let fmtSum;
             if (subgroupSum >= 1000000) {
                 fmtSum = (subgroupSum / 1000000).toLocaleString('ru-RU', { maximumFractionDigits: 1 }) + ' млн. ₽';
             } else {
                 fmtSum = new Intl.NumberFormat('ru-RU').format(Math.round(subgroupSum));
             }

             html += `
               <div class="nav-subgroup-item js-subgroup-item ${isActive ? 'is-active' : ''}" data-domain="${domainId}" data-attr="${g.attribute}" data-val="${escapedVal}">
                 <span class="nav-subgroup-name">${sg.value}</span>
                 <div class="nav-subgroup-badges" style="display: flex; align-items: center; margin-left: auto; gap: 4px;">
                   ${subgroupOverdue > 0 ? `
                     <span class="ds-badge ds-badge--red" title="Просрочено">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                       ${subgroupOverdue}
                     </span>
                   ` : ''}
                   ${subgroupNew > 0 ? `
                      <span class="ds-badge ds-badge--green" title="Новые задачи">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ${subgroupNew}
                      </span>
                    ` : ''}
                   ${subgroupSum > 0 ? `<span class="ds-badge ds-badge--blue" title="Сумма">${fmtSum}</span>` : ''}
                   <span class="ds-badge">${TASK_METAPHOR_ICON}${realCount}</span>
                 </div>
                 <div class="nav-action-icon js-delete-group-item" title="Удалить значение">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                 </div>
               </div>
             `;
         });
         
         if (html.endsWith('<div class="nav-subgroup-list" style="display: flex;">\n         ')) {
             html += EMPTY_STATE_HTML;
         }
         
         html += `</div></div>`;
     });
     
     subgroupsContainer.innerHTML = html;
     
     const groupCountEl = domainEl.querySelector('.js-group-count');
     if (groupCountEl) {
         groupCountEl.textContent = totalGroupValues;
     }

     if (!domainEl.hasAttribute('data-state')) {
         domainEl.setAttribute('data-state', 'expanded');
     }
     
     const isExpanded = domainEl.getAttribute('data-state') === 'expanded';
     subgroupsContainer.style.display = isExpanded ? 'block' : 'none';
     
     const eAction = domainEl.querySelector('.expand-action');
     if (eAction) {
         eAction.title = isExpanded ? 'свернуть' : 'раскрыть';
     }
     
     const hIcon = domainEl.querySelector('.hover-icon');
     if (hIcon) {
         hIcon.title = isExpanded ? 'свернуть' : 'раскрыть';
         const up = hIcon.querySelector('.chevron-up');
         const down = hIcon.querySelector('.chevron-down');
         if (up) up.style.display = isExpanded ? 'none' : 'block';
         if (down) down.style.display = isExpanded ? 'block' : 'none';
     }
  });
}



export function renderCustomGroups() {
  function countTps(taskIds) {
    let tCount = 0;
    const excludedStatuses = ['Обработаны мной', 'Наблюдаю', 'Инициированы мной'];
    Object.keys(MOCK_LAYOUTS).forEach(tab => {
       if (excludedStatuses.includes(tab)) return;
       Object.keys(MOCK_LAYOUTS[tab]).forEach(sid => {
          const max = MOCK_LAYOUTS[tab][sid] || 0;
          for(let i=0; i<max; i++) {
             const task = generateTask(tab, sid, i);
             if (!skipFilters(task) && taskIds.includes(task.id)) tCount++;
          }
       });
    });
    return tCount;
  }

  const cGroups = window.customGroups.filter(g => g.type !== 'bookmark');
  const bookmarks = window.customGroups.filter(g => g.type === 'bookmark');

  const cSection = document.getElementById('js-accordion-custom');
  const c = document.getElementById('js-list-custom-groups');
  
  if (cSection) {
    if (cGroups.length === 0) {
      cSection.style.display = 'none';
    } else {
      cSection.style.display = 'block';
      const titleEl = cSection.querySelector('.ds-accordion-title');
      if (titleEl) titleEl.textContent = 'Новая группа';
      
      if (c) {
        c.innerHTML = cGroups.map(g => {
          const tCount = countTps(g.taskIds);
          return `
            <a class="nav-item js-sidebar-system ${window.navigationContext.id===g.id?'is-active':''}" data-system="${g.id}" data-type="custom-group">
              <div class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span class="nav-label">${g.name}</span>
              <span class="ds-badge">${TASK_METAPHOR_ICON}${tCount}</span>
              <div class="nav-action-icon js-delete-custom-group" title="Удалить группу">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
            </a>`;
        }).join('');
      }
    }
  }

  const bList = document.getElementById('js-list-bookmarks');
  if (bList) {
    bList.innerHTML = bookmarks.map(g => {
      let bHtml = `<div class="ds-accordion is-expanded" id="${g.id}" style="margin-top: 8px;">
        <div class="ds-accordion-header js-bookmark-toggle">
           <svg class="ds-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"></polyline></svg>
           <span class="ds-accordion-title">${g.name}</span>
           <div style="display:flex; align-items:center; gap: 8px; margin-left: auto;">
             <button class="ds-icon-button js-delete-bookmark" data-id="${g.id}" style="padding:4px; margin:-4px;" title="Удалить закладку">
               <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
             </button>
           </div>
        </div>
        <div class="ds-accordion-body">`;
      
      g.groups.forEach(subG => {
        const tCount = countTps(subG.taskIds);
        bHtml += `<a class="nav-item js-sidebar-system ${window.navigationContext.id===subG.id?'is-active':''}" data-system="${subG.id}" data-type="custom-group"><div class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></div><span class="nav-label">${subG.name}</span><span class="ds-badge">${TASK_METAPHOR_ICON}${tCount}</span></a>`;
      });
      bHtml += `</div></div>`;
      return bHtml;
    }).join('');

    bList.querySelectorAll('.js-bookmark-toggle').forEach(el => {
      el.onclick = (e) => {
        if (e.target.closest('.js-delete-bookmark')) return;
        el.closest('.ds-accordion').classList.toggle('is-expanded');
      }
    });

    bList.querySelectorAll('.js-delete-bookmark').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const bkm = window.customGroups.find(g => g.id === id);
        if(bkm) {
           const ids = bkm.groups.map(g => g.id);
           if (ids.includes(window.navigationContext.id)) {
              window.navigationContext = {type: 'all', id: 'all'};
              const mt = document.getElementById('js-main-title'); if (mt) mt.textContent = 'Все задачи';
              const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
              window.renderTab(REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению');
           }
        }
        window.customGroups = window.customGroups.filter(g => g.id !== id);
        updateSidebarCounts();
      }
    });
  }
}
