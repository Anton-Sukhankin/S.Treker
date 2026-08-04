'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var Avatar = require('../Avatar/Avatar.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const List = React__default["default"].forwardRef((_a, ref) => {
    var { children, max } = _a, props = tslib.__rest(_a, ["children", "max"]);
    const _children = React__default["default"].useMemo(() => {
        if (tendUiUtils.isUndefined(max))
            return children;
        const nodes = React__default["default"].Children.map(children, child => child);
        if (!nodes)
            return children;
        const amount = nodes.length || 0;
        const shown = nodes.slice(0, max);
        const message = `+${amount - max}`;
        shown.push(React__default["default"].createElement(Avatar.Avatar, null, message));
        return shown;
    }, [children, max]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref }), _children));
});
List.displayName = 'Avatar.List';

exports.List = List;
