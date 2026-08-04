'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useImageLoadingStatus = (src) => {
    const [status, setStatus] = React__default["default"].useState('idle');
    React__default["default"].useLayoutEffect(() => {
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

exports.useImageLoadingStatus = useImageLoadingStatus;
