import AntDatePicker from 'antd-core/es/date-picker';
import styled, { css } from 'styled-components';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';
import { scrollbar } from '../../styling/css/scrollbar.js';

const Root = styled(withInjectedClassName(AntDatePicker.TimePicker, 'popupClassName')) `
  &.tend-ui-picker {
    ${props => {
    if (props.$fullWidth)
        return css `
          width: 100%;
        `;
    return css `
        width: ${props.$width || '256px'};
      `;
}}
  }

  &.tend-ui-picker-dropdown .tend-ui-picker-time-panel-column {
    ${scrollbar}
  }
`;

export { Root };
