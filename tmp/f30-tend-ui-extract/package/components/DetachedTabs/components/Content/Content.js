import React from 'react';
import { useTabsContext } from '../../contexts/TabsContext.js';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Content = () => {
    const { items, activeKey } = useTabsContext('Tabs.Content');
    const [child] = React.useMemo(() => items.filter(item => item.key === activeKey), [activeKey, items]);
    return React.createElement(React.Fragment, null, child.children);
};
Content.displayName = 'DetachedTabs.Content';

export { Content };
