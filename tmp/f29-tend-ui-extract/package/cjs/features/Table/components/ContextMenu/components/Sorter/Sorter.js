'use strict';

var React = require('react');
var ColumnContext = require('../../contexts/ColumnContext.js');
var Root = require('./components/Root/Root.js');
var ToggleSorter = require('./components/ToggleSorter/ToggleSorter.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Sorter = () => {
    const column = ColumnContext.useColumnContext();
    return (React__default["default"].createElement(Root.Root, { column: column },
        React__default["default"].createElement(ToggleSorter.ToggleSorter, null,
            React__default["default"].createElement(ToggleSorter.ToggleSorter.Layout, null,
                React__default["default"].createElement(ToggleSorter.ToggleSorter.Descending, null),
                React__default["default"].createElement(ToggleSorter.ToggleSorter.Ascending, null)))));
};
Sorter.displayName = 'ContextMenu.Sorter';
Sorter.Root = Root.Root;
Sorter.ToggleSorter = ToggleSorter.ToggleSorter;

exports.Sorter = Sorter;
