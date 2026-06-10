import { showToast } from '../../ui/toast.js';

export function updateFloatingActionBar() {
  const f = document.getElementById('js-selection-fab');
  const c = document.getElementById('js-selection-count');
  if (!f || !c) return;

  const count = window.selectedTaskIds.size;
  c.textContent = count;
  f.classList.toggle('is-active', count > 0);

  if (count === 0) return;

  const selectedIds = Array.from(window.selectedTaskIds);
  const queues = new Set();
  selectedIds.forEach(id => {
    const d = window.__taskDataMap[id];
    if (d) queues.add(d.queue || d.queueLabel || d.status);
  });

  // Toggle buttons based on aggregated queues.
  const btnAssign = f.querySelector('.js-fab-assign');
  const btnWork = f.querySelector('.js-fab-work');
  const btnDone = f.querySelector('.js-fab-done');
  const btnFromGroup = f.querySelector('.js-fab-from-group');

  if (btnAssign) btnAssign.style.display = queues.has('К назначению') ? 'inline-flex' : 'none';
  if (btnWork) btnWork.style.display = queues.has('К исполнению') ? 'inline-flex' : 'none';
  if (btnDone) btnDone.style.display = queues.has('В работе') ? 'inline-flex' : 'none';
  
  // Rule for custom group removal
  const isCustomContext = (window.navigationContext.type === 'bookmark' || window.navigationContext.type === 'custom-group' || window.navigationContext.type === 'grouped-value');
  if (btnFromGroup) btnFromGroup.style.display = isCustomContext ? 'inline-flex' : 'none';
}

function getVisibleTableTaskIds() {
  return Array.from(document.querySelectorAll('#js-unified-table-body .ds-table-row[data-id]'))
    .map(row => row.getAttribute('data-id'))
    .filter(Boolean);
}

function syncSelectAllTableCheckbox() {
  const selectAll = document.querySelector('.js-select-all-table');
  if (!selectAll) return;

  const visibleIds = getVisibleTableTaskIds();
  const selectedVisibleCount = visibleIds.filter(id => window.selectedTaskIds.has(id)).length;
  const isAllSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
  const isPartlySelected = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;

  selectAll.classList.toggle('is-checked', isAllSelected);
  selectAll.classList.toggle('is-indeterminate', isPartlySelected);
}

function setTaskSelection(row, isSelected) {
  const id = row?.getAttribute('data-id');
  if (!id) return;

  row.classList.toggle('is-selected', isSelected);
  row.querySelector('.js-task-select')?.classList.toggle('is-checked', isSelected);

  if (isSelected) {
    window.selectedTaskIds.add(id);
  } else {
    window.selectedTaskIds.delete(id);
  }
}

function setVisibleTableSelection(isSelected) {
  document.querySelectorAll('#js-unified-table-body .ds-table-row[data-id]').forEach(row => {
    setTaskSelection(row, isSelected);
  });
}



export function initTaskSelection() { 
  document.querySelector('.app-layout').addEventListener('click', e => { 
    const selectAll = e.target.closest('.js-select-all-table');
    if (selectAll) {
      const visibleIds = getVisibleTableTaskIds();
      const shouldSelectAll = visibleIds.some(id => !window.selectedTaskIds.has(id));

      setVisibleTableSelection(shouldSelectAll);
      syncSelectAllTableCheckbox();
      updateFloatingActionBar();
      return;
    }

    const it = e.target.closest('.js-task-select'); 
    if (!it) return; 
    const id = it.getAttribute('data-id'); 
    const row = it.closest('.ds-task-row, .ds-table-row'); 
    
    if (window.selectedTaskIds.has(id)) { 
      window.selectedTaskIds.delete(id); 
      it.classList.remove('is-checked'); 
      row?.classList.remove('is-selected'); 
    } else { 
      window.selectedTaskIds.add(id); 
      it.classList.add('is-checked'); 
      row?.classList.add('is-selected'); 
    } 
    syncSelectAllTableCheckbox();
    updateFloatingActionBar();
  }); 

  window.addEventListener('table-rendered', syncSelectAllTableCheckbox);
}


export function initFloatingActionBar({ updateSidebarCounts, reverseStatusMap }) {
  const REVERSE_STATUS_MAP = reverseStatusMap;
  const m = document.getElementById('js-modal-move');
  const submitBtn = document.getElementById('js-btn-move-submit');

  document.querySelector('.js-fab-to-group')?.addEventListener('click', () => { 
    const input = document.getElementById('js-move-group-name');
    if (input) input.value = ''; 
    m?.showModal(); 
  });

  document.querySelector('.js-btn-confirm-move')?.addEventListener('click', () => {
    const n = document.getElementById('js-move-group-name')?.value || 'Группа';
    window.customGroups.push({ id: 'custom-'+Date.now(), name: n, taskIds: Array.from(window.selectedTaskIds) });
    showToast(`Задачи перемещены в "${n}"`);
    
    window.selectedTaskIds.clear(); 
    updateFloatingActionBar();
    m?.close();
    updateSidebarCounts(); 
    const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
    window.renderTab(REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению');
  });

  document.querySelectorAll('.js-modal-move-close').forEach(b => b.onclick = () => m?.close());
  document.querySelector('.js-fab-clear')?.addEventListener('click', () => { 
    window.selectedTaskIds.clear(); 
    updateFloatingActionBar();
    document.querySelectorAll('.js-task-select').forEach(c => c.classList.remove('is-checked')); 
    document.querySelectorAll('.js-select-all-table').forEach(c => c.classList.remove('is-checked', 'is-indeterminate'));
    document.querySelectorAll('.ds-task-row, .ds-table-row').forEach(r => r.classList.remove('is-selected')); 
  });

  document.querySelector('.js-fab-from-group')?.addEventListener('click', () => {
    const nav = window.navigationContext;
    if (nav.type !== 'custom-group' && !(nav.type === 'system' && nav.id.startsWith('custom-'))) return;
    
    const groupId = nav.id;
    const groupIndex = window.customGroups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;
    
    const group = window.customGroups[groupIndex];
    const selectedIds = Array.from(window.selectedTaskIds);
    group.taskIds = group.taskIds.filter(id => !window.selectedTaskIds.has(id));
    
    selectedIds.forEach(id => {
       showToast(`Задача ${id} удалена из группы`);
    });

    if (group.taskIds.length === 0) {
      window.customGroups.splice(groupIndex, 1);
      showToast(`Группа "${group.name}" удалена, так как она пуста`);
      window.navigationContext = { type: 'all', id: 'all' };
      
      // Sync sidebar active state
      document.querySelectorAll('.js-sidebar-system').forEach(i => i.classList.remove('is-active'));
      const allItem = document.querySelector('.js-sidebar-system[data-system="all"]');
      if (allItem) allItem.classList.add('is-active');
    }
    
    window.selectedTaskIds.clear();
    updateFloatingActionBar();
    updateSidebarCounts();
    
    const at = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
    window.renderTab(REVERSE_STATUS_MAP[at?.getAttribute('data-status')] || 'К исполнению');
  });
}
