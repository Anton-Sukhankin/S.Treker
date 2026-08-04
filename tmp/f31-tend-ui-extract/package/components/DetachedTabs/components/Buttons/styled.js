import styled from 'styled-components';
import { Tabs } from '../../../../primitives/Tabs/Tabs.js';

const Root = styled(Tabs) `
  &.tend-ui-tabs > .tend-ui-tabs-nav,
  &.tend-ui-tabs > div > .tend-ui-tabs-nav {
    margin: 0;
  }
`;

export { Root };
