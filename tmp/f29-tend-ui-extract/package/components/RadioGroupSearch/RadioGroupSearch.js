import { __rest } from 'tslib';
import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Text } from '@10d/tend-ui-typography';
import { Radio } from '../../primitives/Radio/Radio.js';
import { Spinner } from '@10d/tend-ui-primitives';
import { Search } from '../Search/Search.js';
import { Box } from '@10d/tend-ui-grid';
import { useTheme } from '@10d/tend-ui-theme';
import { Scrollable } from '../../ui/Scrollable/Scrollable.js';
import { useFilterOption } from '../../hooks/useFilterOption.js';
import { useCallbackRef } from '@10d/tend-ui-hooks';
import { EmptyOverlay } from '../../ui/EmptyOverlay/EmptyOverlay.js';
import { ErrorOverlay } from '../../ui/ErrorOverlay/ErrorOverlay.js';

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
    var { optionAfter, optionDescription, placeholder, allowClear, virtual = false, error = false, loading = false, filterOption = true, filterOptionProp = 'value', showSearch = true, scrollable = true, optionRender, options, onSearch, onScroll } = _a, props = __rest(_a, ["optionAfter", "optionDescription", "placeholder", "allowClear", "virtual", "error", "loading", "filterOption", "filterOptionProp", "showSearch", "scrollable", "optionRender", "options", "onSearch", "onScroll"]);
    const theme = useTheme();
    const [search, setSearch] = React.useState('');
    const handleSearch = React.useCallback((e) => {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(e.target.value);
        setSearch(e.target.value);
    }, [onSearch]);
    const createLabel = useCallbackRef((node, option) => {
        if (!optionAfter && !optionDescription)
            return node;
        const after = typeof optionAfter === 'function' ? optionAfter(option) : optionAfter;
        const description = typeof optionDescription === 'function'
            ? optionDescription(option)
            : optionDescription;
        return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center' },
            description ? (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                node,
                React.createElement(Text, { size: 'small', color: 'gray650' }, description))) : (node),
            after && (React.createElement(Box, { "$flex": '1', "$display": 'flex', "$justifyContent": 'flex-end' }, after))));
    });
    const _options = React.useMemo(() => {
        if (!options)
            return [];
        return options.map(item => (Object.assign(Object.assign({}, item), { label: optionRender
                ? createLabel(optionRender(item), item)
                : createLabel(item.label, item) })));
    }, [createLabel, optionRender, options]);
    const filteredOptions = useFilterOption({
        search,
        filterOption,
        options: _options,
        filterOptionProp,
    });
    const ref = React.useRef(null);
    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement: () => ref.current,
        estimateSize: () => 24,
    });
    const component = React.useMemo(() => {
        if (virtual) {
            return (React.createElement(Radio.Group, Object.assign({ style: createVirtualRootStyle(virtualizer.getTotalSize()), fullWidth: true, layout: 'vertical' }, props), virtualizer.getVirtualItems().map(virtualItem => {
                const option = filteredOptions[virtualItem.index];
                return (React.createElement(Radio, { style: createVirtualItemStyle(virtualItem), key: createKey(option), value: option.value, onChange: props === null || props === void 0 ? void 0 : props.onChange }, option.label));
            })));
        }
        return (React.createElement(Radio.Group, Object.assign({ fullWidth: true, layout: 'vertical' }, props, { options: filteredOptions })));
    }, [filteredOptions, props, virtual, virtualizer]);
    const content = React.useMemo(() => {
        if (filteredOptions.length)
            return component;
        if (loading)
            return null;
        if (error)
            return React.createElement(ErrorOverlay, null);
        if (!filteredOptions.length)
            return React.createElement(EmptyOverlay, null);
        return component;
    }, [component, error, filteredOptions.length, loading]);
    return (React.createElement(Spinner, { color: theme.colors.blue600, size: 'small', loading: loading },
        React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 },
            showSearch && (React.createElement(Search, { onChange: handleSearch, allowClear: allowClear, placeholder: placeholder })),
            scrollable ? (React.createElement(Scrollable, { ref: ref, onScroll: onScroll }, content)) : (content))));
};
RadioGroupSearch.displayName = 'RadioGroupSearch';

export { RadioGroupSearch };
