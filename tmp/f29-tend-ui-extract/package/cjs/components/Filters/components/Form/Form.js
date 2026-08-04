'use strict';

var React = require('react');
var Form$1 = require('../../../Form/Form.js');
var FiltersContext = require('../../contexts/FiltersContext.js');
var FiltersFormProvider = require('../../core/FiltersFormProvider.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Form = ({ children }) => {
    const { name, onFilterValuesChange } = FiltersContext.useFiltersContext();
    const model = FiltersFormProvider.useFiltersFormProvider('Filters.Form');
    return (React__default["default"].createElement(Form$1.Form, { "data-testid": 'tend-ui-filters-form', form: model.form, name: name, onValuesChange: onFilterValuesChange }, children));
};
Form.displayName = 'Filters.Form';

exports.Form = Form;
