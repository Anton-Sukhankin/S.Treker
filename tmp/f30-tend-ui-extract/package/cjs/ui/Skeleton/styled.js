'use strict';

var styled = require('styled-components');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const opacity = styled.keyframes `
  100% {
    opacity: .5;
  }
  `;
const Root = styled__default["default"](tendUiGrid.Box) `
  animation: ${opacity} ease-in-out 1s infinite alternate;
`;

exports.Root = Root;
