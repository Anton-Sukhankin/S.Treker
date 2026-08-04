import styled from 'styled-components';
import AntCollapse from 'antd-core/es/collapse';
import { ChevronDown } from '@10d/tend-ui-icons/ChevronDown';

const Root = styled(AntCollapse) `
  &.tend-ui-collapse > .tend-ui-collapse-item > .tend-ui-collapse-header {
    &[aria-expanded='true'] {
      background-color: ${props => props.$theme.colors.gray50};
    }
    &:hover {
      background-color: ${props => props.$theme.colors.gray100};
    }
  }
`;
const Title = styled.div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
`;
const Description = styled.div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42857;
`;
const ArrowIcon = styled(ChevronDown) `
  transform: ${props => (props.$active ? 'rotate(0)' : 'rotate(-90deg)')};
  transition: transform 0.3s;
`;

export { ArrowIcon, Description, Root, Title };
