'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].header.attrs({
    $sizes: {
        small: styled.css `
      padding: 8px 16px;
    `,
        medium: styled.css `
      padding: 8px 16px;
    `,
        large: styled.css `
      padding: 8px 16px;
    `,
    },
}) `
  position: ${props => (props.$sticky ? 'sticky' : 'static')};
  z-index: 999;
  top: 0;

  display: flex;
  align-items: center;
  gap: 12px;

  background-color: ${props => props.theme.colors.gray0};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray100};

  ${props => props.$sizes[props.$size]};
  ${tendUiStyling.margin};
  ${tendUiStyling.padding};
`;

exports.Root = Root;
