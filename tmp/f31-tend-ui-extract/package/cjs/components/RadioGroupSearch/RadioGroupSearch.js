'use strict';

var tslib = require('tslib');
var React = require('react');
var reactVirtual = require('@tanstack/react-virtual');
var tendUiTypography = require('@10d/tend-ui-typography');
var Radio = require('../../primitives/Radio/Radio.js');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Search = require('../Search/Search.js');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiTheme = require('@10d/tend-ui-theme');
var Scrollable = require('../../ui/Scrollable/Scrollable.js');
var useFilterOption = require('../../hooks/useFilterOption.js');
var tendUiHooks = require('@10d/tend-ui-hooks');
var EmptyOverlay = require('../../ui/EmptyOverlay/EmptyOverlay.js');
var ErrorOverlay = require('../../ui/ErrorOverlay/ErrorOverlay.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const createVirtualRootStyle = (size) => ({
    height: `${size}px`,
    width: '100%',
    position: 'relative',
});
const createVirtualItemStyle = (vi) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: `${vi.size}px`,
    transform: `translateY(${vi.start}px)`,
});
const createKey = (item) => {
    if (typeof item.value !== 'boolean')
        return item.value;
    return item.id;
};
const RadioGroupSearch = (_a) => {
    var { optionAfter, optionDescription, placeholder, allowClear, virtual = false, error = false, loading = false, filterOption = true, filterOptionProp = 'value', showSearch = true, scrollable = true, optionRender, options, onSearch, onScroll } = _a, props = tslib.__rest(_a, ["optionAfter", "optionDescription", "placeholder", "allowClear", "virtual", "error", "loading", "filterOption", "filterOptionProp", "showSearch", "scrollable", "optionRender", "options", "onSearch", "onScroll"]);
    const theme = tendUiTheme.useTheme();
    const [search, setSearch] = React__default["default"].useState('');
    const handleSearch = React__default["default"].useCallback((e) => {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(e.target.value);
        setSearch(e.target.value);
    }, [onSearch]);
    const createLabel = tendUiHooks.useCallbackRef((node, option) => {
        if (!optionAfter && !optionDescription)
            return node;
        const after = typeof optionAfter === 'function' ? optionAfter(option) : optionAfter;
        const description = typeof optionDescription === 'function'
            ? optionDescription(option)
            : optionDescription;
        return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center' },
            description ? (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column' },
                node,
                React__default["default"].createElement(tendUiTypography.Text, { size: 'small', color: 'gray650' }, description))) : (node),
            after && (React__default["default"].createElement(tendUiGrid.Box, { "$flex": '1', "$display": 'flex', "$justifyContent": 'flex-end' }, after))));
    });
    const _options = React__default["default"].useMemo(() => {
        if (!options)
            return [];
        return options.map(item => (Object.assign(Object.assign({}, item), { label: optionRender
                ? createLabel(optionRender(item), item)
                : createLabel(item.label, item) })));
    }, [createLabel, optionRender, options]);
    const filteredOptions = useFilterOption.useFilterOption({
        search,
        filterOption,
        options: _options,
        filterOptionProp,
    });
    const ref = React__default["default"].useRef(null);
    const virtualizer = reactVirtual.useVirtualizer({
        count: filteredOptions.length,
        getScrollElement: () => ref.current,
        estimateSize: () => 24,
    });
    const component = React__default["default"].useMemo(() => {
        if (virtual) {
            return (React__default["default"].createElement(Radio.Radio.Group, Object.assign({ style: createVirtualRootStyle(virtualizer.getTotalSize()), fullWidth: true, layout: 'vertical' }, props), virtualizer.getVirtualItems().map(virtualItem => {
                const option = filteredOptions[virtualItem.index];
                return (React__default["default"].createElement(Radio.Radio, { style: createVirtualItemStyle(virtualItem), key: createKey(option), value: option.value, onChange: props === null || props === void 0 ? void 0 : props.onChange }, option.label));
            })));
        }
        return (React__default["default"].createElement(Radio.Radio.Group, Object.assign({ fullWidth: true, layout: 'vertical' }, props, { options: filteredOptions })));
    }, [filteredOptions, props, virtual, virtualizer]);
    const content = React__default["default"].useMemo(() => {
        if (filteredOptions.length)
            return component;
        if (loading)
            return null;
        if (error)
            return React__default["default"].createElement(ErrorOverlay.ErrorOverlay, null);
        if (!filteredOptions.length)
            return React__default["default"].createElement(EmptyOverlay.EmptyOverlay, null);
        return component;
    }, [component, error, filteredOptions.length, loading]);
    return (React__default["default"].createElement(tendUiPrimitives.Spinner, { color: theme.colors.blue600, size: 'small', loading: loading },
        React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 },
            showSearch && (React__default["default"].createElement(Search.Search, { onChange: handleSearch, allowClear: allowClear, placeholder: placeholder })),
            scrollable ? (React__default["default"].createElement(Scrollable.Scrollable, { ref: ref, onScroll: onScroll }, content)) : (content))));
};
RadioGroupSearch.displayName = 'RadioGroupSearch';

exports.RadioGroupSearch = RadioGroupSearch;
