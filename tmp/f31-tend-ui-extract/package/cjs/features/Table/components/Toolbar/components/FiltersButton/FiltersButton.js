'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var isEmpty = require('lodash/isEmpty');
var FilterAlt = require('@10d/tend-ui-icons/FilterAlt');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var TourContext = require('../../../../contexts/TourContext.js');
var useTableForm = require('../../../../hooks/useTableForm.js');
var Form = require('../../../../../../components/Form/Form.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var isEmpty__default = /*#__PURE__*/_interopDefault(isEmpty);

const FiltersButton = (_a) => {
    var _b;
    var { tooltip, selected } = _a, props = tslib.__rest(_a, ["tooltip", "selected"]);
    const context = TourContext.useTourContext();
    const t = useTranslation.useTranslation();
    const value = Form.Form.useWatch(['filters'], useTableForm.useTableForm().form);
    const hasAppliedFilters = value ? Object.values(value).some(v => !isEmpty__default["default"](v)) : false;
    const _selected = hasAppliedFilters || selected;
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({ title: t(['features', 'Table', 'filter']) }, tooltip),
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, Object.assign({}, props, { ref: (_b = context === null || context === void 0 ? void 0 : context.ui) === null || _b === void 0 ? void 0 : _b.filtersButton, selected: _selected }),
            React__default["default"].createElement(FilterAlt.FilterAlt, null))));
};
FiltersButton.displayName = 'Table.Toolbar.FiltersButton';

exports.FiltersButton = FiltersButton;
