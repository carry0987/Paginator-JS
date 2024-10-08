import { TD } from './td';
import { pluginAPI, pluginUtil } from '@carry0987/paginator';
import { JSX, ComponentChildren } from 'preact';

export function TR(props: { row?: any; messageRow?: boolean; children?: ComponentChildren }) {
    const config = pluginAPI.useConfig();
    const header = pluginAPI.useSelector((state) => state.header);

    const getColumn = (cellIndex: number) => {
        if (header) {
            const cols = pluginUtil.leafColumns(header.columns);

            if (cols[cellIndex]) {
                return cols[cellIndex];
            }
        }

        return null;
    };

    const getChildren = (): ComponentChildren => {
        if (props.children) {
            return props.children;
        }

        return props.row.cells.map((cell: any, i: number) => {
            const column = getColumn(i);

            if (column && column.hidden) return null;

            return <TD key={cell.id} cell={cell} row={props.row} column={column} />;
        });
    };

    const handleClick = (e: JSX.TargetedMouseEvent<HTMLTableRowElement>): void => {
        if (props.messageRow) return;

        config.eventEmitter.emit('rowClick', e, props.row);
    };

    return (
        <tr className={pluginUtil.classJoin(pluginUtil.className('tr'))} onClick={handleClick}>
            {getChildren()}
        </tr>
    );
}
