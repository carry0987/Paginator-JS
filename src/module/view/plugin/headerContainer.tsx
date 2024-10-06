import { classJoin, className } from '@/module/utils/className';
import { PluginPosition } from '@/plugin/pluginPosition';
import { PluginRenderer } from '@/plugin/pluginRenderer';
import { useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';

export function HeaderContainer() {
    const isActive = useSignal(true);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerRef.current && headerRef.current.children.length === 0) {
            isActive.value = false;
        }
    }, [headerRef]);

    if (isActive.value) {
        return (
            <div ref={headerRef} className={classJoin(className('head'))}>
                <PluginRenderer position={PluginPosition.Header} />
            </div>
        );
    }

    return null;
}
