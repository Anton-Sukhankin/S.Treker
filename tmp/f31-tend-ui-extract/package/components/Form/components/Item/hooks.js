import React from 'react';
import AntForm from 'antd-core/es/form';
import { Error } from '@10d/tend-ui-icons/Error';

const composeMessage = (rule) => (Object.assign(Object.assign({}, rule), { message: (React.createElement(React.Fragment, null,
        React.createElement(Error, { "data-testid": 'error-icon', size: 16 }),
        " ",
        rule.message)) }));
const useErrorMessagePrefix = (rules) => {
    const form = AntForm.useFormInstance();
    return React.useMemo(() => {
        return rules === null || rules === void 0 ? void 0 : rules.map(rule => {
            if (typeof rule === 'function') {
                return composeMessage(rule(form));
            }
            return composeMessage(rule);
        });
    }, [form, rules]);
};

export { useErrorMessagePrefix };
