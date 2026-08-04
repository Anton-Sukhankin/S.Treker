import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@10d/tend-ui-grid';
import { ColumnsSettingContext } from '../../contexts/ColumnsSettingContext.js';

const Root = ({ column, className, children, }) => {
    const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition, } = useSortable({ id: column.id, disabled: !column.draggable });
    const style = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
    };
    const value = React.useMemo(() => ({
        attributes,
        listeners,
        setActivatorNodeRef,
    }), [attributes, listeners, setActivatorNodeRef]);
    return (React.createElement(Box, { "data-testid": 'tend-ui-columns-settings-column-setting-root', ref: setNodeRef, "$display": 'flex', "$alignItems": 'center', "$gap": 8, style: style, className: className },
        React.createElement(ColumnsSettingContext, { value: value }, children)));
};

export { Root };
