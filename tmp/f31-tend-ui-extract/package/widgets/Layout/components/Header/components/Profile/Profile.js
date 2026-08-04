import { __rest } from 'tslib';
import React from 'react';
import { sha1 } from 'js-sha1';
import groupBy from 'lodash/groupBy';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Logout } from '@10d/tend-ui-icons/Logout';
import { User } from '@10d/tend-ui-icons/User';
import { Profile as Profile$1 } from '../../../../../../components/Profile/Profile.js';
import { useLayoutContext } from '../../../../contexts/LayoutContext.js';
import { MenuDefaultAction } from './consts.js';

const isDefaultItem = (item) => {
    return [MenuDefaultAction.Logout, MenuDefaultAction.Profile].includes(item === null || item === void 0 ? void 0 : item.key);
};
const Profile = (_a) => {
    var { avatar, avatarBaseUrl, profileUrl, logoutUrl = '/accounts/logout/', items = [], defaultItems } = _a, props = __rest(_a, ["avatar", "avatarBaseUrl", "profileUrl", "logoutUrl", "items", "defaultItems"]);
    const t = useTranslation();
    const { profile } = useLayoutContext();
    const _avatar = React.useMemo(() => {
        if (avatar || !profile || !avatarBaseUrl)
            return avatar;
        const source = new URL(`media/${sha1(profile.username)}.jpg`, avatarBaseUrl);
        return { src: source.href };
    }, [avatar, avatarBaseUrl, profile]);
    const _defaultItems = React.useMemo(() => {
        const dict = groupBy(items, 'key');
        const defaults = [
            ...(profileUrl
                ? [
                    {
                        key: MenuDefaultAction.Profile,
                        label: t(['widgets', 'Layout', 'Profile', 'profile']),
                        icon: React.createElement(User, null),
                        onClick: () => {
                            window.open(profileUrl, '_blank');
                        },
                    },
                ]
                : []),
            {
                key: MenuDefaultAction.Logout,
                label: t(['widgets', 'Layout', 'Profile', 'logout']),
                icon: React.createElement(Logout, null),
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
    return (React.createElement(Profile$1, Object.assign({ items: React.useMemo(() => items.filter(item => !isDefaultItem(item)).concat(_defaultItems), [_defaultItems, items]), avatar: _avatar, title: [profile === null || profile === void 0 ? void 0 : profile.firstName, profile === null || profile === void 0 ? void 0 : profile.lastName].filter(Boolean).join(' '), description: profile === null || profile === void 0 ? void 0 : profile.email }, props)));
};
Profile.displayName = 'Layout.Header.Profile';
Profile.MenuDefaultAction = MenuDefaultAction;

export { Profile };
