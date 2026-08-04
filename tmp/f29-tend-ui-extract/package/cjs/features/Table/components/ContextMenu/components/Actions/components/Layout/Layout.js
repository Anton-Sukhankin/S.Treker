'use strict';

var React = require('react');
var List = require('../../../../../../../../ui/List/List.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Layout = ({ children }) => {
    return React__default["default"].createElement(List.List, null, children);
};
Layout.displayName = 'Table.ContextMenu.Actions.Layout';

exports.Layout = Layout;
