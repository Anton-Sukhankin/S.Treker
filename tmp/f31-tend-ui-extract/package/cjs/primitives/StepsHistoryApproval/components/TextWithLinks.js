'use strict';

var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var utils = require('../utils.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const TextWithLinks = ({ text }) => {
    const theme = tendUiTheme.useTheme();
    const words = text.split(utils.urlRegex);
    const handleLinkClick = React.useCallback((url) => {
        window.open(url, '_blank');
    }, []);
    return (React__default["default"].createElement(styled.StyledParagraph, { "$theme": theme, ellipsis: utils.ellipsis }, words.map((word, index) => {
        if (utils.urlRegex.test(word)) {
            return (React__default["default"].createElement(styled.StyledText, { key: index, color: 'blue600', onClick: () => handleLinkClick(word) }, word));
        }
        return word;
    })));
};

exports.TextWithLinks = TextWithLinks;
