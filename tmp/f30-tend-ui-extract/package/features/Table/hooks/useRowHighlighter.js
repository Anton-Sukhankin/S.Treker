import React from 'react';

const useRowHighlighter = (options) => {
    return React.useCallback(record => {
        var _a, _b, _c;
        const isError = (_a = options === null || options === void 0 ? void 0 : options.onError) === null || _a === void 0 ? void 0 : _a.call(options, record);
        const isWarning = (_b = options === null || options === void 0 ? void 0 : options.onWarning) === null || _b === void 0 ? void 0 : _b.call(options, record);
        const isSuccess = (_c = options === null || options === void 0 ? void 0 : options.onSuccess) === null || _c === void 0 ? void 0 : _c.call(options, record);
        const [, className] = [
            [isError, 'tend-ui-table-row-error'],
            [isWarning, 'tend-ui-table-row-warning'],
            [isSuccess, 'tend-ui-table-row-success'],
        ].filter(([k]) => !!k)[0] || [];
        return className;
    }, [options]);
};

export { useRowHighlighter };
