'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Book = require('@10d/tend-ui-icons/Book');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Info = ({ component: Component, href }) => {
    const t = useTranslation.useTranslation();
    const button = (React__default["default"].createElement(tendUiPrimitives.ToggleButton, { selectable: false, "aria-disabled": !Component && !href },
        React__default["default"].createElement(Book.Book, { color: 'gray900', size: 20 })));
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['widgets', 'Layout', 'Header', 'info']) }, Component ? (React__default["default"].createElement(Component, null, button)) : href ? (React__default["default"].createElement("a", { href: href, target: '_blank', rel: 'noreferrer' }, button)) : (button)));
};
Info.displayName = 'Layout.Header.Info';

exports.Info = Info;
