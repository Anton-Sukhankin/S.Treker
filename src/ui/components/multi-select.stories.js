import { createMultiSelect } from './multi-select.js';

const options = ['Закупки', 'Договоры', 'Поручения', 'Контроль'];

export default {
  title: 'Controls/MultiSelect',
  tags: ['autodocs'],
  args: { label: 'Бизнес-домены', placeholder: 'Выберите домены', options, values: [] },
};

export const Closed = { render: args => createMultiSelect(args).element };
export const WithValues = { args: { values: ['Закупки', 'Договоры'] }, render: args => createMultiSelect(args).element };
