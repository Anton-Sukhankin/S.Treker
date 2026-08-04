'use strict';

var tslib = require('tslib');
var React = require('react');
var AntTextArea = require('antd-core/es/input/TextArea');
var tendUiStyling = require('@10d/tend-ui-styling');
var tendUiTheme = require('@10d/tend-ui-theme');
var useAllowClear = require('../../hooks/useAllowClear.js');
var useSize = require('../../hooks/useSize.js');
var useInputTitle = require('../../hooks/useInputTitle.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntTextArea__default = /*#__PURE__*/_interopDefault(AntTextArea);

const TextArea = React__default["default"].forwardRef((_a, ref) => {
    var { className, fullWidth, autoSize = false, size = 'medium' } = _a, props = tslib.__rest(_a, ["className", "fullWidth", "autoSize", "size"]);
    const theme = tendUiTheme.useTheme();
    const allowClearProp = useAllowClear.useAllowClear(props);
    const _size = useSize.useSize(size);
    const bind = useInputTitle.useInputTitle(props);
    const textarea = React__default["default"].useRef(null);
    React__default["default"].useImperativeHandle(ref, () => textarea.current);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, margins = tslib.__rest(_b, ["rest"]);
    return (React__default["default"].createElement(styled.Container, Object.assign({ theme: theme, className: ['tend-ui-textarea-root', className].filter(Boolean).join(' '), "$fullWidth": fullWidth }, margins),
        React__default["default"].createElement(AntTextArea__default["default"], Object.assign({ "data-testid": 'tend-ui-textarea' }, rest, bind, { ref: textarea, autoSize: autoSize, allowClear: allowClearProp, size: _size })),
        !autoSize && React__default["default"].createElement(styled.ResizerIcon, { size: 12, color: 'gray500' })));
});
TextArea.displayName = 'TextArea';

exports.TextArea = TextArea;
