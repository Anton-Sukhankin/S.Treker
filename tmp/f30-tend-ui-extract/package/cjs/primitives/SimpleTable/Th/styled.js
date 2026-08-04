'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].th.attrs({
    $sizes: {
        large: styled.css `
      padding: 12px;
    `,
        medium: styled.css `
      padding: 8px 12px;
    `,
        small: styled.css `
      padding: 4px 12px;
    `,
    },
}) `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  color: ${props => props.theme.colors.gray500};
  text-align: ${props => props.$textAlign || 'left'};

  ${props => props.$sizes[props.$size]};
`;

exports.Root = Root;
