'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].tr `
  border-bottom: 1px solid ${props => props.theme.colors.gray150};
  ${props => {
    if (props.$selected)
        return styled.css `
        background-color: ${props.theme.colors.blue50};
        &:hover {
          background-color: ${props => props.theme.colors.blue100};
        }
      `;
    return styled.css `
      &:hover {
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
}}
`;

exports.Root = Root;
