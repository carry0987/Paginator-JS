import { TR } from './tr';
import { TH } from './th';
import { TColumn } from '@/interface/interfaces';
import { pluginAPI, PluginUtil } from '@carry0987/paginator';

function calculateRowColSpans(
    column: TColumn[],
    rowIndex: number,
    totalRows: number
): { rowSpan: number; colSpan: number } {
    const depth = column.length - 1;
    const remainingRows = totalRows - rowIndex;
    const rowSpan = Math.floor(remainingRows - depth - depth / remainingRows);
    const colSpan = 1;

    return {
        rowSpan: rowSpan,
        colSpan: colSpan
    };
}

export function THead() {
    const header = pluginAPI.useSelector((state) => state.header);

    const renderColumn = (column: TColumn, rowIndex: number, columnIndex: number, totalRows: number) => {
        const { rowSpan, colSpan } = calculateRowColSpans([column], rowIndex, totalRows);

        return <TH column={column} index={columnIndex} colSpan={colSpan} rowSpan={rowSpan} />;
    };

    const renderRow = (row: TColumn[], rowIndex: number, totalRows: number) => {
        if (!header) return null;

        // Because the only sortable columns are leaf columns (not parents)
        const leafColumns = PluginUtil.leafColumns(header.columns);

        return (
            <TR>
                {row.map((col) => {
                    if (col.hidden) return null;

                    return renderColumn(col, rowIndex, leafColumns.indexOf(col), totalRows);
                })}
            </TR>
        );
    };

    const renderRows = () => {
        const rows = PluginUtil.tabularFormat(header?.columns || []);

        return rows.map((row, rowIndex) => renderRow(row, rowIndex, rows.length));
    };

    if (header) {
        return (
            <thead key={header.id} className={PluginUtil.classJoin(PluginUtil.className('thead'))}>
                {renderRows()}
            </thead>
        );
    }

    return null;
}
