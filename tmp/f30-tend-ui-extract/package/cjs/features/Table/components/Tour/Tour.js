'use strict';

var React = require('react');
var AntTour = require('antd-core/es/tour');
var TourContext = require('../../contexts/TourContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntTour__default = /*#__PURE__*/_interopDefault(AntTour);

const Tour = ({ open, onClose, onFinish, children }) => {
    const toolbar = React__default["default"].useRef(null);
    const cell = React__default["default"].useRef(null);
    const sortersButton = React__default["default"].useRef(null);
    const filtersButton = React__default["default"].useRef(null);
    const settingsButton = React__default["default"].useRef(null);
    return (React__default["default"].createElement(TourContext.TourContext.Provider, { value: React__default["default"].useMemo(() => ({
            ui: { toolbar, cell, sortersButton, filtersButton, settingsButton },
        }), []) },
        children,
        React__default["default"].createElement(AntTour__default["default"], { open: open, onClose: onClose, onFinish: onFinish, steps: [
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

exports.Tour = Tour;
