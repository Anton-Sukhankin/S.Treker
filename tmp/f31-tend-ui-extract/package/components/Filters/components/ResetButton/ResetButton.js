import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Button } from '@10d/tend-ui-primitives';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';

const ResetButton = (_a) => {
    var { filter } = _a, props = __rest(_a, ["filter"]);
    const t = useTranslation();
    const form = Form.useFormInstance();
    const values = Form.useWatch([], form);
    const disabled = useDisabled({ config: filter }, values);
    return (React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-filters-reset-button', padding: false, variant: 'link', disabled: disabled }, props), t(['general', 'reset'])));
};
ResetButton.displayName = 'Filters.ResetButton';

export { ResetButton };
