'use strict';

/**
 * @description Base middleware axios class
 */
class BaseAxiosMiddleware {
    constructor() {
        this.onRequest = (config) => {
            return config;
        };
        this.onRequestError = (error) => {
            return Promise.reject(error);
        };
        this.onResponse = (response) => {
            return response;
        };
        this.onResponseError = (error) => {
            return Promise.reject(error);
        };
    }
}

exports.BaseAxiosMiddleware = BaseAxiosMiddleware;
