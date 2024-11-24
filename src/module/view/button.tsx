import { classJoin, className } from '@/module/utils/className';
import Utils from '@/module/utils/utils-ext';
import { PageButtonProps, EllipsisButtonProps, ActionButtonProps } from '@/type/page';
import { JSX } from 'preact';

export const PageButton = ({ page, isActive, onClick, option, lang, text }: PageButtonProps): JSX.Element => {
    const content = text || lang('pagination.page', page);
    const textString = Utils.isString(content) ? content : '';

    return (
        <button
            tabIndex={0}
            role="button"
            type="button"
            onClick={onClick}
            className={classJoin(
                isActive ? classJoin(className('currentPage'), option.className.active) : '',
                option.className.pageButton
            )}
            title={textString}
            aria-label={textString}>
            {lang(`${page}`)}
        </button>
    );
};

export const EllipsisButton = ({ option, lang }: EllipsisButtonProps): JSX.Element => (
    <button
        tabIndex={-1}
        disabled={true}
        className={classJoin(className('spread'), option.className.pageButton, option.className.disable)}>
        {lang('pagination.ellipsis')}
    </button>
);

export const ActionButton = ({ act, onClick, option, text }: ActionButtonProps): JSX.Element => {
    const textString = Utils.isString(text) ? text : '';

    return (
        <button
            tabIndex={0}
            role="button"
            type="button"
            onClick={onClick}
            className={classJoin(
                option.className.pageButton,
                act === 'prevBtn' ? option.className.prevButton : option.className.nextButton
            )}
            title={textString}
            aria-label={textString}>
            {text}
        </button>
    );
};

export const ActionButtonDisabled = ({ act, option, text }: ActionButtonProps): JSX.Element => {
    const textString = Utils.isString(text) ? text : '';

    return (
        <button
            tabIndex={-1}
            disabled={true}
            className={classJoin(
                className('disabled'),
                option.className.pageButton,
                act === 'prevBtn' ? option.className.prevButton : option.className.nextButton,
                option.className.disable
            )}
            title={textString}
            aria-label={textString}>
            {text}
        </button>
    );
};
