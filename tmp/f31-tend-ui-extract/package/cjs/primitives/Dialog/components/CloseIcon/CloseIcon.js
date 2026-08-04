'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const CloseIcon = (props) => {
    const t = useTranslation.useTranslation();
    const isEmpty = Object.entries(props).length === 0;
    const tooltipProps = React__default["default"].useMemo(() => {
        if (isEmpty)
            return { title: t(['general', 'close']) };
        return props;
    }, [isEmpty, props, t]);
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({}, tooltipProps),
        React__default["default"].createElement(Close.Close, { size: 20 })));
};

exports.CloseIcon = CloseIcon;
