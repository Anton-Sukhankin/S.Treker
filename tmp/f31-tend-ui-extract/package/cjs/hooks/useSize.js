'use strict';

/**
 * @description Size-adapter-hook for backward compatibility for Antd sizes and TendUI sizes
 */
const useSize = (size) => {
    if (!size)
        return;
    return {
        large: 'large',
        medium: 'middle',
        small: 'small',
    }[size];
};

exports.useSize = useSize;
