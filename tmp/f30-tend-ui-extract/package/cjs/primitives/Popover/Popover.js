'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Popover = React__default["default"].forwardRef((_a, ref) => {
    var { content, footer, arrow = false } = _a, props = tslib.__rest(_a, ["content", "footer", "arrow"]);
    const contentProp = React__default["default"].useMemo(() => {
        if (footer)
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                content,
                React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$justifyContent": 'flex-end', "$gap": 8, "$mt": 20 }, footer.map(node => node))));
        return content;
    }, [content, footer]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-popover' }, props, { ref: ref, arrow: arrow, content: contentProp })));
});
Popover.displayName = 'Popover';

exports.Popover = Popover;
