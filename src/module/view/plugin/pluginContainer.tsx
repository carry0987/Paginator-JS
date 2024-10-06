import { HeaderContainer } from './headerContainer';
import { FooterContainer } from './footerContainer';
import { Status } from '@/type/status';
import { useOption } from '@/module/hook/useOption';
import { useSelector } from '@/module/hook/useSelector';
import { classJoin, className } from '@/module/utils/className';
import log from '@/module/utils/log';
import { PluginRenderer } from '@/plugin/pluginRenderer';
import { PluginPosition } from '@/plugin/pluginPosition';
import { useEffect } from 'preact/hooks';

export function PluginContainer() {
    const option = useOption();
    const status = useSelector((state) => state.status);
    const tabular = useSelector((state) => state.tabular);

    // Render data after the paginator is rendered
    useEffect(() => {
        if (status === Status.Rendered && tabular?.length) {
            log.info('Rendering data');
        }
    }, [status]);

    return (
        <div
            role="complementary"
            className={classJoin(
                className('container'),
                status === Status.Loading ? className('loading') : null,
                option.className.container
            )}>
            {status === Status.Loading && <div className={className('loading-bar')} />}

            <HeaderContainer />

            <div className={className('wrapper')}>
                <PluginRenderer position={PluginPosition.Body} />
            </div>

            <FooterContainer />
        </div>
    );
}
