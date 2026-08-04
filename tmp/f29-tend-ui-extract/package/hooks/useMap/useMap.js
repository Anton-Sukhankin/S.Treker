import React from 'react';

const useMap = () => {
    const map = React.useRef(new Map());
    const set = React.useCallback((key, value) => {
        map.current.set(key, value);
        return value;
    }, []);
    const get = React.useCallback((key) => {
        const value = map.current.get(key);
        return value;
    }, []);
    const del = React.useCallback((key) => {
        const value = map.current.get(key);
        map.current.delete(key);
        return value;
    }, []);
    const has = React.useCallback((key) => {
        return map.current.has(key);
    }, []);
    const clear = React.useCallback(() => {
        map.current.clear();
    }, []);
    return {
        set,
        get,
        del,
        has,
        clear,
    };
};

export { useMap };
