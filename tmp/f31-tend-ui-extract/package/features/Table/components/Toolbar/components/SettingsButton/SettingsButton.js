import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Settings } from '@10d/tend-ui-icons/Settings';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';
import { useTourContext } from '../../../../contexts/TourContext.js';

const SettingsButton = (_a) => {
    var _b;
    var { tooltip } = _a, props = __rest(_a, ["tooltip"]);
    const context = useTourContext();
    const t = useTranslation();
    return (React.createElement(Tooltip, Object.assign({ title: t(['features', 'Table', 'settings']) }, tooltip),
        React.createElement(ToggleButton, Object.assign({}, props, { ref: (_b = context === null || context === void 0 ? void 0 : context.ui) === null || _b === void 0 ? void 0 : _b.settingsButton }),
            React.createElement(Settings, null))));
};

export { SettingsButton };
