import { TR } from './tr';
import { MessageRow } from './messageRow';
import { TRow } from '@/type/types';
import { pluginAPI, PluginUtil } from '@carry0987/paginator';

export function TBody() {
    const Status = PluginUtil.Status;

    // Hooks
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const status = pluginAPI.useSelector((state) => state.status);
    const header = pluginAPI.useSelector((state) => state.header);
    const lang = pluginAPI.useTranslator();
    const data = tabular?.data;

    const headerLength = () => {
        if (header) {
            return header.visibleColumns.length;
        }
        return 0;
    };

    return (
        <tbody className={PluginUtil.classJoin(PluginUtil.className('tbody'))}>
            {tabular &&
                tabular.data.map((row: TRow) => {
                    return <TR key={row.id} row={row} />;
                })}

            {status === Status.Loading && (!data || data.length === 0) && (
                <MessageRow
                    message={lang('loading')}
                    colSpan={headerLength()}
                    className={PluginUtil.classJoin(PluginUtil.className('loading'))}
                />
            )}

            {status === Status.Rendered && data && data.length === 0 && (
                <MessageRow
                    message={lang('noRecordsFound')}
                    colSpan={headerLength()}
                    className={PluginUtil.classJoin(PluginUtil.className('notfound'))}
                />
            )}

            {status === Status.Error && (
                <MessageRow
                    message={lang('error')}
                    colSpan={headerLength()}
                    className={PluginUtil.classJoin(PluginUtil.className('error'))}
                />
            )}
        </tbody>
    );
}
