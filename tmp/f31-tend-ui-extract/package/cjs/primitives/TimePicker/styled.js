'use strict';

var AntDatePicker = require('antd-core/es/date-picker');
var styled = require('styled-components');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');
var scrollbar = require('../../styling/css/scrollbar.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntDatePicker__default = /*#__PURE__*/_interopDefault(AntDatePicker);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(AntDatePicker__default["default"].TimePicker, 'popupClassName')) `
  &.tend-ui-picker {
    ${props => {
    if (props.$fullWidth)
        return styled.css `
          width: 100%;
        `;
    return styled.css `
        width: ${props.$width || '256px'};
      `;
}}
  }

  &.tend-ui-picker-dropdown .tend-ui-picker-time-panel-column {
    ${scrollbar.scrollbar}
  }
`;

exports.Root = Root;
