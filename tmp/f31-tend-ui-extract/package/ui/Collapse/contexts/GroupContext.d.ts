import React from 'react';
type GroupContextType = {
    defaultOpen?: string[];
};
export declare const GroupContext: React.Context<GroupContextType | undefined>;
export declare const useGroupContext: () => GroupContextType | undefined;
export {};
