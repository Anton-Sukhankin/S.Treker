import React from 'react';
import omit from 'lodash/omit';
import { Select } from '../../../../primitives/Select/Select.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const SelectFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return React.createElement(Select, Object.assign({ fullWidth: true, disabled: disabled }, omit(props, 'config')));
};

export { SelectFilter };
