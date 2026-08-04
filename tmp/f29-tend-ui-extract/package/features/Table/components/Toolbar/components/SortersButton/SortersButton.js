import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { DoubleArrowVertical } from '@10d/tend-ui-icons/DoubleArrowVertical';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';
import { useTourContext } from '../../../../contexts/TourContext.js';

const SortersButton = (_a) => {
    var _b;
    var { tooltip } = _a, props = __rest(_a, ["tooltip"]);
    const context = useTourContext();
    const t = useTranslation();
    return (React.createElement(Tooltip, Object.assign({ title: t(['features', 'Table', 'sorter']) }, tooltip),
        React.createElement(ToggleButton, Object.assign({}, props, { ref: (_b = context === null || context === void 0 ? void 0 : context.ui) === null || _b === void 0 ? void 0 : _b.sortersButton }),
            React.createElement(DoubleArrowVertical, { size: 20 }))));
};
SortersButton.displayName = 'Table.Toolbar.SortersButton';

export { SortersButton };
