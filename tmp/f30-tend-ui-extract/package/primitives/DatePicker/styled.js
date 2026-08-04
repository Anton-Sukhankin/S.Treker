import AntDatePicker from 'antd-core/es/date-picker';
import styled, { css } from 'styled-components';
import { margin, height } from '@10d/tend-ui-styling';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';

const Root = styled(withInjectedClassName(AntDatePicker, 'popupClassName')) `
  &.tend-ui-picker {
    ${props => {
    if (props.$fullWidth)
        return css `
          width: 100%;
        `;
    return css `
        width: ${props.$width};
      `;
}}

    ${margin};
    ${height};
  }

  &.tend-ui-picker-dropdown {
    .tend-ui-picker-month-btn {
      text-transform: uppercase;
    }

    .tend-ui-picker-header {
      padding: 8px 16px;
    }

    .tend-ui-picker-header-super-prev-btn,
    .tend-ui-picker-header-super-next-btn {
      display: none;
    }

    .tend-ui-picker-date-panel .tend-ui-picker-body {
      padding: 8px 16px;
    }
  }

  &.tend-ui-picker-dropdown .tend-ui-picker-year-panel .tend-ui-picker-cell-inner,
  &.tend-ui-picker-dropdown .tend-ui-picker-quarter-panel .tend-ui-picker-cell-inner,
  &.tend-ui-picker-dropdown .tend-ui-picker-month-panel .tend-ui-picker-cell-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
  }
`;

export { Root };
