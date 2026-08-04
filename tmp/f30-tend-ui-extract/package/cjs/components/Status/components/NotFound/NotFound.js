'use strict';

var React = require('react');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var isString = require('@10d/tend-ui-utils/isString');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Layout = require('../Layout/Layout.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const NotFound = ({ title, description, button, onClick = () => {
    window.location.reload();
}, }) => {
    var _a;
    const t = useTranslation.useTranslation();
    const _title = isUndefined.isUndefined(title)
        ? t(['components', 'Status', 'NotFound', 'title'])
        : title;
    const _description = isUndefined.isUndefined(description)
        ? t(['components', 'Status', 'NotFound', 'description'])
        : description;
    return (React__default["default"].createElement(Layout.Layout, null,
        React__default["default"].createElement(styled.Big404, null, "404"),
        React__default["default"].createElement(styled.Content, null,
            isString.isString(_title) ? (React__default["default"].createElement(tendUiTypography.Title, { level: 'h3', margin: '0' }, _title)) : (_title),
            isString.isString(_description) ? (React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0' }, _description)) : (_description),
            React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ onClick: onClick }, button), (_a = button === null || button === void 0 ? void 0 : button.children) !== null && _a !== void 0 ? _a : t(['components', 'Status', 'button'])))));
};

exports.NotFound = NotFound;
