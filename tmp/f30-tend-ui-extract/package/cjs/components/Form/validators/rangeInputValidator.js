'use strict';

const rangeInputValidator = (_, value) => {
    const isError = value.some(v => v === null);
    if (isError)
        return Promise.reject();
    return Promise.resolve();
};

exports.rangeInputValidator = rangeInputValidator;
