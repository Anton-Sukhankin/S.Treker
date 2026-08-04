import { createSegmentedControl } from './segmented-control.js';

const items = [
  { value: 'cards', label: 'Карточки' },
  { value: 'table', label: 'Таблица' },
];

export default {
  title: 'Controls/Segmented Control',
  tags: ['autodocs'],
  args: { label: 'Режим отображения', items, value: 'cards' },
};

export const ViewMode = { render: args => createSegmentedControl(args).element };
