'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].table `
  ${tendUiStyling.margin};

  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

exports.Root = Root;
