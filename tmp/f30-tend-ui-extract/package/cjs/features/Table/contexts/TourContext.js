'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @private Not for public usage
 */
const TourContext = React__default["default"].createContext(undefined);
/**
 * @private Not for public usage
 */
const useTourContext = () => React__default["default"].useContext(TourContext);

exports.TourContext = TourContext;
exports.useTourContext = useTourContext;
