import { createButton } from './button.js';
import { createModal } from './modal.js';

export default { title: 'Overlays/Modal', tags: ['autodocs'] };

export const Confirmation = {
  render: () => {
    const wrapper = document.createElement('div');
    const content = document.createElement('p');
    content.textContent = 'Подтвердите выполнение действия.';
    const modal = createModal({
      title: 'Подтверждение',
      content,
      actions: [
        { label: 'Отмена', variant: 'text', onClick: () => modal.close() },
        { label: 'Подтвердить', variant: 'primary', onClick: () => modal.close() },
      ],
    });
    const trigger = createButton({ label: 'Открыть окно', variant: 'primary', onClick: event => modal.open(event.currentTarget) });
    wrapper.append(trigger, modal.element);
    return wrapper;
  },
};
