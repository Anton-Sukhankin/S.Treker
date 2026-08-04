import React from 'react';
import { ProfileProps } from './types';
declare const Profile: {
    ({ title, description, items, avatar }: ProfileProps): React.JSX.Element;
    displayName: string;
};
export { Profile };
