'use strict';

var tslib = require('tslib');
var React = require('react');
var jsSha1 = require('js-sha1');
var groupBy = require('lodash/groupBy');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Logout = require('@10d/tend-ui-icons/Logout');
var User = require('@10d/tend-ui-icons/User');
var Profile$1 = require('../../../../../../components/Profile/Profile.js');
var LayoutContext = require('../../../../contexts/LayoutContext.js');
var consts = require('./consts.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

const isDefaultItem = (item) => {
    return [consts.MenuDefaultAction.Logout, consts.MenuDefaultAction.Profile].includes(item === null || item === void 0 ? void 0 : item.key);
};
const Profile = (_a) => {
    var { avatar, avatarBaseUrl, profileUrl, logoutUrl = '/accounts/logout/', items = [], defaultItems } = _a, props = tslib.__rest(_a, ["avatar", "avatarBaseUrl", "profileUrl", "logoutUrl", "items", "defaultItems"]);
    const t = useTranslation.useTranslation();
    const { profile } = LayoutContext.useLayoutContext();
    const _avatar = React__default["default"].useMemo(() => {
        if (avatar || !profile || !avatarBaseUrl)
            return avatar;
        const source = new URL(`media/${jsSha1.sha1(profile.username)}.jpg`, avatarBaseUrl);
        return { src: source.href };
    }, [avatar, avatarBaseUrl, profile]);
    const _defaultItems = React__default["default"].useMemo(() => {
        const dict = groupBy__default["default"](items, 'key');
        const defaults = [
            ...(profileUrl
                ? [
                    {
                        key: consts.MenuDefaultAction.Profile,
                        label: t(['widgets', 'Layout', 'Profile', 'profile']),
                        icon: React__default["default"].createElement(User.User, null),
                        onClick: () => {
                            window.open(profileUrl, '_blank');
                        },
                    },
                ]
                : []),
            {
                key: consts.MenuDefaultAction.Logout,
                label: t(['widgets', 'Layout', 'Profile', 'logout']),
                icon: React__default["default"].createElement(Logout.Logout, null),
                onClick: () => {
                    window.location.replace(logoutUrl);
                },
            },
        ];
        const result = defaults.map(defaultItem => {
            var _a;
            const overwritten = defaultItem.key === undefined ? undefined : (_a = dict[defaultItem.key]) === null || _a === void 0 ? void 0 : _a[0];
            return Object.assign(Object.assign({}, defaultItem), overwritten);
        });
        return defaultItems ? defaultItems(result) : result;
    }, [defaultItems, items, logoutUrl, profileUrl, t]);
    return (React__default["default"].createElement(Profile$1.Profile, Object.assign({ items: React__default["default"].useMemo(() => items.filter(item => !isDefaultItem(item)).concat(_defaultItems), [_defaultItems, items]), avatar: _avatar, title: [profile === null || profile === void 0 ? void 0 : profile.firstName, profile === null || profile === void 0 ? void 0 : profile.lastName].filter(Boolean).join(' '), description: profile === null || profile === void 0 ? void 0 : profile.email }, props)));
};
Profile.displayName = 'Layout.Header.Profile';
Profile.MenuDefaultAction = consts.MenuDefaultAction;

exports.Profile = Profile;
