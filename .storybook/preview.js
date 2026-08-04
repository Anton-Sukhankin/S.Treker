import '../src/styles/main.css';

export const parameters = {
  layout: 'centered',
  controls: {
    expanded: true,
  },
  a11y: {
    test: 'error',
  },
  options: {
    storySort: {
      order: ['Overview', 'Controls', 'Navigation', 'Overlays', 'Feedback'],
    },
  },
};

export const decorators = [
  story => {
    const canvas = document.createElement('div');
    canvas.className = 'component-story-canvas';
    canvas.append(story());
    return canvas;
  },
];
