import React from 'react';
import { ApprovalGroupStep } from '../types';
type GroupLabelProps = {
    group: ApprovalGroupStep['group'];
    showAvatar: boolean;
};
export declare const GroupLabel: ({ group, showAvatar }: GroupLabelProps) => React.JSX.Element;
export {};
