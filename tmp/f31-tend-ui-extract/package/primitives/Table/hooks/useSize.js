const useSize = (size) => {
    return {
        large: 'large',
        medium: 'middle',
        small: 'small',
    }[size];
};

export { useSize };
