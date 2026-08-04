'use strict';

var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');
var message = require('antd-core/lib/message');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiTheme = require('@10d/tend-ui-theme');
var Copy = require('@10d/tend-ui-icons/Copy');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var message__default = /*#__PURE__*/_interopDefault(message);

const CopyEmail = ({ email }) => {
    const theme = tendUiTheme.useTheme();
    const handleCopyClick = React.useCallback(() => {
        navigator.clipboard.writeText(email).then(() => message__default["default"].success('Скопировано'));
    }, [email]);
    return (React__default["default"].createElement(styled.CopyContainer, { theme: theme, "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        React__default["default"].createElement(tendUiTypography.Text, { color: 'gray400' }, email),
        React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: '\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C' },
            React__default["default"].createElement(Copy.Copy, { onClick: handleCopyClick }))));
};

exports.CopyEmail = CopyEmail;
