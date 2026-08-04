import styled from 'styled-components';

const Content = styled.div `
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Big404 = styled.span `
  position: absolute;
  z-index: 1;
  color: #f7f9fe;
  font-family: 'Museo Sans Cyrl';
  font-size: 531.415px;
  font-style: normal;
  font-weight: 700;
  line-height: 75%;
`;

export { Big404, Content };
