'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Settings = require('@10d/tend-ui-icons/Settings');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var TourContext = require('../../../../contexts/TourContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const SettingsButton = (_a) => {
    var _b;
    var { tooltip } = _a, props = tslib.__rest(_a, ["tooltip"]);
    const context = TourContext.useTourContext();
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({ title: t(['features', 'Table', 'settings']) }, tooltip),
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, Object.assign({}, props, { ref: (_b = context === null || context === void 0 ? void 0 : context.ui) === null || _b === void 0 ? void 0 : _b.settingsButton }),
            React__default["default"].createElement(Settings.Settings, null))));
};

exports.SettingsButton = SettingsButton;
