'use strict';

var styled = require('styled-components');
var Menu = require('../../../../../../primitives/Menu/Menu.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](Menu.Menu) `
  &.tend-ui-menu-horizontal {
    min-width: 0;
    flex: auto;
    margin-right: 120px;
  }
`;

exports.Root = Root;
