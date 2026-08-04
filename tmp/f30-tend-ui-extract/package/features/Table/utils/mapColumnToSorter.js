/**
 * @deprecated Устарело
 */
const mapColumnToSorter = (column) => {
    return {
        key: `tend-ui-table-sorter-${column.key}`,
        id: column.id,
        name: column.id,
        label: column.label || column.title,
    };
};

export { mapColumnToSorter };
