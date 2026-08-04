'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var ChevronLeft = require('@10d/tend-ui-icons/ChevronLeft');
var ChevronRight = require('@10d/tend-ui-icons/ChevronRight');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Pagination = (_a) => {
    var _b, _c;
    var { size = 'medium', showLessItems = true, prevIconTooltip, nextIconTooltip } = _a, props = tslib.__rest(_a, ["size", "showLessItems", "prevIconTooltip", "nextIconTooltip"]);
    const theme = tendUiTheme.useTheme();
    const t = useTranslation.useTranslation();
    // Управляемый pageSize: если есть props.pageSize — используем его, иначе state
    const [innerPageSize, setInnerPageSize] = React.useState((_b = props.defaultPageSize) !== null && _b !== void 0 ? _b : 10);
    const pageSize = (_c = props.pageSize) !== null && _c !== void 0 ? _c : innerPageSize;
    // Обработчик смены размера страницы
    const onShowSizeChange = React.useCallback((current, newSize) => {
        if (props.pageSize === undefined)
            setInnerPageSize(newSize); // только если не controlled
        if (props.onShowSizeChange)
            props.onShowSizeChange(current, newSize);
    }, [props.pageSize, props.onShowSizeChange]);
    const isSinglePage = React.useMemo(() => { var _a; return ((_a = props.total) !== null && _a !== void 0 ? _a : 0) <= pageSize; }, [props.total, pageSize]);
    const locale = React.useMemo(() => (Object.assign(Object.assign({ jump_to: t(['primitives', 'Pagination', 'jumpto']), items_per_page: '' }, props.locale), { page: '' })), [t, props.locale]);
    const sizeProp = {
        medium: 'default',
        small: 'small',
    }[size];
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-pagination', showLessItems: showLessItems }, props, { "$theme": theme, "$singlePage": isSinglePage, pageSize: pageSize, onShowSizeChange: onShowSizeChange, prevIcon: React__default["default"].createElement(styled.PaginationButton, { "$size": size, theme: theme },
            React__default["default"].createElement(ChevronLeft.ChevronLeft, null)), nextIcon: React__default["default"].createElement(styled.PaginationButton, { "$size": size, theme: theme },
            React__default["default"].createElement(ChevronRight.ChevronRight, null)), jumpPrevIcon: React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({ title: t(['primitives', 'Pagination', 'prev']) }, prevIconTooltip),
            React__default["default"].createElement(styled.PaginationButton, { "data-testid": 'jump-prev-icon', "$size": size, theme: theme }, "...")), jumpNextIcon: React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({ title: t(['primitives', 'Pagination', 'next']) }, nextIconTooltip),
            React__default["default"].createElement(styled.PaginationButton, { "data-testid": 'jump-next-icon', "$size": size, theme: theme }, "...")), size: sizeProp, locale: locale })));
};

exports.Pagination = Pagination;
