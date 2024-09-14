import Base from './base';
import Row from './row';
import Cell from './cell';
import { OneDArray, TCell, TwoDArray } from '@/type/types';
import { oneDtoTwoD } from '@/module/utils/array';

class Tabular extends Base {
    private _rows: Row[] = [];
    private _length: number = 0;

    constructor(rows?: Row[] | Row) {
        super();

        if (rows instanceof Array) {
            this.data = rows;
        } else if (rows instanceof Row) {
            this.data = [rows];
        } else {
            this.data = [];
        }
    }

    public get data(): Row[] {
        return this._rows;
    }

    public set data(rows: Row[]) {
        this._rows = rows;
    }

    public get length(): number {
        return this._length || this.data.length;
    }

    // We want to sent the length when storage is ServerStorage
    public set length(len: number) {
        this._length = len;
    }

    public toArray(): TCell[][] {
        return this.data.map((row) => row.toArray());
    }

    /**
     * Creates a new Tabular from an array of Row(s)
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param rows
     * @returns Tabular
     */
    public static fromRows(rows: Row[]): Tabular {
        return new Tabular(rows.map((row) => Row.fromCells(row.cells)));
    }

    /**
     * Creates a new Tabular from a 2D array
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param data
     * @returns Tabular
     */
    public static fromArray<T extends TCell>(data: OneDArray<T> | TwoDArray<T>): Tabular {
        data = oneDtoTwoD(data);

        return new Tabular(data.map((row) => new Row(row.map((cell) => new Cell(cell)))));
    }
}

export default Tabular;
