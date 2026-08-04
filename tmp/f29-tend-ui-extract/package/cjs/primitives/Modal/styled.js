'use strict';

var styled = require('styled-components');
var AntModal = require('antd-core/es/modal/Modal');
var scrollbar = require('../../styling/mixins/scrollbar.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntModal__default = /*#__PURE__*/_interopDefault(AntModal);

const Root = styled__default["default"](AntModal__default["default"]).attrs({
    $layout: {
        window: styled.css `
      .tend-ui-modal-content {
        padding: 24px 32px;
      }
      .tend-ui-modal-header {
        padding-bottom: 24px;
      }
      .tend-ui-modal-footer {
        padding-top: 24px;
      }
    `,
        body: styled.css `
      .tend-ui-modal-content {
        max-height: 100%;
        display: flex;
        flex-direction: column;
      }
      .tend-ui-modal-header {
        padding: 24px 32px;
      }
      .tend-ui-modal-body {
        padding: 0 24px;
        margin: 0 8px;
        ${scrollbar.scrollbar}
      }
      .tend-ui-modal-footer {
        padding: 24px 32px;
      }
    `,
    },
}) `
  &.tend-ui-modal {
    .tend-ui-modal-close {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${props => props.$theme.colors.gray50};
      top: 24px;
      inset-inline-end: 32px;
    }
    ${props => props.$layout[props.$scroll]};

    ${props => {
    if (props.$scroll === 'body') {
        return styled.css `
          .tend-ui-modal-content {
            padding: ${props.$noFooter ? '0 0 24px 0' : 0};
          }
        `;
    }
}}
  }
`;

exports.Root = Root;
