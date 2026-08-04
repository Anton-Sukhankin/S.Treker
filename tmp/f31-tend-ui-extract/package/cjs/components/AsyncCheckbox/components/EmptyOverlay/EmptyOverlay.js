'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Search = require('@10d/tend-ui-icons/Search');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const EmptyOverlay = () => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'center', "$flexDirection": 'column', "$gap": 4, "$height": '68px' },
        React__default["default"].createElement(Search.Search, { color: 'gray500', size: 20 }),
        React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0', color: 'gray500' }, t(['general', 'empty']))));
};

exports.EmptyOverlay = EmptyOverlay;
