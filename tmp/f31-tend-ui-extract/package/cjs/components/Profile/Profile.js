'use strict';

var React = require('react');
var Avatar = require('../../primitives/Avatar/Avatar.js');
var Dropdown = require('../../primitives/Dropdown/Dropdown.js');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiTypography = require('@10d/tend-ui-typography');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const overlayStyle = { minWidth: '256px' };
const Profile = ({ title, description, items, avatar }) => {
    const menu = React__default["default"].useMemo(() => {
        const node = {
            disabled: true,
            key: 'profile-avatar-menu-item',
            label: (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 12 },
                React__default["default"].createElement(Avatar.Avatar, Object.assign({}, avatar, { size: 'medium' })),
                React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column' },
                    React__default["default"].createElement(tendUiTypography.Text, { size: 'large' }, title),
                    React__default["default"].createElement(tendUiTypography.Text, { size: 'small', color: 'gray500' }, description)))),
        };
        const divider = {
            type: 'divider',
        };
        if (!items || !items.length)
            return {
                items: [node],
            };
        const nodes = [node, divider];
        const result = nodes.concat(items);
        return {
            items: result,
        };
    }, [avatar, description, items, title]);
    return (React__default["default"].createElement(Dropdown.Dropdown, { items: menu.items, trigger: ['click'], overlayStyle: overlayStyle },
        React__default["default"].createElement(Avatar.Avatar, Object.assign({}, avatar, { size: 'small', pointer: true }))));
};
Profile.displayName = 'Profile';

exports.Profile = Profile;
