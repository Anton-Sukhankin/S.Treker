'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Notification = require('@10d/tend-ui-icons/Notification');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const NotificationsButton = (props) => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['widgets', 'Layout', 'Header', 'notifications']) },
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, Object.assign({}, props),
            React__default["default"].createElement(Notification.Notification, { color: 'gray900', size: 20 }))));
};
NotificationsButton.displayName = 'Layout.Header.NotificationsButton';

exports.NotificationsButton = NotificationsButton;
