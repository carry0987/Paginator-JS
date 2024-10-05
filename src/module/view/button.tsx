import { classJoin, className } from '@/module/utils/className';
import { PageButtonProps, EllipsisButtonProps, ActionButtonProps } from '@/type/page';
import { h } from 'preact';

export const PageButton = ({ page, isActive, onClick, option, lang, text }: PageButtonProps): h.JSX.Element => (
    <button
        key={`page-${page}`}
        tabIndex={0}
        role="button"
        type="button"
        onClick={onClick}
        className={classJoin(
            isActive ? classJoin(className('currentPage'), option.className.active) : '',
            option.className.pageButton
        )}
        title={text || lang('pagination.page', page)}
        aria-label={text || lang('pagination.page', page)}>
        {lang(`${page}`)}
    </button>
);

export const EllipsisButton = ({ key, option, lang }: EllipsisButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={-1}
        disabled={true}
        className={classJoin(className('spread'), option.className.pageButton, option.className.disable)}>
        {lang('pagination.ellipsis')}
    </button>
);

export const ActionButton = ({ key, onClick, option, text }: ActionButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={0}
        role="button"
        type="button"
        onClick={onClick}
        className={classJoin(
            option.className.pageButton,
            key === 'prev' ? option.className.prevButton : option.className.nextButton
        )}
        title={text}
        aria-label={text}>
        {text}
    </button>
);

export const ActionButtonDisabled = ({ key, option, text }: ActionButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={-1}
        disabled={true}
        className={classJoin(
            className('disabled'),
            option.className.pageButton,
            key === 'prev' ? option.className.prevButton : option.className.nextButton,
            option.className.disable
        )}
        title={text}
        aria-label={text}>
        {text}
    </button>
);
