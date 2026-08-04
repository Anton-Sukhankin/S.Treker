import AntDatePicker from 'antd-core/es/date-picker';
import styled, { css } from 'styled-components';
import { colors } from '@10d/tend-ui-tokens/samolet';
import { margin, height } from '@10d/tend-ui-styling';
import { ChevronLeft } from '@10d/tend-ui-icons/ChevronLeft';
import { ChevronRight } from '@10d/tend-ui-icons/ChevronRight';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';

const Root = styled(withInjectedClassName(AntDatePicker.RangePicker, 'popupClassName')) `
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

  &.tend-ui-picker-dropdown
    .tend-ui-picker-cell-in-view.tend-ui-picker-cell-range-start:not(
      .tend-ui-picker-cell-range-start-single
    ):not(.tend-ui-picker-cell-range-end)
    .tend-ui-picker-cell-inner {
    border-start-end-radius: 8px;
    border-end-end-radius: 8px;
  }

  &.tend-ui-picker-dropdown
    .tend-ui-picker-cell-in-view.tend-ui-picker-cell-range-end:not(
      .tend-ui-picker-cell-range-end-single
    ):not(.tend-ui-picker-cell-range-start)
    .tend-ui-picker-cell-inner {
    border-start-start-radius: 8px;
    border-end-start-radius: 8px;
  }
`;
const PrevIcon = styled(ChevronLeft) `
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
`;
const NextIcon = styled(ChevronRight) `
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
`;

export { NextIcon, PrevIcon, Root };
