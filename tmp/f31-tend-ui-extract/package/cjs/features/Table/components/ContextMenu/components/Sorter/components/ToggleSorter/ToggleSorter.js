'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiLocale = require('@10d/tend-ui-locale');
var Done = require('@10d/tend-ui-icons/Done');
var ArrowUp = require('@10d/tend-ui-icons/ArrowUp');
var ArrowDown = require('@10d/tend-ui-icons/ArrowDown');
var List = require('../../../../../../../../ui/List/List.js');
var contextFactory = require('../../../../../../../../factories/contextFactory.js');
var styled = require('./styled.js');
var SorterContext = require('../../contexts/SorterContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const [ToggleSorterContext, useToggleSorterContext] = contextFactory.contextFactory();
const Ascending = (_a) => {
    var rest = tslib.__rest(_a, []);
    const { disabled, order, variant, onAscending } = useToggleSorterContext();
    const t = tendUiLocale.useTranslation();
    return (React__default["default"].createElement(styled.ListItem, Object.assign({ disabled: disabled, before: React__default["default"].createElement(ArrowUp.ArrowUp, { color: 'gray500' }), after: order === 'ascend' && React__default["default"].createElement(Done.Done, { color: 'blue600' }), onClick: onAscending }, rest), t(['features', 'Table', 'ascending', variant])));
};
const Descending = (_a) => {
    var rest = tslib.__rest(_a, []);
    const { disabled, order, variant, onDescending } = useToggleSorterContext();
    const t = tendUiLocale.useTranslation();
    return (React__default["default"].createElement(styled.ListItem, Object.assign({ disabled: disabled, before: React__default["default"].createElement(ArrowDown.ArrowDown, { color: 'gray500' }), after: order === 'descend' && React__default["default"].createElement(Done.Done, { color: 'blue600' }), onClick: onDescending }, rest), t(['features', 'Table', 'descending', variant])));
};
const Layout = ({ children }) => {
    return React__default["default"].createElement(List.List, null, children);
};
const ToggleSorter = ({ value = 'default', onChange, children }) => {
    // FIXME:
    // Breaking the dependency inversion principle:
    // "ToggleSorter" singleton component is bounded to context value
    // Need one more abstraction layer
    const { disabled, variant = 'default' } = SorterContext.useSorterContext();
    const [order, setOrder] = React__default["default"].useState(value);
    React__default["default"].useEffect(() => {
        if (!value)
            return;
        setOrder(value);
    }, [value]);
    const onAscending = React__default["default"].useCallback(() => {
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
    const onDescending = React__default["default"].useCallback(() => {
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
    return (React__default["default"].createElement(ToggleSorterContext, { value: React__default["default"].useMemo(() => ({
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

exports.ToggleSorter = ToggleSorter;
