'use strict';

var React = require('react');
var styled = require('./styled.js');
var Group = require('./Group.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseCheckbox = React__default["default"].forwardRef((props, ref) => {
    return React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-checkbox' }, props, { ref: ref }));
});
const Checkbox = Object.assign(BaseCheckbox, {
    displayName: 'Checkbox',
    Group: Group.Group,
});

exports.Checkbox = Checkbox;
