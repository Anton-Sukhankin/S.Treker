'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].hr `
  ${props => {
    const { $color = props.theme.colors.gray100 } = props;
    if (props.$type === 'horizontal') {
        return styled.css `
        width: 100%;
        border: none;
        border-top: 1px solid ${$color};
        margin: ${props.$margin || '8px 0'};
        padding: ${props.$padding || '8px 0'};
      `;
    }
    return styled.css `
      width: 1px;
      height: ${props.$height || '1em'};
      vertical-align: middle;
      background-color: ${$color};
    `;
}}
`;

exports.Root = Root;
