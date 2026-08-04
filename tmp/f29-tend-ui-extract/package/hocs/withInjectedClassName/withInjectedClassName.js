import React from 'react';

/**
 * @description HOC passes a React "className" property to a given property name
 * in order to style off-DOM-rendered elements with "styled-components"
 */
const withInjectedClassName = (Component, propertyName) => {
    return React.forwardRef((props, ref) => {
        const property = [props[propertyName], props.className].filter(Boolean).join(' ');
        return React.createElement(Component, Object.assign({ ref: ref }, props, { [propertyName]: property }));
    });
};

export { withInjectedClassName };
