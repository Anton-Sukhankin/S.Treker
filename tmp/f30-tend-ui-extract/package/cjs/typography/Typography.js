'use strict';

var React = require('react');
var AntTypography = require('antd-core/es/typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntTypography__default = /*#__PURE__*/_interopDefault(AntTypography);

/**
 * @deprecated Не является компонентом типографии, будет удален в следующем мажорном обновлении
 */
const Typography = (props) => {
    return React__default["default"].createElement(AntTypography__default["default"], Object.assign({ "data-testid": 'tend-ui-typography' }, props));
};
Typography.displayName = 'Typography';

exports.Typography = Typography;
