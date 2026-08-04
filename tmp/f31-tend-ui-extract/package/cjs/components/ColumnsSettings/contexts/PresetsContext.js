'use strict';

var tendUiFactories = require('@10d/tend-ui-factories');

const [ColumnsSettingsPresetsProvider, useColumnsSettingsPresetsProvider] = tendUiFactories.createContext('ColumnsSettingsPresetsProvider');

exports.ColumnsSettingsPresetsProvider = ColumnsSettingsPresetsProvider;
exports.useColumnsSettingsPresetsProvider = useColumnsSettingsPresetsProvider;
