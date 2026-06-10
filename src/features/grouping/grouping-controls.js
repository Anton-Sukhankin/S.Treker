import { buildAttributeGroups } from '../../domain/grouping.js';
import { showToast } from '../../ui/toast.js';

export function initGroupingControls({ updateSidebarCounts }) {
  document.addEventListener('click', event => {
    const trigger = event.target.closest('.js-group-trigger');
    if (!trigger) return;

    event.stopPropagation();

    const attr = trigger.getAttribute('data-attr');
    const domainId = window.navigationContext.id;

    [domainId].forEach(dId => {
      const groupingData = buildAttributeGroups(dId, attr);

      window.generatedGroups = window.generatedGroups.filter(
        group => !(group.domainId === dId && group.attribute === attr)
      );
      window.generatedGroups.push(groupingData);

      const domainEl = document.querySelector(`.js-sidebar-system[data-system="${dId}"]`);
      if (domainEl) domainEl.setAttribute('data-state', 'expanded');
    });

    showToast(`\u0413\u0440\u0443\u043f\u043f\u0438\u0440\u043e\u0432\u043a\u0430 \u043f\u043e: ${attr}`);
    updateSidebarCounts();
  });
}
