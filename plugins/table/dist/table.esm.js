import { pluginAPI, pluginUtil, PluginPosition } from '@carry0987/paginator';

var l;l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},"function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout;

var f=0;function u(e,t,n,o,i,u){t||(t={});var a,c,l$1=t;"ref"in t&&(a=t.ref,delete t.ref);var p={type:e,props:l$1,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a)void 0===l$1[c]&&(l$1[c]=a[c]);return l.vnode&&l.vnode(p),p}

function TD(props) {
    const config = pluginAPI.useConfig();
    const content = () => {
        if (props.column && typeof props.column.formatter === 'function') {
            return props.column.formatter(props.cell.data, props.row, props.column);
        }
        if (props.column && props.column.plugin) {
            return (u(pluginUtil.PluginRenderer, { pluginId: props.column.id, props: {
                    column: props.column,
                    cell: props.cell,
                    row: props.row
                } }));
        }
        return props.cell.data;
    };
    const handleClick = (e) => {
        if (props.messageCell)
            return;
        config.eventEmitter.emit('cellClick', e, props.cell, props.column, props.row);
    };
    return (u("td", { role: props.role, colSpan: props.colSpan, "data-column-id": props.column && props.column.id, className: pluginUtil.classJoin(pluginUtil.className('td')), style: {
            ...props.style
        }, onClick: handleClick, children: content() }));
}

function TR(props) {
    const config = pluginAPI.useConfig();
    const header = pluginAPI.useSelector((state) => state.header);
    const getColumn = (cellIndex) => {
        if (header) {
            const cols = pluginUtil.leafColumns(header.columns);
            if (cols[cellIndex]) {
                return cols[cellIndex];
            }
        }
        return null;
    };
    const getChildren = () => {
        if (props.children) {
            return props.children;
        }
        return props.row.cells.map((cell, i) => {
            const column = getColumn(i);
            if (column && column.hidden)
                return null;
            return u(TD, { cell: cell, row: props.row, column: column }, cell.id);
        });
    };
    const handleClick = (e) => {
        if (props.messageRow)
            return;
        config.eventEmitter.emit('rowClick', e, props.row);
    };
    return (u("tr", { className: pluginUtil.classJoin(pluginUtil.className('tr')), onClick: handleClick, children: getChildren() }));
}

function TH(props) {
    const thRef = pluginAPI.useRef(null);
    const onClick = (e) => {
        e.stopPropagation();
    };
    const content = () => {
        if (props.column.name !== undefined) {
            return props.column.name;
        }
        if (props.column.plugin !== undefined) {
            return (u(pluginUtil.PluginRenderer, { pluginId: props.column.plugin.id, props: {
                    column: props.column
                } }));
        }
        return null;
    };
    return (u("th", { ref: thRef, "data-column-id": props.column && props.column.id, className: pluginUtil.classJoin(pluginUtil.className('th')), onClick: onClick, style: {
            ...{
                minWidth: props.column.minWidth,
                width: props.column.width
            },
            ...props.style
        }, rowSpan: typeof props.rowSpan === 'number' && props.rowSpan > 1 ? props.rowSpan : undefined, colSpan: typeof props.colSpan === 'number' && props.colSpan > 1 ? props.colSpan : undefined, children: u("div", { className: pluginUtil.className('th', 'content'), children: content() }) }));
}

function calculateRowColSpans(column, rowIndex, totalRows) {
    const depth = column.length - 1;
    const remainingRows = totalRows - rowIndex;
    const rowSpan = Math.floor(remainingRows - depth - depth / remainingRows);
    const colSpan = (column.columns && column.columns.length) || 1;
    return {
        rowSpan: rowSpan,
        colSpan: colSpan
    };
}
function THead() {
    const header = pluginAPI.useSelector((state) => state.header);
    const renderColumn = (column, rowIndex, columnIndex, totalRows) => {
        const { rowSpan, colSpan } = calculateRowColSpans(column, rowIndex, totalRows);
        return u(TH, { column: column, index: columnIndex, colSpan: colSpan, rowSpan: rowSpan });
    };
    const renderRow = (row, rowIndex, totalRows) => {
        if (!header)
            return null;
        const leafColumns = pluginUtil.leafColumns(header.columns);
        return (u(TR, { children: row.map((col) => {
                if (col.hidden)
                    return null;
                return renderColumn(col, rowIndex, leafColumns.indexOf(col), totalRows);
            }) }));
    };
    const renderRows = () => {
        const rows = pluginUtil.tabularFormat(header?.columns || []);
        return rows.map((row, rowIndex) => renderRow(row, rowIndex, rows.length));
    };
    if (header) {
        return (u("thead", { className: pluginUtil.classJoin(pluginUtil.className('thead')), children: renderRows() }, header.id));
    }
    return null;
}

function MessageRow(props) {
    return (u(TR, { messageRow: true, children: u(TD, { role: "alert", colSpan: props.colSpan, messageCell: true, cell: {
                data: props.message
            }, className: pluginUtil.classJoin(pluginUtil.className('message'), props.className ? props.className : null) }) }));
}

function TBody() {
    const Status = pluginUtil.Status;
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const status = pluginAPI.useSelector((state) => state.status);
    const header = pluginAPI.useSelector((state) => state.header);
    const lang = pluginAPI.useTranslator();
    const data = tabular?.data;
    const headerLength = () => {
        if (header) {
            return header.visibleColumns.length;
        }
        return 0;
    };
    return (u("tbody", { className: pluginUtil.classJoin(pluginUtil.className('tbody')), children: [tabular &&
                tabular.data.map((row) => {
                    return u(TR, { row: row }, row.id);
                }), status === Status.Loading && (!data || data.length === 0) && (u(MessageRow, { message: lang('loading'), colSpan: headerLength(), className: pluginUtil.classJoin(pluginUtil.className('loading')) })), status === Status.Rendered && data && data.length === 0 && (u(MessageRow, { message: lang('noRecordsFound'), colSpan: headerLength(), className: pluginUtil.classJoin(pluginUtil.className('notfound')) })), status === Status.Error && (u(MessageRow, { message: lang('error'), colSpan: headerLength(), className: pluginUtil.classJoin(pluginUtil.className('error')) }))] }));
}

const SetTableRef = (tableRef) => (state) => {
    return {
        ...state,
        tableRef: tableRef
    };
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root{--paginatorjs-table-background:#fff;--paginatorjs-table-border:#e5e7eb;--paginatorjs-th-background:#f9fafb;--paginatorjs-th-color:#6b7280;--paginatorjs-td-background:#fff;--paginatorjs-td-color:#3d4044}@media (prefers-color-scheme:dark){:root{--paginatorjs-table-background:#121212;--paginatorjs-table-border:#373737;--paginatorjs-th-background:#1f1f1f;--paginatorjs-th-color:#c4c4c4;--paginatorjs-td-background:#121212;--paginatorjs-td-color:#bcc7d2}}html[data-theme=dark]{--paginatorjs-table-background:#121212;--paginatorjs-table-border:#373737;--paginatorjs-th-background:#1f1f1f;--paginatorjs-th-color:#c4c4c4;--paginatorjs-td-background:#121212;--paginatorjs-td-color:#bcc7d2}table.paginatorjs-plugin-table{border-collapse:collapse;display:table;margin:0;max-width:100%;overflow:auto;padding:0;table-layout:fixed;text-align:left;width:100%}.paginatorjs-plugin-tbody{box-sizing:border-box}td.paginatorjs-plugin-td{background-color:var(--paginatorjs-td-background);border:1px solid var(--paginatorjs-table-border);box-sizing:content-box;color:var(--paginatorjs-td-color);padding:12px 24px}td.paginatorjs-plugin-td:first-child{border-left:none}td.paginatorjs-plugin-td:last-child{border-right:none}td.paginatorjs-plugin-message{text-align:center}th.paginatorjs-plugin-th{background-color:var(--paginatorjs-th-background);border:1px solid var(--paginatorjs-table-border);border-top:none;box-sizing:border-box;color:var(--paginatorjs-th-color);outline:none;padding:14px 24px;position:relative;user-select:none;vertical-align:middle;white-space:nowrap}th.paginatorjs-plugin-th .paginatorjs-th-content{float:left;overflow:hidden;text-overflow:ellipsis;width:100%}th.paginatorjs-plugin-th-sort{cursor:pointer}th.paginatorjs-plugin-th-sort .paginatorjs-th-content{width:calc(100% - 15px)}th.paginatorjs-plugin-th-sort:focus,th.paginatorjs-plugin-th-sort:hover{background-color:#e5e7eb}th.paginatorjs-plugin-th-fixed{box-shadow:0 1px 0 0 #e5e7eb;position:sticky}@supports (-moz-appearance:none){th.paginatorjs-plugin-th-fixed{box-shadow:0 0 0 1px #e5e7eb}}th.paginatorjs-plugin-th:first-child{border-left:none}th.paginatorjs-plugin-th:last-child{border-right:none}.paginatorjs-plugin-tr{border:none}.paginatorjs-plugin-tr-selected td{background-color:#ebf5ff}.paginatorjs-plugin-tr:last-child td{border-bottom:0}.paginatorjs-plugin-thead{box-sizing:border-box}";
styleInject(css_248z);

const Table = () => {
    const tableRef = pluginAPI.useRef(null);
    const { dispatch } = pluginAPI.useStore();
    pluginAPI.useEffect(() => {
        if (tableRef)
            dispatch(SetTableRef(tableRef));
    }, [tableRef]);
    return (u("table", { ref: tableRef, role: "table", className: pluginUtil.classJoin(pluginUtil.className('table')), children: [u(THead, {}), u(TBody, {})] }));
};

const tablePlugin = {
    id: 'tablePlugin',
    component: Table,
    position: PluginPosition.Body,
    order: 1
};

export { Table, tablePlugin };
