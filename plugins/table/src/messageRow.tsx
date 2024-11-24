import { TR } from './tr';
import { TD } from './td';
import { pluginAPI, PluginUtil } from '@carry0987/paginator';

type MessageFormat = ReturnType<ReturnType<typeof pluginAPI.useTranslator>>;

export function MessageRow(props: { message: MessageFormat; colSpan?: number; className?: string }) {
    return (
        <TR messageRow={true}>
            <TD
                role="alert"
                colSpan={props.colSpan}
                messageCell={true}
                cell={new PluginUtil.Cell(props.message)}
                className={PluginUtil.classJoin(
                    PluginUtil.className('message'),
                    props.className ? props.className : null
                )}
            />
        </TR>
    );
}
