'use strict';

var React = require('react');
var TabsContext = require('../../contexts/TabsContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Content = () => {
    const { items, activeKey } = TabsContext.useTabsContext('Tabs.Content');
    const [child] = React__default["default"].useMemo(() => items.filter(item => item.key === activeKey), [activeKey, items]);
    return React__default["default"].createElement(React__default["default"].Fragment, null, child.children);
};
Content.displayName = 'DetachedTabs.Content';

exports.Content = Content;
