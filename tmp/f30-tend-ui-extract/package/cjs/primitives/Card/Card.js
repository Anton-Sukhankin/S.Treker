'use strict';

var tslib = require('tslib');
var React = require('react');
var AntCard = require('antd-core/es/card');
var Grid = require('antd-core/es/card/Grid');
var Meta = require('antd-core/es/card/Meta');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntCard__default = /*#__PURE__*/_interopDefault(AntCard);
var Grid__default = /*#__PURE__*/_interopDefault(Grid);
var Meta__default = /*#__PURE__*/_interopDefault(Meta);

const Card = Object.assign(React__default["default"].forwardRef((_a, ref) => {
    var { bordered = false } = _a, props = tslib.__rest(_a, ["bordered"]);
    return (React__default["default"].createElement(AntCard__default["default"], Object.assign({ "data-testid": 'tend-ui-card' }, props, { ref: ref, bordered: bordered })));
}), {
    displayName: 'Card',
    Grid: Grid__default["default"],
    Meta: Meta__default["default"],
});
Card.displayName = 'Card';

exports.Card = Card;
