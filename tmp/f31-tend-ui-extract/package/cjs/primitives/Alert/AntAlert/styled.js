'use strict';

var AntAlert = require('antd-core/es/alert');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntAlert__default = /*#__PURE__*/_interopDefault(AntAlert);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntAlert__default["default"]) `
  ${props => (props.$type === 'neutral' || props.$type === 'loading') &&
    styled.css `
      &&& {
        border-color: ${props.$theme.colors.gray200};
        background-color: ${props.$theme.colors.gray50};

        .tend-ui-alert-icon {
          color: ${props.$theme.colors.gray400};
        }
      }
    `};

  ${props => !props.$border &&
    styled.css `
      &&& {
        border: none;
      }
    `}

  &.tend-ui-alert {
    padding: 16px 24px;
  }

  &.tend-ui-alert-with-description {
    .tend-ui-alert-message {
      font-weight: 600;
    }

    .tend-ui-alert-icon {
      align-self: flex-start;
    }
  }

  .tend-ui-alert-icon {
    align-self: flex-start;
    font-size: 20px;
  }
`;
const Footer = styled__default["default"].div `
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

exports.Footer = Footer;
exports.Root = Root;
