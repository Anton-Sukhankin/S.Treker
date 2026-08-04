'use strict';

var tslib = require('tslib');
var React = require('react');
var debounce = require('lodash/debounce');
var tendUiApi = require('@10d/tend-ui-api');
var tendUiUtils = require('@10d/tend-ui-utils');
var Select = require('../../primitives/Select/Select.js');
var tendUiHooks = require('@10d/tend-ui-hooks');
var EmptyOverlay = require('../../ui/EmptyOverlay/EmptyOverlay.js');
var ErrorOverlay = require('../../ui/ErrorOverlay/ErrorOverlay.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var debounce__default = /*#__PURE__*/_interopDefault(debounce);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data) => (Object.assign({ value: data === null || data === void 0 ? void 0 : data.id, label: data === null || data === void 0 ? void 0 : data.name }, data));
const BaseAsyncSelect = (_a, ref) => {
    var { filterOption = false, pagination = false, api, searchPropName = 'search', preload = ['onopen'], onLoad, onSearch, onSelect, onBlur, onDropdownVisibleChange, transform = _transform, onPopupScroll, autoClearSearchValue = true } = _a, props = tslib.__rest(_a, ["filterOption", "pagination", "api", "searchPropName", "preload", "onLoad", "onSearch", "onSelect", "onBlur", "onDropdownVisibleChange", "transform", "onPopupScroll", "autoClearSearchValue"]);
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
    const { loading, data, error, request: __request, next } = tendUiApi.usePaginationApi(__api);
    /**
     * Нужно для отслеживания были ли получены данные или нет чтобы не делать
     * лишних запросов
     */
    const isRequestCalled = React__default["default"].useRef(false);
    const isSearchTyped = React__default["default"].useRef(false);
    const isMountingPreload = preload.includes('onmount');
    const isOpeningPreload = preload.includes('onopen');
    const isEveryOpeningPreload = preload.includes('oneveryopen');
    const isBluringPreload = preload.includes('onblur');
    const isEveryBluringPreload = preload.includes('oneveryblur');
    const isBackendSearching = filterOption === false;
    const isMultiple = props.mode === 'multiple';
    const isTags = props.mode === 'tags';
    const isSingle = !isMultiple && !isTags;
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
        __request(Object.assign(Object.assign({}, payload), { params }), { force }).then(response => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(response.results);
        });
    });
    React__default["default"].useImperativeHandle(ref, () => ({
        request,
    }));
    /**
     * Request on the first mount
     */
    React__default["default"].useEffect(() => {
        if (!isMountingPreload)
            return;
        request();
        // Следим за обновлением query объекта передаваемым извне
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_query]);
    const handleDropdownVisibleChange = React__default["default"].useCallback(value => {
        onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(value);
        if (!value)
            return;
        if (isEveryOpeningPreload) {
            request();
            return;
        }
        if (isOpeningPreload && !isRequestCalled.current) {
            request();
            return;
        }
    }, [isEveryOpeningPreload, isOpeningPreload, onDropdownVisibleChange, request]);
    const handleSelect = React__default["default"].useCallback((...params) => {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(...params);
        if (!isSingle || !isSearchTyped.current)
            return;
        isSearchTyped.current = false;
        /**
         * Перезапрашиваем данные без поискового запроса
         */
        request();
    }, [isSingle, onSelect, request]);
    const handleSearch = React__default["default"].useMemo(() => debounce__default["default"]((search) => {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(search);
        if (!isBackendSearching)
            return;
        if (!search) {
            isSearchTyped.current = false;
            request();
            return;
        }
        request({ params: { [searchPropName]: search } }, true);
        isSearchTyped.current = true;
    }, 300), [isBackendSearching, onSearch, request, searchPropName]);
    const handleBlur = React__default["default"].useCallback(event => {
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
        /**
         * Если установлен флаг запрашивать данные на каждый blur
         * или если мы выполнили поиск и после произошел blur
         * нужно перезапросить данные в изначальном виде без параметров search
         */
        if (isEveryBluringPreload || (isSearchTyped.current && autoClearSearchValue)) {
            request();
            return;
        }
        if (isBluringPreload && !isRequestCalled.current) {
            request();
        }
    }, [autoClearSearchValue, isBluringPreload, isEveryBluringPreload, onBlur, request]);
    const notFoundContent = React__default["default"].useMemo(() => {
        if (error)
            return React__default["default"].createElement(ErrorOverlay.ErrorOverlay, null);
        return React__default["default"].createElement(EmptyOverlay.EmptyOverlay, null);
    }, [error]);
    const options = React__default["default"].useMemo(() => {
        if (!data)
            return [];
        return data.map(transform);
    }, [data, transform]);
    const handlePopupScroll = React__default["default"].useCallback(event => {
        onPopupScroll === null || onPopupScroll === void 0 ? void 0 : onPopupScroll(event);
        if (!pagination)
            return;
        const target = event.target;
        if (!tendUiUtils.isExceed(target.scrollTop + target.offsetHeight, target.scrollHeight, 80)) {
            return;
        }
        next();
    }, [next, onPopupScroll, pagination]);
    return (React__default["default"].createElement(Select.Select, Object.assign({}, props, { filterOption: filterOption, loading: loading, autoClearSearchValue: autoClearSearchValue, options: options, notFoundContent: notFoundContent, onSearch: handleSearch, onSelect: handleSelect, onBlur: handleBlur, onDropdownVisibleChange: handleDropdownVisibleChange, onPopupScroll: handlePopupScroll })));
};
const AsyncSelect = React__default["default"].forwardRef(BaseAsyncSelect);
AsyncSelect.displayName = 'AsyncSelect';

exports.AsyncSelect = AsyncSelect;
