'use strict';

var tendUiStyling = require('@10d/tend-ui-styling');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].div `
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${tendUiStyling.width};
  ${tendUiStyling.height};
`;
const Img = styled__default["default"].img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

exports.Img = Img;
exports.Root = Root;
