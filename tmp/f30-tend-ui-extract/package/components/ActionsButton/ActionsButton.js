import { __rest } from 'tslib';
import React from 'react';
import { Root } from './components/Root/Root.js';
import { Trigger } from './components/Trigger/Trigger.js';

const ActionsButton = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(Root, Object.assign({}, props),
        React.createElement(Trigger, null, children)));
};
ActionsButton.displayName = 'ActionsButton';
ActionsButton.Root = Root;
ActionsButton.Trigger = Trigger;

export { ActionsButton };
