'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var useSize = require('../../hooks/useSize.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseInputNumber = (_a, ref) => {
    var { fullWidth } = _a, props = tslib.__rest(_a, ["fullWidth"]);
    const [title, setTitle] = React__default["default"].useState('');
    const theme = tendUiTheme.useTheme();
    const size = useSize.useSize(props.size);
    const onChange = React__default["default"].useCallback(value => {
        var _a;
        if (value) {
            setTitle(value.toString());
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, value);
    }, [props]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-input-number' }, props, { "$fullWidth": fullWidth, "$theme": theme, ref: ref, size: size, title: title, onChange: onChange })));
};
const InputNumber = React__default["default"].forwardRef(BaseInputNumber);
InputNumber.displayName = 'InputNumber';

exports.InputNumber = InputNumber;
