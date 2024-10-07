import { pluginAPI } from '@carry0987/paginator';
import { FunctionComponent } from 'preact';
import '@/theme/index.scss';

const List: FunctionComponent = () => {
    // Use pluginAPI.useSignal to track tabular data changes
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const signalTabular = pluginAPI.useSignal(tabular);

    // Use effect to watch for changes in tabular data
    pluginAPI.useEffect(() => {
        if (tabular?.length) {
            // Update signal when tabular data changes
            signalTabular.value = tabular;
        }
    }, [tabular]);

    return (
        <div class={pluginAPI.className('list')}>
            <ul>
                {signalTabular?.value && signalTabular.value.toArray().map((item, index) => (
                    <li key={index}>{item[0]}</li>
                ))}
            </ul>
        </div>
    );
};

export default List;
