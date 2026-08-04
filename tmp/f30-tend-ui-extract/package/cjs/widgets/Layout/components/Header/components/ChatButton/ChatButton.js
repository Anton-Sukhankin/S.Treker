'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Chat = require('@10d/tend-ui-icons/Chat');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ChatButton = (props) => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['widgets', 'Layout', 'Header', 'chat']) },
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, Object.assign({}, props),
            React__default["default"].createElement(Chat.Chat, { color: 'gray900', size: 20 }))));
};
ChatButton.displayName = 'Layout.Header.ChatButton';

exports.ChatButton = ChatButton;
