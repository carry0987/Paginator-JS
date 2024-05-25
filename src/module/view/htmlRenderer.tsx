import { h, Fragment, JSX, VNode } from 'preact';
import Utils from '../utils/utils-ext';
import { GenerateHTMLProps } from '../../interface/view';
import { HTMLElement } from './htmlElement';

const HTMLRenderer = ({
    currentPage,
    rangeStart,
    rangeEnd,
    totalPage,
    options
}: GenerateHTMLProps): VNode[] => {
    const getPageLinkTag = (index: number): JSX.Element => {
        const pageLink = options.pageLink;
        return pageLink
            ? h('a', { href: pageLink }, index)
            : h('a', null, index);
    };

    const generatePageNumbers = (): VNode[] => {
        const pages: VNode[] = [];
        const ellipsisText = options.ellipsisText;
        const classPrefix = options.classPrefix;
        const pageClassName = options.pageClassName || '';
        const activeClassName = options.activeClassName || '';
        const disableClassName = options.disableClassName || '';

        if (options.pageRange === null) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                        'data-num': i.toString()
                    } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(i))
                );
            }
            return pages;
        }

        if (rangeStart <= 3) {
            for (let i = 1; i < rangeStart; i++) {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                        'data-num': i.toString()
                    } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(i))
                );
            }
        } else {
            if (!options.hideFirstOnEllipsisShow) {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-page`, `${classPrefix}-first`, 'J-paginator-page', pageClassName),
                        'data-num': '1'
                    } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(1))
                );
            }
            pages.push(
                h('li', {
                    class: Utils.composeClassNames(`${classPrefix}-ellipsis`, disableClassName)
                } as JSX.HTMLAttributes<HTMLLIElement>, HTMLElement({ content: ellipsisText, parentElement: 'a' }))
            );
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(
                h('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                    'data-num': i.toString()
                } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(i))
            );
        }

        if (rangeEnd >= totalPage - 2) {
            for (let i = rangeEnd + 1; i <= totalPage; i++) {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName),
                        'data-num': i.toString()
                    } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(i))
                );
            }
        } else {
            pages.push(
                h('li', {
                    class: Utils.composeClassNames(`${classPrefix}-ellipsis`, disableClassName)
                } as JSX.HTMLAttributes<HTMLLIElement>, HTMLElement({ content: ellipsisText, parentElement: 'a' }))
            );

            if (!options.hideLastOnEllipsisShow) {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-page`, `${classPrefix}-last`, 'J-paginator-page', pageClassName),
                        'data-num': totalPage.toString()
                    } as JSX.HTMLAttributes<HTMLLIElement>, getPageLinkTag(totalPage))
                );
            }
        }

        return pages;
    };

    return generatePageNumbers();
};

export default HTMLRenderer;
