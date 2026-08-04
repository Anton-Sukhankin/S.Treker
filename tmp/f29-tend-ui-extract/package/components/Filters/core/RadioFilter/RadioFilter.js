import React from 'react';
import omit from 'lodash/omit';
import { Radio } from '../../../../primitives/Radio/Radio.js';
import { Form } from '../../../Form/Form.js';
import { useDisabled } from '../../hooks/useDisabled.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const RadioFilter = (props) => {
    const form = Form.useFormInstance();
    const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled(props, values);
    return React.createElement(Radio, Object.assign({ disabled: disabled }, omit(props, 'config')));
};

export { RadioFilter };
