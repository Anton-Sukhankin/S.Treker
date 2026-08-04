'use strict';

var AntDatePicker = require('antd-core/es/date-picker');
var styled = require('styled-components');
var samolet = require('@10d/tend-ui-tokens/samolet');
var tendUiStyling = require('@10d/tend-ui-styling');
var ChevronLeft = require('@10d/tend-ui-icons/ChevronLeft');
var ChevronRight = require('@10d/tend-ui-icons/ChevronRight');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntDatePicker__default = /*#__PURE__*/_interopDefault(AntDatePicker);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntDatePicker__default["default"].RangePicker, 'popupClassName')) `
  &.tend-ui-picker {
    ${props => {
    if (props.$fullWidth)
        return styled.css `
          width: 100%;
        `;
    return styled.css `
        width: ${props.$width};
      `;
}}

    ${tendUiStyling.margin};
    ${tendUiStyling.height};
  }

  &.tend-ui-picker-dropdown {
    .tend-ui-picker-month-btn {
      text-transform: uppercase;
    }

    .tend-ui-picker-header {
      padding: 8px 16px;
    }

    .tend-ui-picker-header-super-prev-btn,
    .tend-ui-picker-header-super-next-btn {
      display: none;
    }

    .tend-ui-picker-date-panel .tend-ui-picker-body {
      padding: 8px 16px;
    }
  }

  &.tend-ui-picker-dropdown .tend-ui-picker-year-panel .tend-ui-picker-cell-inner,
  &.tend-ui-picker-dropdown .tend-ui-picker-quarter-panel .tend-ui-picker-cell-inner,
  &.tend-ui-picker-dropdown .tend-ui-picker-month-panel .tend-ui-picker-cell-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
  }

  &.tend-ui-picker-dropdown
    .tend-ui-picker-cell-in-view.tend-ui-picker-cell-range-start:not(
      .tend-ui-picker-cell-range-start-single
    ):not(.tend-ui-picker-cell-range-end)
    .tend-ui-picker-cell-inner {
    border-start-end-radius: 8px;
    border-end-end-radius: 8px;
  }

  &.tend-ui-picker-dropdown
    .tend-ui-picker-cell-in-view.tend-ui-picker-cell-range-end:not(
      .tend-ui-picker-cell-range-end-single
    ):not(.tend-ui-picker-cell-range-start)
    .tend-ui-picker-cell-inner {
    border-start-start-radius: 8px;
    border-end-start-radius: 8px;
  }
`;
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
const NextIcon = styled__default["default"](ChevronRight.ChevronRight) `
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

exports.NextIcon = NextIcon;
exports.PrevIcon = PrevIcon;
exports.Root = Root;
