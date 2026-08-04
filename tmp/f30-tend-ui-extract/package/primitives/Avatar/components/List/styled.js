import styled from 'styled-components';

const Root = styled.span `
  display: inline-flex;

  & > span:not(:first-child) {
    margin-left: -8px;
  }
`;

export { Root };
