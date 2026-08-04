import { createButton } from './button.js';
import { createDrawer } from './drawer.js';

export default { title: 'Overlays/Drawer', tags: ['autodocs'] };

export const Default = {
  render: () => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    content.style.padding = '16px';
    content.textContent = 'Содержимое панели задается компонентом-потребителем.';
    const footer = document.createElement('div');
    footer.className = 'component-story-stack';
    footer.append(createButton({ label: 'Сбросить', variant: 'text' }), createButton({ label: 'Применить', variant: 'primary' }));
    const drawer = createDrawer({ title: 'Панель', content, footer });
    const trigger = createButton({ label: 'Открыть панель', variant: 'primary', onClick: event => drawer.open(event.currentTarget) });
    wrapper.append(trigger);
    drawer.mount(wrapper);
    return wrapper;
  },
};

export const Bottom = {
  render: () => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    content.style.padding = '24px 32px';
    content.textContent = 'Нижний drawer сохраняет видимый верхний контекст страницы.';
    const drawer = createDrawer({
      title: 'Выбор типа документа',
      content,
      placement: 'bottom',
      closeLabel: 'Закрыть выбор типа документа',
    });
    const trigger = createButton({
      label: 'Открыть нижний drawer',
      variant: 'primary',
      onClick: event => drawer.open(event.currentTarget),
    });
    wrapper.append(trigger);
    drawer.mount(wrapper);
    return wrapper;
  },
};
