import React from 'react';
import AntTypography from 'antd-core/es/typography';

/**
 * @deprecated Не является компонентом типографии, будет удален в следующем мажорном обновлении
 */
const Typography = (props) => {
    return React.createElement(AntTypography, Object.assign({ "data-testid": 'tend-ui-typography' }, props));
};
Typography.displayName = 'Typography';

export { Typography };
