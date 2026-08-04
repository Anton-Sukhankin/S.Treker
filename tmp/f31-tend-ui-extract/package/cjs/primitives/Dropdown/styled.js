'use strict';

var AntDropdown = require('antd-core/es/dropdown');
var styled = require('styled-components');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntDropdown__default = /*#__PURE__*/_interopDefault(AntDropdown);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntDropdown__default["default"], 'overlayClassName')) ``;
const Content = styled__default["default"](tendUiGrid.Box) `
  border-radius: 12px;
  background: white;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);

  .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item {
    line-height: 20px;
  }
`;

exports.Content = Content;
exports.Root = Root;
