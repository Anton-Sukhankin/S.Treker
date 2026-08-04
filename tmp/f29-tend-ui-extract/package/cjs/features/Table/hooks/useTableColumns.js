'use strict';

var React = require('react');
var ColumnsContext = require('../contexts/ColumnsContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useTableColumns = () => {
    const { columns, pin, display } = ColumnsContext.useColumnsContext();
    const api = React__default["default"].useMemo(() => ({
        columns,
        pin,
        display,
    }), [columns, display, pin]);
    return api;
};

exports.useTableColumns = useTableColumns;
