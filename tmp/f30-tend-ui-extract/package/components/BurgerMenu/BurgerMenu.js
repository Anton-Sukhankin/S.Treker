import { __rest } from 'tslib';
import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { Apps } from '@10d/tend-ui-icons/Apps';
import { Dropdown } from '../../primitives/Dropdown/Dropdown.js';
import { Box } from '@10d/tend-ui-grid';
import { Divider } from '../../ui/Divider/Divider.js';
import { Text } from '@10d/tend-ui-typography';
import { useTheme } from '@10d/tend-ui-theme';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';
import { useBoolean } from '../../hooks/useBoolean/useBoolean.js';
import { Col } from './styled.js';

const Item = (_a) => {
    var { onClick } = _a, props = __rest(_a, ["onClick"]);
    const handleClick = React.useCallback(e => {
        if (props.disabled) {
            e.preventDefault();
            return;
        }
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
    }, [props.disabled, onClick]);
    return (React.createElement(Box, Object.assign({}, props, { "$display": 'flex', "$alignItems": 'center', "$gap": 8, "$padding": '10px 8px', "$color": 'inherit', "data-key": props.key, className: ['tend-ui-burger-menu-item', props.className].filter(Boolean).join(' '), onClick: handleClick }),
        props.before,
        React.createElement(Text, { strong: true, disabled: props.disabled }, props.label),
        props.after));
};
const ROWS_AMOUNT = 5;
const BurgerMenu = ({ title, extra, items, selectedKeys = [], footer, }) => {
    const theme = useTheme();
    const hasTitle = !isUndefined(title);
    const hasExtra = !isUndefined(extra);
    const [opened, setOpened] = useBoolean();
    const shouldRenderHeader = hasTitle || hasExtra;
    const cols = React.useMemo(() => {
        const record = (items || []).reduce((accumulator, currentValue, index) => {
            const key = index % ROWS_AMOUNT;
            if (Array.isArray(accumulator[key])) {
                accumulator[key] = [...accumulator[key], currentValue];
            }
            else {
                accumulator[key] = [currentValue];
            }
            return accumulator;
        }, {});
        return Object.values(record);
    }, [items]);
    return (React.createElement(Dropdown, { trigger: ['click'], onOpenChange: setOpened, dropdownRender: React.useCallback(() => {
            return (React.createElement(Dropdown.Content, { padding: 24 },
                shouldRenderHeader && (React.createElement(React.Fragment, null,
                    React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between' },
                        title && (React.createElement(Text, { strong: true, size: 'large', className: ['tend-ui-burger-menu-title'].filter(Boolean).join(' ') }, title)),
                        extra),
                    React.createElement(Divider, null))),
                items && (React.createElement(Box, { as: 'ul', "$margin": '0', "$padding": '0', "$display": 'flex', "$flexDirection": 'column', "$gap": 8, className: ['tend-ui-burger-menu-list'].filter(Boolean).join(' ') }, cols.map((rows, index) => (React.createElement(Box, { key: index, "$display": 'flex', "$gap": 4 }, rows.map(item => (React.createElement(Tooltip, Object.assign({}, item.tooltip, { key: item.key }),
                    React.createElement(Col, { theme: theme, "$selected": item.key ? selectedKeys.includes(item.key) : false, "$disabled": item.disabled, className: ['tend-ui-burger-menu-item-wrapper']
                            .filter(Boolean)
                            .join(' ') },
                        React.createElement(Item, Object.assign({}, item))))))))))),
                footer && React.createElement(Box, { "$mt": 24 }, footer)));
        }, [cols, extra, footer, items, selectedKeys, shouldRenderHeader, theme, title]) },
        React.createElement(ToggleButton, { selected: opened },
            React.createElement(Apps, { size: 20 }))));
};

export { BurgerMenu };
