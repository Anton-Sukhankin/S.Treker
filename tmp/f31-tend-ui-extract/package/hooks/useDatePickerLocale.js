import React from 'react';
import { useLanguage } from '@10d/tend-ui-locale';
import ru_RU from 'antd-core/es/date-picker/locale/ru_RU';
import en_US from 'antd-core/es/date-picker/locale/en_US';

const useDatePickerLocale = (locale) => {
    const lang = useLanguage('useDatePickerLocale');
    return React.useMemo(() => {
        const defaultLocale = locale !== null && locale !== void 0 ? locale : { ru: ru_RU, en: en_US }[lang];
        return Object.assign(Object.assign({}, defaultLocale), { lang: Object.assign({ monthFormat: 'MMMM' }, defaultLocale.lang) });
    }, [lang, locale]);
};

export { useDatePickerLocale };
