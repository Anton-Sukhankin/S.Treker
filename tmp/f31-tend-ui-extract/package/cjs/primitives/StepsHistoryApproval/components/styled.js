'use strict';

var styled = require('styled-components');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const CopyContainer = styled__default["default"](tendUiGrid.Box) `
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    color: ${props => props.theme.colors.blue700};
  }

  &:hover svg {
    cursor: pointer;
  }
  .approval-user-container:hover & svg {
    opacity: 1;
  }
`;
const CustomAvatar = styled__default["default"].div `
  width: 16px;
  height: 16px;
  position: ${props => props.$position};
  display: flex;
  justify-content: center;
  align-items: center;
  left: 27px;
  background-color: ${props => props.$theme.colors.blue200};
  border-radius: 100px;
  border: 1px solid ${props => props.$theme.colors.gray0};
  bottom: 0;
  cursor: pointer;
`;
const StyledParagraph = styled__default["default"](tendUiTypography.Paragraph) `
  background-color: ${props => props.$theme.colors.gray25};
  padding: 16px;
`;
const StyledButton = styled__default["default"](tendUiPrimitives.Button) `
  padding-top: 0;
`;
const StyledText = styled__default["default"](tendUiTypography.Text) `
  cursor: pointer;
`;
const ApprovalUserContainer = styled__default["default"](tendUiGrid.Box) `
  min-height: 60px;
`;

exports.ApprovalUserContainer = ApprovalUserContainer;
exports.CopyContainer = CopyContainer;
exports.CustomAvatar = CustomAvatar;
exports.StyledButton = StyledButton;
exports.StyledParagraph = StyledParagraph;
exports.StyledText = StyledText;
