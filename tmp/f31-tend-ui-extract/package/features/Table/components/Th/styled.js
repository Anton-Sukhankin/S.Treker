import styled from 'styled-components';

const Root = styled.th `
  /* Завязываемся на внешние классы Dropdown чтобы не создавать лишние контексты */
  /* Все что можно сделать без JS делаем без JS (хотя это не очень прозрачно, зато легче поддерживать) */
  &.tend-ui-dropdown-trigger {
    &.tend-ui-dropdown-open {
      background-color: ${props => props.theme.colors.gray50};
    }
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.colors.gray50};
    }
  }
`;

export { Root };
