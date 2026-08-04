'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Используйте `useInputTitle` из `@10d/tend-ui-primitives`
 */
const useInputTitle = ({ title = '', onChange, }) => {
    const [_title, _setTitle] = React__default["default"].useState(title);
    const bind = React__default["default"].useMemo(() => ({
        title: _title,
        onChange: (e) => {
            _setTitle(e.target.value);
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
        },
    }), [_title, onChange]);
    return bind;
};

exports.useInputTitle = useInputTitle;
