import { createButton } from './button.js';
import { createToast } from './toast.js';

export default { title: 'Feedback/Toast', tags: ['autodocs'] };

export const Default = {
  render: () => {
    const wrapper = document.createElement('div');
    const toast = createToast({ duration: 0 });
    const trigger = createButton({
      label: 'Показать уведомление',
      variant: 'primary',
      onClick: () => toast.show({ title: 'Готово', message: 'Изменения применены.' }),
    });
    wrapper.append(trigger, toast.element);
    return wrapper;
  },
};
