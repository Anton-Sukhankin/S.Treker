'use strict';

var tslib = require('tslib');
var React = require('react');
var lodash = require('lodash');
var TabsContext = require('../../contexts/TabsContext.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Buttons = () => {
    const _a = TabsContext.useTabsContext('Tabs.Buttons'), { items } = _a, props = tslib.__rest(_a, ["items"]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { items: React__default["default"].useMemo(() => items.map(item => lodash.omit(item, 'children')), [items]) })));
};
Buttons.displayName = 'DetachedTabs.Buttons';

exports.Buttons = Buttons;
