'use strict';

var styled = require('styled-components');
var DragIndicator = require('@10d/tend-ui-icons/DragIndicator');
var Toggle$1 = require('../../../../primitives/Toggle/Toggle.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Toggle = styled__default["default"](Toggle$1.Toggle) `
  width: 100%;
`;
styled__default["default"](DragIndicator.DragIndicator) `
  cursor: grab;
`;

exports.Toggle = Toggle;
