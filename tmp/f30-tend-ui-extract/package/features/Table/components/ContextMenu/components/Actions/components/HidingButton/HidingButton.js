import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { VisibilityOff } from '@10d/tend-ui-icons/VisibilityOff';
import { ListItem } from '../../styled.js';

const HidingButton = ({ onClick, disabled }) => {
    const t = useTranslation();
    return (React.createElement(ListItem, { before: React.createElement(VisibilityOff, { color: 'gray500' }), onClick: onClick, disabled: disabled }, t(['features', 'Table', 'hide'])));
};
HidingButton.displayName = 'Table.ContextMenu.Actions.HidingButton';

export { HidingButton };
