'use strict';

var tslib = require('tslib');
var React = require('react');
var AvatarContext = require('../../contexts/AvatarContext.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Fallback = React__default["default"].forwardRef((_a, ref) => {
    var { className } = _a, props = tslib.__rest(_a, ["className"]);
    const context = AvatarContext.useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    if (isSuccess)
        return null;
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-avatar-fallback' }, props, { ref: ref, className: ['tend-ui-avatar-fallback', className].filter(Boolean).join(' ') })));
});
Fallback.displayName = 'Avatar.Fallback';

exports.Fallback = Fallback;
