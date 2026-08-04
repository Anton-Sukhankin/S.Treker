import React from 'react';
import { DropdownItem } from './types';
/**
 * TODO: Должен быть ContextMenu компонент
 */
export declare const Dropdown: React.ForwardRefExoticComponent<Omit<import("antd-core").DropDownProps, "menu"> & {
    menu?: import("antd-core").DropDownProps["menu"];
    content?: React.ReactNode;
    mode?: "single" | "multiple";
    items?: DropdownItem[];
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    onSelect?: (keys: string[]) => void;
    onClick?: (path: string[]) => void;
} & React.RefAttributes<never>> & {
    displayName: string;
    Content: React.FC<{
        padding?: React.CSSProperties["padding"];
        width?: React.CSSProperties["width"];
        display?: React.CSSProperties["display"];
        flexDirection?: React.CSSProperties["flexDirection"];
    }>;
};
