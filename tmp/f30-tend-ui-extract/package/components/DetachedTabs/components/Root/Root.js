import { __rest } from 'tslib';
import React from 'react';
import { TabsContext } from '../../contexts/TabsContext.js';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Root = (_a) => {
    var _b;
    var { children, defaultActiveKey, onChange } = _a, props = __rest(_a, ["children", "defaultActiveKey", "onChange"]);
    const [item] = props.items;
    const initial = (_b = defaultActiveKey !== null && defaultActiveKey !== void 0 ? defaultActiveKey : item === null || item === void 0 ? void 0 : item.key) !== null && _b !== void 0 ? _b : '';
    const [activeKey, setActiveKey] = React.useState(initial);
    const handleChange = React.useCallback((key) => {
        setActiveKey(key);
        onChange === null || onChange === void 0 ? void 0 : onChange(key);
    }, [onChange]);
    return (React.createElement(TabsContext, { value: React.useMemo(() => (Object.assign(Object.assign({}, props), { onChange: handleChange, activeKey })), [activeKey, handleChange, props]) }, children));
};
Root.displayName = 'DetachedTabs.Root';

export { Root };
