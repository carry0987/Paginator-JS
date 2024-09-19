import { classJoin, className } from '@/module/utils/className';
import { PageButtonProps, EllipsisButtonProps, ActionButtonProps } from '@/type/page';
import { h } from 'preact';

export const PageButton = ({ page, isActive, onClick, config, lang, text }: PageButtonProps): h.JSX.Element => (
    <button
        key={`page-${page}`}
        tabIndex={0}
        role="button"
        type="button"
        onClick={onClick}
        className={classJoin(
            isActive ? classJoin(className('currentPage'), config.className.active) : '',
            config.className.pageButton,
        )}
        title={text || lang('pagination.page', page)}
        aria-label={text || lang('pagination.page', page)}>
        {lang(`${page}`)}
    </button>
);

export const EllipsisButton = ({ key, config, lang }: EllipsisButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={-1}
        disabled={true}
        className={classJoin(className('spread'), config.className.pageButton, config.className.disable)}>
        {lang('pagination.ellipsis')}
    </button>
);

export const ActionButton = ({ key, onClick, config, text }: ActionButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={0}
        role="button"
        type="button"
        onClick={onClick}
        className={classJoin(
            config.className.pageButton,
            key === 'prev' ? config.className.prevButton : config.className.nextButton,
        )}
        title={text}
        aria-label={text}>
        {text}
    </button>
);

export const ActionButtonDisabled = ({ key, config, text }: ActionButtonProps): h.JSX.Element => (
    <button
        key={key}
        tabIndex={-1}
        disabled={true}
        className={classJoin(
            className('disabled'),
            config.className.pageButton,
            key === 'prev' ? config.className.prevButton : config.className.nextButton,
            config.className.disable,
        )}
        title={text}
        aria-label={text}>
        {text}
    </button>
);
