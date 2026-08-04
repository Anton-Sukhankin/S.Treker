import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import isEmpty from 'lodash/isEmpty';
import { FilterAlt } from '@10d/tend-ui-icons/FilterAlt';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';
import { useTourContext } from '../../../../contexts/TourContext.js';
import { useTableForm } from '../../../../hooks/useTableForm.js';
import { Form } from '../../../../../../components/Form/Form.js';

const FiltersButton = (_a) => {
    var _b;
    var { tooltip, selected } = _a, props = __rest(_a, ["tooltip", "selected"]);
    const context = useTourContext();
    const t = useTranslation();
    const value = Form.useWatch(['filters'], useTableForm().form);
    const hasAppliedFilters = value ? Object.values(value).some(v => !isEmpty(v)) : false;
    const _selected = hasAppliedFilters || selected;
    return (React.createElement(Tooltip, Object.assign({ title: t(['features', 'Table', 'filter']) }, tooltip),
        React.createElement(ToggleButton, Object.assign({}, props, { ref: (_b = context === null || context === void 0 ? void 0 : context.ui) === null || _b === void 0 ? void 0 : _b.filtersButton, selected: _selected }),
            React.createElement(FilterAlt, null))));
};
FiltersButton.displayName = 'Table.Toolbar.FiltersButton';

export { FiltersButton };
