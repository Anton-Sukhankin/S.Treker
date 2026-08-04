'use strict';

const useSize = (size) => {
    return {
        large: 'large',
        medium: 'middle',
        small: 'small',
    }[size];
};

exports.useSize = useSize;
