import AntAlert from 'antd-core/es/alert';
import styled, { css } from 'styled-components';

const Root = styled(AntAlert) `
  ${props => (props.$type === 'neutral' || props.$type === 'loading') &&
    css `
      &&& {
        border-color: ${props.$theme.colors.gray200};
        background-color: ${props.$theme.colors.gray50};

        .tend-ui-alert-icon {
          color: ${props.$theme.colors.gray400};
        }
      }
    `};

  ${props => !props.$border &&
    css `
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
const Footer = styled.div `
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export { Footer, Root };
