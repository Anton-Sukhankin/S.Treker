'use strict';

var tendUiFactories = require('@10d/tend-ui-factories');

const [FiltersFormProvider, useFiltersFormProvider] = tendUiFactories.createContext('FiltersFormProvider');

exports.FiltersFormProvider = FiltersFormProvider;
exports.useFiltersFormProvider = useFiltersFormProvider;
