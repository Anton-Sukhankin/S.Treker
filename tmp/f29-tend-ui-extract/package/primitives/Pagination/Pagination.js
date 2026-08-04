import { __rest } from 'tslib';
import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { ChevronLeft } from '@10d/tend-ui-icons/ChevronLeft';
import { ChevronRight } from '@10d/tend-ui-icons/ChevronRight';
import { useTheme } from '@10d/tend-ui-theme';
import { Tooltip } from '@10d/tend-ui-primitives';
import { Root, PaginationButton } from './styled.js';

const Pagination = (_a) => {
    var _b, _c;
    var { size = 'medium', showLessItems = true, prevIconTooltip, nextIconTooltip } = _a, props = __rest(_a, ["size", "showLessItems", "prevIconTooltip", "nextIconTooltip"]);
    const theme = useTheme();
    const t = useTranslation();
    // Управляемый pageSize: если есть props.pageSize — используем его, иначе state
    const [innerPageSize, setInnerPageSize] = useState((_b = props.defaultPageSize) !== null && _b !== void 0 ? _b : 10);
    const pageSize = (_c = props.pageSize) !== null && _c !== void 0 ? _c : innerPageSize;
    // Обработчик смены размера страницы
    const onShowSizeChange = useCallback((current, newSize) => {
        if (props.pageSize === undefined)
            setInnerPageSize(newSize); // только если не controlled
        if (props.onShowSizeChange)
            props.onShowSizeChange(current, newSize);
    }, [props.pageSize, props.onShowSizeChange]);
    const isSinglePage = useMemo(() => { var _a; return ((_a = props.total) !== null && _a !== void 0 ? _a : 0) <= pageSize; }, [props.total, pageSize]);
    const locale = useMemo(() => (Object.assign(Object.assign({ jump_to: t(['primitives', 'Pagination', 'jumpto']), items_per_page: '' }, props.locale), { page: '' })), [t, props.locale]);
    const sizeProp = {
        medium: 'default',
        small: 'small',
    }[size];
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-pagination', showLessItems: showLessItems }, props, { "$theme": theme, "$singlePage": isSinglePage, pageSize: pageSize, onShowSizeChange: onShowSizeChange, prevIcon: React.createElement(PaginationButton, { "$size": size, theme: theme },
            React.createElement(ChevronLeft, null)), nextIcon: React.createElement(PaginationButton, { "$size": size, theme: theme },
            React.createElement(ChevronRight, null)), jumpPrevIcon: React.createElement(Tooltip, Object.assign({ title: t(['primitives', 'Pagination', 'prev']) }, prevIconTooltip),
            React.createElement(PaginationButton, { "data-testid": 'jump-prev-icon', "$size": size, theme: theme }, "...")), jumpNextIcon: React.createElement(Tooltip, Object.assign({ title: t(['primitives', 'Pagination', 'next']) }, nextIconTooltip),
            React.createElement(PaginationButton, { "data-testid": 'jump-next-icon', "$size": size, theme: theme }, "...")), size: sizeProp, locale: locale })));
};

export { Pagination };
