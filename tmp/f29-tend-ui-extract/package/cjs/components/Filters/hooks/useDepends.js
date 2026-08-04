'use strict';

var React = require('react');
var pick = require('lodash/pick');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var pick__default = /*#__PURE__*/_interopDefault(pick);

const useDepends = (props, values) => {
    return React__default["default"].useMemo(() => JSON.stringify(pick__default["default"](values, props.config.depends || [])), [props.config.depends, values]);
};

exports.useDepends = useDepends;
