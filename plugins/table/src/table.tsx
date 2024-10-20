import { THead } from './thead';
import { TBody } from './tbody';
import * as actions from '@/component/action';
import { pluginAPI, PluginUtil } from '@carry0987/paginator';
import { FunctionComponent } from 'preact';
import '@/theme/index.scss';

const Table: FunctionComponent = () => {
    // Component
    const tableRef = pluginAPI.useRef<HTMLTableElement>(null);
    const { dispatch } = pluginAPI.useStore();

    pluginAPI.useEffect(() => {
        if (tableRef) dispatch(actions.SetTableRef(tableRef));
    }, [tableRef]);

    return (
        <table ref={tableRef} role="table" className={PluginUtil.classJoin(PluginUtil.className('table'))}>
            <THead />
            <TBody />
        </table>
    );
};

export { Table };
