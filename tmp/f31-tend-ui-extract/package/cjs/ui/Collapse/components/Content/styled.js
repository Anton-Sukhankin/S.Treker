'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  overflow: hidden;
  height: ${props => (props.$open ? 'auto' : '0px')};
  > :nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 0 0 40px;
  }
`;

exports.Root = Root;
