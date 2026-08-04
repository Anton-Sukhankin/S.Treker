'use strict';

var React = require('react');
var sortable = require('@dnd-kit/sortable');
var utilities = require('@dnd-kit/utilities');
var tendUiGrid = require('@10d/tend-ui-grid');
var ColumnsSettingContext = require('../../contexts/ColumnsSettingContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = ({ column, className, children, }) => {
    const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition, } = sortable.useSortable({ id: column.id, disabled: !column.draggable });
    const style = {
        opacity: isDragging ? 0.4 : undefined,
        transform: utilities.CSS.Translate.toString(transform),
        transition,
    };
    const value = React__default["default"].useMemo(() => ({
        attributes,
        listeners,
        setActivatorNodeRef,
    }), [attributes, listeners, setActivatorNodeRef]);
    return (React__default["default"].createElement(tendUiGrid.Box, { "data-testid": 'tend-ui-columns-settings-column-setting-root', ref: setNodeRef, "$display": 'flex', "$alignItems": 'center', "$gap": 8, style: style, className: className },
        React__default["default"].createElement(ColumnsSettingContext.ColumnsSettingContext, { value: value }, children)));
};

exports.Root = Root;
