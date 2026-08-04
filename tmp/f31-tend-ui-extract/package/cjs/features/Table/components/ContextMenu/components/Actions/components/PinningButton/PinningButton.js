'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Pin = require('@10d/tend-ui-icons/Pin');
var styled = require('../../styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const PinningButton = ({ pinned, onChange, onClick, disabled }) => {
    const t = useTranslation.useTranslation();
    const node = pinned
        ? t(['features', 'Table', 'unpin'])
        : t(['features', 'Table', 'pin']);
    const handleClick = React__default["default"].useCallback(() => {
        onClick === null || onClick === void 0 ? void 0 : onClick();
        if (pinned) {
            onChange === null || onChange === void 0 ? void 0 : onChange('none');
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange('left');
    }, [onChange, onClick, pinned]);
    return (React__default["default"].createElement(styled.ListItem, { before: React__default["default"].createElement(Pin.Pin, { color: pinned ? 'blue600' : 'gray500' }), onClick: handleClick, disabled: disabled }, node));
};
PinningButton.displayName = 'Table.ContextMenu.Actions.PinningButton';

exports.PinningButton = PinningButton;
