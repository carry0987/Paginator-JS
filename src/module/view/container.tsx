import { PageRenderer } from './pageRenderer';
import { useConfig } from '@/module/hook/useConfig';
import { useStore } from '@/module/hook/useStore';
import { useSelector } from '@/module/hook/useSelector';
import log from '@/module/utils/log';
import { throttle } from '@/module/utils/throttle';
import * as actions from '@/component/action';
import { Status } from '@/type/types';
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export function Container() {
    const config = useConfig();
    const { dispatch } = useStore();
    const status = useSelector((state) => state.status);
    const data = useSelector((state) => state.data);
    const containerRef = useRef<HTMLDivElement>(null);

    const processPipeline = throttle(async () => {
        dispatch(actions.SetLoadingData());

        try {
            const data = await config.pipeline.process();
            dispatch(actions.SetData(data));
        } catch (e) {
            log.error(e);
            dispatch(actions.SetDataErrored());
        }
    }, 100);

    useEffect(() => {
        processPipeline();
        config.pipeline.on('updated', processPipeline);
        if (status === Status.Loaded) {
            dispatch(actions.SetStatusToRendered());
        }

        return () => config.pipeline.off('updated', processPipeline);
    }, []);

    useEffect(() => {
        console.log('Status:', status);
        console.log('Data:', data);
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
    }, [data, config]);

    return (<div ref={containerRef}>{PageRenderer()}</div>);
};
