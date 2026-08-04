'use strict';

var tslib = require('tslib');
var React = require('react');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');
var ChevronUp = require('@10d/tend-ui-icons/ChevronUp');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var ActionsButton = require('../../contexts/ActionsButton.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Trigger = (_a) => {
    var { children, onClick } = _a, props = tslib.__rest(_a, ["children", "onClick"]);
    const t = useTranslation.useTranslation();
    const content = isUndefined.isUndefined(children)
        ? t(['components', 'ActionsButton', 'button'])
        : children;
    const { open, display } = ActionsButton.useActionsButtonContext('ActionsButtonTrigger');
    return (React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ variant: 'secondary' }, props, { before: open ? React__default["default"].createElement(ChevronUp.ChevronUp, null) : React__default["default"].createElement(ChevronDown.ChevronDown, null), onClick: e => {
            display === null || display === void 0 ? void 0 : display(!open);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        } }), content));
};
Trigger.displayName = 'ActionsButton.Trigger';

exports.Trigger = Trigger;
