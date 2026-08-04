'use strict';

var styled = require('styled-components');
var Select = require('antd-core/es/select');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');
var withInjectedClassName = require('../../hocs/withInjectedClassName/withInjectedClassName.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var Select__default = /*#__PURE__*/_interopDefault(Select);

const ArrowIcon = styled__default["default"](ChevronDown.ChevronDown) `
  ${props => props.$disabled &&
    styled.css `
      cursor: not-allowed;
      pointer-events: none;
    `}
  transform: ${props => (props.$open ? 'rotate(180deg)' : 'rotate(0)')};
`;
const Root = styled__default["default"](withInjectedClassName.withInjectedClassName(Select__default["default"], 'popupClassName')) `
  &.tend-ui-select {
    ${({ $fullWidth = false, $width = '256px' }) => {
    if ($fullWidth)
        return styled.css `
          width: 100%;
        `;
    return styled.css `
        width: ${$width};
      `;
}}

    /* Single Small */
     &.tend-ui-select-single.tend-ui-select-sm {
      .tend-ui-select-selection-search {
        padding-right: 16px;
      }
      &:not(.tend-ui-select-customize-input) {
        .tend-ui-select-selector {
          /* Side padding */
          padding: 0 8px;
        }
      }
    }

    /* Single Medium */
    &.tend-ui-select-single:not(.tend-ui-select-lg):not(.tend-ui-select-sm) {
      .tend-ui-select-selection-search {
        padding-right: 32px;
      }
      &:not(.tend-ui-select-customize-input) {
        .tend-ui-select-selector {
          /* Side padding */
          padding: 0 8px;
          .tend-ui-select-selection-search {
            /* Compensate left side padding */
            inset-inline-start: 7px;
          }
        }
      }
    }

    /* Single Large */
    &.tend-ui-select-single.tend-ui-select-lg:not(.tend-ui-select-customize-input) {
      .tend-ui-select-selection-search {
        padding-right: 32px;
      }
      .tend-ui-select-selector {
        padding: 4px 12px;
      }
    }

    /* Aligning icons and fix icon-margin */
    .tend-ui-select-selection-placeholder {
      display: inline-flex;
      align-items: center;

      & > .anticon {
        margin-right: 8px;
      }
    }

    /* Multiple select */
    &.tend-ui-select-multiple {
      .tend-ui-select-selection-search {
        margin-right: 20px;
      }
      .tend-ui-select-selection-item {
        color: ${props => props.$theme.colors.gray900};
        font-size: 12px;
        height: 16px;

        .tend-ui-select-selection-item-content {
          line-height: initial;
        }
      }
    }

    /* Offsetting the clear icon to the left */
    .tend-ui-select-clear {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inset-inline-end: 30px;
    }
  }

  /* Dropdown styles */
  &.tend-ui-select-dropdown {
    padding: 12px 0;

    .rc-virtual-list-scrollbar-vertical {
      background: ${props => props.$theme.colors.gray50};
      border-radius: 16px;
      margin-right: 4px;
      visibility: visible !important;
    }

    .rc-virtual-list-scrollbar-thumb {
      background: ${props => props.$theme.colors.gray150} !important;
    }

    .tend-ui-select-item {
      border-radius: 0;
      ${props => props.$multi &&
    styled.css `
          display: flex;
          flex-direction: row-reverse;
          gap: 12px;
        `}
    }

    .tend-ui-select-item-option-selected {
      &:not(.tend-ui-select-item-option-disabled) {
        &:hover {
          background-color: ${props => props.$theme.colors.gray50};
        }
      }
    }
  }
  /*
    TODO: A bit messy workaround, probably might be a better solution
    https://github.com/styled-components/styled-components/issues/1803
  */
`;

exports.ArrowIcon = ArrowIcon;
exports.Root = Root;
