'use strict';

var React = require('react');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const labels = {
    dev: 'DEV',
    stage: 'STAGE',
    prod: 'PROD',
};
const colors = {
    dev: {
        color: 'red700',
        bg: 'red200',
    },
    stage: {
        color: 'gold700',
        bg: 'gold200',
    },
    prod: {
        color: 'cyan700',
        bg: 'cyan200',
    },
};
const Stand = ({ stand }) => {
    return (React__default["default"].createElement(tendUiPrimitives.Tag, { "data-testid": 'tend-ui-stand', padding: '0 4px', backgroundColor: colors[stand].bg, borderRadius: 4 },
        React__default["default"].createElement(tendUiTypography.Text, { color: colors[stand].color, size: 'xs', uppercase: true, wordBreak: 'normal', fontWeight: 600 }, labels[stand])));
};
Stand.displayName = 'Stand';

exports.Stand = Stand;
