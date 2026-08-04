import AntTable from 'antd-core/es/table';
import styled, { css } from 'styled-components';

const Root = styled(AntTable).attrs({
    $sizes: {
        large: css `
      /* Отступы контента */
      &.tend-ui-table-wrapper .tend-ui-table .tend-ui-table-tbody > tr > td {
        padding: 20px 12px;
      }
      /* Шрифты заголовка */
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > th,
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      /* Шрифты контента */
      &.tend-ui-table-wrapper .tend-ui-table-tbody > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    `,
        medium: css `
      /* Отступы контента */
      &.tend-ui-table-wrapper .tend-ui-table .tend-ui-table-tbody > tr > td {
        padding: 12px;
      }
      /* Шрифты заголовка */
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > th,
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      /* Шрифты контента */
      &.tend-ui-table-wrapper .tend-ui-table-tbody > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    `,
        small: css `
      /* Отступы хедера */
      &.tend-ui-table-wrapper
        .tend-ui-table.tend-ui-table-small
        .tend-ui-table-tbody
        > tr
        > td {
        padding: 10px 12px;
      }
      /* Шрифты заголовка */
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > th,
      &.tend-ui-table-wrapper .tend-ui-table-thead > tr > td {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
      /* Шрифты контента */
      &.tend-ui-table-wrapper .tend-ui-table-tbody > tr > td {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    `,
    },
}) `
  &.tend-ui-table-wrapper .tend-ui-table-summary {
    background-color: ${props => props.$theme.colors.gray50};
  }

  /* Боковая линия при закреплении столбцов слева */
  &.tend-ui-table-wrapper
    .tend-ui-table-ping-left
    .tend-ui-table-cell-fix-left-first::after,
  &.tend-ui-table-wrapper
    .tend-ui-table-ping-left
    .tend-ui-table-cell-fix-left-last::after {
    border-left: 1px solid ${props => props.$theme.colors.gray150};
  }

  /* Вертикальное выравнивание */
  &.tend-ui-table-wrapper .tend-ui-table-cell,
  &.tend-ui-table-wrapper .tend-ui-table-thead > tr > th,
  &.tend-ui-table-wrapper .tend-ui-table-tbody > tr > th,
  &.tend-ui-table-wrapper .tend-ui-table-tbody > tr > td,
  &.tend-ui-table-wrapper tfoot > tr > th,
  &.tend-ui-table-wrapper tfoot > tr > td {
    vertical-align: top;
  }
  /* Подсветка строка */
  .tend-ui-table-row-error {
    .tend-ui-table-cell {
      background-color: ${props => props.$theme.colors.red100};
      &.tend-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.red200};
      }
    }
  }
  .tend-ui-table-row-warning {
    .tend-ui-table-cell {
      background-color: ${props => props.$theme.colors.gold100};
      &.tend-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.gold200};
      }
    }
  }
  .tend-ui-table-row-success {
    .tend-ui-table-cell {
      background-color: ${props => props.$theme.colors.green100};
      &.tend-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.green200};
      }
    }
  }

  &.tend-ui-table-wrapper {
    /* Removing header mini-border */
    .tend-ui-table-thead
      > tr
      > th:not(:last-child):not(.tend-ui-table-selection-column):not(
        .tend-ui-table-row-expand-icon-cell
      ):not([colspan])::before,
    .tend-ui-table-thead
      > tr
      > td:not(:last-child):not(.tend-ui-table-selection-column):not(
        .tend-ui-table-row-expand-icon-cell
      ):not([colspan])::before {
      content: none;
    }

    .tend-ui-table-row-expand-icon {
      border-radius: 4px;
      border-color: ${props => props.$theme.colors.gray200};
    }
    .tend-ui-table-column-title {
      flex: 0;
    }
    .tend-ui-table-column-sorters,
    .tend-ui-table-filter-column {
      justify-content: flex-start;
      gap: 4px;
      .anticon {
        font-size: 16px;
      }
    }
    .tend-ui-table-filter-trigger {
      margin-inline: 0px;
    }
    ${props => props.$pointer &&
    css `
        .tend-ui-table-row {
          cursor: pointer;
        }
      `};
  }
  ${props => props.$sizes[props.$size]}
`;

export { Root };
