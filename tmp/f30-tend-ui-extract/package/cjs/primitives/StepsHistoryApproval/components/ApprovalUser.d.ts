import React from 'react';
import { ApprovalProcessStep, ApprovalUserStep } from '../types';
type ApprovalUserProps = {
    step: ApprovalProcessStep | ApprovalUserStep;
    src?: string | string[];
    showAvatar?: boolean;
};
export declare const ApprovalUser: ({ step, src, showAvatar }: ApprovalUserProps) => React.JSX.Element;
export {};
