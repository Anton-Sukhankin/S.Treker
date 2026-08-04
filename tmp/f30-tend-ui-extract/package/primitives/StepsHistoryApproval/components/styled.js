import styled from 'styled-components';
import { Paragraph, Text } from '@10d/tend-ui-typography';
import { Button } from '@10d/tend-ui-primitives';
import { Box } from '@10d/tend-ui-grid';

const CopyContainer = styled(Box) `
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
const CustomAvatar = styled.div `
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
const StyledParagraph = styled(Paragraph) `
  background-color: ${props => props.$theme.colors.gray25};
  padding: 16px;
`;
const StyledButton = styled(Button) `
  padding-top: 0;
`;
const StyledText = styled(Text) `
  cursor: pointer;
`;
const ApprovalUserContainer = styled(Box) `
  min-height: 60px;
`;

export { ApprovalUserContainer, CopyContainer, CustomAvatar, StyledButton, StyledParagraph, StyledText };
