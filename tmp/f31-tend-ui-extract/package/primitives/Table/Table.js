import { __rest } from 'tslib';
import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import AntTable from 'antd-core/es/table';
import { Empty, Spinner } from '@10d/tend-ui-primitives';
import { useTheme } from '@10d/tend-ui-theme';
import cn from 'classnames';
import { Root } from './styled.js';
import { useColumns } from './hooks/useColumns.js';
import { useSize } from './hooks/useSize.js';
import { TextHeader } from './components/TextHeader/TextHeader.js';
import { TextCell } from './components/TextCell/TextCell.js';

const BaseTable = (_a, ref) => {
    var _b, _c;
    var { size = 'medium', empty, loading = false } = _a, props = __rest(_a, ["size", "empty", "loading"]);
    const theme = useTheme();
    const __size = useSize(size);
    const columns = useColumns(props.columns);
    const isRowCursorPointer = typeof ((_c = (_b = props === null || props === void 0 ? void 0 : props.onRow) === null || _b === void 0 ? void 0 : _b.call(props, {})) === null || _c === void 0 ? void 0 : _c.onClick) === 'function';
    const renderEmpty = React.useCallback(() => React.createElement(Empty, Object.assign({ description: '\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445' }, empty)), [empty]);
    const __loading = React.useMemo(() => ({ indicator: React.createElement(Spinner, { size: 'small', loading: loading }), spinning: loading }), [loading]);
    return (React.createElement(AntConfigProvider, { renderEmpty: renderEmpty },
        React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-table' }, props, { "$theme": theme, "$pointer": isRowCursorPointer, ref: ref, "$size": size, size: __size, columns: columns, loading: __loading, rootClassName: cn([props.rootClassName], {
                'tend-ui-table-large': __size === 'large',
            }), pagination: false }))));
};
const _Table = React.forwardRef(BaseTable);
const Table = Object.assign(_Table, {
    displayName: 'Table',
    TextCell,
    TextHeader,
    Summary: AntTable.Summary,
});

export { Table };
