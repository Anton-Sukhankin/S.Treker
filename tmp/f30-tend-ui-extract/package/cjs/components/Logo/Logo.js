'use strict';

var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Logo = ({ before, after, children, className, onClick }) => {
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8, "$padding": '6px 4px', "$pointer": !!onClick, className: ['tend-ui-logo', className].filter(Boolean).join(' '), onClick: onClick },
        before,
        React__default["default"].createElement(tendUiTypography.Text, { style: { display: 'block', whiteSpace: 'nowrap' }, strong: true }, children),
        after));
};
Logo.displayName = 'Logo';

exports.Logo = Logo;
