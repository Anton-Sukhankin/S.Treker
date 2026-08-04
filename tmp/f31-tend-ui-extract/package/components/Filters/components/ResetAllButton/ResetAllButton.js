import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Button } from '@10d/tend-ui-primitives';
import { useFiltersFormProvider } from '../../core/FiltersFormProvider.js';

const ResetAllButton = (props) => {
    const t = useTranslation();
    const model = useFiltersFormProvider('Filters.ResetButton');
    return (React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-filters-reset-all-button', size: 'small', variant: 'secondary', onClick: model.onReset }, props), t(['components', 'Filters', 'reset'])));
};
ResetAllButton.displayName = 'Filters.ResetAllButton';

export { ResetAllButton };
