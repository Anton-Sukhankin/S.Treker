'use strict';

var React = require('react');
var isNumber = require('@10d/tend-ui-utils/isNumber');
var isString = require('@10d/tend-ui-utils/isString');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var Badge = require('../Badge/Badge.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Segmented = React__default["default"].forwardRef((props, ref) => {
    const theme = tendUiTheme.useTheme();
    const options = React__default["default"].useMemo(() => props.options.map(option => {
        if (isNumber.isNumber(option) || isString.isString(option) || !('badge' in option)) {
            return option;
        }
        const { badge } = option;
        return Object.assign(Object.assign({}, option), { label: (React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$display": 'inline-flex', "$gap": 8 },
                option.label,
                React__default["default"].createElement(Badge.Badge, Object.assign({}, badge, { padding: '0 8px' })))) });
    }), [props.options]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-segmented' }, props, { ref: ref, "$theme": theme, options: options, size: 'middle' })));
});
Segmented.displayName = 'Segmented';

exports.Segmented = Segmented;
