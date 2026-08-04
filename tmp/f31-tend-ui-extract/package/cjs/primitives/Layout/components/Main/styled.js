'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].main.attrs({
    $backgrounds: {
        white: styled.css `
      background-color: ${props => props.theme.colors.gray0};
    `,
        blue: styled.css `
      background-color: ${props => props.theme.colors.blue100};
    `,
    },
    $sizes: {
        small: styled.css `
      padding: 16px;
    `,
        medium: styled.css `
      padding: 16px;
    `,
        large: styled.css `
      padding: 16px;
    `,
    },
}) `
  flex: 1;

  ${props => props.$sizes[props.$size]};
  ${props => props.$backgrounds[props.$background]};
`;

exports.Root = Root;
