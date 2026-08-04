import { __rest } from 'tslib';
import React from 'react';
import { GroupRoot } from './styled.js';

const Group = React.forwardRef((_a, ref) => {
    var { layout = 'horizontal', fullWidth = false } = _a, props = __rest(_a, ["layout", "fullWidth"]);
    return React.createElement(GroupRoot, Object.assign({}, props, { ref: ref, "$layout": layout, "$fullWidth": fullWidth }));
});
Group.displayName = 'Checkbox.Group';

export { Group };
