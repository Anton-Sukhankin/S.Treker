import { ButtonProps } from '../../../../../../primitives/Button';
export type AuthorizationProps = {
    signinButtonProps?: ButtonProps<'a'>;
    signupButtonProps?: ButtonProps<'a'>;
    onSignin?: () => void;
    onSignup?: () => void;
};
