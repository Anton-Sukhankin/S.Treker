function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createBrand(title = 'Локальные прототипы') {
  const brand = createElement('div', 'stand-header__brand');
  brand.append(
    createElement('span', 'stand-header__mark', 'S'),
    createElement('span', 'stand-header__title', `S-Tracker · ${title}`),
  );
  return brand;
}

const SECTION_LINKS = [
  { id: 'tasks', label: 'Задачи', href: '../tasks/' },
  { id: 'documents', label: 'Документы', href: '../documents/' },
  { id: 'document-templates', label: 'Шаблоны документов', href: '../document-templates/' },
];

function createSectionNavigation(activeSection) {
  const navigation = createElement('nav', 'stand-header__navigation');
  navigation.setAttribute('aria-label', 'Разделы локального прототипа');

  SECTION_LINKS.forEach(section => {
    const link = createElement('a', 'stand-header__section-link', section.label);
    link.href = section.href;
    if (section.id === activeSection) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
    navigation.append(link);
  });

  return navigation;
}

export function createPrototypeShell({ title, content, activeSection, hubHref = '../' } = {}) {
  if (!content) throw new Error('Для страницы прототипа требуется корневой элемент раздела.');

  const element = createElement('div', 'document-workflows-stand');
  const header = createElement('header', 'stand-header');
  const primary = createElement('div', 'stand-header__primary');
  primary.append(createBrand(title), createSectionNavigation(activeSection));
  const catalogLink = createElement('a', 'stand-header__catalog-link', 'Все прототипы');
  catalogLink.href = hubHref;
  header.append(primary, catalogLink);

  const main = createElement('main', 'stand-main');
  if (activeSection === 'documents') main.classList.add('stand-main--workspace');
  main.append(content);
  element.append(header, main);
  return { element };
}

export function createStandHub({ prototypes = [] } = {}) {
  const element = createElement('div', 'document-workflows-stand');
  const header = createElement('header', 'stand-header');
  header.append(createBrand());

  const main = createElement('main', 'stand-main stand-hub');
  main.append(
    createElement('h1', 'stand-page-title', 'Локальные прототипы'),
    createElement('p', 'stand-page-description', 'Каждый раздел запускается отдельно и переносится в основной S-Tracker только после завершения и проверки.'),
  );

  const list = createElement('ul', 'stand-prototype-grid');
  prototypes.forEach(prototype => {
    const item = createElement('li', 'stand-prototype-grid__item');
    const link = createElement('a', 'stand-prototype-card');
    link.href = prototype.href;
    link.append(
      createElement('span', 'stand-prototype-card__status', prototype.status),
      createElement('h2', 'stand-prototype-card__title', prototype.title),
      createElement('p', 'stand-prototype-card__description', prototype.description),
      createElement('span', 'stand-prototype-card__action', 'Открыть прототип'),
    );
    item.append(link);
    list.append(item);
  });

  main.append(list);
  element.append(header, main);
  return { element };
}

export function createNotImplementedSection(title, description = 'Раздел еще не реализован в локальном стенде.') {
  const element = createElement('section', 'stand-empty-section');
  element.append(createElement('h1', 'stand-page-title', title), createElement('p', 'stand-page-description', description));
  return { element };
}
