import { ProfileProps as DefaultProfileProps, ProfileItem } from '../../../../../../components/Profile';
export type ProfileProps = DefaultProfileProps & {
    defaultItems?: (defaultItems: ProfileItem[]) => ProfileItem[];
    avatarBaseUrl?: string;
    profileUrl?: string;
    logoutUrl?: string;
};
