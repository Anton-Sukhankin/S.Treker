'use strict';

var styled = require('styled-components');
var tendUiUtils = require('@10d/tend-ui-utils');
var scrollbar = require('../../styling/mixins/scrollbar.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].div `
  ${scrollbar.scrollbar};
  width: 100%;
  overflow: auto;
  // FIXME: Выглядит как костыль, возможно, есть более правильное решение
  // https://stackoverflow.com/questions/10251369/css-max-height-and-overflow-auto-always-displays-vertical-scroll
  // Проблема неидеальности шрифтов и появления вертикального скролла
  padding-bottom: 1px;
  margin-bottom: -1px;
  max-height: ${props => {
    if (tendUiUtils.isNumber(props.$maxHeight))
        return `${props.$maxHeight}px`;
    return props.$maxHeight;
}};
`;

exports.Root = Root;
