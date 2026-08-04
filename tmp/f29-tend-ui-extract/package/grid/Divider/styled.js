import styled, { css } from 'styled-components';
import AntDivider from 'antd-core/es/divider';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { isString } from '@10d/tend-ui-utils/isString';

const Root = styled(AntDivider) `
  ${props => {
    if (isUndefined(props.$margin))
        return;
    if (isString(props.$margin))
        return css `
        &.tend-ui-divider-horizontal {
          margin: ${props.$margin};
        }

        &.tend-ui-divider-vertical {
          margin-inline: ${props.$margin};
        }
      `;
    return css `
      &.tend-ui-divider-horizontal {
        margin: ${props.$margin}px 0;
      }

      &.tend-ui-divider-vertical {
        margin-inline: ${props.$margin}px;
      }
    `;
}};

  &.tend-ui-divider {
    border-block-start-color: ${props => props.$color};
  }

  &.tend-ui-divider-vertical {
    border-inline-start-color: ${props => props.$color};
  }
`;

export { Root };
