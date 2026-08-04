import styled from 'styled-components';
import AntSteps from 'antd-core/es/steps';
import { colors } from '@10d/tend-ui-tokens/global';
import { Done } from '@10d/tend-ui-icons/Done';
import { Close } from '@10d/tend-ui-icons/Close';
import { ProcessStepTypes } from './types.js';

const CloseStepIconBase = Close;
const Steps = styled(AntSteps) `
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
          width: 24px;
          height: 24px;

          > .tend-ui-steps-icon {
            display: flex;
            width: 24px;
            height: 24px;
          }
        }
        > .tend-ui-steps-item-tail {
          inset-inline-start: 11px;
          padding: 28px 0 4px;
          &::after {
            background-color: ${props => props.$theme.colors.gray200};
          }
        }

        > .tend-ui-steps-item-content {
          min-height: 96px;
          > .tend-ui-steps-item-title {
            line-height: 24px;
          }
        }

        &:has(> .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
        &:has(> .tend-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
          > .tend-ui-steps-item-content .tend-ui-steps-item-title * {
            color: ${props => props.$theme.colors.gray900};
          }
        }
      }
    }
  }
`;
const ActiveStepIcon = styled.div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 4px solid #007bfb;
  background: ${colors.gray0};
  box-sizing: border-box;
`;
const FutureStepIcon = styled.div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${colors.gray200};
  background: ${colors.gray0};
  box-sizing: border-box;
`;
const DoneStepIcon = styled(Done) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.gray200};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;
const ErrorStepIcon = styled(CloseStepIconBase) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.red600};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;
const DisabledStepIcon = styled.div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${colors.gray200};
  background: ${colors.gray50};
  box-sizing: border-box;
`;
const FinishedStepIcon = styled(Done).attrs({
    'data-status': ProcessStepTypes.FINISH,
}) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.green500};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;

export { ActiveStepIcon, DisabledStepIcon, DoneStepIcon, ErrorStepIcon, FinishedStepIcon, FutureStepIcon, Steps };
