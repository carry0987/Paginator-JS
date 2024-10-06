import { TDataArrayRow, TDataObjectRow, TCell } from '@/type/types';
import { Plugin } from './plugin';
import { ComponentChild } from 'preact';

// Table header cell type
export interface TColumn {
    id?: string;
    // Default data for all columns
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    // Column label
    name?: string | ComponentChild;
    hidden?: boolean;
    // Plugin
    plugin?: Plugin<any>;
}
