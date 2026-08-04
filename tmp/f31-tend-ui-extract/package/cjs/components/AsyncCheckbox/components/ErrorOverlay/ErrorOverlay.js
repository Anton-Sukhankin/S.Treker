'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Cancel = require('@10d/tend-ui-icons/Cancel');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ErrorOverlay = () => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'center', "$flexDirection": 'column', "$gap": 4, "$height": '68px' },
        React__default["default"].createElement(Cancel.Cancel, { color: 'red600', size: 20 }),
        React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0', color: 'red600' }, t(['general', 'error']))));
};

exports.ErrorOverlay = ErrorOverlay;
