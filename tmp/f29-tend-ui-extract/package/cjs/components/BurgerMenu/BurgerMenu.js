'use strict';

var tslib = require('tslib');
var React = require('react');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var Apps = require('@10d/tend-ui-icons/Apps');
var Dropdown = require('../../primitives/Dropdown/Dropdown.js');
var tendUiGrid = require('@10d/tend-ui-grid');
var Divider = require('../../ui/Divider/Divider.js');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var useBoolean = require('../../hooks/useBoolean/useBoolean.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Item = (_a) => {
    var { onClick } = _a, props = tslib.__rest(_a, ["onClick"]);
    const handleClick = React__default["default"].useCallback(e => {
        if (props.disabled) {
            e.preventDefault();
            return;
        }
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
    }, [props.disabled, onClick]);
    return (React__default["default"].createElement(tendUiGrid.Box, Object.assign({}, props, { "$display": 'flex', "$alignItems": 'center', "$gap": 8, "$padding": '10px 8px', "$color": 'inherit', "data-key": props.key, className: ['tend-ui-burger-menu-item', props.className].filter(Boolean).join(' '), onClick: handleClick }),
        props.before,
        React__default["default"].createElement(tendUiTypography.Text, { strong: true, disabled: props.disabled }, props.label),
        props.after));
};
const ROWS_AMOUNT = 5;
const BurgerMenu = ({ title, extra, items, selectedKeys = [], footer, }) => {
    const theme = tendUiTheme.useTheme();
    const hasTitle = !isUndefined.isUndefined(title);
    const hasExtra = !isUndefined.isUndefined(extra);
    const [opened, setOpened] = useBoolean.useBoolean();
    const shouldRenderHeader = hasTitle || hasExtra;
    const cols = React__default["default"].useMemo(() => {
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
    return (React__default["default"].createElement(Dropdown.Dropdown, { trigger: ['click'], onOpenChange: setOpened, dropdownRender: React__default["default"].useCallback(() => {
            return (React__default["default"].createElement(Dropdown.Dropdown.Content, { padding: 24 },
                shouldRenderHeader && (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between' },
                        title && (React__default["default"].createElement(tendUiTypography.Text, { strong: true, size: 'large', className: ['tend-ui-burger-menu-title'].filter(Boolean).join(' ') }, title)),
                        extra),
                    React__default["default"].createElement(Divider.Divider, null))),
                items && (React__default["default"].createElement(tendUiGrid.Box, { as: 'ul', "$margin": '0', "$padding": '0', "$display": 'flex', "$flexDirection": 'column', "$gap": 8, className: ['tend-ui-burger-menu-list'].filter(Boolean).join(' ') }, cols.map((rows, index) => (React__default["default"].createElement(tendUiGrid.Box, { key: index, "$display": 'flex', "$gap": 4 }, rows.map(item => (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({}, item.tooltip, { key: item.key }),
                    React__default["default"].createElement(styled.Col, { theme: theme, "$selected": item.key ? selectedKeys.includes(item.key) : false, "$disabled": item.disabled, className: ['tend-ui-burger-menu-item-wrapper']
                            .filter(Boolean)
                            .join(' ') },
                        React__default["default"].createElement(Item, Object.assign({}, item))))))))))),
                footer && React__default["default"].createElement(tendUiGrid.Box, { "$mt": 24 }, footer)));
        }, [cols, extra, footer, items, selectedKeys, shouldRenderHeader, theme, title]) },
        React__default["default"].createElement(tendUiPrimitives.ToggleButton, { selected: opened },
            React__default["default"].createElement(Apps.Apps, { size: 20 }))));
};

exports.BurgerMenu = BurgerMenu;
