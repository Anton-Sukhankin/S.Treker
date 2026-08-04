'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var ExpandButton = require('./ExpandButton/ExpandButton.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Устарело
 * Используйте `Tree` из пакета `@10d/tend-ui-tree`
 */
const Tree = React__default["default"].forwardRef((_a, ref) => {
    var { selectable = false } = _a, props = tslib.__rest(_a, ["selectable"]);
    if (process.env.NODE_ENV === 'development') {
        tendUiUtils.INTERNAL_TendUILogger.warning([
            '<Tree /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Tree /> из пакета "@10d/tend-ui-tree"',
        ]);
    }
    const switcherIcon = React__default["default"].useCallback((props) => React__default["default"].createElement(ExpandButton.ExpandButton, Object.assign({}, props)), []);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-tree' }, props, { ref: ref, switcherIcon: switcherIcon, selectable: selectable })));
});
Tree.displayName = 'Tree';

exports.Tree = Tree;
