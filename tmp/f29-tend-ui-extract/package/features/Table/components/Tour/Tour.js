import React from 'react';
import AntTour from 'antd-core/es/tour';
import { TourContext } from '../../contexts/TourContext.js';

const Tour = ({ open, onClose, onFinish, children }) => {
    const toolbar = React.useRef(null);
    const cell = React.useRef(null);
    const sortersButton = React.useRef(null);
    const filtersButton = React.useRef(null);
    const settingsButton = React.useRef(null);
    return (React.createElement(TourContext.Provider, { value: React.useMemo(() => ({
            ui: { toolbar, cell, sortersButton, filtersButton, settingsButton },
        }), []) },
        children,
        React.createElement(AntTour, { open: open, onClose: onClose, onFinish: onFinish, steps: [
                {
                    title: 'Все функции таблиц теперь тут!',
                    description: 'Фильтруйте, сортируйте, группируйте и настраивайте таблицу, как удобно вам',
                    target: () => toolbar.current,
                },
                {
                    title: 'Эти же функции в столбце!',
                    description: 'Нажимайте на шапку, чтобы фильтровать, сортировать и использовать другие функции таблиц',
                    target: () => cell.current,
                },
                {
                    title: 'Настраивайте столбцы как вам удобно!',
                    description: 'Чтобы скрыть ненужные столбцы, откройте контекстное меню и выберите "Скрыть"',
                    target: () => cell.current,
                },
                {
                    title: 'Столбец может еще понадобиться?',
                    description: 'Чтобы заново его отобразить, воспользуйтесь настройками',
                    target: () => settingsButton.current,
                },
                {
                    title: 'Просматривайте только то, что вам нужно!',
                    description: 'Чтобы отфильтровать информацию используйте боковое меню фильтров',
                    target: () => filtersButton.current,
                },
                {
                    title: 'Просматривайте только то, что вам нужно!',
                    description: 'Также данные можно отсортировать, используйте выпадающие меню сортировки',
                    target: () => sortersButton.current,
                },
            ] })));
};
Tour.displayName = 'Table.Tour';

export { Tour };
