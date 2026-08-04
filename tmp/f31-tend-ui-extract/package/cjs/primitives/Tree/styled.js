'use strict';

var styled = require('styled-components');
var AntTree = require('antd-core/es/tree/Tree');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntTree__default = /*#__PURE__*/_interopDefault(AntTree);

const Root = styled__default["default"](AntTree__default["default"]) `
  &.tend-ui-tree {
    .tend-ui-tree-switcher {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .tend-ui-tree-checkbox .tend-ui-tree-checkbox-inner {
      border-radius: 4px;
    }
  }
`;

exports.Root = Root;
