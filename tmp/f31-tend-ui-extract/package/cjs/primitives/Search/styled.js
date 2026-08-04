'use strict';

var AntSearch = require('antd-core/es/input/Search');
var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntSearch__default = /*#__PURE__*/_interopDefault(AntSearch);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntSearch__default["default"]) `
  input {
    text-overflow: ellipsis;
  }

  .tend-ui-input-prefix,
  .tend-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }

  &.tend-ui-input-search {
    ${tendUiStyling.width};
    ${tendUiStyling.margin};
  }
`;

exports.Root = Root;
