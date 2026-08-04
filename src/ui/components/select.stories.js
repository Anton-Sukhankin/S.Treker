import { createSelect } from './select.js';

const options = [
  { value: 'one', label: 'Первое значение' },
  { value: 'two', label: 'Второе значение' },
  { value: 'three', label: 'Третье значение' },
];

export default {
  title: 'Controls/Select',
  tags: ['autodocs'],
  args: { label: 'Значение', placeholder: 'Выберите значение', options, value: '', disabled: false },
};

export const Playground = { render: args => createSelect(args).element };
export const Selected = { args: { value: 'two' }, render: args => createSelect(args).element };
