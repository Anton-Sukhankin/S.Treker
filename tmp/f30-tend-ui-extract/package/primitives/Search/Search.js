import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps, extractDimensionProps } from '@10d/tend-ui-styling';
import { Search as Search$1 } from '@10d/tend-ui-icons/Search';
import { useTheme } from '@10d/tend-ui-theme';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useInputTitle } from '../../hooks/useInputTitle.js';
import { useSize } from '../../hooks/useSize.js';
import { Root } from './styled.js';

const Search = React.forwardRef((_a, ref) => {
    var { allowClear, clearIconTooltip } = _a, props = __rest(_a, ["allowClear", "clearIconTooltip"]);
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const { onChange, title } = useInputTitle(props);
    const size = useSize(props.size);
    const _b = extractMarginProps(props), { rest: withoutMargins } = _b, margins = __rest(_b, ["rest"]);
    const _c = extractDimensionProps(withoutMargins), { rest } = _c, dimensions = __rest(_c, ["rest"]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-search' }, rest, margins, dimensions, { ref: ref, onChange: onChange, title: title, "$theme": theme, prefix: React.createElement(Search$1, null), allowClear: allowClearProp, size: size })));
});
Search.displayName = 'Search';

export { Search };
