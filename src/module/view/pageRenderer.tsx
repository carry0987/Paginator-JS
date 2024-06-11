import PaginationLimit from '@/module/pipeline/limit/pagination';
import ServerPaginationLimit from '@/module/pipeline/limit/serverPagination';
import { classJoin, className } from '@/module/utils/className';
import { useConfig } from '@/module/hook/useConfig';
import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export function PageRenderer() {
    const config = useConfig();
    const {
        server,
        display,
        pageRange,
        pageSize,
        pageNumber,
        resetPageOnUpdate
    } = config;

    const processor = useRef<PaginationLimit | ServerPaginationLimit>();
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (server) {
            processor.current = new ServerPaginationLimit({
                limit: pageSize,
                page: currentPage,
                url: server.url,
                body: server.body,
            });

            config.pipeline.register(processor.current);
        } else {
            processor.current = new PaginationLimit({
                limit: pageSize,
                page: currentPage,
            });

            config.pipeline.register(processor.current);
        }

        if (processor.current instanceof ServerPaginationLimit) {
            config.pipeline.on('afterProcess', (tabular) =>
                setTotal(tabular.length)
            );
        } else if (processor.current instanceof PaginationLimit) {
            // Pagination (all Limit processors) is the last step in the pipeline
            // and we assume that at this stage, we have the rows that we care about.
            // Let's grab the rows before processing Pagination and set total number of rows
            processor.current.on('beforeProcess', (tabular) =>
                setTotal(tabular.length)
            );
        }

        config.pipeline.on('updated', onUpdate);

        // we need to make sure that the state is set
        // to the default props when an error happens
        config.pipeline.on('error', () => {
            setTotal(0);
            setCurrentPage(0);
        });

        return () => {
            config.pipeline.unregister<object>(processor.current);
            config.pipeline.off('updated', onUpdate);
        };
    }, []);

    const onUpdate = (updatedProcessor) => {
        // this is to ensure that the current page is set to 0
        // when a processor is updated for some reason
        if (resetPageOnUpdate && updatedProcessor !== processor.current) {
            setCurrentPage(0);

            if (processor.current.props.page !== 0) {
                processor.current.setProps({
                    page: 0,
                });
            }
        }
    };

    const pages = () => Math.ceil(total / pageSize);

    const setPage = (page: number) => {
        if (page >= pages() || page < 0 || page === currentPage) {
            return null;
        }

        setCurrentPage(page);

        processor.current.setProps({
            page: page,
        });
    };

    const renderPages = () => {
        if (pageRange <= 0) {
            return null;
        }

        // how many pagination buttons to render?
        const maxCount: number = Math.min(pages(), pageRange);

        let pagePivot = Math.min(currentPage, Math.floor(maxCount / 2));
        if (currentPage + Math.floor(maxCount / 2) >= pages()) {
            pagePivot = maxCount - (pages() - currentPage);
        }

        return (
            <Fragment>
                {pages() > maxCount && currentPage - pagePivot > 0 && (
                    <Fragment>
                        <button
                            tabIndex={0}
                            role="button"
                            onClick={() => setPage(0)}
                            title={_('pagination.firstPage')}
                            aria-label={_('pagination.firstPage')}
                            className={config.className.paginationButton}
                        >
                            {_('1')}
                        </button>
                        <button
                            tabIndex={-1}
                            className={classJoin(
                                className('spread'),
                                config.className.paginationButton
                            )}
                        >
                            ...
                        </button>
                    </Fragment>
                )}

                {Array.from(Array(maxCount).keys())
                    .map((i) => currentPage + (i - pagePivot))
                    .map((i) => (
                        <button
                            tabIndex={0}
                            role="button"
                            onClick={() => setPage(i)}
                            className={classJoin(
                                currentPage === i
                                    ? classJoin(
                                          className('currentPage'),
                                          config.className
                                              .paginationButtonCurrent
                                      )
                                    : null,
                                config.className.paginationButton
                            )}
                            title={_('pagination.page', i + 1)}
                            aria-label={_('pagination.page', i + 1)}
                        >
                            {_(`${i + 1}`)}
                        </button>
                    ))}

                {pages() > maxCount &&
                    pages() > currentPage + pagePivot + 1 && (
                        <Fragment>
                            <button
                                tabIndex={-1}
                                className={classJoin(
                                    className('spread'),
                                    config.className.paginationButton
                                )}
                            >
                                ...
                            </button>
                            <button
                                tabIndex={0}
                                role="button"
                                onClick={() => setPage(pages() - 1)}
                                title={_('pagination.page', pages())}
                                aria-label={_('pagination.page', pages())}
                                className={config.className.paginationButton}
                            >
                                {_(`${pages()}`)}
                            </button>
                        </Fragment>
                    )}
            </Fragment>
        );
    };

    return (
        <div
            className={classJoin(
                className('pagination'),
                config.className.pagination
            )}
        >
            <div className={className('pages')}>
                {prevButton && (
                    <button
                        tabIndex={0}
                        role="button"
                        disabled={currentPage === 0}
                        onClick={() => setPage(currentPage - 1)}
                        title={_('pagination.previous')}
                        aria-label={_('pagination.previous')}
                        className={classJoin(
                            config.className.paginationButton,
                            config.className.paginationButtonPrev
                        )}
                    >
                        {_('pagination.previous')}
                    </button>
                )}

                {renderPages()}

                {nextButton && (
                    <button
                        tabIndex={0}
                        role="button"
                        disabled={pages() === currentPage + 1 || pages() === 0}
                        onClick={() => setPage(currentPage + 1)}
                        title={_('pagination.next')}
                        aria-label={_('pagination.next')}
                        className={classJoin(
                            config.className.paginationButton,
                            config.className.paginationButtonNext
                        )}
                    >
                        {_('pagination.next')}
                    </button>
                )}
            </div>
        </div>
    );
}
