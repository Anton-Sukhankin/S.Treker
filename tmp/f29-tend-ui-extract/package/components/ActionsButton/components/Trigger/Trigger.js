import { __rest } from 'tslib';
import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { ChevronDown } from '@10d/tend-ui-icons/ChevronDown';
import { ChevronUp } from '@10d/tend-ui-icons/ChevronUp';
import { Button } from '@10d/tend-ui-primitives';
import { useActionsButtonContext } from '../../contexts/ActionsButton.js';

const Trigger = (_a) => {
    var { children, onClick } = _a, props = __rest(_a, ["children", "onClick"]);
    const t = useTranslation();
    const content = isUndefined(children)
        ? t(['components', 'ActionsButton', 'button'])
        : children;
    const { open, display } = useActionsButtonContext('ActionsButtonTrigger');
    return (React.createElement(Button, Object.assign({ variant: 'secondary' }, props, { before: open ? React.createElement(ChevronUp, null) : React.createElement(ChevronDown, null), onClick: e => {
            display === null || display === void 0 ? void 0 : display(!open);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        } }), content));
};
Trigger.displayName = 'ActionsButton.Trigger';

export { Trigger };
