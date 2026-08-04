'use strict';

var React = require('react');
var styled = require('./styled.js');
var CollapseContext = require('../../contexts/CollapseContext.js');
var GroupContext = require('../../contexts/GroupContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = React__default["default"].forwardRef(({ open = false, onOpenChange, children, id = '' }, ref) => {
    var _a, _b;
    const groupContext = GroupContext.useGroupContext();
    const defaultOpen = (_b = (_a = groupContext === null || groupContext === void 0 ? void 0 : groupContext.defaultOpen) === null || _a === void 0 ? void 0 : _a.includes(id)) !== null && _b !== void 0 ? _b : open;
    const [_open, _setOpen] = React__default["default"].useState(defaultOpen);
    const handleClick = React__default["default"].useCallback(() => {
        _setOpen(previousCollapsed => {
            const next = !previousCollapsed;
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(next);
            return next;
        });
    }, [onOpenChange]);
    return (React__default["default"].createElement(CollapseContext.CollapseContext, { value: React__default["default"].useMemo(() => ({ open: _open, onClick: handleClick }), [_open, handleClick]) },
        React__default["default"].createElement(styled.Root, { ref: ref, className: 'tend-ui-collapse-root' }, children)));
});
Root.displayName = 'Collapse.Root';

exports.Root = Root;
