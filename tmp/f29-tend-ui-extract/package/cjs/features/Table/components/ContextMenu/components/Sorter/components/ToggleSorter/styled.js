'use strict';

var styled = require('styled-components');
var List = require('../../../../../../../../ui/List/List.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const ListItem = styled__default["default"](List.List.Item) `
  margin: 0 -16px;
  padding: 4px 16px;
`;

exports.ListItem = ListItem;
