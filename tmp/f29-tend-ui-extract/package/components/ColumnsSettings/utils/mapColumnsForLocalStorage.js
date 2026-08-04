import pick from 'lodash/pick';

const mapColumnsForLocalStorage = (columns) => {
    return columns.map(column => pick(column, ['id', 'visible', 'disabled', 'draggable', 'fixed', 'pinnable']));
};

export { mapColumnsForLocalStorage };
