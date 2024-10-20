import { pluginAPI, PluginUtil } from '@carry0987/paginator';
import { FunctionComponent } from 'preact';
import '@/theme/index.scss';

const List: FunctionComponent = () => {
    // Use pluginAPI.useState to track tabular data changes
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const [data, updateData] = pluginAPI.useState(tabular);

    // Use effect to watch for changes in tabular data
    pluginAPI.useEffect(() => {
        if (tabular?.length) {
            updateData(tabular);
        }
    }, [tabular]);

    return (
        <div class={PluginUtil.className('list')}>
            <ul>{data && data.toArray().map((item, index) => <li key={`li-${index}`}>{item[0]}</li>)}</ul>
        </div>
    );
};

export { List };
