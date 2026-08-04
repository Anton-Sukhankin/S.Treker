import React from 'react';
import { Search as Search$1 } from '../../../../components/Search/Search.js';
import { Form } from '../../../../components/Form/Form.js';
import { FormName } from '../../consts/FormName.js';
import { useTableForm } from '../../hooks/useTableForm.js';

const Search = (props) => {
    const { form } = useTableForm();
    return (React.createElement(Form, { component: false, form: form, name: FormName.Search },
        React.createElement(Form.Item, { noStyle: true, name: 'search' },
            React.createElement(Search$1, Object.assign({ style: { width: '256px' } }, props)))));
};

export { Search };
