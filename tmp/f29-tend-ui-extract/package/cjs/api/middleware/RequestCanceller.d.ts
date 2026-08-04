import { AxiosResponse } from 'axios';
import { BaseAxiosMiddleware } from './BaseAxiosMiddleware';
import { InternalRequestConfig } from '../types';
/**
 * @description Middleware для библиотеки axios отвечающая за отмену повторно отправленных запросов
 */
export declare class RequestCanceller extends BaseAxiosMiddleware {
    private readonly pendingRequests;
    /**
     * @description Is request running?
     */
    private isPending;
    /**
     * @description Remove request
     */
    private unregister;
    /**
     * @description Register request
     */
    private register;
    /**
     * @description Cancel request
     */
    private cancel;
    onRequest: (request: InternalRequestConfig) => InternalRequestConfig;
    onResponse: <D = unknown>(response: AxiosResponse<D>) => AxiosResponse<D>;
}
