'use strict';

var React = require('react');
var styled = require('styled-components');
var Pin$1 = require('@10d/tend-ui-icons/Pin');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](Pin$1.Pin) `
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
const Pin = ({ disabled, pinned, onClick, onChange }) => {
    const handleClick = React__default["default"].useCallback((e) => {
        if (disabled)
            return;
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (pinned) {
            onChange === null || onChange === void 0 ? void 0 : onChange('none');
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange('left');
    }, [disabled, onChange, onClick, pinned]);
    const colors = [
        [disabled, 'gray500'],
        [pinned, 'blue600'],
        [true, 'gray900'],
    ];
    const [, color] = colors.filter(([condition]) => condition)[0] || [];
    return (React__default["default"].createElement(Root, { "data-testid": 'tend-ui-columns-settings-column-setting-pin', "$disabled": disabled, size: 20, color: color, onClick: handleClick }));
};

exports.Pin = Pin;
