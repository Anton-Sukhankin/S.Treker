import omit from 'lodash/omit';

const patchColumnPosition = (column, position) => {
    if (position === 'none')
        return omit(column, 'fixed');
    return Object.assign(Object.assign({}, column), { fixed: position });
};

export { patchColumnPosition };
