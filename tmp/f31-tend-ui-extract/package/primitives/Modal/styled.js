import styled, { css } from 'styled-components';
import AntModal from 'antd-core/es/modal/Modal';
import { scrollbar } from '../../styling/mixins/scrollbar.js';

const Root = styled(AntModal).attrs({
    $layout: {
        window: css `
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
        body: css `
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
        ${scrollbar}
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
        return css `
          .tend-ui-modal-content {
            padding: ${props.$noFooter ? '0 0 24px 0' : 0};
          }
        `;
    }
}}
  }
`;

export { Root };
