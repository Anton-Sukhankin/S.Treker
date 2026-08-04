'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var FiltersFormProvider = require('../../core/FiltersFormProvider.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ResetAllButton = (props) => {
    const t = useTranslation.useTranslation();
    const model = FiltersFormProvider.useFiltersFormProvider('Filters.ResetButton');
    return (React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-filters-reset-all-button', size: 'small', variant: 'secondary', onClick: model.onReset }, props), t(['components', 'Filters', 'reset'])));
};
ResetAllButton.displayName = 'Filters.ResetAllButton';

exports.ResetAllButton = ResetAllButton;
