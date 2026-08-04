'use strict';

var React = require('react');
var groupBy = require('lodash/groupBy');
var move = require('@10d/tend-ui-utils/move');
var LocalStorage = require('@10d/tend-ui-utils/LocalStorage');
var tendUiHooks = require('@10d/tend-ui-hooks');
var tendUiUtils = require('@10d/tend-ui-utils');
var createDefaultColumn = require('../utils/createDefaultColumn.js');
var mapColumnsForLocalStorage = require('../utils/mapColumnsForLocalStorage.js');
var patchColumnPosition = require('../utils/patchColumnPosition.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

const isColumnsValid = (next, prev) => {
    /**
     * Если количество изначальных колонок не совпадает с тем
     * что в localStorage (например добавились новые),
     * то сохраненные ранее колонки не валидны
     */
    if (next.length !== prev.length)
        return false;
    const nextIds = next.map(c => c.id);
    const prevIds = prev.map(c => c.id);
    const difference = nextIds.filter(id => !prevIds.includes(id));
    /**
     * Если id колонок не совпадают c тем что было раньше
     * то сохраненные ранее колонки не валидны
     */
    if (difference.length > 0)
        return false;
    return true;
};
/**
 * @deprecated Хук устарел и больше не поддерживается.
 * Используйте хук из пакета `@10d/tend-ui-columns-settings`.
 */
const useColumns = (parameters) => {
    const onPresetApply = React__default["default"].useMemo(() => (!Array.isArray(parameters) ? parameters.onPresetApply : undefined), [parameters]);
    const onPresetSave = React__default["default"].useMemo(() => (!Array.isArray(parameters) ? parameters.onPresetSave : undefined), [parameters]);
    const onPresetEdit = React__default["default"].useMemo(() => (!Array.isArray(parameters) ? parameters.onPresetEdit : undefined), [parameters]);
    const onPresetRemove = React__default["default"].useMemo(() => (!Array.isArray(parameters) ? parameters.onPresetRemove : undefined), [parameters]);
    const storageKey = !Array.isArray(parameters) ? parameters.localStorage : undefined;
    const ignore = React__default["default"].useMemo(() => (!Array.isArray(parameters) ? parameters.ignore || [] : []), [parameters]);
    const defaultColumns = React__default["default"].useMemo(() => {
        if (Array.isArray(parameters))
            return parameters.map(createDefaultColumn.createDefaultColumn);
        return parameters.columns.map(createDefaultColumn.createDefaultColumn);
    }, [parameters]);
    const initialColumns = React__default["default"].useMemo(() => {
        if (Array.isArray(parameters))
            return parameters.map(createDefaultColumn.createDefaultColumn);
        if (!parameters.localStorage)
            return parameters.columns.map(createDefaultColumn.createDefaultColumn);
        const saved = LocalStorage.LocalStorage.get(parameters.localStorage);
        if (!saved)
            return parameters.columns.map(createDefaultColumn.createDefaultColumn);
        if (!isColumnsValid(parameters.columns, saved))
            return parameters.columns.map(createDefaultColumn.createDefaultColumn);
        const grouped = groupBy__default["default"](saved, 'id');
        return parameters.columns
            .map(createDefaultColumn.createDefaultColumn)
            .sort((a, b) => {
            const first = saved.findIndex(column => column.id === a.id);
            const second = saved.findIndex(column => column.id === b.id);
            return first - second;
        })
            .map(column => {
            const [{ visible, disabled, draggable, fixed, pinnable }] = grouped[column.id];
            return Object.assign(Object.assign({}, column), { visible, disabled, draggable, fixed, pinnable });
        });
    }, [parameters]);
    const [_columns, _setColumns] = React__default["default"].useState(initialColumns);
    /**
     * initialColumns пересоздается на каждый ререндер из-за того,
     * что parameters - сложный объект. Чтобы избежать цикличных апдейтов
     * превращаем колонки в строку и сравниваем строки
     */
    const stringified = React__default["default"].useMemo(() => JSON.stringify(initialColumns.map(column => ({ id: column.id, key: column.key }))), [initialColumns]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React__default["default"].useEffect(() => _setColumns(initialColumns), [stringified]);
    const [__presets = [], __setPresets] = tendUiHooks.useControllableState({
        defaultValue: Array.isArray(parameters) ? undefined : parameters.defaultPresets,
        onChange: Array.isArray(parameters) ? undefined : parameters.onPresetsChange,
    });
    const applyPreset = tendUiHooks.useCallbackRef(payload => {
        const grouped = groupBy__default["default"](payload.value, 'id');
        _setColumns(previousColumns => {
            const ordering = payload.value.map(column => column.id);
            return tendUiUtils.order(previousColumns, ordering, 'id').map(column => {
                const [{ visible, disabled, draggable, fixed, pinnable }] = grouped[column.id];
                return Object.assign(Object.assign({}, column), { visible, disabled, draggable, fixed, pinnable });
            });
        });
        onPresetApply === null || onPresetApply === void 0 ? void 0 : onPresetApply(payload);
    });
    const savePreset = tendUiHooks.useCallbackRef(payload => {
        __setPresets((previousPresets = []) => [...previousPresets, payload]);
        onPresetSave === null || onPresetSave === void 0 ? void 0 : onPresetSave(payload);
    });
    const editPreset = tendUiHooks.useCallbackRef(payload => {
        __setPresets((previousPresets = []) => {
            return previousPresets.map(previousPreset => previousPreset.id === payload.id ? payload : previousPreset);
        });
        onPresetEdit === null || onPresetEdit === void 0 ? void 0 : onPresetEdit(payload);
    });
    const removePreset = tendUiHooks.useCallbackRef(id => {
        let removed;
        __setPresets((previousPresets = []) => {
            const target = previousPresets.find(previousPreset => previousPreset.id === id);
            removed = target;
            return previousPresets.filter(previousPreset => previousPreset.id !== id);
        });
        if (!removed)
            return;
        onPresetRemove === null || onPresetRemove === void 0 ? void 0 : onPresetRemove(removed);
    });
    const swap = tendUiHooks.useCallbackRef((from, to) => {
        _setColumns(previousColumns => {
            const ignored = previousColumns.reduce((acc, cv, index) => {
                if (!ignore.includes(cv.id))
                    return acc;
                acc.push([index, cv]);
                return acc;
            }, []);
            const next = previousColumns
                .filter(column => !ignore.includes(column.id))
                .map((column, index) => {
                if (index === from) {
                    return patchColumnPosition.patchColumnPosition(column, 'none');
                }
                return column;
            });
            const moved = move.move(next, from, to);
            ignored.forEach(([i, v]) => {
                moved.splice(i, 0, v);
            });
            if (storageKey) {
                LocalStorage.LocalStorage.set(storageKey, mapColumnsForLocalStorage.mapColumnsForLocalStorage(moved));
            }
            return moved;
        });
    });
    const unpin = React__default["default"].useCallback((column) => {
        _setColumns(previousColumns => {
            const next = previousColumns.map(prevColumn => {
                if (prevColumn.id === column.id) {
                    return patchColumnPosition.patchColumnPosition(prevColumn, 'none');
                }
                return prevColumn;
            });
            if (storageKey) {
                LocalStorage.LocalStorage.set(storageKey, mapColumnsForLocalStorage.mapColumnsForLocalStorage(next));
            }
            return next;
        });
    }, [storageKey]);
    const pin = React__default["default"].useCallback((position, column) => {
        _setColumns(previousColumns => {
            const rightPosition = previousColumns.length - 1;
            const currentPosition = previousColumns.findIndex(value => value.id === column.id);
            const pinned = previousColumns.filter(col => col.fixed === 'left');
            const positionsMap = {
                left: pinned.length,
                right: rightPosition,
                none: currentPosition,
            };
            const to = positionsMap[position];
            const moved = move.move(previousColumns, currentPosition, to);
            const next = moved.map(movedColumn => {
                if (movedColumn.id === column.id)
                    return patchColumnPosition.patchColumnPosition(movedColumn, position);
                return movedColumn;
            });
            if (storageKey) {
                LocalStorage.LocalStorage.set(storageKey, mapColumnsForLocalStorage.mapColumnsForLocalStorage(next));
            }
            return next;
        });
    }, [storageKey]);
    const reset = tendUiHooks.useCallbackRef(() => {
        _setColumns(defaultColumns);
        if (!storageKey)
            return;
        LocalStorage.LocalStorage.set(storageKey, mapColumnsForLocalStorage.mapColumnsForLocalStorage(defaultColumns));
    });
    const display = React__default["default"].useCallback((visible, column) => {
        _setColumns(previousColumns => {
            const next = previousColumns.map(previousColumn => {
                if (previousColumn.id === column.id)
                    return Object.assign(Object.assign({}, previousColumn), { visible });
                return previousColumn;
            });
            if (storageKey) {
                LocalStorage.LocalStorage.set(storageKey, mapColumnsForLocalStorage.mapColumnsForLocalStorage(next));
            }
            return next;
        });
    }, [storageKey]);
    /**
     * `Table` columns
     */
    const columns = React__default["default"].useMemo(() => _columns.filter(column => column.visible), [_columns]);
    /**
     * `ColumnsSettings` columns
     */
    const renderColumns = React__default["default"].useMemo(() => {
        const notIgnored = _columns.filter(column => !ignore.includes(column.id));
        const onlyVisibles = notIgnored.filter(column => column.visible);
        if (onlyVisibles.length === 1) {
            return notIgnored.map(column => {
                if (column.id === onlyVisibles[0].id) {
                    return Object.assign(Object.assign({}, column), { disabled: true });
                }
                return column;
            });
        }
        return notIgnored;
    }, [_columns, columns, ignore]);
    const model = React__default["default"].useMemo(() => ({
        columns: renderColumns,
        set: _setColumns,
        swap,
        pin,
        unpin,
        reset,
        display,
        presets: __presets,
        savePreset,
        editPreset,
        removePreset,
        applyPreset,
    }), [
        __presets,
        applyPreset,
        display,
        editPreset,
        pin,
        removePreset,
        renderColumns,
        reset,
        savePreset,
        swap,
        unpin,
    ]);
    return [columns, model];
};

exports.useColumns = useColumns;
