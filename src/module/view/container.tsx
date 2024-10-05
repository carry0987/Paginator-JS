import { PageRenderer } from './pageRenderer';
import { PageRendererProps } from '@/interface/view';
import { Status } from '@/type/types';
import { useConfig } from '@/module/hook/useConfig';
import { useOption } from '@/module/hook/useOption';
import { useStore } from '@/module/hook/useStore';
import { useSelector } from '@/module/hook/useSelector';
import { throttle } from '@/module/utils/throttle';
import { classJoin, className } from '@/module/utils/className';
import log from '@/module/utils/log';
import * as actions from '@/component/action';
import { createRef, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Tabular from '@/component/tabular';

export function Container() {
    const config = useConfig();
    const option = useOption();
    const { dispatch } = useStore();
    const status = useSelector((state) => state.status);
    const tabular = useSelector((state) => state.tabular);
    const containerRef = createRef<HTMLDivElement>();
    const pageRendererRef = useRef<PageRendererProps>(null);

    const processPipeline = throttle(async () => {
        dispatch(actions.SetLoadingData());

        try {
            const result = await config.pipeline.process();
            if (result instanceof Tabular) {
                dispatch(actions.SetData(result));
            }
            Promise.resolve().then(() => {
                dispatch(actions.SetStatusToRendered());
            });
        } catch (e) {
            log.error(e);
            dispatch(actions.SetDataErrored());
        }
    }, 100);

    // Process Pipeline
    useEffect(() => {
        // Set the initial header object
        dispatch(actions.SetHeader(config.header));

        // Process the pipeline
        processPipeline();
        config.pipeline.on('updated', processPipeline);

        return () => config.pipeline.off('updated', processPipeline);
    }, []);

    // Ready
    useEffect(() => {
        if (config.header && status === Status.Loaded && tabular?.length) {
            config.eventEmitter.emit('ready');
        }
    }, [tabular, option, containerRef]);

    // Render Paginator
    useEffect(() => {
        const ele = containerRef.current;
        if (ele) {
            if (option.container) {
                if (option.position === 'bottom') {
                    option.container.appendChild(ele);
                } else {
                    option.container.insertBefore(ele, option.container.firstChild);
                }
            }
        }
    }, []);

    // Handle events
    useEffect(() => {
        const handleGo = (pageNumber: number) => {
            if (pageRendererRef.current) {
                pageRendererRef.current.setPage(pageNumber);
            }
        };

        config.eventEmitter.on('go', handleGo);

        return () => config.eventEmitter.off('go', handleGo);
    }, [pageRendererRef]);

    // Render data after the paginator is rendered
    useEffect(() => {
        if (option.dataRender && status === Status.Rendered && tabular?.length && pageRendererRef.current) {
            config.eventEmitter.emit('beforePaging', pageRendererRef.current.currentPage);
            option.dataRender(tabular.toArray());
            config.eventEmitter.emit('afterPaging', pageRendererRef.current.currentPage);
        }
    }, [status]);

    return (
        <div ref={containerRef} className={classJoin(className('pagination'), option.className.container)}>
            <PageRenderer ref={pageRendererRef} />
        </div>
    );
}
