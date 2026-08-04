import React from 'react';
import { ApprovalProcessStep } from '../types';
type StepContentProps = {
    step: ApprovalProcessStep;
    showAvatar: boolean;
};
export declare const StepContent: ({ step, showAvatar }: StepContentProps) => React.JSX.Element;
export {};
