import React from 'react';
import { Root as Root$1 } from './styled.js';
import { CollapseContext } from '../../contexts/CollapseContext.js';
import { useGroupContext } from '../../contexts/GroupContext.js';

const Root = React.forwardRef(({ open = false, onOpenChange, children, id = '' }, ref) => {
    var _a, _b;
    const groupContext = useGroupContext();
    const defaultOpen = (_b = (_a = groupContext === null || groupContext === void 0 ? void 0 : groupContext.defaultOpen) === null || _a === void 0 ? void 0 : _a.includes(id)) !== null && _b !== void 0 ? _b : open;
    const [_open, _setOpen] = React.useState(defaultOpen);
    const handleClick = React.useCallback(() => {
        _setOpen(previousCollapsed => {
            const next = !previousCollapsed;
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(next);
            return next;
        });
    }, [onOpenChange]);
    return (React.createElement(CollapseContext, { value: React.useMemo(() => ({ open: _open, onClick: handleClick }), [_open, handleClick]) },
        React.createElement(Root$1, { ref: ref, className: 'tend-ui-collapse-root' }, children)));
});
Root.displayName = 'Collapse.Root';

export { Root };
