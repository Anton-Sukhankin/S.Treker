import axios from 'axios';
import { BaseAxiosMiddleware } from './BaseAxiosMiddleware.js';

/**
 * @description Middleware для библиотеки axios отвечающая за отмену повторно отправленных запросов
 */
class RequestCanceller extends BaseAxiosMiddleware {
    constructor() {
        super(...arguments);
        this.pendingRequests = new Map();
        /**
         * @description Is request running?
         */
        this.isPending = (url) => {
            return this.pendingRequests.has(url);
        };
        /**
         * @description Remove request
         */
        this.unregister = (url) => {
            this.pendingRequests.delete(url);
        };
        /**
         * @description Register request
         */
        this.register = (url, request) => {
            const source = axios.CancelToken.source();
            this.pendingRequests.set(url, source);
            request.cancelToken = source.token;
        };
        /**
         * @description Cancel request
         */
        this.cancel = (url) => {
            const source = this.pendingRequests.get(url);
            this.pendingRequests.delete(url);
            source === null || source === void 0 ? void 0 : source.cancel();
        };
        this.onRequest = (request) => {
            const { cancellable = false } = request;
            if (!request.url || !cancellable)
                return request;
            if (this.isPending(request.url))
                this.cancel(request.url);
            this.register(request.url, request);
            return request;
        };
        this.onResponse = (response) => {
            if (!response.config.url)
                return response;
            if (this.isPending(response.config.url))
                this.unregister(response.config.url);
            return response;
        };
    }
}

export { RequestCanceller };
