'use strict';

var styled = require('styled-components');
var AntTitle = require('antd-core/es/typography/Title');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntTitle__default = /*#__PURE__*/_interopDefault(AntTitle);

const Root = styled__default["default"](AntTitle__default["default"]).attrs({
    $levels: {
        h1: styled.css `
      line-height: 1.2;
    `,
        h2: styled.css `
      line-height: 1.25;
    `,
        h3: styled.css `
      line-height: 36px;
    `,
        h4: styled.css `
      line-height: 32px;
    `,
        h5: styled.css `
      line-height: 24px;
    `,
        d1: styled.css `
      font-size: 64px;
      line-height: 1.25;
    `,
        d2: styled.css `
      font-size: 56px;
      font-weight: 400;
      line-height: 1.28;
    `,
    },
}) `
  &&& {
    ${tendUiStyling.color}
    ${tendUiStyling.textAlign}
    ${tendUiStyling.margin}
    ${props => props.$levels[props.$level]}
    ${tendUiStyling.uppercase}
  }
`;

exports.Root = Root;
