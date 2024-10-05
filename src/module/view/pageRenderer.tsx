import { PageButton, EllipsisButton, ActionButton, ActionButtonDisabled } from './button';
import { useOption } from '@/module/hook/useOption';
import { useTranslator } from '@/module/hook/useTranslator';
import { usePagination } from '@/module/hook/usePagination';
import { h } from 'preact';
import { useImperativeHandle } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import { classJoin, className } from '../utils/className';

export const PageRenderer = forwardRef((_, ref) => {
    const option = useOption();
    const display = option.display;
    const lang = useTranslator();
    const { currentPage, setPage, goPage, getTotalPage, pageRange } = usePagination(option, option.pageNumber);

    // Expose the methods to the parent component
    useImperativeHandle(ref, () => ({
        setPage,
        currentPage: currentPage.value,
        totalPage: getTotalPage()
    }));

    const renderPageNumbers = () => {
        const totalPage = getTotalPage(); // Calculate the total number of pages
        const pagerNumbers: h.JSX.Element[] = []; // Array to store the page buttons

        // If there is no page to render, return an empty array
        if (pageRange < 0) return pagerNumbers;

        // Calculate the start and end of the page range to display
        let rangeStart = currentPage.value - pageRange;
        let rangeEnd = currentPage.value + pageRange;

        // Adjust the range if it exceeds the total number of pages
        if (rangeEnd > totalPage) {
            rangeEnd = totalPage;
            rangeStart = rangeEnd - pageRange * 2;
            // Ensure the start range is at least 1
            rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        // Adjust the range if the starting point is less than or equal to 1
        if (rangeStart <= 1) {
            rangeStart = 1; // Start from the first page
            // Adjust the end range based on the pageRange and total pages
            rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        // If pageRange is 0, iterate through all pages and push buttons for each page
        if (pageRange === 0) {
            for (let i = 1; i <= totalPage; i++) {
                pagerNumbers.push(
                    <PageButton
                        page={i}
                        isActive={currentPage.value === i}
                        onClick={() => goPage(i)}
                        option={option}
                        lang={lang}
                        text={lang('pagination.page', i + 1)}
                    />
                );
            }

            return pagerNumbers;
        }

        // If range start is close to the beginning, render pages directly
        if (rangeStart <= 3) {
            for (let i = 1; i < rangeStart; i++) {
                pagerNumbers.push(
                    <PageButton page={i} isActive={false} onClick={() => goPage(i)} option={option} lang={lang} />
                );
            }
        } else {
            // Render ellipsis and optionally the first page if range start is far
            if (!display.hideFirstOnEllipsisShow) {
                pagerNumbers.push(
                    <PageButton page={1} isActive={false} onClick={() => goPage(1)} option={option} lang={lang} />
                );
            }
            pagerNumbers.push(<EllipsisButton key={'ellipsis-start'} option={option} lang={lang} />);
        }

        // Loop through the calculated range to render page buttons
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pagerNumbers.push(
                <PageButton
                    page={i}
                    isActive={currentPage.value === i}
                    onClick={() => goPage(i)}
                    option={option}
                    lang={lang}
                />
            );
        }

        // If the range end is near the last pages, render remaining pages
        if (rangeEnd >= totalPage - 2) {
            for (let i = rangeEnd + 1; i <= totalPage; i++) {
                pagerNumbers.push(
                    <PageButton page={i} isActive={false} onClick={() => goPage(i)} option={option} lang={lang} />
                );
            }
        } else {
            // Render ellipsis and optionally the last page if range end is far
            pagerNumbers.push(<EllipsisButton key={'ellipsis-end'} option={option} lang={lang} />);
            if (!display.hideLastOnEllipsisShow) {
                pagerNumbers.push(
                    <PageButton
                        page={totalPage}
                        isActive={false}
                        onClick={() => goPage(totalPage)}
                        option={option}
                        lang={lang}
                    />
                );
            }
        }

        return pagerNumbers;
    };

    return (
        <div className={classJoin(className(option.className.pageList || ''))}>
            {display.showPrevious && currentPage.value <= 1 ? (
                !display.autoHidePrevious && (
                    <ActionButtonDisabled key="prev" option={option} text={lang('pagination.previous')} />
                )
            ) : (
                <ActionButton
                    key="prev"
                    onClick={() => goPage(currentPage.value - 1, 'prev')}
                    option={option}
                    text={lang('pagination.previous')}
                />
            )}
            {display.showPageNumbers && renderPageNumbers()}
            {display.showNext && currentPage.value >= getTotalPage() ? (
                !display.autoHideNext && (
                    <ActionButtonDisabled key="next" option={option} text={lang('pagination.next')} />
                )
            ) : (
                <ActionButton
                    key="next"
                    onClick={() => goPage(currentPage.value + 1, 'next')}
                    option={option}
                    text={lang('pagination.next')}
                />
            )}
        </div>
    );
});
