import { AxiosResponse } from 'axios';
import { InternalRequestConfig } from '../types';
import { AxiosMiddleware } from './types';
/**
 * @description Base middleware axios class
 */
export declare class BaseAxiosMiddleware implements AxiosMiddleware {
    onRequest: (config: InternalRequestConfig) => InternalRequestConfig;
    onRequestError: <T = unknown>(error: T) => Promise<T>;
    onResponse: <D = unknown>(response: AxiosResponse<D>) => AxiosResponse<D>;
    onResponseError: <T = unknown>(error: T) => Promise<T>;
}
