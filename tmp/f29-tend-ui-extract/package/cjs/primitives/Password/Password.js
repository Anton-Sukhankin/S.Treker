'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var useAllowClear = require('../../hooks/useAllowClear.js');
var useSize = require('../../hooks/useSize.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Password = React__default["default"].forwardRef((_a, ref) => {
    var { allowClear, clearIconTooltip } = _a, props = tslib.__rest(_a, ["allowClear", "clearIconTooltip"]);
    const theme = tendUiTheme.useTheme();
    const allowClearProp = useAllowClear.useAllowClear({ allowClear, clearIconTooltip });
    const size = useSize.useSize(props.size);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-password' }, props, { ref: ref, "$theme": theme, allowClear: allowClearProp, size: size })));
});
Password.displayName = 'Password';

exports.Password = Password;
