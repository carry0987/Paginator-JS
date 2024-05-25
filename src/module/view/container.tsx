import { h } from 'preact';
import { useConfig } from '../hook/useConfig';
import { useEffect, useRef } from 'preact/hooks';

export const Container = () => {
    const config = useConfig();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ele = containerRef.current;
        if (ele) {
            ele.className = 'paginator';

            if (config.className) {
                ele.classList.add(config.className);
            }

            if (config.container) {
                if (config.position === 'bottom') {
                    config.container.appendChild(ele);
                } else {
                    config.container.insertBefore(ele, config.container.firstChild);
                }
            }
        }
    }, [config]);

    return (<div ref={containerRef}></div>);
};
