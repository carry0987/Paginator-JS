import { ComponentChild } from 'preact';

/**
 * ID type for unique identification
 */
export type ID = string;

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
