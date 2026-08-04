'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ScrollPosition = ({ children, onScrollPositionChange, }) => {
    const ref = React__default["default"].useRef(null);
    const [position, setPosition] = React__default["default"].useState('initial');
    React__default["default"].useEffect(() => onScrollPositionChange === null || onScrollPositionChange === void 0 ? void 0 : onScrollPositionChange(position), [onScrollPositionChange, position]);
    React__default["default"].useEffect(() => {
        var _a;
        if (!ref)
            return;
        const drawerScrollableBody = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.closest('.tend-ui-drawer-body');
        if (!drawerScrollableBody)
            return;
        const isScrollable = drawerScrollableBody.scrollHeight > drawerScrollableBody.clientHeight;
        if (!isScrollable)
            return;
        function onScroll(event) {
            const e = event.target;
            if (!e)
                return;
            const top = e.scrollTop;
            const height = e.scrollHeight - e.offsetHeight;
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
    return (React__default["default"].createElement(tendUiGrid.Box, { className: 'tend-ui-drawer-scroll-position', ref: ref, "$height": '100%' }, children));
};

exports.ScrollPosition = ScrollPosition;
