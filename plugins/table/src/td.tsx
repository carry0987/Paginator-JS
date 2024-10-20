import { TColumn } from '@/interface/interfaces';
import { CSSDeclaration, TRow, TCell } from '@/type/types';
import { pluginAPI, pluginUtil } from '@carry0987/paginator';
import { ComponentChild, JSX } from 'preact';

export function TD(
    props: {
        cell: TCell;
        row?: TRow;
        column?: TColumn;
        style?: CSSDeclaration;
        messageCell?: boolean;
    } & Omit<JSX.HTMLAttributes<HTMLTableCellElement>, 'style'>
) {
    const config = pluginAPI.useConfig();

    const content = (): ComponentChild => {
        if (props.row && props.column && typeof props.column.formatter === 'function') {
            return props.column.formatter(props.cell.data, props.row, props.column);
        }

        if (props.column && props.column.plugin) {
            return (
                <pluginUtil.PluginRenderer
                    pluginId={props.column.id}
                    props={{
                        column: props.column,
                        cell: props.cell,
                        row: props.row
                    }}
                />
            );
        }

        return props.cell.data;
    };

    const handleClick = (e: JSX.TargetedMouseEvent<HTMLTableCellElement>): void => {
        if (props.messageCell) return;

        config.eventEmitter.emit('cellClick', e, props.cell, props.column, props.row);
    };

    return (
        <td
            role={props.role}
            colSpan={props.colSpan}
            data-column-id={props.column && props.column.id}
            className={pluginUtil.classJoin(pluginUtil.className('td'))}
            style={{
                ...props.style
            }}
            onClick={handleClick}>
            {content()}
        </td>
    );
}
