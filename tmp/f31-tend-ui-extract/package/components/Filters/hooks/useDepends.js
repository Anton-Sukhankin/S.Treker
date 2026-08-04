import React from 'react';
import pick from 'lodash/pick';

const useDepends = (props, values) => {
    return React.useMemo(() => JSON.stringify(pick(values, props.config.depends || [])), [props.config.depends, values]);
};

export { useDepends };
