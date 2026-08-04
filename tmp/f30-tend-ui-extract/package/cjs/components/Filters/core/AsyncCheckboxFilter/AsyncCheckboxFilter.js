'use strict';

var React = require('react');
var omit = require('lodash/omit');
var isString = require('@10d/tend-ui-utils/isString');
var AsyncCheckbox = require('../../../AsyncCheckbox/AsyncCheckbox.js');
var Form = require('../../../Form/Form.js');
var useDisabled = require('../../hooks/useDisabled.js');
var useDepends = require('../../hooks/useDepends.js');
var useValuesObserver = require('../../hooks/useValuesObserver.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var omit__default = /*#__PURE__*/_interopDefault(omit);

const AsyncCheckboxFilter = (props) => {
    const form = Form.Form.useFormInstance();
    const values = useValuesObserver.useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled.useDisabled(props, values);
    const _query = useDepends.useDepends(props, values);
    // TODO: Внести эту логику в AsyncSelect
    const api = React__default["default"].useMemo(() => {
        const query = JSON.parse(_query);
        if (isString.isString(props.api))
            return { url: props.api, query };
        if (typeof props.api === 'function')
            return { fn: props.api, query };
        return Object.assign(Object.assign({}, props.api), { query });
    }, [props.api, _query]);
    return React__default["default"].createElement(AsyncCheckbox.AsyncCheckbox, Object.assign({ disabled: disabled }, omit__default["default"](props, 'config'), { api: api }));
};
AsyncCheckboxFilter.displayName = 'Filters.AsyncCheckboxFilter';

exports.AsyncCheckboxFilter = AsyncCheckboxFilter;
