import React from 'react';
import { FormProps, FormRef } from './types';
declare const Form: (<T = unknown>(props: FormProps<T> & {
    ref?: React.ForwardedRef<FormRef<T>>;
}) => React.JSX.Element) & {
    displayName?: string;
} & {
    Item: {
        <T = unknown>({ children, width, ...props }: import("./components/Item").FormItemProps<T>): React.JSX.Element;
        displayName: string;
        useStatus: () => {
            status?: ValidateStatus;
            errors: React.ReactNode[];
            warnings: React.ReactNode[];
        };
    };
    useForm: typeof import("antd-core/es/form/Form").useForm;
    useFormInstance: typeof import("antd-core/es/form/hooks/useFormInstance").default;
    useWatch: typeof import("rc-field-form").useWatch;
    ErrorList: React.FC<import("antd-core/es/form").ErrorListProps>;
    List: React.FC<import("antd-core/es/form").FormListProps>;
    Provider: React.FC<import("antd-core/es/form/context").FormProviderProps>;
    displayName: string;
};
export { Form };
