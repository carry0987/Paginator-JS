function reportError(...error) {
    console.error(...error);
}
function throwError(message) {
    throw new Error(message);
}

var errorUtils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    reportError: reportError,
    throwError: throwError
});

function getElem(ele, mode, parent) {
    // Return generic Element type or NodeList
    if (typeof ele !== 'string') {
        return ele;
    }
    let searchContext = document;
    if (mode === null && parent) {
        searchContext = parent;
    }
    else if (mode && mode instanceof Node && 'querySelector' in mode) {
        searchContext = mode;
    }
    else if (parent && parent instanceof Node && 'querySelector' in parent) {
        searchContext = parent;
    }
    // If mode is 'all', search for all elements that match, otherwise, search for the first match
    // Casting the result as E or NodeList
    return mode === 'all' ? searchContext.querySelectorAll(ele) : searchContext.querySelector(ele);
}
function hasParent(ele, selector, maxDepth = Infinity, returnElement = false) {
    let parent = ele.parentElement;
    let depth = 0;
    while (parent && depth < maxDepth) {
        if (parent.matches(selector)) {
            return returnElement ? parent : true;
        }
        parent = parent.parentElement;
        depth++;
    }
    return returnElement ? null : false;
}
function isObject(item) {
    return typeof item === 'object' && item !== null && !Array.isArray(item);
}
function isFunction(item) {
    return typeof item === 'function';
}
function isString(item) {
    return typeof item === 'string';
}
function isArray(item) {
    return Array.isArray(item);
}
function isEmpty(str) {
    if (typeof str === 'number') {
        return false;
    }
    return !str || (typeof str === 'string' && str.length === 0);
}
function deepMerge(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (source) {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceKey = key;
                const value = source[sourceKey];
                const targetKey = key;
                if (isObject(value) || isArray(value)) {
                    if (!target[targetKey] || typeof target[targetKey] !== 'object') {
                        target[targetKey] = Array.isArray(value) ? [] : {};
                    }
                    deepMerge(target[targetKey], value);
                }
                else {
                    target[targetKey] = value;
                }
            }
        }
    }
    return deepMerge(target, ...sources);
}
function generateRandom(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}
function setUrlParam(url, params, overwrite = true) {
    const urlObj = new URL(url);
    // Iterate over params object keys and set params
    for (const [paramName, paramValue] of Object.entries(params)) {
        // Convert paramValue to string, as URLSearchParams only accepts strings
        const valueStr = paramValue === null ? '' : String(paramValue);
        // If overwrite is false and param already exists, skip setting it
        if (!overwrite && urlObj.searchParams.has(paramName)) {
            continue;
        }
        // Set the parameter value
        urlObj.searchParams.set(paramName, valueStr);
    }
    return urlObj.toString();
}

function addEventListener(element, eventName, handler, options) {
    element.addEventListener(eventName, handler, options);
}
function removeEventListener(element, eventName, handler, options) {
    element.removeEventListener(eventName, handler, options);
}
function createEvent(eventName, detail, options) {
    return new CustomEvent(eventName, { detail, ...options });
}
function dispatchEvent(eventOrName, element = document, detail, options) {
    try {
        if (typeof eventOrName === 'string') {
            let event = createEvent(eventOrName, detail, options);
            return element.dispatchEvent(event);
        }
        else if (eventOrName instanceof Event) {
            return element.dispatchEvent(eventOrName);
        }
        else {
            throwError('Invalid event type');
        }
    }
    catch (e) {
        reportError('Dispatch Event Error:', e);
        return false;
    }
}

var eventUtils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addEventListener: addEventListener,
    createEvent: createEvent,
    dispatchEvent: dispatchEvent,
    removeEventListener: removeEventListener
});

// Append form data
function appendFormData(options, formData = new FormData()) {
    const { data, parentKey = '' } = options;
    if (data !== null && typeof data === 'object') {
        // Check if it is Blob or File, if so, add directly
        if (data instanceof Blob || data instanceof File) {
            const formKey = parentKey || 'file'; // If no key is specified, the default is 'file'
            formData.append(formKey, data);
        }
        else {
            // Traverse object properties
            Object.keys(data).forEach(key => {
                const value = data[key];
                const formKey = parentKey ? `${parentKey}[${key}]` : key;
                if (value !== null && typeof value === 'object') {
                    // Recursively call to handle nested objects
                    appendFormData({ data: value, parentKey: formKey }, formData);
                }
                else if (value !== null) {
                    // Handle non-empty values, add directly
                    formData.append(formKey, String(value));
                }
            });
        }
    }
    else if (data !== null) {
        // Non-object and non-null values, add directly
        formData.append(parentKey, data);
    }
    // If you don't want to add null values to FormData, you can do nothing here
    // Or if you want to convert null to other forms, you can handle it here
    return formData;
}
// Encode form data before send
function encodeFormData(data, parentKey = '') {
    if (data instanceof FormData) {
        return data;
    }
    const options = {
        data: data,
        parentKey: parentKey
    };
    return appendFormData(options);
}

// Fetch API
async function doFetch(options) {
    const { url, method = 'GET', headers = {}, cache = 'no-cache', mode = 'cors', credentials = 'same-origin', body = null, beforeSend = null, success = null, error = null } = options;
    let requestURL = url;
    let initHeaders = headers instanceof Headers ? headers : new Headers(headers);
    let init = {
        method: method,
        mode: mode,
        headers: initHeaders,
        cache: cache,
        credentials: credentials
    };
    if (body !== null && method.toUpperCase() === 'GET') {
        requestURL = setUrlParam(typeof url === 'string' ? url : url.toString(), body, true);
    }
    else if (body !== null && ['PUT', 'POST', 'DELETE'].includes(method.toUpperCase())) {
        let data = body;
        if (!(body instanceof FormData)) {
            data = JSON.stringify(body);
            if (!(init.headers instanceof Headers)) {
                init.headers = new Headers(init.headers);
            }
            init.headers.append('Content-Type', 'application/json');
        }
        init.body = data;
    }
    // Handle different types of URL
    let request;
    if (typeof requestURL === 'string' || requestURL instanceof URL) {
        request = new Request(requestURL, init);
    }
    else if (requestURL instanceof Request) {
        request = requestURL;
    }
    else {
        throw new Error('Invalid URL type');
    }
    try {
        const createRequest = await new Promise((resolve) => {
            beforeSend?.();
            resolve(request);
        });
        const response = await fetch(createRequest);
        const responseData = await response.json();
        success?.(responseData);
        return responseData;
    }
    catch (caughtError) {
        error?.(caughtError);
        throw caughtError;
    }
}
// Send data
async function sendData(options) {
    const { url, data, method = 'POST', headers, cache, mode, credentials, success, errorCallback, beforeSend, encode = true } = options;
    const fetchOptions = {
        url: url,
        method: method,
        headers: headers,
        cache: cache,
        mode: mode,
        credentials: credentials,
        body: (encode && method.toUpperCase() !== 'GET') ? encodeFormData(data) : data,
        beforeSend: beforeSend,
        success: (responseData) => {
            success?.(responseData);
        },
        error: (caughtError) => {
            errorCallback?.(caughtError);
        }
    };
    return doFetch(fetchOptions);
}
// Send form data
async function sendFormData(options) {
    const { url, data, method = 'POST', headers, cache, mode, credentials, success, errorCallback, beforeSend } = options;
    const fetchOptions = {
        url: url,
        method: method,
        headers: headers,
        cache: cache,
        mode: mode,
        credentials: credentials,
        body: encodeFormData(data),
        beforeSend: beforeSend,
        success: (responseData) => {
            success?.(responseData);
        },
        error: (caughtError) => {
            errorCallback?.(caughtError);
        }
    };
    return doFetch(fetchOptions)
        .then(() => true)
        .catch(() => false);
}
// Alias for sendData
const fetchData = sendData;
// Alias for sendFormData
const sendForm = sendFormData;

var fetchUtils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    doFetch: doFetch,
    fetchData: fetchData,
    sendData: sendData,
    sendForm: sendForm,
    sendFormData: sendFormData
});

class Utils {
    static throwError = errorUtils.throwError;
    static getElem = getElem;
    static hasParent = hasParent;
    static deepMerge = deepMerge;
    static generateRandom = generateRandom;
    static isEmpty = isEmpty;
    static isObject = isObject;
    static isArray = isArray;
    static isString = isString;
    static isFunction = isFunction;
    static createEvent = eventUtils.createEvent;
    static addEventListener = eventUtils.addEventListener;
    static removeEventListener = eventUtils.removeEventListener;
    static dispatchEvent = eventUtils.dispatchEvent;
    static fetchData = fetchUtils.fetchData;
    static isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    static composeClassNames(...classNames) {
        classNames = classNames.filter((className) => !!className); // Remove empty class names
        return classNames.length > 0 ? classNames.join(' ') : '';
    }
    static isPageItem(element) {
        const checkList = ['J-pagination-page', 'J-pagination-previous', 'J-pagination-next'];
        const classList = element.classList;
        for (let i = 0; i < checkList.length; i++) {
            if (classList.contains(checkList[i])) {
                return true;
            }
        }
        return false;
    }
}

const defaults = {
    dataSource: [],
    locator: 'data',
    totalNumber: 0,
    totalNumberLocator: null,
    pageNumber: 1,
    pageSize: 10,
    pageRange: 2,
    alias: {
        pageNumber: 'pageNumber',
        pageSize: 'pageSize',
    },
    showPrevious: true,
    showNext: true,
    showPageNumbers: true,
    showNavigator: false,
    hideFirstOnEllipsisShow: false,
    hideLastOnEllipsisShow: false,
    autoHidePrevious: false,
    autoHideNext: false,
    classPrefix: 'pagination',
    className: '',
    activeClassName: 'active',
    disableClassName: 'disabled',
    ulClassName: '',
    pageClassName: '',
    prevClassName: '',
    nextClassName: '',
    prevText: '&laquo;',
    nextText: '&raquo;',
    ellipsisText: '...',
    goButtonText: 'Go',
    formatNavigator: '{currentPage} of {totalPage}',
    header: '',
    footer: '',
    pageLink: '',
    position: 'bottom',
    formatResult: (data) => data,
    dataLoader: {
        method: 'GET',
        data: {},
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        beforeSend: (pagination) => pagination,
        credentials: 'same-origin',
        pageNumberStartWithZero: false
    },
    triggerPagingOnInit: true,
    resetPageNumberOnInit: false,
    hideOnlyOnePage: false,
    onError: (err) => console.error('Pagination error:', err)
};

var n,l,u,i,o,r,f,e,c,s,h={},p=[],v=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,y=Array.isArray;function d(n,l){for(var u in l)n[u]=l[u];return n}function w(n){var l=n.parentNode;l&&l.removeChild(n);}function _(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return g(l,f,i,o,null)}function g(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u:r,__i:-1,__u:0};return null==r&&null!=l.vnode&&l.vnode(f),f}function k(n){return n.children}function b(n,l){this.props=n,this.context=l;}function x(n,l){if(null==l)return n.__?x(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?x(n):null}function C(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C(n)}}function M(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!P.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||r)(P);}function P(){var n,u,t,o,r,e,c,s;for(i.sort(f);n=i.shift();)n.__d&&(u=i.length,o=void 0,e=(r=(t=n).__v).__e,c=[],s=[],t.__P&&((o=d({},r)).__v=r.__v+1,l.vnode&&l.vnode(o),O(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[e]:null,c,null==e?x(r):e,!!(32&r.__u),s),o.__v=r.__v,o.__.__k[o.__i]=o,j(c,o,s),o.__e!=e&&C(o)),i.length>u&&i.sort(f));P.__r=0;}function S(n,l,u,t,i,o,r,f,e,c,s){var a,v,y,d,w,_=t&&t.__k||p,g=l.length;for(u.__d=e,$(u,l,_),e=u.__d,a=0;a<g;a++)null!=(y=u.__k[a])&&"boolean"!=typeof y&&"function"!=typeof y&&(v=-1===y.__i?h:_[y.__i]||h,y.__i=a,O(n,y,v,i,o,r,f,e,c,s),d=y.__e,y.ref&&v.ref!=y.ref&&(v.ref&&N(v.ref,null,y),s.push(y.ref,y.__c||d,y)),null==w&&null!=d&&(w=d),65536&y.__u||v.__k===y.__k?(e&&!e.isConnected&&(e=x(v)),e=I(y,e,n)):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=w;}function $(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)r=t+a,null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?g(null,i,null,null,null):y(i)?g(k,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?g(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=L(i,u,r,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:f<r?f==r-1&&(a=f-r):a=0,f!==t+a&&(i.__u|=65536))):(o=u[r])&&null==o.key&&o.__e&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=x(o)),V(o,o,!1),u[r]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=x(o)),V(o,o));}function I(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=I(t[i],l,u));return l}n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8===l.nodeType);return l}function L(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type&&0==(131072&e.__u))return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++;}}return -1}function T(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||v.test(l)?u:u+"px";}function A(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||T(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/i,"$1")),l=l.toLowerCase()in n||"onFocusOut"===l||"onFocusIn"===l?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=e,n.addEventListener(l,o?s:c,o)):n.removeEventListener(l,o?s:c,o);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function F(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=e++;else if(u.t<t.u)return;return t(l.event?l.event(u):u)}}}function O(n,u,t,i,o,r,f,e,c,s){var a,h,p,v,w,_,g,m,x,C,M,P,$,I,H,L=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof L)try{if(m=u.props,x=(a=L.contextType)&&i[a.__c],C=a?x?x.props.value:a.__:i,t.__c?g=(h=u.__c=t.__c).__=h.__E:("prototype"in L&&L.prototype.render?u.__c=h=new L(m,C):(u.__c=h=new b(m,C),h.constructor=L,h.render=q),x&&x.sub(h),h.props=m,h.state||(h.state={}),h.context=C,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),null==h.__s&&(h.__s=h.state),null!=L.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d({},h.__s)),d(h.__s,L.getDerivedStateFromProps(m,h.__s))),v=h.props,w=h.state,h.__v=u,p)null==L.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==L.getDerivedStateFromProps&&m!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,C),!h.__e&&(null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,C)||u.__v===t.__v)){for(u.__v!==t.__v&&(h.props=m,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),M=0;M<h._sb.length;M++)h.__h.push(h._sb[M]);h._sb=[],h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,C),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,w,_);});}if(h.context=C,h.props=m,h.__P=n,h.__e=!1,P=l.__r,$=0,"prototype"in L&&L.prototype.render){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),I=0;I<h._sb.length;I++)h.__h.push(h._sb[I]);h._sb=[];}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++$<25);h.state=h.__s,null!=h.getChildContext&&(i=d(d({},i),h.getChildContext())),p||null==h.getSnapshotBeforeUpdate||(_=h.getSnapshotBeforeUpdate(v,w)),S(n,y(H=null!=a&&a.type===k&&null==a.key?a.props.children:a)?H:[H],u,t,i,o,r,f,e,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&f.push(h),g&&(h.__E=h.__=null);}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=z(t.__e,u,t,i,o,r,f,c,s);(a=l.diffed)&&a(u);}function j(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)N(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l.__e(n,u.__v);}});}function z(l,u,t,i,o,r,f,e,c){var s,a,p,v,d,_,g,m=t.props,k=u.props,b=u.type;if("svg"===b?o="http://www.w3.org/2000/svg":"math"===b?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=r)for(s=0;s<r.length;s++)if((d=r[s])&&"setAttribute"in d==!!b&&(b?d.localName===b:3===d.nodeType)){l=d,r[s]=null;break}if(null==l){if(null===b)return document.createTextNode(k);l=document.createElementNS(o,b,k.is&&k),r=null,e=!1;}if(null===b)m===k||e&&l.data===k||(l.data=k);else {if(r=r&&n.call(l.childNodes),m=t.props||h,!e&&null!=r)for(m={},s=0;s<l.attributes.length;s++)m[(d=l.attributes[s]).name]=d.value;for(s in m)if(d=m[s],"children"==s);else if("dangerouslySetInnerHTML"==s)p=d;else if("key"!==s&&!(s in k)){if("value"==s&&"defaultValue"in k||"checked"==s&&"defaultChecked"in k)continue;A(l,s,null,d,o);}for(s in k)d=k[s],"children"==s?v=d:"dangerouslySetInnerHTML"==s?a=d:"value"==s?_=d:"checked"==s?g=d:"key"===s||e&&"function"!=typeof d||m[s]===d||A(l,s,d,m[s],o);if(a)e||p&&(a.__html===p.__html||a.__html===l.innerHTML)||(l.innerHTML=a.__html),u.__k=[];else if(p&&(l.innerHTML=""),S(l,y(v)?v:[v],u,t,i,"foreignObject"===b?"http://www.w3.org/1999/xhtml":o,r,f,r?r[0]:t.__k&&x(t,0),e,c),null!=r)for(s=r.length;s--;)null!=r[s]&&w(r[s]);e||(s="value",void 0!==_&&(_!==l[s]||"progress"===b&&!_||"option"===b&&_!==m[s])&&A(l,s,_,m[s],o),s="checked",void 0!==g&&g!==l[s]&&A(l,s,g,m[s],o));}return l}function N(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l.__e(n,t);}}function V(n,u,t){var i,o;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&V(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||w(n.__e),n.__c=n.__=n.__e=n.__d=void 0;}function q(n,l,u){return this.constructor(n,u)}function B(u,t,i){var o,r,f,e;l.__&&l.__(u,t),r=(o="function"==typeof i)?null:t.__k,f=[],e=[],O(t,u=(!o&&i||t).__k=_(k,null,[u]),r||h,h,t.namespaceURI,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),j(f,u,e);}n=p.slice,l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u=0,b.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d({},this.state),"function"==typeof n&&(n=n(d({},u),this.props)),n&&d(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this));},b.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),M(this));},b.prototype.render=k,i=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(n,l){return n.__v.__b-l.__v.__b},P.__r=0,e=0,c=F(!1),s=F(!0);

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

var css_248z = ".paginator {\n    display: flex;\n    line-height: 1.6;\n    font-family: Arial, sans-serif;\n    font-size: 14px;\n    box-sizing: initial;\n}\n\n.paginator:after {\n    display: table;\n    content: \" \";\n    clear: both;\n}\n\n.paginator .paginator-pages {\n    float: left;\n    margin-left: 10px;\n}\n\n.paginator .paginator-pages ul {\n    float: left;\n    margin: 0;\n    padding: 0;\n}\n\n.paginator .paginator-go-button,\n.paginator .paginator-go-input,\n.paginator .paginator-size-changer {\n    margin-left: 10px;\n    float: left;\n    font-size: 14px;\n}\n\n.paginator .paginator-pages li {\n    float: left;\n    border: 1px solid #aaa;\n    border-right: none;\n    list-style: none;\n}\n\n.paginator .paginator-pages li > a {\n    min-width: 30px;\n    height: 28px;\n    line-height: 28px;\n    display: block;\n    background: #fff;\n    font-size: 14px;\n    color: #333;\n    text-decoration: none;\n    text-align: center;\n    cursor: pointer;\n}\n\n.paginator .paginator-pages li > a:hover {\n    background: #eee\n}\n\n.paginator .paginator-pages li.active {\n    border: none;\n}\n\n.paginator .paginator-pages li.active > a {\n    height: 30px;\n    line-height: 30px;\n    background: #aaa;\n    color: #fff;\n    cursor: default;\n}\n\n.paginator .paginator-pages li.disabled > a {\n    opacity: .3;\n    cursor: default;\n}\n\n.paginator .paginator-pages li.disabled > a:hover {\n    background: 0 0;\n}\n\n.paginator .paginator-pages li:first-child,\n.paginator .paginator-pages li:first-child > a {\n    border-radius: 3px 0 0 3px;\n}\n\n.paginator .paginator-pages li:last-child {\n    border-right: 1px solid #aaa;\n    border-radius: 0 3px 3px 0;\n}\n\n.paginator .paginator-pages li:last-child > a {\n    border-radius: 0 3px 3px 0;\n}\n\n.paginator .paginator-size-changer > select {\n    height: 28px;\n    background: #fff;\n    border-radius: 3px;\n    border: 1px solid #aaa;\n    padding: 0;\n    font-size: 14px;\n    text-align: center;\n    vertical-align: baseline;\n    outline: 0;\n    box-shadow: none;\n    box-sizing: initial;\n}\n\n.paginator .paginator-go-input > input[type=text] {\n    width: 30px;\n    height: 28px;\n    background: #fff;\n    border-radius: 3px;\n    border: 1px solid #aaa;\n    padding: 0;\n    font-size: 14px;\n    text-align: center;\n    vertical-align: baseline;\n    outline: 0;\n    box-shadow: none;\n    box-sizing: initial;\n}\n\n.paginator .paginator-go-button > input[type=button] {\n    min-width: 40px;\n    height: 30px;\n    line-height: 28px;\n    background: #fff;\n    border-radius: 3px;\n    border: 1px solid #aaa;\n    text-align: center;\n    padding: 0 8px;\n    font-size: 14px;\n    vertical-align: baseline;\n    outline: 0;\n    box-shadow: none;\n    color: #333;\n    cursor: pointer;\n    vertical-align: middle;\n}\n\n.paginator .paginator-go-button > input[type=button]:hover {\n    background-color: #f8f8f8;\n}\n\n.paginator .paginator-nav {\n    float: left;\n    height: 30px;\n    line-height: 30px;\n    font-size: 14px;\n}\n\n.paginator.paginator-small {\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-pages li > a {\n    min-width: 26px;\n    height: 24px;\n    line-height: 24px;\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-pages li.active > a {\n    height: 26px;\n    line-height: 26px;\n}\n\n.paginator.paginator-small .paginator-size-changer {\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-size-changer > select {\n    height: 24px;\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-go-input {\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-go-input > input[type=text] {\n    width: 26px;\n    height: 24px;\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-go-button {\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-go-button > input[type=button] {\n    min-width: 30px;\n    height: 26px;\n    line-height: 24px;\n    padding: 0 6px;\n    font-size: 12px;\n}\n\n.paginator.paginator-small .paginator-nav {\n    height: 26px;\n    line-height: 26px;\n    font-size: 12px;\n}\n\n.paginator.paginator-big {\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-pages li > a {\n    min-width: 36px;\n    height: 34px;\n    line-height: 34px;\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-pages li.active > a {\n    height: 36px;\n    line-height: 36px;\n}\n\n.paginator.paginator-big .paginator-size-changer {\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-size-changer > select {\n    height: 34px;\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-go-input {\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-go-input > input[type=text] {\n    width: 36px;\n    height: 34px;\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-go-button {\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-go-button > input[type=button] {\n    min-width: 50px;\n    height: 36px;\n    line-height: 34px;\n    padding: 0 12px;\n    font-size: 16px;\n}\n\n.paginator.paginator-big .paginator-nav {\n    height: 36px;\n    line-height: 36px;\n    font-size: 16px;\n}\n\n.paginator > :first-child {\n    margin-left: 0;\n}\n\n.paginator.paginator-theme-blue .paginator-pages li {\n    border-color: #289de9;\n}\n\n.paginator.paginator-theme-blue .paginator-pages li > a {\n    color: #289de9;\n}\n\n.paginator.paginator-theme-blue .paginator-pages li > a:hover {\n    background: #e9f4fc;\n}\n\n.paginator.paginator-theme-blue .paginator-pages li.active > a {\n    background: #289de9;\n    color: #fff;\n}\n\n.paginator.paginator-theme-blue .paginator-pages li.disabled > a:hover {\n    background: 0 0;\n}\n\n.paginator.paginator-theme-blue .paginator-go-input > input[type=text],\n.paginator.paginator-theme-blue .paginator-size-changer > select {\n    border-color: #289de9;\n}\n\n.paginator.paginator-theme-blue .paginator-go-button > input[type=button] {\n    background: #289de9;\n    border-color: #289de9;\n    color: #fff;\n}\n\n.paginator.paginator-theme-blue .paginator-go-button > input[type=button]:hover {\n    background-color: #3ca5ea;\n}\n\n.paginator .paginator-pages li.paginator-next {\n    border-right: 1px solid #aaa;\n}\n\n.paginator .paginator-size-changer {\n    margin-left: 5px;\n}\n\n.paginator .paginator-size-changer > select {\n    line-height: 28px;\n    vertical-align: middle\n}\n\n.paginator .paginator-go-input {\n    margin-left: 5px;\n}\n\n.paginator .paginator-go-input > input[type=text] {\n    line-height: 28px;\n    vertical-align: middle;\n}\n\n.paginator .paginator-go-button {\n    margin-left: 5px;\n}\n\n.paginator.paginator-big .paginator-pages li > a {\n    line-height: 36px;\n}\n\n.paginator.paginator-big .paginator-go-input > input[type=text] {\n    height: 36px;\n    line-height: 36px;\n}\n";
styleInject(css_248z);

class EventEmitter {
    // Initialize callbacks with an empty object
    callbacks = {};
    init(event) {
        if (!this.callbacks) {
            this.callbacks = {};
        }
        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    }
    listeners() {
        return this.callbacks;
    }
    on(event, listener) {
        this.init(event);
        this.callbacks[event].push(listener);
        return this;
    }
    off(event, listener) {
        const eventName = event;
        this.init();
        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // There is no callbacks with this key
            return this;
        }
        this.callbacks[eventName] = this.callbacks[eventName].filter((value) => value != listener);
        return this;
    }
    emit(event, ...args) {
        const eventName = event;
        // Initialize the event
        this.init(eventName);
        // If there are callbacks for this event
        if (this.callbacks[eventName].length > 0) {
            this.callbacks[eventName].forEach((value) => value(...args));
            return true;
        }
        return false;
    }
    once(event, listener) {
        const eventName = event;
        const onceListener = (...args) => {
            listener(...args);
            this.off(event, onceListener);
        };
        return this.on(eventName, onceListener);
    }
}

class Paginator extends EventEmitter {
    static version = '1.0.2';
    static instances = [];
    static firstLoad = true;
    instanceID;
    options = defaults;
    pageData = {
        isAsync: false,
        direction: 0,
        currentPage: 0,
        totalNumber: 0,
        totalPage: 0,
    };
    container = null;
    element = null;
    disabled = false;
    isDynamicTotalNumber = false;
    constructor(element, options) {
        super();
        this.instanceID = Utils.generateRandom(6);
        this.container = Utils.isString(element) ? Utils.getElem(element) : element;
        this.initialize(options).then((ele) => {
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
    async initialize(options) {
        this.options = Utils.deepMerge({}, defaults, options);
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
    async parseDataSource(dataSource) {
        return new Promise((resolve, reject) => {
            if (Utils.isObject(dataSource)) {
                resolve(this.options.dataSource = this.filterDataWithLocator(dataSource));
            }
            else if (Utils.isArray(dataSource)) {
                resolve(this.options.dataSource = dataSource);
            }
            else if (Utils.isFunction(dataSource)) {
                if (!Utils.isFunction(this.options.dataSource)) {
                    reject('The type of "dataSource" is a Function, but "options.dataSource" is not a Function.');
                    return;
                }
                this.options.dataSource((data) => {
                    if (!Utils.isArray(data)) {
                        reject('The parameter of "done" Function should be an Array.');
                    }
                    this.parseDataSource(data).then(resolve).catch(reject);
                });
            }
            else if (Utils.isString(dataSource)) {
                if (!/^https?|file:/.test(dataSource)) {
                    dataSource = new URL(dataSource, window.location.href);
                    dataSource = dataSource.toString();
                }
                resolve(dataSource);
            }
            else {
                reject('Unexpected dataSource type');
            }
        });
    }
    async initPageTrigger() {
        // Trigger paging if needed
        let defaultPageNumber = this.pageData.currentPage || this.options.pageNumber;
        const element = this.element;
        if (!element)
            return;
        if (this.isDynamicTotalNumber && this.options.resetPageNumberOnInit) {
            defaultPageNumber = 1;
        }
        if (this.options.triggerPagingOnInit) {
            this.emit('go', Math.min(defaultPageNumber, Math.max(this.getTotalPage(), 1)));
        }
    }
    renderHTML(isBoot = false) {
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
                }
                else {
                    this.container.insertBefore(ele, this.container.firstChild);
                }
            }
            this.element = ele;
        }
        const ele = this.element;
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
        B(paginator, ele);
        if (options.hideOnlyOnePage && totalPage <= 1) {
            this.element.style.display = 'none';
        }
        else {
            this.element.style.display = '';
        }
        this.emit('afterRender', isBoot !== true);
        return ele;
    }
    renderData(dataList, pageNumber, customCallback) {
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
            let cloneData = Utils.deepMerge([], dataList);
            if (!Utils.isArray(dataList = this.options.formatResult(cloneData))) {
                dataList = cloneData;
            }
        }
        this.doCallback(dataList, customCallback);
        this.emit('afterPaging', pageNumber);
        if (pageNumber === 1) {
            this.emit('afterIsFirstPage');
        }
        else if (pageNumber === this.getTotalPage()) {
            this.emit('afterIsLastPage');
        }
    }
    doCallback(data, customCallback) {
        if (typeof customCallback === 'function') {
            customCallback(data, this.pageData);
        }
        else if (typeof this.options.callback === 'function') {
            this.options.callback(data, this);
        }
    }
    observer() {
        const ele = this.element;
        if (!ele)
            return;
        ele.addEventListener('click', async (event) => {
            let target = event.target;
            if (!Utils.isPageItem(target)) {
                const parent = Utils.hasParent(target, 'li', 5, true);
                if (!parent)
                    return;
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
                const input = Utils.getElem('.J-paginator-go-pagenumber');
                if (!input)
                    return;
                const pageno = input.value;
                this.emit('beforeGoButtonOnClick', event, pageno);
                this.emit('go', parseInt(pageno, 10));
                this.emit('afterGoButtonOnClick', event, pageno);
            }
            if (target.classList.contains('J-paginator-size-select')) {
                const size = parseInt(target.value, 10);
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
    getPagingData(pageNumber) {
        const dataSource = this.options.dataSource;
        const pageSize = this.options.pageSize || 0;
        const totalNumber = this.getTotalNumber();
        const start = pageSize * (pageNumber - 1) + 1;
        const end = Math.min(pageNumber * pageSize, totalNumber);
        return Utils.isArray(dataSource) ? dataSource.slice(start - 1, end) : [];
    }
    getTotalNumber() {
        return this.pageData.totalNumber || this.options.totalNumber || 0;
    }
    getTotalPage() {
        const pageSize = this.options.pageSize || 0;
        return Math.ceil(this.getTotalNumber() / pageSize);
    }
    getLocator(locator) {
        let result;
        if (typeof locator === 'string') {
            result = locator;
        }
        else if (typeof locator === 'function') {
            result = locator();
        }
        else {
            Utils.throwError('"locator" is incorrect. Expect string or function type.');
        }
        return result;
    }
    // Filter data with locator
    filterDataWithLocator(dataSource) {
        const locator = this.getLocator(this.options.locator);
        let filteredData = dataSource;
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
            }
            catch (e) {
                Utils.throwError(`Error accessing dataSource.${locator}: ${e}`);
            }
        }
        return filteredData;
    }
    bindEvents() {
        this.on('go', async (pageNumber, done) => await this.go(pageNumber, done));
        this.on('previous', async (done) => await this.previous(done));
        this.on('next', async (done) => await this.next(done));
        this.on('disable', () => this.disable());
        this.on('enable', () => this.enable());
        this.on('show', () => this.show());
        this.on('hide', () => this.hide());
        this.on('destroy', () => this.destroy());
    }
    unbindEvents() {
        this.off('go', async (pageNumber, done) => await this.go(pageNumber, done));
        this.off('previous', async (done) => await this.previous(done));
        this.off('next', async (done) => await this.next(done));
        this.off('disable', () => this.disable());
        this.off('enable', () => this.enable());
        this.off('show', () => this.show());
        this.off('hide', () => this.hide());
        this.off('destroy', () => this.destroy());
    }
    getPageLinkTag(index) {
        const pageLink = this.options.pageLink;
        return pageLink
            ? _('a', { href: pageLink }, index)
            : _('a', null, index);
    }
    generatePageNumbersHTML(args) {
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
        const pages = [];
        if (options.pageRange === null) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                    'data-num': i.toString()
                }, getPageLinkTag(i)));
            }
            return pages;
        }
        if (rangeStart <= 3) {
            for (let i = 1; i < rangeStart; i++) {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                    'data-num': i.toString()
                }, getPageLinkTag(i)));
            }
        }
        else {
            if (!options.hideFirstOnEllipsisShow) {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, `${classPrefix}-first`, 'J-paginator-page', pageClassName),
                    'data-num': '1'
                }, getPageLinkTag(1)));
            }
            pages.push(_('li', {
                class: Utils.composeClassNames(`${classPrefix}-ellipsis`, disableClassName)
            }, _('a', { dangerouslySetInnerHTML: { __html: ellipsisText } })));
        }
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(_('li', {
                class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName, i === currentPage ? activeClassName : ''),
                'data-num': i.toString()
            }, getPageLinkTag(i)));
        }
        if (rangeEnd >= totalPage - 2) {
            for (let i = rangeEnd + 1; i <= totalPage; i++) {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, 'J-paginator-page', pageClassName),
                    'data-num': i.toString()
                }, getPageLinkTag(i)));
            }
        }
        else {
            pages.push(_('li', {
                class: Utils.composeClassNames(`${classPrefix}-ellipsis`, disableClassName)
            }, _('a', { dangerouslySetInnerHTML: { __html: ellipsisText } })));
            if (!options.hideLastOnEllipsisShow) {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-page`, `${classPrefix}-last`, 'J-paginator-page', pageClassName),
                    'data-num': totalPage.toString()
                }, getPageLinkTag(totalPage)));
            }
        }
        return pages;
    }
    generateHTML(currentPage, rangeStart, rangeEnd) {
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
        const pages = [];
        if (options.showPrevious) {
            if (currentPage <= 1) {
                if (!autoHidePrevious) {
                    pages.push(_('li', {
                        class: Utils.composeClassNames(`${classPrefix}-prev`, disableClassName, prevClassName)
                    }, _('a', { dangerouslySetInnerHTML: { __html: prevText } })));
                }
            }
            else {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-prev`, 'J-paginator-previous', prevClassName),
                    'data-num': currentPage - 1,
                    title: 'Previous page'
                }, _('a', { dangerouslySetInnerHTML: { __html: prevText } })));
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
                    pages.push(_('li', {
                        class: Utils.composeClassNames(`${classPrefix}-next`, disableClassName, nextClassName)
                    }, _('a', { dangerouslySetInnerHTML: { __html: nextText } })));
                }
            }
            else {
                pages.push(_('li', {
                    class: Utils.composeClassNames(`${classPrefix}-next`, 'J-paginator-next', nextClassName),
                    'data-num': currentPage + 1,
                    title: 'Next page'
                }, _('a', { dangerouslySetInnerHTML: { __html: nextText } })));
            }
        }
        const paginatorElements = [
            header && _('div', {
                class: 'paginator-header',
                dangerouslySetInnerHTML: {
                    __html: this.replaceVariables(header, {
                        currentPage,
                        totalPage,
                        totalNumber
                    })
                }
            }),
            options.showNavigator && formatNavigator && _('div', {
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
            _('div', { class: 'paginator-pages' }, _('ul', { class: ulClassName }, ...pages)),
            footer && _('div', {
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
        return _('div', { class: 'paginator-container' }, ...paginatorElements);
    }
    findTotalNumberFromRemoteResponse(response) {
        let totalNumber = 0;
        if (!Utils.isFunction(this.options.totalNumberLocator))
            return;
        totalNumber = this.options.totalNumberLocator(response);
        if (!Utils.isNumeric(totalNumber)) {
            Utils.throwError('totalNumberLocator should return a number.');
        }
        this.pageData.totalNumber = totalNumber;
    }
    async go(pageNumber, callback) {
        if (this.disabled || !this.element)
            return;
        pageNumber = parseInt(pageNumber, 10);
        if (!pageNumber || pageNumber < 1)
            return;
        const pageSize = this.options.pageSize;
        const totalNumber = this.getTotalNumber();
        const totalPage = this.getTotalPage();
        if (totalNumber > 0 && pageNumber > totalPage)
            return;
        if (!this.pageData.isAsync) {
            this.renderData(this.getPagingData(pageNumber), pageNumber, callback);
            return;
        }
        const postData = {};
        const alias = this.options.alias || {};
        const pageSizeName = alias.pageSize || 'pageSize';
        const pageNumberName = alias.pageNumber || 'pageNumber';
        postData[pageSizeName] = pageSize;
        postData[pageNumberName] = pageNumber;
        const dataLoader = Utils.isFunction(this.options.dataLoader) ? this.options.dataLoader() : this.options.dataLoader;
        if (dataLoader && dataLoader.pageNumberStartWithZero) {
            postData[pageNumberName] = pageNumber - 1;
        }
        const fetchOptions = {
            url: this.options.dataSource,
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
                if (dataLoader?.beforeSend)
                    dataLoader.beforeSend(dataLoader);
            },
            success: (response) => {
                if (this.isDynamicTotalNumber) {
                    this.findTotalNumberFromRemoteResponse(response);
                }
                else {
                    this.pageData.totalNumber = this.options.totalNumber;
                }
                const finalData = this.filterDataWithLocator(response);
                this.renderData(finalData, pageNumber, callback);
                this.enable();
            },
            errorCallback: (error) => {
                if (typeof this.options.onError === 'function') {
                    this.options.onError(error);
                }
                else {
                    throw error;
                }
                this.enable();
            },
        };
        if (Utils.isFunction(this.options.dataLoaderFunction)) {
            this.options.dataLoaderFunction(this);
        }
        else {
            await Utils.fetchData(fetchOptions);
        }
    }
    destroy() {
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
    async previous(callback) {
        if (this.pageData.currentPage > 1) {
            this.emit('go', this.pageData.currentPage - 1, callback);
        }
    }
    async next(callback) {
        if (this.pageData.currentPage < this.getTotalPage()) {
            this.emit('go', this.pageData.currentPage + 1, callback);
        }
    }
    disable() {
        const source = this.pageData.isAsync ? 'async' : 'sync';
        this.emit('beforeDisable', source);
        this.disabled = true;
        this.emit('afterDisable', source);
    }
    enable() {
        const source = this.pageData.isAsync ? 'async' : 'sync';
        this.emit('beforeEnable', source);
        this.disabled = false;
        this.emit('afterEnable', source);
    }
    show() {
        if (this.element && this.element.style.display === 'none') {
            this.element.style.display = '';
        }
    }
    hide() {
        if (this.element && this.element.style.display !== 'none') {
            this.element.style.display = 'none';
        }
    }
    replaceVariables(template, variables) {
        let formattedString = template;
        for (const key in variables) {
            const value = variables[key];
            const regexp = new RegExp(`<%=\\s*${key}\\s*%>`, 'img');
            formattedString = formattedString.replace(regexp, value);
        }
        return formattedString;
    }
    get version() {
        return Paginator.version;
    }
}

export { Paginator as default };
