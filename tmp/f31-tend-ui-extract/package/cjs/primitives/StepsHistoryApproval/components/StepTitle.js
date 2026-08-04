'use strict';

var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');
var Box = require('@10d/tend-ui-grid/Box');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const StepTitle = ({ title, subTitle, created, stepType }) => (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$justifyContent": 'space-between', "$alignItems": 'center', "$mb": 8 },
    React__default["default"].createElement(Box.Box, { "$display": 'flex', "$flexDirection": 'column' },
        React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: title },
            React__default["default"].createElement(tendUiTypography.Text, { ellipsis: true, color: stepType === 'cancel' ? 'gray900' : 'gray650', size: 'large' }, title)),
        subTitle && (React__default["default"].createElement(tendUiTypography.Text, { ellipsis: true, color: 'gray400', size: 'small' }, subTitle))),
    React__default["default"].createElement(Box.Box, { "$minWidth": 130 },
        React__default["default"].createElement(tendUiTypography.Text, { color: 'gray400', className: 'steps-created-date' }, created))));

exports.StepTitle = StepTitle;
