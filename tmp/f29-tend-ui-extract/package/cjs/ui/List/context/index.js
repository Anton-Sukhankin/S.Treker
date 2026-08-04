'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @internal Not for public usage
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListContext = React__default["default"].createContext(undefined);
/**
 * @internal Not for public usage
 */
const useListContext = () => {
    return React__default["default"].useContext(ListContext);
};

exports.ListContext = ListContext;
exports.useListContext = useListContext;
