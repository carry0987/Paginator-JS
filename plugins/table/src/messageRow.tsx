import { TR } from './tr';
import { TD } from './td';
import { pluginUtil } from '@carry0987/paginator';

export function MessageRow(props: { message: string; colSpan?: number; className?: string }) {
    return (
        <TR messageRow={true}>
            <TD
                role="alert"
                colSpan={props.colSpan}
                messageCell={true}
                cell={new pluginUtil.Cell(props.message)}
                className={pluginUtil.classJoin(
                    pluginUtil.className('message'),
                    props.className ? props.className : null
                )}
            />
        </TR>
    );
}
