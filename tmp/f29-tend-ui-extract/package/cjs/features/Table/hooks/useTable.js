'use strict';

var Form = require('../../../components/Form/Form.js');

const useTable = () => {
    const [form] = Form.Form.useForm();
    return { form };
};

exports.useTable = useTable;
