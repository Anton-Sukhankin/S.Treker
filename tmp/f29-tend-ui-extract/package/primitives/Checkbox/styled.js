import AntCheckbox from 'antd-core/es/checkbox/Checkbox';
import AntCheckboxGroup from 'antd-core/es/checkbox/Group';
import styled, { css } from 'styled-components';

const Root = styled(AntCheckbox) `
  /* Aligning checkbox and label to the start */
  .tend-ui-checkbox {
    align-self: flex-start;
  }
  .tend-ui-checkbox-indeterminate .tend-ui-checkbox-inner:after {
    border-radius: 2px;
  }
`;
const GroupRoot = styled(AntCheckboxGroup) `
  &.tend-ui-checkbox-group {
    .tend-ui-checkbox + span {
      overflow-wrap: anywhere;
    }
  }

  ${props => {
    if (props.$layout === 'horizontal')
        return css `
        column-gap: 16px;
      `;
    return css `
      flex-direction: column;
      row-gap: 8px;
    `;
}}
  ${props => props.$fullWidth &&
    css `
      &.tend-ui-checkbox-group {
        width: 100%;
        .tend-ui-checkbox + span {
          display: inline-block;
          width: 100%;
        }
      }
    `};
`;

export { GroupRoot, Root };
