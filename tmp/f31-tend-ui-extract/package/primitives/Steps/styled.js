import styled from 'styled-components';
import AntSteps from 'antd-core/es/steps';

const Root = styled(AntSteps) `
  &.tend-ui-steps {
    &.tend-ui-steps-label-vertical {
      .tend-ui-steps-item-icon {
        margin-inline-start: 0px;
      }
      .tend-ui-steps-item-tail {
        margin-inline-start: 16px;
      }
      .tend-ui-steps-item-content {
        width: auto;
        text-align: left;
      }
    }

    &.tend-ui-steps-vertical
      > .tend-ui-steps-item
      > .tend-ui-steps-item-container
      > .tend-ui-steps-item-tail::after {
      width: 2px;
    }

    .tend-ui-steps-item-title,
    .tend-ui-steps-item-icon {
      font-weight: 600;
    }
    .tend-ui-steps-item-wait .tend-ui-steps-item-icon {
      background-color: transparent;
      border-color: ${props => props.$theme.colors.gray150};
    }
    .tend-ui-steps-item-disabled .tend-ui-steps-item-icon {
      border-color: ${props => props.$theme.colors.gray200};
      background-color: ${props => props.$theme.colors.gray50};
      .tend-ui-steps-icon {
        color: ${props => props.$theme.colors.gray400};
      }
    }
    .tend-ui-steps-item {
      &:not(.tend-ui-steps-item-active) {
        /* Error step hovering */
        &.tend-ui-steps-item-error {
          & > .tend-ui-steps-item-container[role='button'] {
            &:hover {
              .tend-ui-steps-item-title,
              .tend-ui-steps-item-description {
                color: ${props => props.$theme.colors.red500};
              }
              .tend-ui-steps-item-icon {
                background-color: ${props => props.$theme.colors.red500};
                border-color: ${props => props.$theme.colors.red500};
                .tend-ui-steps-icon {
                  color: ${props => props.$theme.colors.gray0};
                }
              }
            }
          }
        }
        &:not(.tend-ui-steps-item-error) {
          /* Finished step hovering */
          &:not(.tend-ui-steps-item-process):not(.tend-ui-steps-item-wait) {
            & > .tend-ui-steps-item-container[role='button'] {
              &:hover .tend-ui-steps-item-icon {
                border-color: ${props => props.$theme.colors.green500};
                .tend-ui-steps-icon {
                  color: ${props => props.$theme.colors.gray0};
                }
              }
            }
          }
          /* Awaiting step hovering */
          &:not(.tend-ui-steps-item-finish)
            > .tend-ui-steps-item-container[role='button'] {
            &:hover .tend-ui-steps-item-icon {
              background-color: ${props => props.$theme.colors.blue50};
            }
          }
        }
      }
    }

    .tend-ui-steps-item-process,
    .tend-ui-steps-item-wait {
      & > .tend-ui-steps-item-container > .tend-ui-steps-item-tail {
        &::after {
          background: linear-gradient(
            to right,
            ${props => props.$theme.colors.gray150} 4px,
            transparent 4px
          );
          background-size: 8px 1px;
        }
      }
    }

    .tend-ui-steps-item-finish {
      & > .tend-ui-steps-item-container > .tend-ui-steps-item-tail {
        &::after {
          background-color: ${props => props.$theme.colors.green500};
          height: 2px;
        }
      }

      .tend-ui-steps-item-icon {
        background-color: ${props => props.$theme.colors.green500};
        .tend-ui-steps-icon {
          color: ${props => props.$theme.colors.gray0};
        }
      }
    }
  }
`;

export { Root };
