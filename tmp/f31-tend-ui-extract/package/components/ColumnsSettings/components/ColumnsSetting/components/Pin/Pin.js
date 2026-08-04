import React from 'react';
import styled from 'styled-components';
import { Pin as Pin$1 } from '@10d/tend-ui-icons/Pin';

const Root = styled(Pin$1) `
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
const Pin = ({ disabled, pinned, onClick, onChange }) => {
    const handleClick = React.useCallback((e) => {
        if (disabled)
            return;
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (pinned) {
            onChange === null || onChange === void 0 ? void 0 : onChange('none');
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange('left');
    }, [disabled, onChange, onClick, pinned]);
    const colors = [
        [disabled, 'gray500'],
        [pinned, 'blue600'],
        [true, 'gray900'],
    ];
    const [, color] = colors.filter(([condition]) => condition)[0] || [];
    return (React.createElement(Root, { "data-testid": 'tend-ui-columns-settings-column-setting-pin', "$disabled": disabled, size: 20, color: color, onClick: handleClick }));
};

export { Pin };
