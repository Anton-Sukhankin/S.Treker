'use strict';

var AntPopover = require('antd-core/es/popover');
var styled = require('styled-components');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntPopover__default = /*#__PURE__*/_interopDefault(AntPopover);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntPopover__default["default"], 'overlayClassName')) `
  &.tend-ui-popover {
    .tend-ui-popover-title {
      font-size: 16px;
    }
    .tend-ui-popover-inner {
      padding: 16px;
    }
  }
`;

exports.Root = Root;
