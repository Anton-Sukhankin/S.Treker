import React from 'react';

/**
 * @deprecated Используйте `useInputTitle` из `@10d/tend-ui-primitives`
 */
const useInputTitle = ({ title = '', onChange, }) => {
    const [_title, _setTitle] = React.useState(title);
    const bind = React.useMemo(() => ({
        title: _title,
        onChange: (e) => {
            _setTitle(e.target.value);
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
        },
    }), [_title, onChange]);
    return bind;
};

export { useInputTitle };
