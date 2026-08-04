'use strict';

var styled = require('styled-components');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Button = styled__default["default"](tendUiPrimitives.Button) `
  margin-right: auto;
`;

exports.Button = Button;
