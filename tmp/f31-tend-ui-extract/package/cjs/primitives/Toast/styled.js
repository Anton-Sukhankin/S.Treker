'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

/**
 * @deprecated Можно удалить, стили поставляются из коробки
 */
const Styles = styled.createGlobalStyle ``;
const Footer = styled__default["default"].div `
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`;

exports.Footer = Footer;
exports.Styles = Styles;
