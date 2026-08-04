'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Container = styled__default["default"].label `
  ${props => {
    if (props.$disabled) {
        return styled.css `
        cursor: not-allowed;
      `;
    }
    return styled.css `
      cursor: pointer;
    `;
}}

  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
`;

exports.Container = Container;
