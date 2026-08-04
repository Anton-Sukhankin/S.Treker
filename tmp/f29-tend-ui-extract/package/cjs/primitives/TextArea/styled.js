'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');
var Resizer = require('@10d/tend-ui-icons/Resizer');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const ResizerIcon = styled__default["default"](Resizer.Resizer) `
  pointer-events: none;
  position: absolute;
  bottom: 3px;
  right: 3px;
  z-index: 500;
`;
const Container = styled__default["default"].div `
  ${props => props.$fullWidth &&
    styled.css `
      width: 100%;
    `}

  position: relative;

  textarea {
    &::-webkit-resizer {
      display: none;
    }
  }

  .tend-ui-input-textarea-show-count {
    .tend-ui-input-data-count {
      bottom: -18px;
      font-size: 12px;
    }
  }

  ${tendUiStyling.margin};
`;

exports.Container = Container;
exports.ResizerIcon = ResizerIcon;
