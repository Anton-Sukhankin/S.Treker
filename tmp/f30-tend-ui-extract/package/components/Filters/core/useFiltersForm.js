import pick from 'lodash/pick';
import { isString } from '@10d/tend-ui-utils';
import { useCallbackRef } from '@10d/tend-ui-hooks';
import { Form } from '../../Form/Form.js';
import { pack } from '../utils.js';

const useFiltersForm = (form, scope) => {
    const [state] = Form.useForm(form);
    const getScopeState = useCallbackRef(() => {
        const result = scope ? state.getFieldValue([scope]) : state.getFieldsValue();
        return result;
    });
    const getState = useCallbackRef(() => {
        const result = state.getFieldsValue();
        return result;
    });
    const get = useCallbackRef(name => {
        const path = scope ? [scope, name] : [name];
        const result = state.getFieldValue(path);
        return result;
    });
    const set = useCallbackRef((name, payload) => {
        const path = scope ? [scope, name] : [name];
        state.setFieldValue(path, payload);
    });
    const fill = useCallbackRef((payload) => {
        state.resetFields();
        state.setFieldsValue(pack(payload, scope));
    });
    const clear = useCallbackRef((name) => {
        const path = scope ? [scope, name] : [name];
        state.setFieldValue(path, undefined);
        const values = state.getFieldsValue();
        const touched = pick(values, path.join('.'));
        return [touched, values];
    });
    const reset = useCallbackRef(() => {
        const path = [scope].filter(isString);
        state.resetFields(path.length ? path : undefined);
        const values = state.getFieldsValue();
        return values;
    });
    return { set, clear, reset, get, getState, form: state, fill, getScopeState };
};

export { useFiltersForm };
