import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Close } from '@10d/tend-ui-icons/Close';
import { Tooltip } from '@10d/tend-ui-primitives';

const CloseIcon = (props) => {
    const t = useTranslation();
    const isEmpty = Object.entries(props).length === 0;
    const tooltipProps = React.useMemo(() => {
        if (isEmpty)
            return { title: t(['general', 'close']) };
        return props;
    }, [isEmpty, props, t]);
    return (React.createElement(Tooltip, Object.assign({}, tooltipProps),
        React.createElement(Close, { size: 20 })));
};

export { CloseIcon };
