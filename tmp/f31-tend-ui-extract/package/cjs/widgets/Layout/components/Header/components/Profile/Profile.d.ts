import React from 'react';
import { ProfileProps } from './types';
declare const Profile: {
    ({ avatar, avatarBaseUrl, profileUrl, logoutUrl, items, defaultItems, ...props }: ProfileProps): React.JSX.Element;
    displayName: string;
    MenuDefaultAction: {
        readonly Profile: "layout-profile-menu-item-profile";
        readonly Logout: "layout-profile-menu-item-logout";
    };
};
export { Profile };
