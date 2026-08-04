'use strict';

var styled = require('styled-components');
var samolet = require('@10d/tend-ui-tokens/samolet');

const scrollbar = styled.css `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ $theme = { colors: samolet.colors } }) => $theme.colors.gray50};
    border-radius: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ $theme = { colors: samolet.colors } }) => $theme.colors.gray150};
    border-radius: 16px;
  }
`;

exports.scrollbar = scrollbar;
