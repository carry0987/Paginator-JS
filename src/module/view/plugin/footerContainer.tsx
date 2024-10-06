import { classJoin, className } from '@/module/utils/className';
import { PluginPosition } from '@/plugin/pluginPosition';
import { PluginRenderer } from '@/plugin/pluginRenderer';
import { useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';

export function FooterContainer() {
    const isActive = useSignal(true);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (footerRef.current && footerRef.current.children.length === 0) {
            isActive.value = false;
        }
    }, [footerRef]);

    if (isActive.value) {
        return (
            <div ref={footerRef} className={classJoin(className('footer'))}>
                <PluginRenderer position={PluginPosition.Footer} />
            </div>
        );
    }

    return null;
}
