import { __rest } from 'tslib';
import React from 'react';
import { Root as Root$1 } from '../../../../primitives/Layout/components/Root/Root.js';
import { LayoutContext } from '../../contexts/LayoutContext.js';

const Root = (_a) => {
    var { profile, authenticated = true, stand = 'prod' } = _a, props = __rest(_a, ["profile", "authenticated", "stand"]);
    return (React.createElement(LayoutContext, { value: React.useMemo(() => ({ profile, authenticated, stand }), [authenticated, profile, stand]) },
        React.createElement(Root$1, Object.assign({}, props))));
};
Root.displayName = 'Layout.Root';

export { Root };
