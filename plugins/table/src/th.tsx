import { TColumn } from '@/interface/interfaces';
import { CSSDeclaration } from '@/type/types';
import { pluginAPI, pluginUtil } from '@carry0987/paginator';
import { ComponentChild, JSX } from 'preact';

export function TH(
    props: {
        index: number;
        column: TColumn;
        style?: CSSDeclaration;
    } & Omit<JSX.HTMLAttributes<HTMLTableCellElement>, 'style'>
) {
    const thRef = pluginAPI.useRef(null);

    const onClick = (
        e: JSX.TargetedMouseEvent<HTMLTableCellElement> | JSX.TargetedKeyboardEvent<HTMLTableCellElement>
    ) => {
        e.stopPropagation();
    };

    const content = (): ComponentChild => {
        if (props.column.name !== undefined) {
            return props.column.name;
        }

        if (props.column.plugin !== undefined) {
            return (
                <pluginUtil.PluginRenderer
                    pluginId={props.column.plugin.id}
                    props={{
                        column: props.column
                    }}
                />
            );
        }

        return null;
    };

    return (
        <th
            ref={thRef}
            data-column-id={props.column && props.column.id}
            className={pluginUtil.classJoin(pluginUtil.className('th'))}
            onClick={onClick}
            style={{
                ...props.style
            }}
            rowSpan={typeof props.rowSpan === 'number' && props.rowSpan > 1 ? props.rowSpan : undefined}
            colSpan={typeof props.colSpan === 'number' && props.colSpan > 1 ? props.colSpan : undefined}>
            <div className={pluginUtil.className('th', 'content')}>{content()}</div>
        </th>
    );
}
