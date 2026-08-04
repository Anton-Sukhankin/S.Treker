export const componentRegistry = Object.freeze([
  { id: 'ui.button', name: 'Button', category: 'control', module: './button.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'ui.input', name: 'Input', category: 'control', module: './input.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'ui.select', name: 'Select', category: 'control', module: './select.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'ui.multi-select', name: 'MultiSelect', category: 'control', module: './multi-select.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'ui.checkbox', name: 'Checkbox', category: 'control', module: './checkbox.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'ui.segmented-control', name: 'Segmented Control', category: 'control', module: './segmented-control.js', consumers: ['tasks', 'search'], dsBinding: null },
  { id: 'pattern.pagination', name: 'Pagination', category: 'navigation', module: './pagination.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'pattern.drawer', name: 'Drawer', category: 'overlay', module: './drawer.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'pattern.modal', name: 'Modal', category: 'overlay', module: './modal.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
  { id: 'feedback.toast', name: 'Toast', category: 'feedback', module: './toast.js', consumers: ['tasks', 'search', 'document-workflows'], dsBinding: null },
]);

export function getComponentDefinition(id) {
  return componentRegistry.find(component => component.id === id) || null;
}
