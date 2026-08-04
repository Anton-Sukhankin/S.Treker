'use strict';

var React = require('react');
var useTableColumns = require('../../../../hooks/useTableColumns.js');
var ColumnContext = require('../../contexts/ColumnContext.js');
var Layout = require('./components/Layout/Layout.js');
var HidingButton = require('./components/HidingButton/HidingButton.js');
var PinningButton = require('./components/PinningButton/PinningButton.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ColumnActions = () => {
    const column = ColumnContext.useColumnContext();
    const { display, pin } = useTableColumns.useTableColumns();
    return (React__default["default"].createElement(Layout.Layout, null,
        React__default["default"].createElement(PinningButton.PinningButton, { pinned: !!column.fixed, disabled: !column.pinnable, onChange: p => {
                pin(p, column);
                // Force dropdown layout re-aligning after column moving
                setTimeout(() => {
                    window.dispatchEvent(new Event('scroll'));
                }, 0);
            } }),
        React__default["default"].createElement(HidingButton.HidingButton, { disabled: column.disabled, onClick: () => {
                display(false, column);
            } })));
};
ColumnActions.displayName = 'ContextMenu.ColumnActions';
ColumnActions.Layout = Layout.Layout;
ColumnActions.PinningButton = PinningButton.PinningButton;
ColumnActions.HidingButton = HidingButton.HidingButton;

exports.ColumnActions = ColumnActions;
