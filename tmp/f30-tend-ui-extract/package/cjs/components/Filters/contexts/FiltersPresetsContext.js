'use strict';

var tendUiFactories = require('@10d/tend-ui-factories');

const [FiltersPresetsProvider, useFiltersPresetsProvider] = tendUiFactories.createContext('FPP');

exports.FiltersPresetsProvider = FiltersPresetsProvider;
exports.useFiltersPresetsProvider = useFiltersPresetsProvider;
