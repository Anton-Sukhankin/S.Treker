'use strict';

var styled = require('styled-components');
var AntSteps = require('antd-core/es/steps');
var global = require('@10d/tend-ui-tokens/global');
var Done = require('@10d/tend-ui-icons/Done');
var Close = require('@10d/tend-ui-icons/Close');
var types = require('./types.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntSteps__default = /*#__PURE__*/_interopDefault(AntSteps);

const CloseStepIconBase = Close.Close;
const Steps = styled__default["default"](AntSteps__default["default"]) `
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

        &:has(> .tend-ui-steps-item-icon [data-status=${types.ProcessStepTypes.FINISH}]),
        &:has(> .tend-ui-steps-item-icon [data-status=${types.ProcessStepTypes.ACTIVE}]) {
          > .tend-ui-steps-item-content .tend-ui-steps-item-title * {
            color: ${props => props.$theme.colors.gray900};
          }
        }
      }
    }
  }
`;
const ActiveStepIcon = styled__default["default"].div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 4px solid #007bfb;
  background: ${global.colors.gray0};
  box-sizing: border-box;
`;
const FutureStepIcon = styled__default["default"].div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${global.colors.gray200};
  background: ${global.colors.gray0};
  box-sizing: border-box;
`;
const DoneStepIcon = styled__default["default"](Done.Done) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${global.colors.gray200};
  justify-content: center;
  color: ${global.colors.gray0};
  box-sizing: border-box;
`;
const ErrorStepIcon = styled__default["default"](CloseStepIconBase) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${global.colors.red600};
  justify-content: center;
  color: ${global.colors.gray0};
  box-sizing: border-box;
`;
const DisabledStepIcon = styled__default["default"].div `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${global.colors.gray200};
  background: ${global.colors.gray50};
  box-sizing: border-box;
`;
const FinishedStepIcon = styled__default["default"](Done.Done).attrs({
    'data-status': types.ProcessStepTypes.FINISH,
}) `
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${global.colors.green500};
  justify-content: center;
  color: ${global.colors.gray0};
  box-sizing: border-box;
`;

exports.ActiveStepIcon = ActiveStepIcon;
exports.DisabledStepIcon = DisabledStepIcon;
exports.DoneStepIcon = DoneStepIcon;
exports.ErrorStepIcon = ErrorStepIcon;
exports.FinishedStepIcon = FinishedStepIcon;
exports.FutureStepIcon = FutureStepIcon;
exports.Steps = Steps;
