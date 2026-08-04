import { __rest } from 'tslib';
import React from 'react';
import debounce from 'lodash/debounce';
import { usePaginationApi } from '@10d/tend-ui-api';
import { isExceed } from '@10d/tend-ui-utils';
import { RadioGroupSearch } from '../RadioGroupSearch/RadioGroupSearch.js';
import { useCallbackRef } from '@10d/tend-ui-hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data) => (Object.assign({ value: data === null || data === void 0 ? void 0 : data.id, label: data === null || data === void 0 ? void 0 : data.name }, data));
const BaseAsyncRadio = (_a, ref) => {
    var { filterOption = false, pagination = false, api, onLoad, onSearch, transform = _transform, onScroll } = _a, props = __rest(_a, ["filterOption", "pagination", "api", "onLoad", "onSearch", "transform", "onScroll"]);
    const __api = React.useMemo(() => {
        if (!api)
            return '';
        if (typeof api === 'string')
            return {
                // enabling request cancelling by default
                cancellable: true,
                url: api,
            };
        if (typeof api === 'object')
            return Object.assign({ 
                // enabling request cancelling by default
                cancellable: true }, api);
        return api;
    }, [api]);
    const isRequestCalled = React.useRef(false);
    const isBackendSearching = filterOption === false;
    const _query = React.useMemo(() => {
        // Предполагаем, что если объект api изменился, значит изменился и объект query
        // и нужно перезапросить данные
        isRequestCalled.current = false;
        if (typeof api !== 'object')
            return;
        return api.query;
    }, [api]);
    const request = useCallbackRef((payload, force = false) => {
        isRequestCalled.current = true;
        // TODO: Not the best practice
        // Maybe better pass query as as payload params in every usage
        const params = _query ? Object.assign(Object.assign({}, payload === null || payload === void 0 ? void 0 : payload.params), _query) : payload === null || payload === void 0 ? void 0 : payload.params;
        _request(Object.assign(Object.assign({}, payload), { params }), { force }).then(response => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(response.results);
        });
    });
    React.useImperativeHandle(ref, () => ({
        request,
    }));
    const { loading, data, error, request: _request, next } = usePaginationApi(__api);
    const handleSearch = React.useMemo(() => debounce((search) => {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(search);
        if (!isBackendSearching)
            return;
        request({ params: { search } }, true);
    }, 300), [isBackendSearching, onSearch, request]);
    /**
     * Request on the first mount
     */
    React.useEffect(() => {
        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_query]);
    // FIXME: Fix types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const options = React.useMemo(() => {
        if (!data)
            return [];
        return data.map(transform);
    }, [data, transform]);
    const handleScroll = React.useCallback(event => {
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
        if (!pagination)
            return;
        const target = event.target;
        if (!isExceed(target.scrollTop + target.offsetHeight, target.scrollHeight, 80)) {
            return;
        }
        next();
    }, [next, onScroll, pagination]);
    return (React.createElement(RadioGroupSearch, Object.assign({}, props, { error: Boolean(error), loading: loading, options: options, onSearch: handleSearch, filterOption: filterOption, onScroll: handleScroll })));
};
const AsyncRadio = React.forwardRef(BaseAsyncRadio);
AsyncRadio.displayName = 'AsyncRadio';

export { AsyncRadio };
