import { ComponentChild } from 'preact';

export type ID = string;
export type CSSDeclaration = {
    [key: string]: string | number;
};

// Container status
export enum Status {
    Init,
    Loading,
    Loaded,
    Rendered,
    Error,
}

/**
 * Table cell types
 */
export type OneDArray<T> = T[];
export type TwoDArray<T> = T[][];
export type TCell = number | string | boolean | ComponentChild | HTMLElement;
// Array of Arrays
export type TDataArrayRow = OneDArray<TCell>;
export type TDataArray = OneDArray<TDataArrayRow>;
// Array of Objects
export type TDataObjectRow = { [key: string]: TCell };
export type TDataObject = OneDArray<TDataObjectRow>;
// (Array of Arrays) and (Array of Objects)
export type TData = TDataArray | TDataObject;
