'use strict';

var tendUiFactories = require('@10d/tend-ui-factories');
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const [_ColumnsContext, _useColumnContext] = tendUiFactories.contextFactory();
const ColumnsContext = ({ value, children, }) => {
    return (React__default["default"].createElement(_ColumnsContext, { value: React__default["default"].useMemo(() => value, [value]) }, children));
};
const useColumnContext = () => {
    return _useColumnContext();
};

exports.ColumnsContext = ColumnsContext;
exports.useColumnContext = useColumnContext;
