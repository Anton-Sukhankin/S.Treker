import React from 'react';
import { Box } from '@10d/tend-ui-grid';
import { useTourContext } from '../../../../contexts/TourContext.js';

const Layout = ({ children }) => {
    var _a;
    const context = useTourContext();
    return (React.createElement(Box, { ref: (_a = context === null || context === void 0 ? void 0 : context.ui) === null || _a === void 0 ? void 0 : _a.toolbar, "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'flex-end', "$flex": '1', "$gap": 8 }, children));
};
Layout.displayName = 'Table.Toolbar.Layout';

export { Layout };
