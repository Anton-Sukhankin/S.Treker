'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].div `
  display: flex;

  ${props => {
    if (props.$layout === 'vertical') {
        return styled.css `
        flex-direction: column;
        gap: 8px;
      `;
    }
    return styled.css `
      gap: 24px;
    `;
}}
`;

exports.Root = Root;
