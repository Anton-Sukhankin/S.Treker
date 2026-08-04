import React from 'react';
import omit from 'lodash/omit';
import { DatePicker } from '../../../../primitives/DatePicker/DatePicker.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const DatePickerFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return React.createElement(DatePicker, Object.assign({ fullWidth: true, disabled: disabled }, omit(props, 'config')));
};

export { DatePickerFilter };
