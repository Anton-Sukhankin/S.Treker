import React from 'react';
import { ProcessStepType } from '../types';
type StepTitleProps = {
    title: string;
    subTitle?: React.ReactNode;
    created?: string;
    stepType?: ProcessStepType;
};
export declare const StepTitle: ({ title, subTitle, created, stepType }: StepTitleProps) => React.JSX.Element;
export {};
