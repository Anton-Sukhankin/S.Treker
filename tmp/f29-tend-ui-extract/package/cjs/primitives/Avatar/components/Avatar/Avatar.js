'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var Badge = require('../../../Badge/Badge.js');
var Image = require('../Image/Image.js');
var Fallback = require('../Fallback/Fallback.js');
var Root = require('../Root/Root.js');
var Unknown = require('../../Unknown.js');
var UnknownGroup = require('../../UnknownGroup.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const presets = {
    online: 'green',
    offline: 'gray',
    away: 'yellow',
    busy: 'red',
};
const BaseAvatar = (_a, ref) => {
    var { size = 'medium', fit, children, status, src, pointer = false, bordered = false, UNSTABLE_styling } = _a, props = tslib.__rest(_a, ["size", "fit", "children", "status", "src", "pointer", "bordered", "UNSTABLE_styling"]);
    const _src = Array.isArray(src) ? undefined : src;
    const fallbackNode = React__default["default"].useMemo(() => {
        if (Array.isArray(src))
            return React__default["default"].createElement(UnknownGroup.UnknownGroup, { size: size });
        return React__default["default"].createElement(Unknown.Unknown, { size: size });
    }, [src, size]);
    const badgeProps = React__default["default"].useMemo(() => {
        if (typeof status === 'object')
            return status;
        const preset = presets[status || 'online'];
        return {
            preset,
            offset: [0, 0],
            placement: 'rightBottom',
        };
    }, [status]);
    const content = React__default["default"].useMemo(() => {
        if (tendUiUtils.isUndefined(children))
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(Image.Image, Object.assign({}, props, { src: _src, fit: fit })),
                React__default["default"].createElement(Fallback.Fallback, Object.assign({}, props), fallbackNode)));
        return React__default["default"].createElement(Fallback.Fallback, Object.assign({}, props), children);
    }, [_src, children, fallbackNode, fit, props]);
    const child = (React__default["default"].createElement(Root.Root, { ref: ref, size: size, pointer: pointer, bordered: bordered, UNSTABLE_styling: UNSTABLE_styling }, content));
    return status ? React__default["default"].createElement(Badge.Badge, Object.assign({}, badgeProps), child) : child;
};
const Avatar = React__default["default"].forwardRef(BaseAvatar);
Avatar.displayName = 'Avatar';

exports.Avatar = Avatar;
