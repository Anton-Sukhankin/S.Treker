import React from 'react';
import omit from 'lodash/omit';
import { isString } from '@10d/tend-ui-utils/isString';
import { AsyncCheckbox } from '../../../AsyncCheckbox/AsyncCheckbox.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useDepends } from '../../hooks/useDepends.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const AsyncCheckboxFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    const _query = useDepends(props, values);
    // TODO: Внести эту логику в AsyncSelect
    const api = React.useMemo(() => {
        const query = JSON.parse(_query);
        if (isString(props.api))
            return { url: props.api, query };
        if (typeof props.api === 'function')
            return { fn: props.api, query };
        return Object.assign(Object.assign({}, props.api), { query });
    }, [props.api, _query]);
    return React.createElement(AsyncCheckbox, Object.assign({ disabled: disabled }, omit(props, 'config'), { api: api }));
};
AsyncCheckboxFilter.displayName = 'Filters.AsyncCheckboxFilter';

export { AsyncCheckboxFilter };
