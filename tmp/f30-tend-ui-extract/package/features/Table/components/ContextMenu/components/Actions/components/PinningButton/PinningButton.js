import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Pin } from '@10d/tend-ui-icons/Pin';
import { ListItem } from '../../styled.js';

const PinningButton = ({ pinned, onChange, onClick, disabled }) => {
    const t = useTranslation();
    const node = pinned
        ? t(['features', 'Table', 'unpin'])
        : t(['features', 'Table', 'pin']);
    const handleClick = React.useCallback(() => {
        onClick === null || onClick === void 0 ? void 0 : onClick();
        if (pinned) {
            onChange === null || onChange === void 0 ? void 0 : onChange('none');
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange('left');
    }, [onChange, onClick, pinned]);
    return (React.createElement(ListItem, { before: React.createElement(Pin, { color: pinned ? 'blue600' : 'gray500' }), onClick: handleClick, disabled: disabled }, node));
};
PinningButton.displayName = 'Table.ContextMenu.Actions.PinningButton';

export { PinningButton };
