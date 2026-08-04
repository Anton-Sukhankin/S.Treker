'use strict';

var tslib = require('tslib');
var React = require('react');
var useSize = require('../../hooks/useSize.js');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const TimePicker = React__default["default"].forwardRef((_a, ref) => {
    var { fullWidth, width } = _a, props = tslib.__rest(_a, ["fullWidth", "width"]);
    const theme = tendUiTheme.useTheme();
    const size = useSize.useSize(props.size);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-time-picker' }, props, { ref: ref, "$theme": theme, "$fullWidth": fullWidth, "$width": width, size: size })));
});
TimePicker.displayName = 'TimePicker';

exports.TimePicker = TimePicker;
