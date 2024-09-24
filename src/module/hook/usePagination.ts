import { Options } from '@/interface/options';
import PaginationLimit from '@/module/pipeline/limit/pagination';
import ServerPaginationLimit from '@/module/pipeline/limit/serverPagination';
import Tabular from '@/component/tabular';
import { useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';

export const usePagination = (option: Options, initialPage: number) => {
    const processor = useRef<PaginationLimit | ServerPaginationLimit>();
    const currentPage = useSignal(initialPage);
    const total = useSignal(0);
    const { server, pageRange, pageSize, resetPageOnUpdate } = option;

    // Rendered
    useEffect(() => {
        option.eventEmitter.emit('rendered');
    }, []);

    // Initialize and set up the processor
    useEffect(() => {
        if (server && (server.pageUrl || server.pageBody)) {
            processor.current = new ServerPaginationLimit({
                limit: pageSize,
                page: currentPage.value,
                url: server.pageUrl,
                body: server.pageBody,
            });

            option.pipeline.on('afterProcess', (storage) => {
                if (storage && storage instanceof Tabular) {
                    total.value = storage.length;
                }
            });
        } else {
            processor.current = new PaginationLimit({
                limit: pageSize,
                page: currentPage.value,
            });

            // Pagination (all Limit processors) is the last step in the pipeline
            // and we assume that at this stage, we have the rows that we care about.
            // Let's grab the rows before processing Pagination and set total number of rows
            processor.current.on('beforeProcess', (storage: Tabular) => {
                total.value = storage.length;
            });
        }

        option.pipeline.register(processor.current);
        option.pipeline.on('updated', onUpdate);

        // We need to make sure that the state is set
        // to the default props when an error happens
        option.pipeline.on('error', () => {
            total.value = 0;
            currentPage.value = 0;
        });

        return () => {
            option.pipeline.unregister(processor.current);
            option.pipeline.off('updated', onUpdate);
        };
    }, [option, initialPage]);

    const onUpdate = (updatedProcessor: unknown) => {
        // This is to ensure that the current page is set to 0
        // when a processor is updated for some reason
        if (resetPageOnUpdate && updatedProcessor !== processor.current) {
            currentPage.value = 0;

            if (processor.current && processor.current.props.page !== 0) {
                processor.current.setProps({ page: 0 });
            }
        }
    };

    const setPage = (page: number): void => {
        if (page < 0 || page === currentPage.value || page > getTotalPage()) return;
        currentPage.value = page;
        processor.current?.setProps({ page });
    };

    const getTotalPage = () => Math.ceil(total.value / option.pageSize);

    const goPage = (pageNumber: number, type?: string) => {
        if (type === 'prev') {
            option.eventEmitter.emit('previousClick', pageNumber);
        }
        if (type === 'next') {
            option.eventEmitter.emit('nextClick', pageNumber);
        }
        if (!type) {
            option.eventEmitter.emit('pageClick', pageNumber);
        }
        if (pageNumber === 1) {
            option.eventEmitter.emit('isFirstPage');
        } else if (pageNumber === getTotalPage()) {
            option.eventEmitter.emit('isLastPage');
        }
        setPage(pageNumber);
    };

    return {
        currentPage,
        setPage,
        goPage,
        getTotalPage,
        pageRange,
    };
};
