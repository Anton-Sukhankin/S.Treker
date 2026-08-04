'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].td.attrs({
    $sizes: {
        large: styled.css `
      padding: 20px 12px;
    `,
        medium: styled.css `
      padding: 12px;
    `,
        small: styled.css `
      padding: 4px 12px;
    `,
    },
}) `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${props => props.theme.colors.gray900};
  text-align: ${props => props.$textAlign};

  ${props => props.$sizes[props.$size]};
`;

exports.Root = Root;
