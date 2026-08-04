import React from 'react';
import { CardView } from '@10d/tend-ui-icons/CardView';
import { ListView } from '@10d/tend-ui-icons/ListView';
import { ToggleButton } from '@10d/tend-ui-primitives';
import { Box } from '@10d/tend-ui-grid';

const ViewButton = ({ onClick, onViewChange }) => {
    const [view, setView] = React.useState('table');
    const isList = view === 'list';
    const isTable = view === 'table';
    const handlerFactory = React.useCallback((view) => {
        return (e) => {
            setView(view);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
            onViewChange === null || onViewChange === void 0 ? void 0 : onViewChange(view);
        };
    }, [onClick, onViewChange]);
    return (React.createElement(Box, null,
        React.createElement(ToggleButton, { selected: isList, onClick: handlerFactory('list') },
            React.createElement(ListView, null)),
        React.createElement(ToggleButton, { selected: isTable, onClick: handlerFactory('table') },
            React.createElement(CardView, null))));
};

export { ViewButton };
