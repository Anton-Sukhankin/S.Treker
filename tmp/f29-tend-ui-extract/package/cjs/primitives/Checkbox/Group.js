'use strict';

var tslib = require('tslib');
var React = require('react');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Group = React__default["default"].forwardRef((_a, ref) => {
    var { layout = 'horizontal', fullWidth = false } = _a, props = tslib.__rest(_a, ["layout", "fullWidth"]);
    return React__default["default"].createElement(styled.GroupRoot, Object.assign({}, props, { ref: ref, "$layout": layout, "$fullWidth": fullWidth }));
});
Group.displayName = 'Checkbox.Group';

exports.Group = Group;
