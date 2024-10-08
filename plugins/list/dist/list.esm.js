import { pluginAPI, PluginPosition } from '@carry0987/paginator';

var l;l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},"function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout;

var f=0;function u(e,t,n,o,i,u){t||(t={});var a,c,l$1=t;"ref"in t&&(a=t.ref,delete t.ref);var p={type:e,props:l$1,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a)void 0===l$1[c]&&(l$1[c]=a[c]);return l.vnode&&l.vnode(p),p}

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

var css_248z = ".paginatorjs-list, .paginatorjs-list:after, .paginatorjs-list:before {\n  box-sizing: border-box;\n}\n.paginatorjs-list {\n  display: flex;\n  justify-content: center;\n  margin: 20px 0;\n  margin-bottom: 10px;\n}\n.paginatorjs-list ul {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n.paginatorjs-list ul li {\n  margin: 5px;\n  padding: 10px 15px;\n  background-color: #e7e6e6;\n  border-radius: 5px;\n  transition: background-color 0.3s;\n}\n.paginatorjs-list ul li:hover {\n  background-color: #aaaaaa;\n}\n.paginatorjs-list ul li.active {\n  background-color: #007bff;\n  color: white;\n}";
styleInject(css_248z);

const List = () => {
    const tabular = pluginAPI.useSelector((state) => state.tabular);
    const [data, updateData] = pluginAPI.useState(tabular);
    pluginAPI.useEffect(() => {
        if (tabular?.length) {
            updateData(tabular);
        }
    }, [tabular]);
    return (u("div", { class: pluginAPI.className('list'), children: u("ul", { children: data &&
                data.toArray().map((item, index) => u("li", { children: item[0] }, index)) }) }));
};

const listPlugin = {
    id: 'listPlugin',
    component: List,
    position: PluginPosition.Body,
    order: 1
};

export { List, listPlugin };
