import { Form } from '../../../components/Form/Form.js';

const useTable = () => {
    const [form] = Form.useForm();
    return { form };
};

export { useTable };
