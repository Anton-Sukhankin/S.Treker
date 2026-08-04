'use strict';

const createDefaultColumn = (column) => {
    var _a, _b, _c;
    return (Object.assign(Object.assign({}, column), { visible: (_a = column === null || column === void 0 ? void 0 : column.visible) !== null && _a !== void 0 ? _a : true, pinnable: (_b = column === null || column === void 0 ? void 0 : column.pinnable) !== null && _b !== void 0 ? _b : true, draggable: (_c = column === null || column === void 0 ? void 0 : column.draggable) !== null && _c !== void 0 ? _c : true }));
};

exports.createDefaultColumn = createDefaultColumn;
