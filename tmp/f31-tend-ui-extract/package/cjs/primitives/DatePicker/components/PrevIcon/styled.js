'use strict';

var styled = require('styled-components');
var samolet = require('@10d/tend-ui-tokens/samolet');
var ChevronLeft = require('@10d/tend-ui-icons/ChevronLeft');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const PrevIcon = styled__default["default"](ChevronLeft.ChevronLeft) `
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${samolet.colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${samolet.colors.blue600};
  }
  &:active {
    background-color: ${samolet.colors.blue100};
  }
`;

exports.PrevIcon = PrevIcon;
