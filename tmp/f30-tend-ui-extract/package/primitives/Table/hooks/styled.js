import styled, { css } from 'styled-components';
import { ArrowDown } from '@10d/tend-ui-icons/ArrowDown';

const FilterListIcon = styled(ArrowDown) `
  ${props => {
    if (props.$sortOrder === 'ascend')
        return css `
        color: ${props.$theme.colors.blue600};
      `;
    if (props.$sortOrder === 'descend')
        return css `
        color: ${props.$theme.colors.blue600};
        transform: rotate(180deg);
      `;
    return;
}}
`;

export { FilterListIcon };
