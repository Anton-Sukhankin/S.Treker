import React from 'react';
import omit from 'lodash/omit';
import { CheckboxGroupSearch } from '../../../CheckboxGroupSearch/CheckboxGroupSearch.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const CheckboxGroupSearchFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return (React.createElement(CheckboxGroupSearch, Object.assign({ layout: 'vertical', disabled: disabled }, omit(props, 'config'))));
};

export { CheckboxGroupSearchFilter };
