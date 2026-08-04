'use strict';

const createScopedConfig = (scope) => (config) => {
    return Object.assign(Object.assign({}, config), { name: Array.isArray(config.name) ? [scope, ...config.name] : [scope, config.name] });
};

exports.createScopedConfig = createScopedConfig;
