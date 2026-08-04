import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Close } from '@10d/tend-ui-icons/Close';
import { Tooltip } from '@10d/tend-ui-primitives';

/**
 * @deprecated Используйте `useAllowClear` из `@10d/tend-ui-primitives`
 */
const useAllowClear = ({ allowClear, clearIconTooltip, }) => {
    const t = useTranslation();
    return React.useMemo(() => {
        if (typeof allowClear === 'undefined')
            return;
        if (allowClear === false)
            return allowClear;
        return {
            clearIcon: (React.createElement(Tooltip, Object.assign({ title: t(['general', 'clear']) }, clearIconTooltip),
                React.createElement(Close, { size: 16 }))),
        };
    }, [allowClear, clearIconTooltip, t]);
};

export { useAllowClear };
