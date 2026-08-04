'use strict';

var React = require('react');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var isString = require('@10d/tend-ui-utils/isString');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Layout = require('../Layout/Layout.js');
var WhaleSad = require('../../WhaleSad.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Forbidden = ({ title, description, onClick = () => {
    window.location.replace('/');
}, button, content, }) => {
    var _a;
    const t = useTranslation.useTranslation();
    const _title = isUndefined.isUndefined(title)
        ? t(['components', 'Status', 'Forbidden', 'title'])
        : title;
    const _description = isUndefined.isUndefined(description)
        ? t(['components', 'Status', 'Forbidden', 'description'])
        : description;
    return (React__default["default"].createElement(Layout.Layout, null,
        React__default["default"].createElement(tendUiGrid.Box, null,
            React__default["default"].createElement(WhaleSad.WhaleSad, null)),
        React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 16 },
            isString.isString(_title) ? (React__default["default"].createElement(tendUiTypography.Title, { level: 'h3', margin: '0' }, _title)) : (_title),
            isString.isString(_description) ? (React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0' }, _description)) : (_description),
            isUndefined.isUndefined(content) ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column' },
                    React__default["default"].createElement(tendUiTypography.Text, null,
                        t(['components', 'Status', 'phone']),
                        ":\u00A0",
                        React__default["default"].createElement(tendUiTypography.Link, { href: 'tel:+7-495-660-41-41' }, "+7-495-660-41-41"))),
                React__default["default"].createElement(tendUiTypography.Text, { size: 'small', color: 'gray650' }, t(['components', 'Status', 'schedule'])))) : (content),
            React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ onClick: onClick }, button), (_a = button === null || button === void 0 ? void 0 : button.children) !== null && _a !== void 0 ? _a : t(['components', 'Status', 'button'])))));
};

exports.Forbidden = Forbidden;
