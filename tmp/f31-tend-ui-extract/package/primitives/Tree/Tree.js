import { __rest } from 'tslib';
import React from 'react';
import { INTERNAL_TendUILogger } from '@10d/tend-ui-utils';
import { ExpandButton } from './ExpandButton/ExpandButton.js';
import { Root } from './styled.js';

/**
 * @deprecated Устарело
 * Используйте `Tree` из пакета `@10d/tend-ui-tree`
 */
const Tree = React.forwardRef((_a, ref) => {
    var { selectable = false } = _a, props = __rest(_a, ["selectable"]);
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<Tree /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Tree /> из пакета "@10d/tend-ui-tree"',
        ]);
    }
    const switcherIcon = React.useCallback((props) => React.createElement(ExpandButton, Object.assign({}, props)), []);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-tree' }, props, { ref: ref, switcherIcon: switcherIcon, selectable: selectable })));
});
Tree.displayName = 'Tree';

export { Tree };
