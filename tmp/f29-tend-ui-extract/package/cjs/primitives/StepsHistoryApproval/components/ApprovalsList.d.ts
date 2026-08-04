import React from 'react';
import { ApprovalUserStep } from '../types';
type ApprovalsListProps = {
    list?: ApprovalUserStep[];
    showAvatar: boolean;
    maxVisibleItems?: number;
};
export declare const ApprovalsList: ({ list, showAvatar, maxVisibleItems, }: ApprovalsListProps) => React.JSX.Element;
export {};
