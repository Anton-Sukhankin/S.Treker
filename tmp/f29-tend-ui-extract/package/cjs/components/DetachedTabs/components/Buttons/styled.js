'use strict';

var styled = require('styled-components');
var Tabs = require('../../../../primitives/Tabs/Tabs.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](Tabs.Tabs) `
  &.tend-ui-tabs > .tend-ui-tabs-nav,
  &.tend-ui-tabs > div > .tend-ui-tabs-nav {
    margin: 0;
  }
`;

exports.Root = Root;
