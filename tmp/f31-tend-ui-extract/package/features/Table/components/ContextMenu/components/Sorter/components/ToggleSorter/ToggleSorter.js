import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale';
import { Done } from '@10d/tend-ui-icons/Done';
import { ArrowUp } from '@10d/tend-ui-icons/ArrowUp';
import { ArrowDown } from '@10d/tend-ui-icons/ArrowDown';
import { List } from '../../../../../../../../ui/List/List.js';
import { contextFactory } from '../../../../../../../../factories/contextFactory.js';
import { ListItem } from './styled.js';
import { useSorterContext } from '../../contexts/SorterContext.js';

const [ToggleSorterContext, useToggleSorterContext] = contextFactory();
const Ascending = (_a) => {
    var rest = __rest(_a, []);
    const { disabled, order, variant, onAscending } = useToggleSorterContext();
    const t = useTranslation();
    return (React.createElement(ListItem, Object.assign({ disabled: disabled, before: React.createElement(ArrowUp, { color: 'gray500' }), after: order === 'ascend' && React.createElement(Done, { color: 'blue600' }), onClick: onAscending }, rest), t(['features', 'Table', 'ascending', variant])));
};
const Descending = (_a) => {
    var rest = __rest(_a, []);
    const { disabled, order, variant, onDescending } = useToggleSorterContext();
    const t = useTranslation();
    return (React.createElement(ListItem, Object.assign({ disabled: disabled, before: React.createElement(ArrowDown, { color: 'gray500' }), after: order === 'descend' && React.createElement(Done, { color: 'blue600' }), onClick: onDescending }, rest), t(['features', 'Table', 'descending', variant])));
};
const Layout = ({ children }) => {
    return React.createElement(List, null, children);
};
const ToggleSorter = ({ value = 'default', onChange, children }) => {
    // FIXME:
    // Breaking the dependency inversion principle:
    // "ToggleSorter" singleton component is bounded to context value
    // Need one more abstraction layer
    const { disabled, variant = 'default' } = useSorterContext();
    const [order, setOrder] = React.useState(value);
    React.useEffect(() => {
        if (!value)
            return;
        setOrder(value);
    }, [value]);
    const onAscending = React.useCallback(() => {
        setOrder(prevOrder => {
            const next = {
                ascend: 'default',
                default: 'ascend',
                descend: 'ascend',
            }[prevOrder];
            onChange === null || onChange === void 0 ? void 0 : onChange(next);
            return next;
        });
    }, [onChange]);
    const onDescending = React.useCallback(() => {
        setOrder(prevOrder => {
            const next = {
                descend: 'default',
                default: 'descend',
                ascend: 'descend',
            }[prevOrder];
            onChange === null || onChange === void 0 ? void 0 : onChange(next);
            return next;
        });
    }, [onChange]);
    return (React.createElement(ToggleSorterContext, { value: React.useMemo(() => ({
            variant,
            disabled,
            order,
            onAscending,
            onDescending,
        }), [disabled, onAscending, onDescending, order, variant]) }, children));
};
ToggleSorter.displayName = 'ToggleSorter';
ToggleSorter.Layout = Layout;
ToggleSorter.Ascending = Ascending;
ToggleSorter.Descending = Descending;

export { ToggleSorter };
