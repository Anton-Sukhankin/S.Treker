import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Box } from '@10d/tend-ui-grid';
import { Button } from '@10d/tend-ui-primitives';

const Authorization = ({ signinButtonProps, signupButtonProps, onSignin, onSignup, }) => {
    const t = useTranslation();
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        React.createElement(Button, Object.assign({ as: 'a', href: '/accounts/login/', variant: 'secondary', onClick: onSignin }, signinButtonProps), t(['general', 'signin'])),
        React.createElement(Button, Object.assign({ as: 'a', href: '/accounts/logout/', onClick: onSignup }, signupButtonProps), t(['general', 'signup']))));
};
Authorization.displayName = 'Layout.Header.Authorization';

export { Authorization };
