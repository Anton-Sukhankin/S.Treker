'use strict';

var React = require('react');
var styled = require('./styled.js');
var ColumnsSettingContext = require('../../contexts/ColumnsSettingContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const DragHandle = ({ disabled, children }) => {
    const context = ColumnsSettingContext.useColumnsSettingContext();
    const content = children !== null && children !== void 0 ? children : (React__default["default"].createElement(styled.DragIndicator, { size: 20, color: disabled ? 'gray500' : 'gray900' }));
    return (React__default["default"].createElement("span", Object.assign({ "data-testid": 'tend-ui-columns-settings-column-setting-drag', ref: context.setActivatorNodeRef }, context.attributes, context.listeners), content));
};

exports.DragHandle = DragHandle;
