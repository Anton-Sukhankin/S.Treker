'use strict';

var styled = require('styled-components');
var ArrowDown = require('@10d/tend-ui-icons/ArrowDown');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const FilterListIcon = styled__default["default"](ArrowDown.ArrowDown) `
  ${props => {
    if (props.$sortOrder === 'ascend')
        return styled.css `
        color: ${props.$theme.colors.blue600};
      `;
    if (props.$sortOrder === 'descend')
        return styled.css `
        color: ${props.$theme.colors.blue600};
        transform: rotate(180deg);
      `;
    return;
}}
`;

exports.FilterListIcon = FilterListIcon;
