'use strict';

var styled = require('styled-components');
var AntSegmented = require('antd-core/es/segmented');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntSegmented__default = /*#__PURE__*/_interopDefault(AntSegmented);

const Root = styled__default["default"](AntSegmented__default["default"]) `
  &.tend-ui-segmented {
    padding: 4px;
    border: 1px solid ${props => props.$theme.colors.gray200};

    .tend-ui-segmented-item-label {
      min-height: 20px;
      line-height: 20px;
    }
  }
`;

exports.Root = Root;
