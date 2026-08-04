import React from 'react';

const useVisibility = () => {
    const [visible, setVisible] = React.useState(false);
    const show = React.useCallback(() => {
        setVisible(true);
    }, []);
    const hide = React.useCallback(() => {
        setVisible(false);
    }, []);
    const toggle = React.useCallback(() => {
        setVisible(p => !p);
    }, []);
    return {
        visible,
        show,
        hide,
        toggle,
    };
};

export { useVisibility };
