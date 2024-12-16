import { pluginAPI, PluginUtil, PluginPosition } from '@carry0987/paginator';

var l;l={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l;}throw n}},"function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout;

var f=0;function u(e,t,n,o,i,u){t||(t={});var a,c,l$1=t;"ref"in t&&(a=t.ref,delete t.ref);var p={type:e,props:l$1,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a)void 0===l$1[c]&&(l$1[c]=a[c]);return l.vnode&&l.vnode(p),p}

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

var css_248z = ".paginatorjs-plugin-list,.paginatorjs-plugin-list:after,.paginatorjs-plugin-list:before{box-sizing:border-box}.paginatorjs-plugin-list{display:flex;justify-content:center;margin:20px 0 10px}.paginatorjs-plugin-list ul{display:flex;flex-direction:column;list-style:none;padding:0;width:100%}.paginatorjs-plugin-list ul li{background-color:#e7e6e6;border-radius:5px;margin:5px;padding:10px 15px;transition:background-color .3s}.paginatorjs-plugin-list ul li:hover{background-color:#aaa}.paginatorjs-plugin-list ul li.active{background-color:#007bff;color:#fff}";
styleInject(css_248z);

const List = () => {
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const [data, updateData] = pluginAPI.useState(tabular);
    pluginAPI.useEffect(() => {
        if (tabular?.length) {
            updateData(tabular);
        }
    }, [tabular]);
    return (u("div", { class: PluginUtil.className('list'), children: u("ul", { children: data && data.toArray().map((item, index) => u("li", { children: item[0] }, `li-${index}`)) }) }));
};

const listPlugin = {
    id: 'listPlugin',
    component: List,
    position: PluginPosition.Body,
    order: 1
};

export { List, listPlugin };
