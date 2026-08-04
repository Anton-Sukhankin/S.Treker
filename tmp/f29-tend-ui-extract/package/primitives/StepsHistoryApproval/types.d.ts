import React from 'react';
import AntSteps, { StepProps } from 'antd-core/es/steps';
type ApprovalUser = {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    email?: string;
};
type ApprovalGroup = {
    id: number;
    name: string;
    users: ApprovalUser[];
};
export type ApprovalGroupStep = {
    group: ApprovalGroup;
};
export type ApprovalUserStep = {
    user: ApprovalUser;
};
export type ApprovalProcessStep = {
    id?: string;
    title: string;
    step?: ProcessStep;
    docId?: string;
    user?: ApprovalUser;
    group?: Omit<ApprovalGroup, 'users'>;
    created?: string;
    updated?: string;
    deleted?: string | null;
    comment?: string;
};
export type ProcessStepTypeValues = 'start' | 'middle' | 'finish' | 'cancel' | 'diadoc_sign' | 'future' | 'active' | 'disabled';
export declare const ProcessStepTypes: {
    START: "start";
    MIDDLE: "middle";
    FINISH: "finish";
    CANCEL: "cancel";
    DIADOC_SIGN: "diadoc_sign";
    FUTURE: "future";
    ACTIVE: "active";
    DISABLED: "disabled";
};
export type ProcessStepType = (typeof ProcessStepTypes)[keyof typeof ProcessStepTypes];
export type ProcessStep = {
    id?: string;
    name?: string;
    routeId?: string;
    stepType?: ProcessStepType;
};
type AntStepsProps = React.ComponentPropsWithoutRef<typeof AntSteps>;
export type Items = (StepProps & ApprovalProcessStep)[];
export type StepsHistoryApprovalProps = Omit<AntStepsProps, 'items'> & {
    items: Items;
    currentApprovalUsers?: ApprovalUserStep[];
    currentApprovalGroups?: ApprovalGroupStep[];
    currentStepTitle?: string;
    showAvatar?: boolean;
};
export {};
