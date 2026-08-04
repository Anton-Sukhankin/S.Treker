'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Form = require('../../../Form/Form.js');
var useDisabled = require('../../hooks/useDisabled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ResetButton = (_a) => {
    var { filter } = _a, props = tslib.__rest(_a, ["filter"]);
    const t = useTranslation.useTranslation();
    const form = Form.Form.useFormInstance();
    const values = Form.Form.useWatch([], form);
    const disabled = useDisabled.useDisabled({ config: filter }, values);
    return (React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-filters-reset-button', padding: false, variant: 'link', disabled: disabled }, props), t(['general', 'reset'])));
};
ResetButton.displayName = 'Filters.ResetButton';

exports.ResetButton = ResetButton;
