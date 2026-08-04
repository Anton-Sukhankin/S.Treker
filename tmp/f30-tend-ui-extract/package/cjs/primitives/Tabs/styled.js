'use strict';

var styled = require('styled-components');
var AntTabs = require('antd-core/es/tabs');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntTabs__default = /*#__PURE__*/_interopDefault(AntTabs);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntTabs__default["default"], 'popupClassName')) `
  /* Component styling */
  .tend-ui-tabs-ink-bar {
    border-radius: 16px 16px 0 0;
  }

  ${props => !props.$customMoreIcon &&
    styled.css `
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

exports.Root = Root;
