import { __rest } from 'tslib';
import React from 'react';
import { Search as Search$1 } from '@10d/tend-ui-icons/Search';
import { Input } from '@10d/tend-ui-primitives';

const Search = React.forwardRef((_a, ref) => {
    var { onSearch, onChange } = _a, props = __rest(_a, ["onSearch", "onChange"]);
    const handleChange = React.useCallback((e) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(e);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(e.target.value);
    }, [onChange, onSearch]);
    return React.createElement(Input, Object.assign({ ref: ref }, props, { prefix: React.createElement(Search$1, null), onChange: handleChange }));
});
Search.displayName = 'Search';

export { Search };
