'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Col = styled__default["default"].li `
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 8px;
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background, color;

  ${props => {
    if (props.$disabled)
        return styled.css `
        cursor: not-allowed;
        color: ${props => props.theme.colors.gray400};
        &:hover {
          background-color: ${props => props.theme.colors.gray50};
        }
      `;
    if (props.$selected)
        return styled.css `
        cursor: pointer;
        background-color: ${props => props.theme.colors.blue100};
      `;
    return styled.css `
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
}}
`;

exports.Col = Col;
