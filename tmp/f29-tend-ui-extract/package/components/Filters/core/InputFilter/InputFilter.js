import React from 'react';
import omit from 'lodash/omit';
import { Input } from '@10d/tend-ui-primitives';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const InputFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return React.createElement(Input, Object.assign({ disabled: disabled }, omit(props, 'config')));
};

export { InputFilter };
