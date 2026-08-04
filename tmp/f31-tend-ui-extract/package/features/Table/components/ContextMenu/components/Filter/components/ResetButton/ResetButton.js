import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Button } from './styled.js';

const ResetButton = (_a) => {
    var props = __rest(_a, []);
    const t = useTranslation();
    return (React.createElement(Button, Object.assign({ padding: false, variant: 'link' }, props), t(['features', 'Table', 'reset'])));
};

export { ResetButton };
