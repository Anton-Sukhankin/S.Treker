'use strict';

var tslib = require('tslib');
var React = require('react');
var AntProgress = require('antd-core/es/progress');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntProgress__default = /*#__PURE__*/_interopDefault(AntProgress);

const Progress = React__default["default"].forwardRef((_a, ref) => {
    var { size } = _a, props = tslib.__rest(_a, ["size"]);
    const sizeProp = (() => {
        if (size === 'medium')
            return 'default';
        return size;
    })();
    return (React__default["default"].createElement(AntProgress__default["default"], Object.assign({ "data-testid": 'tend-ui-progress' }, props, { ref: ref, size: sizeProp })));
});
Progress.displayName = 'Progress';

exports.Progress = Progress;
