import React, { useCallback } from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { urlRegex, ellipsis } from '../utils.js';
import { StyledParagraph, StyledText } from './styled.js';

const TextWithLinks = ({ text }) => {
    const theme = useTheme();
    const words = text.split(urlRegex);
    const handleLinkClick = useCallback((url) => {
        window.open(url, '_blank');
    }, []);
    return (React.createElement(StyledParagraph, { "$theme": theme, ellipsis: ellipsis }, words.map((word, index) => {
        if (urlRegex.test(word)) {
            return (React.createElement(StyledText, { key: index, color: 'blue600', onClick: () => handleLinkClick(word) }, word));
        }
        return word;
    })));
};

export { TextWithLinks };
