import React from 'react';

const useImageLoadingStatus = (src) => {
    const [status, setStatus] = React.useState('idle');
    React.useLayoutEffect(() => {
        if (!src) {
            setStatus('error');
            return;
        }
        let isMounted = true;
        const image = new window.Image();
        setStatus('loading');
        image.onload = () => {
            if (!isMounted)
                return;
            setStatus('success');
        };
        image.onerror = () => {
            if (!isMounted)
                return;
            setStatus('error');
        };
        image.src = src;
        return () => {
            isMounted = false;
        };
    }, [src]);
    return status;
};

export { useImageLoadingStatus };
