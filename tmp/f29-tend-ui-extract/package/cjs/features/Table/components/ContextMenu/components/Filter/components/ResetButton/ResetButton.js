'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ResetButton = (_a) => {
    var props = tslib.__rest(_a, []);
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(styled.Button, Object.assign({ padding: false, variant: 'link' }, props), t(['features', 'Table', 'reset'])));
};

exports.ResetButton = ResetButton;
