'use strict';

var uniqBy = require('lodash/uniqBy');
var mapValues = require('lodash/mapValues');
var FormName = require('../../consts/FormName.js');
var tendUiHooks = require('@10d/tend-ui-hooks');
var useDependsGraph = require('../../../../components/Filters/hooks/useDependsGraph.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var uniqBy__default = /*#__PURE__*/_interopDefault(uniqBy);
var mapValues__default = /*#__PURE__*/_interopDefault(mapValues);

/**
 * @internal Не для публичного использования
 */
const useFormChangeCallback = (parameters) => {
    const { filters, onFilterValuesChange, onSorterValuesChange, onSearchValueChange } = parameters || {};
    const dependencies = useDependsGraph.useDependsGraph(filters);
    return tendUiHooks.useCallbackRef((name, info) => {
        // Ignoring random custom "Form" components under the "Form.Provider"
        if (![
            FormName.FormName.Filter,
            FormName.FormName.Filters,
            FormName.FormName.Sorter,
            FormName.FormName.Sorters,
            FormName.FormName.Search,
        ].includes(name))
            return;
        // TODO: Переписать и сделать проще
        const mapped = info.changedFields.map(field => {
            const scope = field.name.at(0);
            const name = field.name.at(1);
            const _name = scope === 'search' ? 'search' : name;
            return {
                scope,
                name: _name,
                value: field.value,
                payload: {
                    [_name]: field.value,
                },
            };
        });
        const [final] = uniqBy__default["default"](mapped, 'scope');
        const forms = {
            filters: info.forms[FormName.FormName.Filters] || info.forms[FormName.FormName.Filter],
            sorters: info.forms[FormName.FormName.Sorters] || info.forms[FormName.FormName.Sorter],
            search: info.forms[FormName.FormName.Search],
        };
        const touched = final.name;
        const scope = final.scope;
        const instance = forms[scope];
        const changed = final.payload;
        const values = instance === null || instance === void 0 ? void 0 : instance.getFieldsValue([scope])[scope];
        switch (scope) {
            case 'filters': {
                // Ищем наличие зависимостей между фильтрами
                // чтобы очистить slave фильтр если был
                // изменен его master
                const patched = mapValues__default["default"](values, (v, k) => {
                    if (!dependencies[k])
                        return v;
                    if (dependencies[k].includes(touched)) {
                        instance.setFieldValue([scope, k], undefined);
                        return undefined;
                    }
                    return v;
                });
                onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(changed, patched);
                break;
            }
            case 'sorters': {
                // Сбрасываем другие сортировки
                // тк одновременно может быть применена
                // только одна сортировка
                const patched = mapValues__default["default"](values, (v, k) => {
                    if (k === touched)
                        return v;
                    return 'default';
                });
                // Обновляем инстанс формы для сортировок
                instance.setFieldValue([scope], patched);
                // Вызываем колбэк с обновленными параметрами
                onSorterValuesChange === null || onSorterValuesChange === void 0 ? void 0 : onSorterValuesChange(changed, patched);
                break;
            }
            case 'search': {
                // FIXME: Поправить типизацию
                onSearchValueChange === null || onSearchValueChange === void 0 ? void 0 : onSearchValueChange(changed, changed.search || '');
                return;
            }
        }
    });
};

exports.useFormChangeCallback = useFormChangeCallback;
