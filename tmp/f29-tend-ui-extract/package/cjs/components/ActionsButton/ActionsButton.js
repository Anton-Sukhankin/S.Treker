'use strict';

var tslib = require('tslib');
var React = require('react');
var Root = require('./components/Root/Root.js');
var Trigger = require('./components/Trigger/Trigger.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ActionsButton = (_a) => {
    var { children } = _a, props = tslib.__rest(_a, ["children"]);
    return (React__default["default"].createElement(Root.Root, Object.assign({}, props),
        React__default["default"].createElement(Trigger.Trigger, null, children)));
};
ActionsButton.displayName = 'ActionsButton';
ActionsButton.Root = Root.Root;
ActionsButton.Trigger = Trigger.Trigger;

exports.ActionsButton = ActionsButton;
