'use strict';

var tslib = require('tslib');
var React = require('react');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Image = (_a) => {
    var { width = '245px', height, rootClassName } = _a, props = tslib.__rest(_a, ["width", "height", "rootClassName"]);
    return (React__default["default"].createElement(styled.Root, { className: ['tend-ui-image-root', rootClassName].filter(Boolean).join(' '), "$width": width, "$height": height },
        React__default["default"].createElement(styled.Img, Object.assign({}, props, { className: ['tend-ui-image-img', props.className].filter(Boolean).join(' ') }))));
};

exports.Image = Image;
