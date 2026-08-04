import { FormInstance } from '../../../components/Form';
import { TableForm } from '../../../features/Table/types';
type FormContextType = {
    form: FormInstance<TableForm>;
};
declare const FormContext: import("react").Provider<FormContextType | undefined>, useFormContext: (consumer?: string) => FormContextType;
export { FormContext, useFormContext };
export type { FormContextType };
