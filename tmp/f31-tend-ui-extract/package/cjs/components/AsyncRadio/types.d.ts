import React from 'react';
import { RadioGroupSearchProps } from '../../components/RadioGroupSearch';
import { RadioOptionType } from '../../primitives/Radio';
import { ApiListResponse } from '../../types/ApiListResponse';
import type { ApiFunction, ApiFunctionPayload, ApiFunctionConfig as _ApiFunctionConfig, ApiUrlConfig as _ApiUrlConfig } from '../../hooks/useApi';
import { GenericObject } from '../../types/GenericObject';
type ApiUrlConfig = _ApiUrlConfig & {
    query?: GenericObject;
};
type ApiFunctionConfig<D> = _ApiFunctionConfig<D> & {
    query?: GenericObject;
};
type ApiOptions<D> = string | ApiFunction<D> | ApiUrlConfig | ApiFunctionConfig<D>;
type BaseAsyncRadioProps<D extends object = object> = {
    /**
     * Свойство позволяет задать `url` или асинхронный метод для отправки запроса
     */
    api: ApiOptions<ApiListResponse<D>>;
    /**
     * Включает/выключает `infinite scrolling`
     */
    pagination?: boolean;
    /**
     * Свойство позволяет трансформировать полученные данные перед тем как передать их в `AsyncSelect`
     */
    transform?: (data: D) => RadioOptionType;
    /**
     * Вызывается при успешной загрузке данных
     */
    onLoad?: (data: D[]) => void;
};
export type AsyncRadioRef = {
    request: (payload?: ApiFunctionPayload) => void;
};
export type AsyncRadioProps<D extends object = object> = Omit<RadioGroupSearchProps, 'options' | 'error'> & BaseAsyncRadioProps<D>;
export type AsyncRadioComponent = (<D extends object = object>(props: AsyncRadioProps<D> & {
    ref?: React.ForwardedRef<AsyncRadioRef>;
}) => React.JSX.Element) & Pick<React.FC, 'displayName'>;
export {};
