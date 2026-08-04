'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useFilterOption = (props) => {
    const { filterOptionProp, search, options, filterOption } = props;
    return React__default["default"].useMemo(() => {
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

exports.useFilterOption = useFilterOption;
