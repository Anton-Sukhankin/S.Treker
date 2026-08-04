import React from 'react';
import omit from 'lodash/omit';
import { Checkbox } from '../../../../primitives/Checkbox/Checkbox.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const CheckboxGroupFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return (React.createElement(Checkbox.Group, Object.assign({ layout: 'vertical', disabled: disabled }, omit(props, 'config'))));
};

export { CheckboxGroupFilter };
