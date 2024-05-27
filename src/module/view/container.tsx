import { h } from 'preact';
import { useConfig } from '../hook/useConfig';
import { useStore } from '../hook/useStore';
import { useSelector } from '../hook/useSelector';
import { useEffect, useRef } from 'preact/hooks';
import log from '../utils/log';
import * as actions from '../../component/action';

export function Container() {
    const config = useConfig();
    const { dispatch } = useStore();
    const status = useSelector((state) => state.status);
    const data = useSelector((state) => state.data);
    const containerRef = useRef<HTMLDivElement>(null);

    const process = (async () => {
        if (status === 0) {
            dispatch(actions.SetData(data));
            return;
        }
    });

    useEffect(() => {
        dispatch(actions.SetLoadingData());
        try {
            process();
        } catch (e: unknown) {
            log.error(e);
            dispatch(actions.SetDataErrored());
        }

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
