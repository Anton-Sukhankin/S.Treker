'use strict';

var styled = require('styled-components');
var DragIndicator$1 = require('@10d/tend-ui-icons/DragIndicator');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const DragIndicator = styled__default["default"](DragIndicator$1.DragIndicator) `
  cursor: grab;
`;

exports.DragIndicator = DragIndicator;
