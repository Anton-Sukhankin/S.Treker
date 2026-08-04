'use strict';

var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Title = (props) => {
    return React__default["default"].createElement(tendUiTypography.Title, Object.assign({ level: 'h3', mt: 0 }, props));
};
Title.displayName = 'Layout.Header.Main.Title';

exports.Title = Title;
