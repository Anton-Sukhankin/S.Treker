import { css } from 'styled-components';

/**
 * @deprecated Use `scrollbar` from `import { scrollbar } @10d/tend-ui/styling`
 */
const scrollbar = css `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.$theme.colors.gray50};
    border-radius: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.$theme.colors.gray150};
    border-radius: 16px;
  }
`;

export { scrollbar };
