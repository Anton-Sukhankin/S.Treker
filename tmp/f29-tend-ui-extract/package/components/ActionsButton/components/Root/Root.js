import { __rest } from 'tslib';
import React from 'react';
import { Dropdown } from '../../../../primitives/Dropdown/Dropdown.js';
import { useBoolean } from '../../../../hooks/useBoolean/useBoolean.js';
import { ActionsButtonContext } from '../../contexts/ActionsButton.js';

const Root = (_a) => {
    var { items = [], onOpenChange } = _a, props = __rest(_a, ["items", "onOpenChange"]);
    const menu = React.useMemo(() => ({ items }), [items]);
    const [open, display] = useBoolean();
    return (React.createElement(ActionsButtonContext, { value: React.useMemo(() => ({ open, display }), [open, display]) },
        React.createElement(Dropdown, Object.assign({ trigger: ['click'], open: open, menu: menu }, props, { onOpenChange: (v, info) => {
                display(v);
                onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(v, info);
            } }))));
};
Root.displayName = 'ActionsButton.Root';

export { Root };
