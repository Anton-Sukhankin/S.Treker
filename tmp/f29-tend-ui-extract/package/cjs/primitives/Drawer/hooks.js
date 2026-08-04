'use strict';

const useSize = (size) => {
    return {
        default: 'default',
        small: 'default',
        medium: 'default',
        large: 'large',
    }[size];
};

exports.useSize = useSize;
