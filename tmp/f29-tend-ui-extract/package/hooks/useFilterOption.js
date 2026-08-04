import React from 'react';

const useFilterOption = (props) => {
    const { filterOptionProp, search, options, filterOption } = props;
    return React.useMemo(() => {
        if (!search || filterOption === false)
            return options;
        const isPredicate = typeof filterOption === 'function';
        const fn = isPredicate
            ? filterOption
            : (search, option) => {
                return option[filterOptionProp]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            };
        return options.filter(option => fn(search, option));
    }, [filterOption, filterOptionProp, options, search]);
};

export { useFilterOption };
