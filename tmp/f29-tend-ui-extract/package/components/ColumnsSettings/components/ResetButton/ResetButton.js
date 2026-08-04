import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Button } from '@10d/tend-ui-primitives';

const ResetButton = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const t = useTranslation();
    const content = children !== null && children !== void 0 ? children : t(['components', 'ColumnsSettings', 'reset']);
    return (React.createElement(Button, Object.assign({ size: 'small', variant: 'secondary' }, props), content));
};
ResetButton.displayName = 'ColumnsSettings.ResetButton';

export { ResetButton };
