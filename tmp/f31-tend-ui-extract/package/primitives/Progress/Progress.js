import { __rest } from 'tslib';
import React from 'react';
import AntProgress from 'antd-core/es/progress';

const Progress = React.forwardRef((_a, ref) => {
    var { size } = _a, props = __rest(_a, ["size"]);
    const sizeProp = (() => {
        if (size === 'medium')
            return 'default';
        return size;
    })();
    return (React.createElement(AntProgress, Object.assign({ "data-testid": 'tend-ui-progress' }, props, { ref: ref, size: sizeProp })));
});
Progress.displayName = 'Progress';

export { Progress };
