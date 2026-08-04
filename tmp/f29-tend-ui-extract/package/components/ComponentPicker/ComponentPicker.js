import React from 'react';
import omit from 'lodash/omit';
import { Checkbox } from '../../primitives/Checkbox/Checkbox.js';
import { Input } from '@10d/tend-ui-primitives';
import { Select } from '../../primitives/Select/Select.js';
import { DatePicker } from '../../primitives/DatePicker/DatePicker.js';
import { Toggle } from '../../primitives/Toggle/Toggle.js';
import { RangePicker } from '../../primitives/RangePicker/RangePicker.js';
import { Radio } from '../../primitives/Radio/Radio.js';
import { AsyncSelect } from '../AsyncSelect/AsyncSelect.js';

const ComponentPicker = React.memo(props => {
    switch (props.component) {
        case 'input': {
            const rest = omit(props, 'component');
            return React.createElement(Input, Object.assign({}, rest));
        }
        case 'select': {
            const rest = omit(props, 'component');
            return React.createElement(Select, Object.assign({ fullWidth: true }, rest));
        }
        case 'async-select': {
            const rest = omit(props, 'component');
            return React.createElement(AsyncSelect, Object.assign({ fullWidth: true }, rest));
        }
        case 'toggle': {
            const rest = omit(props, 'component');
            return React.createElement(Toggle, Object.assign({}, rest));
        }
        case 'checkbox': {
            const rest = omit(props, 'component');
            return React.createElement(Checkbox, Object.assign({}, rest));
        }
        case 'checkbox-group': {
            const rest = omit(props, 'component');
            return React.createElement(Checkbox.Group, Object.assign({ layout: 'vertical' }, rest));
        }
        case 'radio': {
            const rest = omit(props, 'component');
            return React.createElement(Radio, Object.assign({}, rest));
        }
        case 'radio-group': {
            const rest = omit(props, 'component');
            return React.createElement(Radio.Group, Object.assign({ layout: 'vertical' }, rest));
        }
        case 'date-picker': {
            const rest = omit(props, 'component');
            return React.createElement(DatePicker, Object.assign({ fullWidth: true }, rest));
        }
        case 'range-picker': {
            const rest = omit(props, 'component');
            return React.createElement(RangePicker, Object.assign({ fullWidth: true }, rest));
        }
        default:
            return React.createElement("span", null, "Component is not supported");
    }
});
ComponentPicker.displayName = 'ComponentPicker';

export { ComponentPicker };
