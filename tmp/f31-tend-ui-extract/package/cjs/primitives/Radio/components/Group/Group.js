'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseGroup = (_a, ref) => {
    var { layout = 'horizontal', fullWidth = false } = _a, props = tslib.__rest(_a, ["layout", "fullWidth"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$layout": layout, "$fullWidth": fullWidth })));
};
const Group = React__default["default"].forwardRef(BaseGroup);
Group.displayName = 'Radio.Group';

exports.Group = Group;
