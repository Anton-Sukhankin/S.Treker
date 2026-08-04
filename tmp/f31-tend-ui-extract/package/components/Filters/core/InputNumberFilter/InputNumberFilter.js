import React from 'react';
import omit from 'lodash/omit';
import { InputNumber } from '../../../../primitives/InputNumber/InputNumber.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const InputNumberFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return React.createElement(InputNumber, Object.assign({ fullWidth: true, disabled: disabled }, omit(props, 'config')));
};

export { InputNumberFilter };
