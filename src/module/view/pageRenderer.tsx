import { useEffect, useRef, useState } from 'preact/hooks';
import Utils from '../utils/utils-ext';
import { useConfig } from '../hook/useConfig';
import { HTMLElement } from './htmlElement';
import React from 'preact/compat';

export function PageRenderer() {
    const config = useConfig();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ele = containerRef.current;
        if (ele) {
            ele.className = 'paginator';

            if (config.className.container) {
                ele.classList.add(config.className.container);
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
