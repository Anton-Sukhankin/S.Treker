'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var VisibilityOff = require('@10d/tend-ui-icons/VisibilityOff');
var styled = require('../../styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const HidingButton = ({ onClick, disabled }) => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(styled.ListItem, { before: React__default["default"].createElement(VisibilityOff.VisibilityOff, { color: 'gray500' }), onClick: onClick, disabled: disabled }, t(['features', 'Table', 'hide'])));
};
HidingButton.displayName = 'Table.ContextMenu.Actions.HidingButton';

exports.HidingButton = HidingButton;
