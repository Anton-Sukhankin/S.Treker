'use strict';

var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var Group = require('./components/Group/Group.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseRadio = (props, ref) => {
    const theme = tendUiTheme.useTheme();
    return React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-radio' }, props, { ref: ref, "$theme": theme }));
};
const ForwardedRadio = React__default["default"].forwardRef(BaseRadio);
const Radio = Object.assign(ForwardedRadio, {
    displayName: 'Radio',
    Group: Group.Group,
    Button: styled.Root.Button,
});

exports.Radio = Radio;
