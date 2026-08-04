import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Drawer as Drawer$1 } from '../../../../primitives/Drawer/Drawer.js';
import { Spinner } from '@10d/tend-ui-primitives';
import { useTheme } from '@10d/tend-ui-theme';

const Drawer = (_a) => {
    var { loading = false, title, children } = _a, props = __rest(_a, ["loading", "title", "children"]);
    const theme = useTheme();
    const t = useTranslation();
    return (React.createElement(Drawer$1, Object.assign({}, props, { title: title ? title : t(['components', 'Filters', 'title']) }),
        React.createElement(Spinner, { color: theme.colors.blue600, size: 'small', loading: loading }, children)));
};
Drawer.displayName = 'Filters.Drawer';

export { Drawer };
