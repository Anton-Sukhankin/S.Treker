'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var TourContext = require('../../../../contexts/TourContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Layout = ({ children }) => {
    var _a;
    const context = TourContext.useTourContext();
    return (React__default["default"].createElement(tendUiGrid.Box, { ref: (_a = context === null || context === void 0 ? void 0 : context.ui) === null || _a === void 0 ? void 0 : _a.toolbar, "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'flex-end', "$flex": '1', "$gap": 8 }, children));
};
Layout.displayName = 'Table.Toolbar.Layout';

exports.Layout = Layout;
