'use strict';

var tendUiTypography = require('@10d/tend-ui-typography');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](tendUiTypography.INTERNAL_TypographyBase) `
  color: inherit;
  font-size: inherit;
  line-height: inherit;
`;

exports.Root = Root;
