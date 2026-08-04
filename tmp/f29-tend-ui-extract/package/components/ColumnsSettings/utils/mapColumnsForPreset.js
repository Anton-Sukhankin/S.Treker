import pick from 'lodash/pick';

const mapColumnsForPreset = (columns) => {
    return columns.map(column => pick(column, ['id', 'visible', 'disabled', 'draggable', 'fixed', 'pinnable']));
};

export { mapColumnsForPreset };
