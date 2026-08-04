'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].th `
  /* Завязываемся на внешние классы Dropdown чтобы не создавать лишние контексты */
  /* Все что можно сделать без JS делаем без JS (хотя это не очень прозрачно, зато легче поддерживать) */
  &.tend-ui-dropdown-trigger {
    &.tend-ui-dropdown-open {
      background-color: ${props => props.theme.colors.gray50};
    }
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.colors.gray50};
    }
  }
`;

exports.Root = Root;
