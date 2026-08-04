import { __rest } from 'tslib';
import React from 'react';
import AntForm from 'antd-core/es/form';
import { Item } from './components/Item/Item.js';
import { Root } from './styled.js';

const BaseForm = (_a, ref) => {
    var { layout = 'vertical', gap } = _a, props = __rest(_a, ["layout", "gap"]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-form' }, props, { ref: ref, "$gap": gap, layout: layout })));
};
const ForwardedForm = React.forwardRef(BaseForm);
const Form = Object.assign(ForwardedForm, {
    Item,
    useForm: AntForm.useForm,
    useFormInstance: AntForm.useFormInstance,
    useWatch: AntForm.useWatch,
    ErrorList: AntForm.ErrorList,
    List: AntForm.List,
    Provider: AntForm.Provider,
    displayName: 'Form',
});

export { Form };
