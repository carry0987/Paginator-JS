import { HeaderContainer } from './headerContainer';
import { FooterContainer } from './footerContainer';
import { Status } from '@/type/status';
import { useOption } from '@/module/hook/useOption';
import { useSelector } from '@/module/hook/useSelector';
import { classJoin, className } from '@/module/utils/className';
import { PluginRenderer } from '@/plugin/pluginRenderer';
import { PluginPosition } from '@/plugin/pluginPosition';

export function PluginContainer() {
    const option = useOption();
    const status = useSelector((state) => state.status);

    return (
        <div
            role="complementary"
            className={classJoin(
                className('plugin', 'container'),
                status === Status.Loading ? className('plugin', 'loading') : null,
                option.pluginClassName?.container
            )}>
            {status === Status.Loading && <div className={className('plugin', 'loading-bar')} />}

            <HeaderContainer />

            <div className={classJoin(className('plugin', 'wrapper'), option.pluginClassName?.wrapper)}>
                <PluginRenderer position={PluginPosition.Body} />
            </div>

            <FooterContainer />
        </div>
    );
}
