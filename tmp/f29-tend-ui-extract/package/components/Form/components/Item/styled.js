import styled, { css } from 'styled-components';
import AntForm from 'antd-core/es/form';
import { isNumber } from '@10d/tend-ui-utils/isNumber';

const Root = styled(AntForm.Item) `
  &.tend-ui-form-item {
    .tend-ui-form-item-control-input-content {
      /* Additional 4px margin for 8px in total */
      .tend-ui-checkbox-group,
      .tend-ui-toggle-group,
      .tend-ui-radio-group {
        margin-top: 4px;
      }
    }
    /* Error message */
    .tend-ui-form-item-explain-error {
      align-items: center;
      font-size: 12px;
      padding-top: 4px;
    }

    /* Extra content (aka Caption message) */
    .tend-ui-form-item-extra {
      font-size: 12px;
      min-height: auto;
      margin-top: 4px;
      color: ${props => props.$theme.colors.gray650};
    }

    /* Require icon */
    .tend-ui-form-item-label > label {
      &.tend-ui-form-item-required:not(
          .tend-ui-form-item-required-mark-optional
        )::before {
        font-family: ${props => props.$theme.fonts.museo};
      }

      /* Tooltip icon */
      .tend-ui-form-item-tooltip {
        font-size: 16px;
        color: ${props => props.$theme.colors.gray500};
      }
    }

    /* Highlight Checkbox and Radio border on error */
    &.tend-ui-form-item-has-error {
      .tend-ui-checkbox-inner,
      .tend-ui-radio-inner {
        border-color: ${props => props.$theme.colors.red600};
      }
    }

    /* Forcing suffixes color */
    &&& {
      .tend-ui-input-prefix,
      .tend-ui-input-suffix {
        color: ${props => props.$theme.colors.gray500};
      }
    }

    ${props => {
    if (isNumber(props.$width))
        return css `
          width: ${props.$width}px;
        `;
    return css `
        width: ${props.$width};
      `;
}}
  }
`;

export { Root };
