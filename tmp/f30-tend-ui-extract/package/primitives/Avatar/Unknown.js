import React from 'react';
import { Icon } from '@10d/tend-ui-icons/Icon';

const sizes = {
    xl: 80,
    large: 43,
    medium: 36,
    small: 29,
};
const Unknown = (props) => {
    return (React.createElement(Icon, { size: sizes[props.size], mt: 8 },
        React.createElement("svg", { width: '1em', height: '1em', viewBox: '0 0 44 40', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            React.createElement("path", { d: 'M22 22C26.9706 22 31 17.9706 31 13C31 8.02944 26.9706 4 22 4C17.0294 4 13 8.02944 13 13C13 17.9706 17.0294 22 22 22Z', fill: '#99CAFE' }),
            React.createElement("path", { d: 'M22 26.5C12.982 26.5 5.638 32.548 5.638 40C5.638 40.504 6.034 40.9 6.538 40.9H37.462C37.966 40.9 38.362 40.504 38.362 40C38.362 32.548 31.018 26.5 22 26.5Z', fill: '#007BFB' }))));
};

export { Unknown };
