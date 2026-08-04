'use strict';

var React = require('react');
var styled = require('./styled.js');
var Root = require('./components/Root/Root.js');
var DragHandle = require('./components/DragHandle/DragHandle.js');
var Pin = require('./components/Pin/Pin.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseColumnsSetting = ({ column, onColumnVisibilityChange, onColumnPinningChange, }) => {
    return (React__default["default"].createElement(Root.Root, { column: column },
        React__default["default"].createElement(styled.Toggle, { "data-testid": 'tend-ui-columns-settings-column-setting-toggle', checked: column.visible, disabled: column.disabled, UNSTABLE_styling: React__default["default"].useMemo(() => ({ Text: { strong: true } }), []), onChange: React__default["default"].useCallback(visible => {
                onColumnVisibilityChange === null || onColumnVisibilityChange === void 0 ? void 0 : onColumnVisibilityChange(visible, column);
            }, [column, onColumnVisibilityChange]) }, column.label || column.title),
        React__default["default"].createElement(Pin.Pin, { disabled: !column.pinnable, pinned: !!column.fixed, onChange: React__default["default"].useCallback(p => onColumnPinningChange === null || onColumnPinningChange === void 0 ? void 0 : onColumnPinningChange(p, column), [column, onColumnPinningChange]) }),
        React__default["default"].createElement(DragHandle.DragHandle, { disabled: !column.draggable })));
};
const MemoizedColumnsSetting = React__default["default"].memo(BaseColumnsSetting);
const ColumnsSetting = Object.assign(MemoizedColumnsSetting, {
    Root: Root.Root,
    DragHandle: DragHandle.DragHandle,
    Pin: Pin.Pin,
});

exports.ColumnsSetting = ColumnsSetting;
