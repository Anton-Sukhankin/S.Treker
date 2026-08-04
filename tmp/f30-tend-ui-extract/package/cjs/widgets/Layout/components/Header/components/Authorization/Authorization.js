'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Authorization = ({ signinButtonProps, signupButtonProps, onSignin, onSignup, }) => {
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ as: 'a', href: '/accounts/login/', variant: 'secondary', onClick: onSignin }, signinButtonProps), t(['general', 'signin'])),
        React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ as: 'a', href: '/accounts/logout/', onClick: onSignup }, signupButtonProps), t(['general', 'signup']))));
};
Authorization.displayName = 'Layout.Header.Authorization';

exports.Authorization = Authorization;
