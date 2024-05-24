import Utils from './module/utils-ext';
import { IPaginator } from './interface/IPaginator';
import { Options, PageData, SendFormDataOptions } from './interface/interfaces';
import { PaginatorEvents, InternalEvents } from './interface/events';
import { DataSource } from './type/types';
import { defaults } from './module/config';
import { h, render as renderVNode, VNode, JSX } from 'preact';
import './style/paginator.css';
import { EventEmitter } from '@carry0987/event-emitter';

class Paginator extends EventEmitter<PaginatorEvents & InternalEvents> implements IPaginator {
    private static version: string = '__version__';
    private static instances: Paginator[] = [];
    private static firstLoad: boolean = true;
    private instanceID: string;
    private options: Options = defaults;
    private pageData: PageData = {
        isAsync: false,
        direction: 0,
        currentPage: 0,
        totalNumber: 0,
        totalPage: 0,
    };
    private container: Element | null = null;
    private element: HTMLElement | null = null;
    private disabled = false;
    private isDynamicTotalNumber: boolean = false;

    constructor(element: string | Element, options: Partial<Options>) {
        super();
        this.instanceID = Utils.generateRandom(6);
        this.container = Utils.isString(element) ? Utils.getElem(element) : element;
        this.initialize(options).then((ele: HTMLElement) => {
            this.bindEvents();
            this.observer();
            this.emit('afterInit', ele);
            this.initPageTrigger();
        });

        // Show the version number on first load
        Paginator.instances.push(this);
        if (Paginator.instances.length === 1 && Paginator.firstLoad === true) {
            console.log(`Paginator is loaded, version: ${Paginator.version}`);
        }

        // Set firstLoad flag to false
        Paginator.firstLoad = false;

        return this;
    }

    private async initialize(options: Partial<Options>): Promise<HTMLElement> {
        this.options = Utils.deepMerge<Options>({} as Options, defaults, options);
        // parseDataSource is now an async function
        const dataSource = await this.parseDataSource(this.options.dataSource);

        // Handle async and dynamic total numbers directly
        this.pageData.isAsync = Utils.isString(dataSource);
        this.pageData.totalNumber = Utils.isArray(dataSource) ? dataSource.length : 0;
        this.isDynamicTotalNumber = Utils.isFunction(this.options.totalNumberLocator) && this.pageData.isAsync;
        const ele = this.renderHTML(true);

        // Add custom className to the element if provided
        if (this.options.className) {
            ele.classList.add(this.options.className);
        }

        return ele;
    }

    private async parseDataSource(dataSource: DataSource): Promise<DataSource> {
        return new Promise<DataSource>((resolve, reject) => {
            if (Utils.isObject(dataSource)) {
                resolve(this.options.dataSource = this.filterDataWithLocator<typeof dataSource>(dataSource));
            } else if (Utils.isArray(dataSource)) {
                resolve(this.options.dataSource = dataSource);
            } else if (Utils.isFunction(dataSource)) {
                if (!Utils.isFunction(this.options.dataSource)) {
                    reject('The type of "dataSource" is a Function, but "options.dataSource" is not a Function.');
                    return;
                }
                this.options.dataSource((data: DataSource) => {
                    if (!Utils.isArray(data)) {
                        reject('The parameter of "done" Function should be an Array.');
                    }
                    this.parseDataSource(data).then(resolve).catch(reject);
                });
            } else if (Utils.isString(dataSource)) {
                if (!/^https?|file:/.test(dataSource)) {
                    dataSource = new URL(dataSource, window.location.href);
                    dataSource = dataSource.toString();
                }
                resolve(dataSource);
            } else {
                reject('Unexpected dataSource type');
            }
        });
    }

    private async initPageTrigger(): Promise<void> {
        // Trigger paging if needed
        let defaultPageNumber = this.pageData.currentPage || this.options.pageNumber;
        const element = this.element;
        if (!element) return;
        if (this.isDynamicTotalNumber && this.options.resetPageNumberOnInit) {
            defaultPageNumber = 1;
        }
        if (this.options.triggerPagingOnInit) {
            this.emit('go', Math.min(defaultPageNumber, Math.max(this.getTotalPage(), 1)));
        }
    }

    private renderHTML(isBoot: boolean = false): HTMLElement {
        const options = this.options;
        const totalPage = this.getTotalPage();

        if (isBoot) {
            const ele = document.createElement('div');
            ele.className = 'paginator';
            ele.dataset.instanceId = this.instanceID;
            if (options.className) {
                ele.classList.add(options.className);
            }

            if (this.container) {
                if (options.position === 'bottom') {
                    this.container.appendChild(ele);
                } else {
                    this.container.insertBefore(ele, this.container.firstChild);
                }
            }
            this.element = ele;
        }

        const ele = this.element!;
        this.emit('beforeRender', isBoot !== true);

        const currentPage = this.pageData.currentPage || options.pageNumber;
        const pageRange = options.pageRange || 0;
        let rangeStart = currentPage - pageRange;
        let rangeEnd = currentPage + pageRange;

        if (rangeEnd > totalPage) {
            rangeEnd = totalPage;
            rangeStart = totalPage - pageRange * 2;
            rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        if (rangeStart <= 1) {
            rangeStart = 1;
            rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        const paginator = this.generateHTML(currentPage, rangeStart, rangeEnd);

        renderVNode(paginator, ele);

        if (options.hideOnlyOnePage && totalPage <= 1) {
            this.element!.style.display = 'none';
        } else {
            this.element!.style.display = '';
        }

        this.emit('afterRender', isBoot !== true);

        return ele;
    }

    private renderData(dataList: DataSource<Array<any>>, pageNumber: number, customCallback?: () => void) {
        this.emit('beforePaging', pageNumber);

        // Paginator direction
        this.pageData.direction = (pageNumber > this.pageData.currentPage) ? 1 : -1;
        this.pageData.currentPage = pageNumber;

        // Render the HTML
        this.renderHTML();

        if (this.disabled && this.pageData.isAsync) {
            this.enable();
        }

        // Format result data before callback invoked
        if (typeof this.options.formatResult === 'function') {
            let cloneData = Utils.deepMerge<typeof dataList>([], dataList);
            if (!Utils.isArray(dataList = this.options.formatResult(cloneData))) {
                dataList = cloneData;
            }
        }

        this.doCallback(dataList, customCallback);
        this.emit('afterPaging', pageNumber);
        if (pageNumber === 1) {
            this.emit('afterIsFirstPage');
        } else if (pageNumber === this.getTotalPage()) {
            this.emit('afterIsLastPage');
        }
    }

    private doCallback(data: any, customCallback?: (data: any, model: any) => void) {
        if (typeof customCallback === 'function') {
            customCallback(data, this.pageData);
        } else if (typeof this.options.callback === 'function') {
            this.options.callback(data, this);
        }
    }

    private observer(): void {
        const ele = this.element;
        if (!ele) return;

        ele.addEventListener('click', async (event) => {
            let target = event.target as HTMLElement;
            if (!Utils.isPageItem(target)) {
                const parent = Utils.hasParent<HTMLElement>(target, 'li', 5, true);
                if (!parent) return;
                target = parent;
            }

            const pageNumber = target.getAttribute('data-num');

            if (target.classList.contains('J-paginator-page') && pageNumber) {
                this.emit('beforePageOnClick', event, pageNumber);
                this.emit('go', parseInt(pageNumber, 10));
                this.emit('afterPageOnClick', event, pageNumber);
            }

            if (target.classList.contains('J-paginator-previous') && pageNumber) {
                this.emit('beforePreviousOnClick', event, pageNumber);
                this.emit('go', parseInt(pageNumber, 10));
                this.emit('afterPreviousOnClick', event, pageNumber);
            }

            if (target.classList.contains('J-paginator-next') && pageNumber) {
                this.emit('beforeNextOnClick', event, pageNumber);
                this.emit('go', parseInt(pageNumber, 10));
                this.emit('afterNextOnClick', event, pageNumber);
            }

            if (target.classList.contains('J-paginator-go-button')) {
                const input = Utils.getElem<HTMLInputElement>('.J-paginator-go-pagenumber');
                if (!input) return;
                const pageno = input.value;

                this.emit('beforeGoButtonOnClick', event, pageno)
                this.emit('go', parseInt(pageno, 10));
                this.emit('afterGoButtonOnClick', event, pageno);
            }

            if (target.classList.contains('J-paginator-size-select')) {
                const size = parseInt((target as HTMLSelectElement).value, 10);
                const currentPage = this.pageData.currentPage || this.options.pageNumber;

                this.emit('beforeSizeSelectorChange', event, size);
                this.options.pageSize = size;
                this.pageData.currentPage = size;
                this.pageData.totalPage = this.getTotalPage();
                if (currentPage > this.pageData.totalPage) {
                    this.pageData.currentPage = this.pageData.totalPage;
                }
                this.emit('go', this.pageData.currentPage);
                this.emit('afterSizeSelectorChange', event, size);
            }
        });
    }

    private getPagingData(pageNumber: number): DataSource<Array<any>> {
        const dataSource = this.options.dataSource;
        const pageSize = this.options.pageSize || 0;
        const totalNumber = this.getTotalNumber();
        const start = pageSize * (pageNumber - 1) + 1;
        const end = Math.min(pageNumber * pageSize, totalNumber);

        return Utils.isArray(dataSource) ? dataSource.slice(start - 1, end) : [];
    }

    private getTotalNumber(): number {
        return this.pageData.totalNumber || this.options.totalNumber || 0;
    }

    private getTotalPage(): number {
        const pageSize = this.options.pageSize || 0;

        return Math.ceil(this.getTotalNumber() / pageSize);
    }

    private getLocator(locator: string | Function): string {
        let result;

        if (typeof locator === 'string') {
            result = locator;
        } else if (typeof locator === 'function') {
            result = locator();
        } else {
            Utils.throwError('"locator" is incorrect. Expect string or function type.');
        }

        return result;
    }

    // Filter data with locator
    private filterDataWithLocator<T = unknown>(dataSource: DataSource): DataSource<T> {
        const locator = this.getLocator(this.options.locator);
        let filteredData: any = dataSource;

        if (!Utils.isString(locator)) {
            Utils.throwError('locator is incorrect. Expect string type.');
        }

        // Datasource is an Object, use locator to locate available data
        if (Utils.isObject(dataSource)) {
            try {
                const locatorArr = locator.split('.');
                locatorArr.forEach(key => {
                    filteredData = filteredData[key];
                });

                if (!Utils.isArray(filteredData)) {
                    Utils.throwError('dataSource.' + locator + ' should be an Array.');
                }
            } catch (e: unknown) {
                Utils.throwError(`Error accessing dataSource.${locator}: ${e}`);
            }
        }

        return filteredData;
    }

    private bindEvents() {
        this.on('go', async (pageNumber, done) => await this.go(pageNumber, done));
        this.on('previous', async (done) => await this.previous(done));
        this.on('next', async (done) => await this.next(done));
        this.on('disable', () => this.disable());
        this.on('enable', () => this.enable());
        this.on('show', () => this.show());
        this.on('hide', () => this.hide());
        this.on('destroy', () => this.destroy());
    }

    private unbindEvents() {
        this.off('go', async (pageNumber, done) => await this.go(pageNumber, done));
        this.off('previous', async (done) => await this.previous(done));
        this.off('next', async (done) => await this.next(done));
        this.off('disable', () => this.disable());
        this.off('enable', () => this.enable());
        this.off('show', () => this.show());
        this.off('hide', () => this.hide());
        this.off('destroy', () => this.destroy());
    }

    private getPageLinkTag(index: number): JSX.Element {
        const pageLink = this.options.pageLink;

        return pageLink
            ? h('a', { href: pageLink }, index)
            : h('a', null, index);
    }

    private generatePageNumbersHTML(args: { currentPage: number; rangeStart: number; rangeEnd: number; }): VNode[] {
        const options = this.options;
        const currentPage = args.currentPage;
        const totalPage = this.getTotalPage();
        const rangeStart = args.rangeStart;
        const rangeEnd = args.rangeEnd;
        const getPageLinkTag = this.getPageLinkTag.bind(this);
        const ellipsisText = options.ellipsisText;
        const classPrefix = options.classPrefix;
        const pageClassName = options.pageClassName || '';
        const activeClassName = options.activeClassName || '';
        const disableClassName = options.disableClassName || '';
        const pages: VNode[] = [];

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
                } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: ellipsisText } }))
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
                } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: ellipsisText } }))
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
    }

    private generateHTML(currentPage: number, rangeStart: number, rangeEnd: number) {
        const options = this.options;
        const totalPage = this.getTotalPage();
        const totalNumber = this.getTotalNumber();
        const pageSize = options.pageSize || 0;
        const prevText = options.prevText;
        const nextText = options.nextText;
        const classPrefix = options.classPrefix || '';
        const disableClassName = options.disableClassName || '';
        const ulClassName = options.ulClassName || '';
        const prevClassName = options.prevClassName || '';
        const nextClassName = options.nextClassName || '';

        const formatNavigator = typeof options.formatNavigator === 'function' ? options.formatNavigator(currentPage, totalPage, totalNumber) : options.formatNavigator;
        const autoHidePrevious = options.autoHidePrevious ?? false;
        const autoHideNext = options.autoHideNext ?? false;
        const header = typeof options.header === 'function' ? options.header(currentPage, totalPage, totalNumber) : options.header;
        const footer = typeof options.footer === 'function' ? options.footer(currentPage, totalPage, totalNumber) : options.footer;
        const pages: VNode[] = [];

        if (options.showPrevious) {
            if (currentPage <= 1) {
                if (!autoHidePrevious) {
                    pages.push(
                        h('li', {
                            class: Utils.composeClassNames(`${classPrefix}-prev`, disableClassName, prevClassName)
                        } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: prevText } }))
                    );
                }
            } else {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-prev`, 'J-paginator-previous', prevClassName),
                        'data-num': currentPage - 1,
                        title: 'Previous page'
                    } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: prevText } }))
                );
            }
        }

        if (options.showPageNumbers) {
            pages.push(...this.generatePageNumbersHTML({
                currentPage: currentPage,
                rangeStart: rangeStart,
                rangeEnd: rangeEnd
            }));
        }

        if (options.showNext) {
            if (currentPage >= totalPage) {
                if (!autoHideNext) {
                    pages.push(
                        h('li', {
                            class: Utils.composeClassNames(`${classPrefix}-next`, disableClassName, nextClassName)
                        } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: nextText } }))
                    );
                }
            } else {
                pages.push(
                    h('li', {
                        class: Utils.composeClassNames(`${classPrefix}-next`, 'J-paginator-next', nextClassName),
                        'data-num': currentPage + 1,
                        title: 'Next page'
                    } as JSX.HTMLAttributes<HTMLLIElement>, h('a', { dangerouslySetInnerHTML: { __html: nextText } }))
                );
            }
        }

        const paginatorElements = [
            header && h('div', {
                class: 'paginator-header',
                dangerouslySetInnerHTML: {
                    __html: this.replaceVariables(header, {
                        currentPage,
                        totalPage,
                        totalNumber
                    })
                }
            }),
            options.showNavigator && formatNavigator && h('div', {
                class: Utils.composeClassNames(`${classPrefix}-nav J-paginator-nav`),
                dangerouslySetInnerHTML: {
                    __html: this.replaceVariables(formatNavigator, {
                        currentPage,
                        totalPage,
                        totalNumber,
                        rangeStart: (currentPage - 1) * pageSize + 1,
                        rangeEnd: Math.min(currentPage * pageSize, totalNumber)
                    })
                }
            }),
            h('div', { class: 'paginator-pages' },
                h('ul', { class: ulClassName }, ...pages)
            ),
            footer && h('div', {
                class: 'paginator-footer',
                dangerouslySetInnerHTML: {
                    __html: this.replaceVariables(footer, {
                        currentPage,
                        totalPage,
                        totalNumber
                    })
                }
            })
        ].filter(Boolean);

        return h('div', { class: 'paginator-container' }, ...paginatorElements);
    }

    private findTotalNumberFromRemoteResponse(response: DataSource<object>) {
        let totalNumber = 0;
        if (!Utils.isFunction(this.options.totalNumberLocator)) return;

        totalNumber = this.options.totalNumberLocator(response);

        if (!Utils.isNumeric(totalNumber)) {
            Utils.throwError('totalNumberLocator should return a number.');
        }

        this.pageData.totalNumber = totalNumber;
    }

    public async go(pageNumber: number, callback?: () => void): Promise<void> {
        if (this.disabled || !this.element) return;

        pageNumber = parseInt(pageNumber as any, 10);
        if (!pageNumber || pageNumber < 1) return;

        const pageSize = this.options.pageSize;
        const totalNumber = this.getTotalNumber();
        const totalPage = this.getTotalPage();

        if (totalNumber > 0 && pageNumber > totalPage) return;

        if (!this.pageData.isAsync) {
            this.renderData(this.getPagingData(pageNumber), pageNumber, callback);
            return;
        }

        const postData: Record<string, any> = {};
        const alias = this.options.alias || {};
        const pageSizeName = alias.pageSize || 'pageSize';
        const pageNumberName = alias.pageNumber || 'pageNumber';
        postData[pageSizeName] = pageSize;
        postData[pageNumberName] = pageNumber;

        const dataLoader = Utils.isFunction(this.options.dataLoader) ? this.options.dataLoader() : this.options.dataLoader;

        if (dataLoader && dataLoader.pageNumberStartWithZero) {
            postData[pageNumberName] = pageNumber - 1;
        }

        const fetchOptions: SendFormDataOptions = {
            url: this.options.dataSource as string,
            method: dataLoader?.method,
            data: dataLoader?.data ? 
                typeof dataLoader.data === 'function' 
                ? await dataLoader.data(dataLoader) 
                : Utils.deepMerge({}, dataLoader?.data, postData) 
                : postData,
            headers: dataLoader?.headers,
            mode: dataLoader?.mode,
            cache: dataLoader?.cache,
            credentials: dataLoader?.credentials || 'same-origin',
            beforeSend: () => {
                this.disable();
                if (dataLoader?.beforeSend) dataLoader.beforeSend(dataLoader);
            },
            success: (response: DataSource<object>) => {
                if (this.isDynamicTotalNumber) {
                    this.findTotalNumberFromRemoteResponse(response);
                } else {
                    this.pageData.totalNumber = this.options.totalNumber;
                }
                const finalData = this.filterDataWithLocator<Array<any>>(response);
                this.renderData(finalData, pageNumber, callback);
                this.enable();
            },
            errorCallback: (error: any) => {
                if (typeof this.options.onError === 'function') {
                    this.options.onError(error);
                } else {
                    throw error;
                }
                this.enable();
            },
        };

        if (Utils.isFunction(this.options.dataLoaderFunction)) {
            this.options.dataLoaderFunction(this);
        } else {
            await Utils.fetchData(fetchOptions);
        }
    }

    public destroy() {
        this.emit('beforeDestroy');

        // Remove the element and clear any content within the container
        if (this.element) {
            this.element.remove();
            this.element = null;
        }

        if (this.container) {
            this.container.innerHTML = '';
        }

        // Unbind events and clean up
        this.unbindEvents();
        Paginator.instances = Paginator.instances.filter(instance => instance !== this); // Remove this instance
        this.emit('afterDestroy');
    }

    public async previous(callback?: () => void) {
        if (this.pageData.currentPage > 1) {
            this.emit('go', this.pageData.currentPage - 1, callback);
        }
    }

    public async next(callback?: () => void) {
        if (this.pageData.currentPage < this.getTotalPage()) {
            this.emit('go', this.pageData.currentPage + 1, callback);
        }
    }

    public disable() {
        const source = this.pageData.isAsync ? 'async' : 'sync';
        this.emit('beforeDisable', source);
        this.disabled = true;
        this.emit('afterDisable', source);
    }

    public enable() {
        const source = this.pageData.isAsync ? 'async' : 'sync';
        this.emit('beforeEnable', source);
        this.disabled = false;
        this.emit('afterEnable', source);
    }

    public show() {
        if (this.element && this.element.style.display === 'none') {
            this.element.style.display = '';
        }
    }

    public hide() {
        if (this.element && this.element.style.display !== 'none') {
            this.element.style.display = 'none';
        }
    }

    private replaceVariables(template: string, variables: Record<string, any>): string {
        let formattedString = template;

        for (const key in variables) {
            const value = variables[key];
            const regexp = new RegExp(`<%=\\s*${key}\\s*%>`, 'img');
            formattedString = formattedString.replace(regexp, value);
        }

        return formattedString;
    }

    public get version(): string {
        return Paginator.version;
    }
}

export { Paginator as default };
export * from './interface/interfaces';
export { IPaginator } from './interface/IPaginator';
