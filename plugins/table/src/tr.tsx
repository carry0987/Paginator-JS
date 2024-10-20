import { TD } from './td';
import { TColumn } from '@/interface/interfaces';
import { TRow, TCell } from '@/type/types';
import { pluginAPI, PluginUtil } from '@carry0987/paginator';
import { JSX, ComponentChildren } from 'preact';

export function TR(props: { row?: TRow; messageRow?: boolean; children?: ComponentChildren }) {
    const config = pluginAPI.useConfig();
    const header = pluginAPI.useSelector((state) => state.header);

    const getColumn = (cellIndex: number): TColumn | undefined => {
        if (header) {
            const cols = PluginUtil.leafColumns(header.columns);

            if (cols[cellIndex]) {
                return cols[cellIndex];
            }
        }

        return undefined;
    };

    const getChildren = (): ComponentChildren => {
        if (props.children) {
            return props.children;
        }

        return (
            props.row &&
            props.row.cells.map((cell: TCell, i: number) => {
                const column = getColumn(i);

                if (column && column.hidden) return null;

                return <TD key={cell.id} cell={cell} row={props.row} column={column} />;
            })
        );
    };

    const handleClick = (e: JSX.TargetedMouseEvent<HTMLTableRowElement>): void => {
        if (props.messageRow) return;

        config.eventEmitter.emit('rowClick', e, props.row);
    };

    return (
        <tr className={PluginUtil.classJoin(PluginUtil.className('tr'))} onClick={handleClick}>
            {getChildren()}
        </tr>
    );
}
