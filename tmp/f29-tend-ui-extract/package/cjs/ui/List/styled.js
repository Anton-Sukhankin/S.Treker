'use strict';

var styled = require('styled-components');
var scrollbar = require('../../styling/mixins/scrollbar.js');
var tendUiUtils = require('@10d/tend-ui-utils');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].ul `
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  ${props => {
    if (tendUiUtils.isUndefined(props.$gap))
        return;
    return styled.css `
      gap: ${props.$gap}px;
    `;
}};

  ${props => {
    if (!props.$scrollable)
        return;
    return styled.css `
      max-height: ${props.$maxHeight || '160px'};
      overflow: auto;
    `;
}}

  ${scrollbar.scrollbar};
`;

exports.Root = Root;
