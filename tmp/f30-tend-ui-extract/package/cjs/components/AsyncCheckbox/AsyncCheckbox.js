'use strict';

var tslib = require('tslib');
var React = require('react');
var debounce = require('lodash/debounce');
var tendUiApi = require('@10d/tend-ui-api');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiHooks = require('@10d/tend-ui-hooks');
var CheckboxGroupSearch = require('../CheckboxGroupSearch/CheckboxGroupSearch.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var debounce__default = /*#__PURE__*/_interopDefault(debounce);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data) => (Object.assign({ value: data === null || data === void 0 ? void 0 : data.id, label: data === null || data === void 0 ? void 0 : data.name }, data));
const BaseAsyncCheckbox = (_a, ref) => {
    var { filterOption = false, pagination = false, api, onLoad, onSearch, transform = _transform, onScroll } = _a, props = tslib.__rest(_a, ["filterOption", "pagination", "api", "onLoad", "onSearch", "transform", "onScroll"]);
    const __api = React__default["default"].useMemo(() => {
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
    const isRequestCalled = React__default["default"].useRef(false);
    const isBackendSearching = filterOption === false;
    const _query = React__default["default"].useMemo(() => {
        // Предполагаем, что если объект api изменился, значит изменился и объект query
        // и нужно перезапросить данные
        isRequestCalled.current = false;
        if (typeof api !== 'object')
            return;
        return api.query;
    }, [api]);
    const request = tendUiHooks.useCallbackRef((payload, force = false) => {
        isRequestCalled.current = true;
        // TODO: Not the best practice
        // Maybe better pass query as as payload params in every usage
        const params = _query ? Object.assign(Object.assign({}, payload === null || payload === void 0 ? void 0 : payload.params), _query) : payload === null || payload === void 0 ? void 0 : payload.params;
        _request(Object.assign(Object.assign({}, payload), { params }), { force }).then(response => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(response.results);
        });
    });
    React__default["default"].useImperativeHandle(ref, () => ({
        request,
    }));
    const { loading, data, error, request: _request, next } = tendUiApi.usePaginationApi(__api);
    const handleSearch = React__default["default"].useMemo(() => debounce__default["default"]((search) => {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(search);
        if (!isBackendSearching)
            return;
        request({ params: { search } }, true);
    }, 300), [isBackendSearching, onSearch, request]);
    /**
     * Request on the first mount
     */
    React__default["default"].useEffect(() => {
        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_query]);
    // FIXME: Fix types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const options = React__default["default"].useMemo(() => {
        if (!data)
            return [];
        return data.map(transform);
    }, [data, transform]);
    const handleScroll = React__default["default"].useCallback(event => {
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
        if (!pagination)
            return;
        const target = event.target;
        if (!tendUiUtils.isExceed(target.scrollTop + target.offsetHeight, target.scrollHeight, 80)) {
            return;
        }
        next();
    }, [next, onScroll, pagination]);
    return (React__default["default"].createElement(CheckboxGroupSearch.CheckboxGroupSearch, Object.assign({}, props, { error: Boolean(error), loading: loading, options: options, onSearch: handleSearch, filterOption: filterOption, onScroll: handleScroll })));
};
const AsyncCheckbox = React__default["default"].forwardRef(BaseAsyncCheckbox);
AsyncCheckbox.displayName = 'AsyncCheckbox';

exports.AsyncCheckbox = AsyncCheckbox;
