'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Content = styled__default["default"].div `
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Big404 = styled__default["default"].span `
  position: absolute;
  z-index: 1;
  color: #f7f9fe;
  font-family: 'Museo Sans Cyrl';
  font-size: 531.415px;
  font-style: normal;
  font-weight: 700;
  line-height: 75%;
`;

exports.Big404 = Big404;
exports.Content = Content;
