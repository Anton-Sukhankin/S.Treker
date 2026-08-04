'use strict';

var tslib = require('tslib');
var React = require('react');
var TabsContext = require('../../contexts/TabsContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Root = (_a) => {
    var _b;
    var { children, defaultActiveKey, onChange } = _a, props = tslib.__rest(_a, ["children", "defaultActiveKey", "onChange"]);
    const [item] = props.items;
    const initial = (_b = defaultActiveKey !== null && defaultActiveKey !== void 0 ? defaultActiveKey : item === null || item === void 0 ? void 0 : item.key) !== null && _b !== void 0 ? _b : '';
    const [activeKey, setActiveKey] = React__default["default"].useState(initial);
    const handleChange = React__default["default"].useCallback((key) => {
        setActiveKey(key);
        onChange === null || onChange === void 0 ? void 0 : onChange(key);
    }, [onChange]);
    return (React__default["default"].createElement(TabsContext.TabsContext, { value: React__default["default"].useMemo(() => (Object.assign(Object.assign({}, props), { onChange: handleChange, activeKey })), [activeKey, handleChange, props]) }, children));
};
Root.displayName = 'DetachedTabs.Root';

exports.Root = Root;
