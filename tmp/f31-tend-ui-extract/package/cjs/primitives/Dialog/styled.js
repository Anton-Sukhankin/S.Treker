'use strict';

var styled = require('styled-components');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

/**
 * @deprecated Можно удалить, стили поставляются из коробки
 */
const Styles = styled.createGlobalStyle ``;
const Img = styled__default["default"].img `
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImageContainer = styled__default["default"].div `
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: ${props => (props.$layout === 'contain' ? '8px' : '16px 16px 0 0')};
`;
const Box = styled__default["default"](tendUiGrid.Box) `
  font-family: Museo Sans Cyrl;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

exports.Box = Box;
exports.ImageContainer = ImageContainer;
exports.Img = Img;
exports.Styles = Styles;
