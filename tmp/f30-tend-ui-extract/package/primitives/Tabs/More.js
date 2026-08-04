import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@10d/tend-ui-icons/ChevronDown';

const Wrapper = styled.span `
  /* TODO: Move to a token */
  font-size: 14px;

  display: inline-flex;
  align-items: center;
`;
const More = ({ children = 'Ещë' }) => {
    return (React.createElement(Wrapper, null,
        children,
        React.createElement(ChevronDown, null)));
};

export { More };
