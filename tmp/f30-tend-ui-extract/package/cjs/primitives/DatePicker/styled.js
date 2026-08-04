'use strict';

var AntDatePicker = require('antd-core/es/date-picker');
var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntDatePicker__default = /*#__PURE__*/_interopDefault(AntDatePicker);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntDatePicker__default["default"], 'popupClassName')) `
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
`;

exports.Root = Root;
