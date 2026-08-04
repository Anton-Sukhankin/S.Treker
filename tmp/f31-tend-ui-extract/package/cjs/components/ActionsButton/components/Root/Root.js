'use strict';

var tslib = require('tslib');
var React = require('react');
var Dropdown = require('../../../../primitives/Dropdown/Dropdown.js');
var useBoolean = require('../../../../hooks/useBoolean/useBoolean.js');
var ActionsButton = require('../../contexts/ActionsButton.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = (_a) => {
    var { items = [], onOpenChange } = _a, props = tslib.__rest(_a, ["items", "onOpenChange"]);
    const menu = React__default["default"].useMemo(() => ({ items }), [items]);
    const [open, display] = useBoolean.useBoolean();
    return (React__default["default"].createElement(ActionsButton.ActionsButtonContext, { value: React__default["default"].useMemo(() => ({ open, display }), [open, display]) },
        React__default["default"].createElement(Dropdown.Dropdown, Object.assign({ trigger: ['click'], open: open, menu: menu }, props, { onOpenChange: (v, info) => {
                display(v);
                onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(v, info);
            } }))));
};
Root.displayName = 'ActionsButton.Root';

exports.Root = Root;
