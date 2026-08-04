'use strict';

var React = require('react');
var Header = require('../../../../../../primitives/Layout/components/Header/Header.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = props => {
    return React__default["default"].createElement(Header.Header, Object.assign({}, props));
};
Root.displayName = 'Layout.Header.Root';

exports.Root = Root;
