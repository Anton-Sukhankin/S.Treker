'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ResetButton = (_a) => {
    var { children } = _a, props = tslib.__rest(_a, ["children"]);
    const t = useTranslation.useTranslation();
    const content = children !== null && children !== void 0 ? children : t(['components', 'ColumnsSettings', 'reset']);
    return (React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ size: 'small', variant: 'secondary' }, props), content));
};
ResetButton.displayName = 'ColumnsSettings.ResetButton';

exports.ResetButton = ResetButton;
