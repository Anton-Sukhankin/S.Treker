import React from 'react';
import omit from 'lodash/omit';
import { RadioGroupSearch } from '../../../RadioGroupSearch/RadioGroupSearch.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const RadioGroupSearchFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return (React.createElement(RadioGroupSearch, Object.assign({ layout: 'vertical', disabled: disabled }, omit(props, 'config'))));
};

export { RadioGroupSearchFilter };
