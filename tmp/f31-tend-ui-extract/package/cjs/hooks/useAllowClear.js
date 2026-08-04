'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Используйте `useAllowClear` из `@10d/tend-ui-primitives`
 */
const useAllowClear = ({ allowClear, clearIconTooltip, }) => {
    const t = useTranslation.useTranslation();
    return React__default["default"].useMemo(() => {
        if (typeof allowClear === 'undefined')
            return;
        if (allowClear === false)
            return allowClear;
        return {
            clearIcon: (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({ title: t(['general', 'clear']) }, clearIconTooltip),
                React__default["default"].createElement(Close.Close, { size: 16 }))),
        };
    }, [allowClear, clearIconTooltip, t]);
};

exports.useAllowClear = useAllowClear;
