'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');
var AvatarContext = require('../../contexts/AvatarContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = React__default["default"].forwardRef((_a, ref) => {
    var { children, size = 'medium', className, pointer, bordered, UNSTABLE_styling } = _a, props = tslib.__rest(_a, ["children", "size", "className", "pointer", "bordered", "UNSTABLE_styling"]);
    const theme = tendUiTheme.useTheme();
    const [imageLoadingStatus, setImageLoadingStatus] = React__default["default"].useState('idle');
    const isSuccess = imageLoadingStatus === 'success';
    const backgroundColor = isSuccess ? 'transparent' : theme.colors.blue100;
    // FIXME: Исправить литеральные типы
    const _borderColor = tendUiTheme.useColor(UNSTABLE_styling === null || UNSTABLE_styling === void 0 ? void 0 : UNSTABLE_styling.borderColor, theme.colors.blue100);
    return (React__default["default"].createElement(AvatarContext.AvatarContext, { value: React__default["default"].useMemo(() => ({
            imageLoadingStatus,
            onImageLoadingStatusChange: setImageLoadingStatus,
        }), [imageLoadingStatus]) },
        React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-avatar-root' }, props, { ref: ref, theme: theme, "$size": size, "$pointer": pointer, "$backgroundColor": backgroundColor, "$bordered": bordered, "$borderColor": _borderColor, className: ['tend-ui-avatar-root', className].filter(Boolean).join(' ') }), children)));
});
Root.displayName = 'Avatar.Root';

exports.Root = Root;
