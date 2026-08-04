import React from 'react';
import { DragIndicator } from './styled.js';
import { useColumnsSettingContext } from '../../contexts/ColumnsSettingContext.js';

const DragHandle = ({ disabled, children }) => {
    const context = useColumnsSettingContext();
    const content = children !== null && children !== void 0 ? children : (React.createElement(DragIndicator, { size: 20, color: disabled ? 'gray500' : 'gray900' }));
    return (React.createElement("span", Object.assign({ "data-testid": 'tend-ui-columns-settings-column-setting-drag', ref: context.setActivatorNodeRef }, context.attributes, context.listeners), content));
};

export { DragHandle };
