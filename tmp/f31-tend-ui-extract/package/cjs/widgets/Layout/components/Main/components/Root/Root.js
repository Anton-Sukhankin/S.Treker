'use strict';

var React = require('react');
var Main = require('../../../../../../primitives/Layout/components/Main/Main.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = (props) => {
    return React__default["default"].createElement(Main.Main, Object.assign({}, props));
};
Root.displayName = 'Layout.Main.Root';

exports.Root = Root;
