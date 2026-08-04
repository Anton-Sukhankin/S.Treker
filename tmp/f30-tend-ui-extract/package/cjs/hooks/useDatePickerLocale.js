'use strict';

var React = require('react');
var tendUiLocale = require('@10d/tend-ui-locale');
var ru_RU = require('antd-core/es/date-picker/locale/ru_RU');
var en_US = require('antd-core/es/date-picker/locale/en_US');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var ru_RU__default = /*#__PURE__*/_interopDefault(ru_RU);
var en_US__default = /*#__PURE__*/_interopDefault(en_US);

const useDatePickerLocale = (locale) => {
    const lang = tendUiLocale.useLanguage('useDatePickerLocale');
    return React__default["default"].useMemo(() => {
        const defaultLocale = locale !== null && locale !== void 0 ? locale : { ru: ru_RU__default["default"], en: en_US__default["default"] }[lang];
        return Object.assign(Object.assign({}, defaultLocale), { lang: Object.assign({ monthFormat: 'MMMM' }, defaultLocale.lang) });
    }, [lang, locale]);
};

exports.useDatePickerLocale = useDatePickerLocale;
