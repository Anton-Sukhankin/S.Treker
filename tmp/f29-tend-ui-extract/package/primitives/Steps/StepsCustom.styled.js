import styled from 'styled-components';
import AntSteps from 'antd-core/es/steps';
import { colors } from '@10d/tend-ui-tokens/global';
import { ProcessStepTypes } from '../StepsHistoryApproval/types.js';

const Steps = styled(AntSteps) `
  ${props => {
    const iconStyles = `
      width: ${props.variant};
      height: ${props.variant};
      
      .tend-ui-steps-icon {
        display: flex;
        width: ${props.variant};
        height: ${props.variant};
      }
    `;
    const hoverStyles = `
      &:hover {
        .tend-ui-steps-item-content {
          .tend-ui-steps-item-title * {
            color: ${props.$theme.colors.blue700};
          }
          .tend-ui-steps-item-description * {
            color: ${props.$theme.colors.blue700};
          }
        }
        
        .tend-ui-steps-item-icon [data-status='done'] {
          background: ${props.$theme.colors.gray400};
        }
        
        .tend-ui-steps-item-icon [data-status='error'] {
          background: ${props.$theme.colors.red700};
        }
        
        .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.FUTURE}] {
          border: 1.5px solid ${colors.gray400};
        }
        
        &:has(> .tend-ui-steps-item-container > .tend-ui-steps-item-icon [data-status='error']) {
          .tend-ui-steps-item-content .tend-ui-steps-item-title * {
            color: ${props.$theme.colors.red700};
          }
        }
        
        &:has(> .tend-ui-steps-item-container > .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
          color: ${props.$theme.colors.gray900};
          .tend-ui-steps-item-description * {
            color: ${props.$theme.colors.gray400};
          }
        }
        
        &:has(> .tend-ui-steps-item-container > .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.DISABLED}]) {
          .tend-ui-steps-item-content {
            .tend-ui-steps-item-description * {
              color: ${props.$theme.colors.gray500};
            }
            .tend-ui-steps-item-title * {
              color: ${props.$theme.colors.gray650};
            }
          }
        }
      }
    `;
    const verticalStyles = `
      &.tend-ui-steps {
        .tend-ui-steps-item-title {
          width: 100%;
          padding-right: 0;
          .steps-created-date {
            display: flex;
            justify-content: flex-end;
          }
        }

        &.tend-ui-steps-vertical > .tend-ui-steps-item {
          > .tend-ui-steps-item-container {
            > .tend-ui-steps-item-icon {
              ${iconStyles}
              position: relative;
              z-index: 2;
            }
            
            > .tend-ui-steps-item-tail {
              inset-inline-start: calc(${props.variant} / 2);
              padding: 28px 0 4px;
              &::after {
                content: '';
                position: absolute;
                top: calc(${props.variant} + 6px);
                height: calc(100% - 10px - ${props.variant});
                background-color: ${props.$theme.colors.gray200};
                z-index: 1;
              }
            }

            > .tend-ui-steps-item-content {
              min-height: 64px;
              > .tend-ui-steps-item-title {
                line-height: ${props.variant};
              }
            }

            &:has(> .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
            &:has(> .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
              > .tend-ui-steps-item-content .tend-ui-steps-item-title * {
                color: ${props.$theme.colors.gray900};
              }
            }
            
            ${hoverStyles}
          }
        }
      }
    `;
    const horizontalStyles = `
      &.tend-ui-steps {
        &.tend-ui-steps-label-horizontal {
          .tend-ui-steps-item {
            overflow: visible;
            flex: 1;
            position: relative;
            padding-bottom: 8px;
            
            &:not(:last-child)::after {
              content: '';
              position: absolute;
              top: calc(${props.variant} / 2);
              left: calc(${props.variant} + 20px);
              right: -12px;
              height: 1px;
              background-color: ${props.$theme.colors.gray200};
              z-index: 1;
            }
            
            &:first-child::after {
              left: calc(${props.variant} + 4px);
            }
            
            .tend-ui-steps-item-container {
              display: flex;
              flex-direction: column;
              
              .tend-ui-steps-item-icon {
                ${iconStyles}
                margin-bottom: 8px;
                position: relative;
                z-index: 2;
                margin-left: 0;
              }
              
              .tend-ui-steps-item-content {
                .tend-ui-steps-item-title {
                  line-height: ${props.variant};
                  white-space: nowrap;
                  &::after {
                    display: none;
                  }
                }
              }
            }
            
            &:has(> .tend-ui-steps-item-container > .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
            &:has(> .tend-ui-steps-item-container > .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
              .tend-ui-steps-item-content .tend-ui-steps-item-title * {
                color: ${props.$theme.colors.gray900};
              }
            }
            
            ${hoverStyles}
          }
        }
      }
    `;
    const directionStyles = {
        vertical: verticalStyles,
        horizontal: horizontalStyles,
    };
    return directionStyles[props.direction];
}}
`;

export { Steps };
