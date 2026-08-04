'use strict';

var Menu = require('antd-core/es/menu');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Menu__default = /*#__PURE__*/_interopDefault(Menu);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](Menu__default["default"]) `
  &.tend-ui-menu-light.tend-ui-menu-horizontal > .tend-ui-menu-item-selected,
  &.tend-ui-menu-light
    > .tend-ui-menu.tend-ui-menu-horizontal
    > .tend-ui-menu-item-selected,
  &.tend-ui-menu-light.tend-ui-menu-horizontal > .tend-ui-menu-submenu-selected,
  &.tend-ui-menu-light
    > .tend-ui-menu.tend-ui-menu-horizontal
    > .tend-ui-menu-submenu-selected {
    background: ${props => props.$theme.colors.blue100};
  }

  &.tend-ui-menu-horizontal {
    height: 32px;
    line-height: 1;
    border-bottom: none;
    .tend-ui-menu-item,
    .tend-ui-menu-submenu {
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;

      &:first-child {
        margin-right: 4px;
      }
      &:last-child {
        margin-left: 4px;
      }
      &:not(:first-child):not(:last-child) {
        margin-left: 4px;
        margin-right: 4px;
      }

      /*
        Antd вешает стили из меню на span рядом с классом .anticon. Переопределяем
      */
      .tend-ui-menu-item .tend-ui-menu-item-icon + .tend-ui-badge-root,
      .tend-ui-menu-submenu-title .tend-ui-menu-item-icon + .tend-ui-badge-root,
      .tend-ui-menu-item .anticon + .tend-ui-badge-root,
      .tend-ui-menu-submenu-title .anticon + .tend-ui-badge-root {
        margin-inline-start: 0px;
      }
    }
  }
`;

exports.Root = Root;
