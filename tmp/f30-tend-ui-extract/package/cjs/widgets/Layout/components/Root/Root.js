'use strict';

var tslib = require('tslib');
var React = require('react');
var Root$1 = require('../../../../primitives/Layout/components/Root/Root.js');
var LayoutContext = require('../../contexts/LayoutContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = (_a) => {
    var { profile, authenticated = true, stand = 'prod' } = _a, props = tslib.__rest(_a, ["profile", "authenticated", "stand"]);
    return (React__default["default"].createElement(LayoutContext.LayoutContext, { value: React__default["default"].useMemo(() => ({ profile, authenticated, stand }), [authenticated, profile, stand]) },
        React__default["default"].createElement(Root$1.Root, Object.assign({}, props))));
};
Root.displayName = 'Layout.Root';

exports.Root = Root;
