'use strict';

var React = require('react');
var CardView = require('@10d/tend-ui-icons/CardView');
var ListView = require('@10d/tend-ui-icons/ListView');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ViewButton = ({ onClick, onViewChange }) => {
    const [view, setView] = React__default["default"].useState('table');
    const isList = view === 'list';
    const isTable = view === 'table';
    const handlerFactory = React__default["default"].useCallback((view) => {
        return (e) => {
            setView(view);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
            onViewChange === null || onViewChange === void 0 ? void 0 : onViewChange(view);
        };
    }, [onClick, onViewChange]);
    return (React__default["default"].createElement(tendUiGrid.Box, null,
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, { selected: isList, onClick: handlerFactory('list') },
            React__default["default"].createElement(ListView.ListView, null)),
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, { selected: isTable, onClick: handlerFactory('table') },
            React__default["default"].createElement(CardView.CardView, null))));
};

exports.ViewButton = ViewButton;
