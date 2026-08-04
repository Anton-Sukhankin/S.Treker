import React from 'react';
import { Box } from '@10d/tend-ui-grid';

const ScrollPosition = ({ children, onScrollPositionChange, }) => {
    const ref = React.useRef(null);
    const [position, setPosition] = React.useState('initial');
    React.useEffect(() => onScrollPositionChange === null || onScrollPositionChange === void 0 ? void 0 : onScrollPositionChange(position), [onScrollPositionChange, position]);
    React.useEffect(() => {
        var _a;
        if (!ref)
            return;
        const drawerScrollableBody = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.closest('.tend-ui-modal-body');
        if (!drawerScrollableBody)
            return;
        const isScrollable = drawerScrollableBody.scrollHeight > drawerScrollableBody.clientHeight;
        if (!isScrollable)
            return;
        function onScroll(event) {
            const e = event.target;
            if (!e)
                return;
            const top = Math.ceil(e.scrollTop);
            const height = Math.ceil(e.scrollHeight - e.offsetHeight);
            if (top === 0) {
                setPosition('top');
                return;
            }
            if (top > 0 && top < height) {
                setPosition('middle');
                return;
            }
            if (top === height) {
                setPosition('bottom');
                return;
            }
        }
        drawerScrollableBody.addEventListener('scroll', onScroll);
        onScrollPositionChange === null || onScrollPositionChange === void 0 ? void 0 : onScrollPositionChange('top');
        return () => {
            drawerScrollableBody.removeEventListener('scroll', onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement(Box, { ref: ref, "$height": '100%', className: 'tend-ui-modal-scroll-position' }, children));
};

export { ScrollPosition };
