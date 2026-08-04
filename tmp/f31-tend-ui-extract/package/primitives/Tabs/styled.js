import styled, { css } from 'styled-components';
import AntTabs from 'antd-core/es/tabs';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';

const Root = styled(withInjectedClassName(AntTabs, 'popupClassName')) `
  /* Component styling */
  .tend-ui-tabs-ink-bar {
    border-radius: 16px 16px 0 0;
  }

  ${props => !props.$customMoreIcon &&
    css `
      &&& {
        .tend-ui-tabs-nav-more[aria-expanded='true'] {
          color: ${props.$theme.colors.blue600};

          .anticon {
            transform: rotate(180deg);
          }

          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            border-radius: 16px 16px 0 0;
            background-color: ${props.$theme.colors.blue600};
          }
        }
      }
    `}

  .tend-ui-tabs-nav .tend-ui-tabs-tab {
    font-weight: 400;
  }

  /* Dropdown styling */
  &.tend-ui-tabs-dropdown {
    .tend-ui-tabs-dropdown-menu-item {
      padding: 10px 16px;

      &:not(.tend-ui-tabs-dropdown-menu-item-disabled):hover {
        background: ${props => props.$theme.colors.blue100};
      }
    }

    .tend-ui-tabs-dropdown-menu {
      padding: 0;
    }
  }
`;

export { Root };
