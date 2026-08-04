import { __rest } from 'tslib';
import React from 'react';
import { Box } from '@10d/tend-ui-grid';
import { Root } from './styled.js';

const Popover = React.forwardRef((_a, ref) => {
    var { content, footer, arrow = false } = _a, props = __rest(_a, ["content", "footer", "arrow"]);
    const contentProp = React.useMemo(() => {
        if (footer)
            return (React.createElement(React.Fragment, null,
                content,
                React.createElement(Box, { "$display": 'flex', "$justifyContent": 'flex-end', "$gap": 8, "$mt": 20 }, footer.map(node => node))));
        return content;
    }, [content, footer]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-popover' }, props, { ref: ref, arrow: arrow, content: contentProp })));
});
Popover.displayName = 'Popover';

export { Popover };
