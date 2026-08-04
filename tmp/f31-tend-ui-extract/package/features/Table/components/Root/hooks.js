import uniqBy from 'lodash/uniqBy';
import mapValues from 'lodash/mapValues';
import { FormName } from '../../consts/FormName.js';
import { useCallbackRef } from '@10d/tend-ui-hooks';
import { useDependsGraph } from '../../../../components/Filters/hooks/useDependsGraph.js';

/**
 * @internal Не для публичного использования
 */
const useFormChangeCallback = (parameters) => {
    const { filters, onFilterValuesChange, onSorterValuesChange, onSearchValueChange } = parameters || {};
    const dependencies = useDependsGraph(filters);
    return useCallbackRef((name, info) => {
        // Ignoring random custom "Form" components under the "Form.Provider"
        if (![
            FormName.Filter,
            FormName.Filters,
            FormName.Sorter,
            FormName.Sorters,
            FormName.Search,
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
        const [final] = uniqBy(mapped, 'scope');
        const forms = {
            filters: info.forms[FormName.Filters] || info.forms[FormName.Filter],
            sorters: info.forms[FormName.Sorters] || info.forms[FormName.Sorter],
            search: info.forms[FormName.Search],
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
                const patched = mapValues(values, (v, k) => {
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
                const patched = mapValues(values, (v, k) => {
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

export { useFormChangeCallback };
