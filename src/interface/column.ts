import { TDataArrayRow, TDataObjectRow, TDataRow, TCell } from '@/type/types';
import Row from '@/component/row';
import { ComponentChild } from 'preact';

// Table header cell type
export interface TColumn {
    id?: string;
    // Default data for all columns
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    // Column label
    name?: string | ComponentChild;
    hidden?: boolean;
    formatter?: (cell: TCell, row: TDataRow, column: TColumn) => ComponentChild;
}
