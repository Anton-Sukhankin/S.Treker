import { __rest } from 'tslib';
import React from 'react';
import { omit } from 'lodash';
import { useTabsContext } from '../../contexts/TabsContext.js';
import { Root } from './styled.js';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Buttons = () => {
    const _a = useTabsContext('Tabs.Buttons'), { items } = _a, props = __rest(_a, ["items"]);
    return (React.createElement(Root, Object.assign({}, props, { items: React.useMemo(() => items.map(item => omit(item, 'children')), [items]) })));
};
Buttons.displayName = 'DetachedTabs.Buttons';

export { Buttons };
