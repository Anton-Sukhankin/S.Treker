'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Header = () => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiTypography.Text, { color: 'gray650', size: 'small' }, t(['features', 'Table', 'filter'])));
};

exports.Header = Header;
