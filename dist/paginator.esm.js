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
    return typeof item === 'object' && item !== null && !isArray(item);
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
function isEmpty(value) {
    // Check for number
    if (typeof value === 'number') {
        return false;
    }
    // Check for string
    if (typeof value === 'string' && value.length === 0) {
        return true;
    }
    // Check for array
    if (isArray(value) && value.length === 0) {
        return true;
    }
    // Check for object
    if (isObject(value) && Object.keys(value).length === 0) {
        return true;
    }
    // Check for any falsy values
    return !value;
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
                        target[targetKey] = isArray(value) ? [] : {};
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
function shallowMerge(target, ...sources) {
    sources.forEach((source) => {
        if (source) {
            Object.keys(source).forEach((key) => {
                const targetKey = key;
                target[targetKey] = source[targetKey];
            });
        }
    });
    return target;
}
function generateUUID$1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function setUrlParam(url, params, overwrite = true) {
    let originalUrl;
    let ignoreArray = [];
    // Determine if URLSource object is being used
    if (typeof url === 'object') {
        originalUrl = url.url; // Extract the URL string
        if (Array.isArray(url.ignore)) {
            ignoreArray = url.ignore.map((part) => {
                return part.startsWith('?') || part.startsWith('&') ? part.substring(1) : part;
            });
        }
        else if (typeof url.ignore === 'string') {
            let part = url.ignore;
            if (part.startsWith('?') || part.startsWith('&')) {
                part = part.substring(1);
            }
            ignoreArray.push(part);
        }
    }
    else {
        originalUrl = url;
    }
    const urlObj = new URL(originalUrl);
    // If params is null, remove all
    if (params === null) {
        urlObj.search = ''; // Remove all search params
        return urlObj.toString();
    }
    // Extract search string
    let searchString = urlObj.search.substring(1); // Remove the leading '?'
    // Split the search string into parameters
    const paramsList = searchString.length > 0 ? searchString.split('&') : [];
    const ignoredParams = [];
    const otherParams = [];
    for (const param of paramsList) {
        if (ignoreArray.includes(param)) {
            ignoredParams.push(param);
        }
        else {
            otherParams.push(param);
        }
    }
    const urlSearchParams = new URLSearchParams(otherParams.join('&'));
    // Process remaining logic to set params
    for (const [paramName, paramValue] of Object.entries(params)) {
        const valueStr = paramValue === null ? '' : String(paramValue);
        if (!overwrite && urlSearchParams.has(paramName)) {
            continue;
        }
        urlSearchParams.set(paramName, valueStr);
    }
    const newSearchParams = ignoredParams.concat(urlSearchParams
        .toString()
        .split('&')
        .filter((p) => p));
    const finalSearchString = newSearchParams.join('&');
    urlObj.search = finalSearchString ? '?' + finalSearchString : '';
    return urlObj.toString();
}

// Append form data
function appendFormData(options, formData = new FormData()) {
    const { data, parentKey = '' } = options;
    if (data instanceof FormData) {
        data.forEach((value, key) => {
            formData.append(key, value);
        });
    }
    else if (data !== null && typeof data === 'object') {
        // Check if it is Blob or File, if so, add directly
        if (data instanceof Blob || data instanceof File) {
            const formKey = parentKey || 'file'; // If no key is specified, the default is 'file'
            formData.append(formKey, data);
        }
        else {
            // Traverse object properties
            Object.keys(data).forEach((key) => {
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
// Convert FormData to URLParams
function formDataToURLParams(formData) {
    const params = {};
    formData.forEach((value, key) => {
        // Assume formData values are strings, additional parsing can be added if needed
        if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number' || value === null) {
            params[key] = value;
        }
        else {
            // Convert any non-string values to string if necessary
            params[key] = value.toString();
        }
    });
    return params;
}
// Convert a generic body to URLParams
function bodyToURLParams(body) {
    const params = {};
    if (body instanceof FormData) {
        return formDataToURLParams(body);
    }
    else if (typeof body === 'object') {
        // Handle generic object by iterating over its keys
        Object.entries(body).forEach(([key, value]) => {
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean' ||
                value === null) {
                params[key] = value;
            }
            else {
                params[key] = JSON.stringify(value); // Serialize complex objects
            }
        });
    }
    return params;
}

// Fetch API
async function doFetch(options) {
    const { url, method = 'GET', headers = {}, cache = 'no-cache', mode = 'cors', credentials = 'same-origin', body = null, beforeSend = null, success = null, error = null } = options;
    let requestURL = url;
    const initHeaders = headers instanceof Headers ? headers : new Headers(headers);
    const init = {
        method: method,
        mode: mode,
        headers: initHeaders,
        cache: cache,
        credentials: credentials
    };
    if (body && body !== null && method.toUpperCase() === 'GET') {
        const params = bodyToURLParams(body);
        requestURL = setUrlParam(typeof url === 'string' ? url : url.toString(), params, true);
    }
    else if (body && body !== null && ['PUT', 'POST', 'DELETE'].includes(method.toUpperCase())) {
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
        if (response.ok) {
            if (typeof success === 'function') {
                // Clone the response and parse the clone
                const clonedResponse = response.clone();
                const responseData = (await clonedResponse.json());
                success?.(responseData);
            }
        }
        else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
    catch (caughtError) {
        const errorObj = caughtError instanceof Error ? caughtError : new Error(String(caughtError));
        error?.(errorObj);
        throw errorObj;
    }
}
// Send data
async function sendData(options) {
    const { url, data, method = 'POST', headers, cache, mode, credentials, success, error, beforeSend, encode = true } = options;
    const fetchOptions = {
        url: url,
        method: method,
        headers: headers,
        cache: cache,
        mode: mode,
        credentials: credentials,
        body: encode && method.toUpperCase() !== 'GET' ? encodeFormData(data) : data,
        beforeSend: beforeSend,
        success: success,
        error: error
    };
    return (await doFetch(fetchOptions)).json();
}
// Alias for sendData
const fetchData = sendData;

class Utils {
    static throwError = errorUtils.throwError;
    static getElem = getElem;
    static hasParent = hasParent;
    static deepMerge = deepMerge;
    static shallowMerge = shallowMerge;
    static generateUUID = generateUUID$1;
    static isEmpty = isEmpty;
    static isObject = isObject;
    static isArray = isArray;
    static isString = isString;
    static isFunction = isFunction;
    static fetchData = fetchData;
    static encodeFormData = encodeFormData;
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

class Base {
    _id;
    constructor(id) {
        this._id = id || Utils.generateUUID();
    }
    get id() {
        return this._id;
    }
}

function camelCase(str) {
    if (!str)
        return '';
    const words = str.split(' ');
    // Do not convert strings that are already in camelCase format
    if (words.length === 1 && /([a-z][A-Z])+/g.test(str)) {
        return str;
    }
    return words
        .map(function (word, index) {
        // If it is the first word, lowercase all the chars
        if (index == 0) {
            return word.toLowerCase();
        }
        // If it is not the first word only upper case the first char and lowercase the rest
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
}

var PluginPosition;
(function (PluginPosition) {
    PluginPosition[PluginPosition["Header"] = 0] = "Header";
    PluginPosition[PluginPosition["Body"] = 1] = "Body";
    PluginPosition[PluginPosition["Footer"] = 2] = "Footer";
    PluginPosition[PluginPosition["Cell"] = 3] = "Cell";
})(PluginPosition || (PluginPosition = {}));

/**
 * Centralized logging lib
 *
 * This class needs some improvements but so far it has been used to have a coherent way to log
 */
let Logger$1 = class Logger {
    format(message, type) {
        return `[Paginator] [${type.toUpperCase()}]: ${message}`;
    }
    error(message, throwException = false) {
        const msg = this.format(message, 'error');
        if (throwException) {
            throw Error(msg);
        }
        else {
            console.error(msg);
        }
    }
    warn(message) {
        console.warn(this.format(message, 'warn'));
    }
    info(message) {
        console.info(this.format(message, 'info'));
    }
};
var log$1 = new Logger$1();

var n$1,l$2,u$3,t$2,i$2,r$2,o$2,e$2,f$3,c$2,s$2,a$2,h$3,p$3={},v$3=[],y$3=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,w$2=Array.isArray;function d$2(n,l){for(var u in l)n[u]=l[u];return n}function g$3(n){n&&n.parentNode&&n.parentNode.removeChild(n);}function _$3(l,u,t){var i,r,o,e={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o];if(arguments.length>2&&(e.children=arguments.length>3?n$1.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps) void 0===e[o]&&(e[o]=l.defaultProps[o]);return m$1(l,e,i,r,null)}function m$1(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u$3:o,__i:-1,__u:0};return null==o&&null!=l$2.vnode&&l$2.vnode(e),e}function b$2(){return {current:null}}function k$1(n){return n.children}function x$1(n,l){this.props=n,this.context=l;}function S(n,l){if(null==l)return n.__?S(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?S(n):null}function C$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C$1(n)}}function M(n){(!n.__d&&(n.__d=true)&&i$2.push(n)&&!$.__r++||r$2!=l$2.debounceRendering)&&((r$2=l$2.debounceRendering)||o$2)($);}function $(){for(var n,u,t,r,o,f,c,s=1;i$2.length;)i$2.length>s&&i$2.sort(e$2),n=i$2.shift(),s=i$2.length,n.__d&&(t=void 0,o=(r=(u=n).__v).__e,f=[],c=[],u.__P&&((t=d$2({},r)).__v=r.__v+1,l$2.vnode&&l$2.vnode(t),O(u.__P,t,r,u.__n,u.__P.namespaceURI,32&r.__u?[o]:null,f,null==o?S(r):o,!!(32&r.__u),c),t.__v=r.__v,t.__.__k[t.__i]=t,N$1(f,t,c),t.__e!=o&&C$1(t)));$.__r=0;}function I(n,l,u,t,i,r,o,e,f,c,s){var a,h,y,w,d,g,_=t&&t.__k||v$3,m=l.length;for(f=P$1(u,l,_,f,m),a=0;a<m;a++)null!=(y=u.__k[a])&&(h=-1==y.__i?p$3:_[y.__i]||p$3,y.__i=a,g=O(n,y,h,i,r,o,e,f,c,s),w=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&B$2(h.ref,null,y),s.push(y.ref,y.__c||w,y)),null==d&&null!=w&&(d=w),4&y.__u||h.__k===y.__k?f=A$2(y,f,n):"function"==typeof y.type&&void 0!==g?f=g:w&&(f=w.nextSibling),y.__u&=-7);return u.__e=d,f}function P$1(n,l,u,t,i){var r,o,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),r=0;r<i;r++)null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?(f=r+h,(o=n.__k[r]="string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?m$1(null,o,null,null,null):w$2(o)?m$1(k$1,{children:o},null,null,null):null==o.constructor&&o.__b>0?m$1(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,e=null,-1!=(c=o.__i=L(o,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>s?h--:i<s&&h++),"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null;if(a)for(r=0;r<s;r++)null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=S(e)),D$2(e,e));return t}function A$2(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=A$2(t[i],l,u));return l}n.__e!=l&&(l&&n.type&&!u.contains(l)&&(l=S(n)),u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8==l.nodeType);return l}function H$1(n,l){return l=l||[],null==n||"boolean"==typeof n||(w$2(n)?n.some(function(n){H$1(n,l);}):l.push(n)),l}function L(n,l,u,t){var i,r,o,e=n.key,f=n.type,c=l[u],s=null!=c&&0==(2&c.__u);if(null===c&&null==n.key||s&&e==c.key&&f==c.type)return u;if(t>(s?1:0))for(i=u-1,r=u+1;i>=0||r<l.length;)if(null!=(c=l[o=i>=0?i--:r++])&&0==(2&c.__u)&&e==c.key&&f==c.type)return o;return  -1}function T$3(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y$3.test(l)?u:u+"px";}function j$2(n,l,u,t,i){var r,o;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T$3(n.style,l,"");if(u)for(l in u)t&&u[l]==t[l]||T$3(n.style,l,u[l]);}else if("o"==l[0]&&"n"==l[1])r=l!=(l=l.replace(f$3,"$1")),o=l.toLowerCase(),l=o in n||"onFocusOut"==l||"onFocusIn"==l?o.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u.u=t.u:(u.u=c$2,n.addEventListener(l,r?a$2:s$2,r)):n.removeEventListener(l,r?a$2:s$2,r);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||false===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u));}}function F$3(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=c$2++;else if(u.t<t.u)return;return t(l$2.event?l$2.event(u):u)}}}function O(n,u,t,i,r,o,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,j=u.type;if(null!=u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(a=l$2.__b)&&a(u);n:if("function"==typeof j)try{if(b=u.props,S="prototype"in j&&j.prototype.render,C=(a=j.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new j(b,M):(u.__c=h=new x$1(b,M),h.constructor=j,h.render=E$2),C&&C.sub(h),h.props=b,h.state||(h.state={}),h.context=M,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d$2({},h.__s)),d$2(h.__s,j.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p)S&&null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(S&&null==j.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)||u.__v==t.__v){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u);}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_);});}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l$2.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[];}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++A<25);h.state=h.__s,null!=h.getChildContext&&(i=d$2(d$2({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),L=a,null!=a&&a.type===k$1&&null==a.key&&(L=V$1(a.props.children)),f=I(n,w$2(L)?L:[L],u,t,i,r,o,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null);}catch(n){if(u.__v=null,c||null!=o)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;o[o.indexOf(f)]=null,u.__e=f;}else {for(T=o.length;T--;)g$3(o[T]);z$1(u);}else u.__e=t.__e,u.__k=t.__k,n.then||z$1(u);l$2.__e(n,u,t);}else null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=q$3(t.__e,u,t,i,r,o,e,c,s);return (a=l$2.diffed)&&a(u),128&u.__u?void 0:f}function z$1(n){n&&n.__c&&(n.__c.__e=true),n&&n.__k&&n.__k.forEach(z$1);}function N$1(n,u,t){for(var i=0;i<t.length;i++)B$2(t[i],t[++i],t[++i]);l$2.__c&&l$2.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$2.__e(n,u.__v);}});}function V$1(n){return "object"!=typeof n||null==n||n.__b&&n.__b>0?n:w$2(n)?n.map(V$1):d$2({},n)}function q$3(u,t,i,r,o,e,f,c,s){var a,h,v,y,d,_,m,b=i.props,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e)for(a=0;a<e.length;a++)if((d=e[a])&&"setAttribute"in d==!!x&&(x?d.localName==x:3==d.nodeType)){u=d,e[a]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(o,x,k.is&&k),c&&(l$2.__m&&l$2.__m(t,e),c=false),e=null;}if(null==x)b===k||c&&u.data==k||(u.data=k);else {if(e=e&&n$1.call(u.childNodes),b=i.props||p$3,!c&&null!=e)for(b={},a=0;a<u.attributes.length;a++)b[(d=u.attributes[a]).name]=d.value;for(a in b)if(d=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)v=d;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;j$2(u,a,null,d,o);}for(a in k)d=k[a],"children"==a?y=d:"dangerouslySetInnerHTML"==a?h=d:"value"==a?_=d:"checked"==a?m=d:c&&"function"!=typeof d||b[a]===d||j$2(u,a,d,b[a],o);if(h)c||v&&(h.__html==v.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(v&&(u.innerHTML=""),I("template"==t.type?u.content:u,w$2(y)?y:[y],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&S(i,0),c,s),null!=e)for(a=e.length;a--;)g$3(e[a]);c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):null!=_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!=b[a])&&j$2(u,a,_,b[a],o),a="checked",null!=m&&m!=u[a]&&j$2(u,a,m,b[a],o));}return u}function B$2(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u));}else n.current=u;}catch(n){l$2.__e(n,t);}}function D$2(n,u,t){var i,r;if(l$2.unmount&&l$2.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||B$2(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$2.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&D$2(i[r],u,t||"function"!=typeof n.type);t||g$3(n.__e),n.__c=n.__=n.__e=void 0;}function E$2(n,l,u){return this.constructor(n,u)}function G$1(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l$2.__&&l$2.__(u,t),o=(r="function"=="undefined")?null:t.__k,e=[],f=[],O(t,u=(t).__k=_$3(k$1,null,[u]),o||p$3,p$3,t.namespaceURI,o?null:t.firstChild?n$1.call(t.childNodes):null,e,o?o.__e:t.firstChild,r,f),N$1(e,u,f);}function Q$1(n){function l(n){var u,t;return this.getChildContext||(u=new Set,(t={})[l.__c]=this,this.getChildContext=function(){return t},this.componentWillUnmount=function(){u=null;},this.shouldComponentUpdate=function(n){this.props.value!=n.value&&u.forEach(function(n){n.__e=true,M(n);});},this.sub=function(n){u.add(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u&&u.delete(n),l&&l.call(n);};}),n.children}return l.__c="__cC"+h$3++,l.__=n,l.Provider=l.__l=(l.Consumer=function(n,l){return n.children(l)}).contextType=l,l}n$1=v$3.slice,l$2={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l;}throw n}},u$3=0,t$2=function(n){return null!=n&&null==n.constructor},x$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=d$2({},this.state),"function"==typeof n&&(n=n(d$2({},u),this.props)),n&&d$2(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this));},x$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=true,n&&this.__h.push(n),M(this));},x$1.prototype.render=k$1,i$2=[],o$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e$2=function(n,l){return n.__v.__b-l.__v.__b},$.__r=0,f$3=/(PointerCapture)$|Capture$/i,c$2=0,s$2=F$3(false),a$2=F$3(true),h$3=0;

class Header extends Base {
    _columns;
    constructor() {
        super();
        this._columns = [];
    }
    get columns() {
        return this._columns;
    }
    set columns(columns) {
        this._columns = columns;
    }
    get visibleColumns() {
        return this._columns.filter((column) => !column.hidden);
    }
    setID(columns) {
        const cols = columns || this.columns || [];
        for (const column of cols) {
            if (!column.id && typeof column.name === 'string') {
                // Let's guess the column ID if it's undefined
                column.id = camelCase(column.name);
            }
            if (!column.id) {
                log$1.error('Could not find a valid ID for one of the columns. Make sure a valid "id" is set for all columns.');
            }
        }
    }
    populatePlugins(pluginManager, columns) {
        // Populate the cell columns
        for (const column of columns) {
            if (column.plugin !== undefined) {
                pluginManager.add({
                    ...column.plugin,
                    position: PluginPosition.Cell
                });
            }
        }
    }
    /**
     * Creates a new Header from a Config object
     * This method generates a new ID for the Header and all nested elements
     * It also populates the plugin manager with the plugins from the columns
     *
     * @param config
     */
    static createFromConfig(config) {
        const header = new Header();
        if (config.options.columns) {
            header.columns = Header.fromColumns(config.options.columns).columns;
        }
        else if (Header.isJsonPayload(config.options.data)) {
            // If data[0] is an object but not an Array
            // used for when a JSON payload is provided
            header.columns = Object.keys(config.options.data[0]).map((name) => {
                return { name: name };
            });
        }
        if (header.columns.length) {
            header.setID();
            header.populatePlugins(config.internal.plugin, header.columns);
            return header;
        }
        return undefined;
    }
    /**
     * Returns an array of leaf columns (last columns in the tree)
     *
     * @param columns
     */
    static leafColumns(columns) {
        let result = [];
        const cols = columns || [];
        if (cols && cols.length) {
            for (const col of cols) {
                result.push(col);
            }
        }
        return result;
    }
    /**
     * Converts the tree-like format of Header to a tabular format
     *
     * @param columns
     */
    static tabularFormat(columns) {
        return columns.length ? [columns] : [];
    }
    static isJsonPayload(data) {
        return !!data && data instanceof Array && typeof data[0] === 'object' && !(data[0] instanceof Array);
    }
    static fromColumns(columns) {
        const header = new Header();
        for (const column of columns) {
            if (typeof column === 'string' || t$2(column)) {
                header.columns.push({
                    name: column
                });
            }
            else if (typeof column === 'object') {
                const typedColumn = column;
                // TColumn type
                header.columns.push(typedColumn);
            }
        }
        return header;
    }
}

// Container status
var Status;
(function (Status) {
    Status[Status["Init"] = 0] = "Init";
    Status[Status["Loading"] = 1] = "Loading";
    Status[Status["Loaded"] = 2] = "Loaded";
    Status[Status["Rendered"] = 3] = "Rendered";
    Status[Status["Error"] = 4] = "Error";
})(Status || (Status = {}));

/**
 * Base Storage class. All storage implementation must inherit this class
 */
class Storage {
}

class MemoryStorage extends Storage {
    data = () => [];
    beforeDataLoad;
    constructor(data, beforeDataLoad) {
        super();
        this.set(data);
        this.beforeDataLoad = beforeDataLoad;
    }
    async get() {
        if (Utils.isFunction(this.beforeDataLoad)) {
            this.beforeDataLoad();
        }
        // Get the data
        const data = await this.data();
        return {
            data: data,
            total: data.length
        };
    }
    set(data) {
        if (data instanceof Array) {
            this.data = () => data;
        }
        else if (data instanceof Function) {
            this.data = data;
        }
        return this;
    }
}

class ServerStorage extends Storage {
    options;
    beforeDataLoad;
    constructor(options, beforeDataLoad) {
        super();
        this.options = options;
        this.beforeDataLoad = beforeDataLoad;
    }
    handler(response) {
        if (typeof this.options.handle === 'function') {
            return this.options.handle(response);
        }
        return Promise.resolve(response);
    }
    async get(options) {
        // `this.options` is the initial config object
        // `options` is the runtime config passed by the pipeline (e.g. search component)
        const opts = {
            ...this.options,
            ...options
        };
        const fetchParam = {
            url: opts.url,
            data: Utils.encodeFormData(opts.body || {}),
            ...opts.param
        };
        // If `options.data` is provided, the current ServerStorage
        // implementation will be ignored and we let options.data to
        // handle the request. Useful when HTTP client needs to be
        // replaced with something else
        if (Utils.isFunction(opts.data)) {
            return opts.data(opts);
        }
        // If `options.param.beforeSend` is not a function and `this.beforeDataLoad` is a function
        if (!Utils.isFunction(opts.param?.beforeSend) && Utils.isFunction(this.beforeDataLoad)) {
            fetchParam.beforeSend = this.beforeDataLoad;
        }
        return await Utils.fetchData(fetchParam)
            .then(this.handler.bind(this))
            .then((res) => {
            return {
                data: opts.processData ? opts.processData(res) : [],
                total: typeof opts.total === 'function' ? opts.total(res) : 0
            };
        })
            .catch((error) => {
            log$1.error(`Error in get method: ${error.message}`, true);
            return Promise.reject(error);
        });
    }
}

class StorageUtils {
    /**
     * Accepts a Config object and tries to guess and return a Storage type
     *
     * @param config
     */
    static createFromConfig(config) {
        let storage = null;
        if (config.options.data) {
            storage = new MemoryStorage(config.options.data, config.options.beforeDataLoad);
        }
        if (config.options.server) {
            storage = new ServerStorage(config.options.server, config.options.beforeDataLoad);
        }
        if (!storage) {
            throw new Error('Could not determine the storage type');
        }
        return storage;
    }
}

var ProcessorType;
(function (ProcessorType) {
    ProcessorType[ProcessorType["Initiator"] = 0] = "Initiator";
    ProcessorType[ProcessorType["ServerLimit"] = 1] = "ServerLimit";
    ProcessorType[ProcessorType["Extractor"] = 2] = "Extractor";
    ProcessorType[ProcessorType["Transformer"] = 3] = "Transformer";
    ProcessorType[ProcessorType["Limit"] = 4] = "Limit";
})(ProcessorType || (ProcessorType = {}));

/**
 * Centralized logging lib
 *
 * This class needs some improvements but so far it has been used to have a coherent way to log
 */
class Logger {
    format(message, type) {
        return `[Pipeline-JS] [${type.toUpperCase()}]: ${message}`;
    }
    error(message, throwException = false) {
        const msg = this.format(message, 'error');
        if (throwException) {
            throw Error(msg);
        }
        else {
            console.error(msg);
        }
    }
    warn(message) {
        console.warn(this.format(message, 'warn'));
    }
    info(message) {
        console.info(this.format(message, 'info'));
    }
}
var log = new Logger();

let EventEmitter$1 = class EventEmitter {
    // Initialize callbacks with an empty object
    callbacks = {};
    /**
     * Initializes the callbacks for a given event. If the event does not already have
     * an entry in the callbacks object, a new empty array is created for it.
     * @param event - The name of the event to initialize. If not provided, it checks
     *                 for undefined events and initializes them if needed.
     */
    init(event) {
        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    }
    /**
     * Checks if a listener is a valid function. Throws a TypeError if the listener
     * is not a function.
     * @param listener - The listener to check. Should be a function that either returns void
     *                   or a Promise that resolves to void.
     */
    checkListener(listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('The listener must be a function');
        }
    }
    /**
     * Checks whether a specific event has been registered within the emitter.
     * @param event - The name of the event to check for existence.
     * @returns A boolean indicating whether the event exists in the callbacks.
     */
    hasEvent(event) {
        return this.callbacks[event] !== undefined;
    }
    /**
     * Retrieves all the listeners currently registered to the emitter.
     * @returns An object containing all registered events and their associated listeners.
     *          Each key is a string representing the event name, mapping to an array of
     *          listener functions.
     */
    listeners() {
        return this.callbacks;
    }
    /**
     * Adds a listener function for the specified event. This method is an alias for the
     * `on` method, purely for semantic purposes.
     * @param event - The name of the event to listen to.
     * @param listener - The function to invoke when the event is emitted. Can be asynchronous.
     * @returns The instance of the EventEmitter for method chaining.
     */
    addListener(event, listener) {
        return this.on(event, listener);
    }
    /**
     * Clears all listeners for a specific event or, if no event is provided, clears all
     * listeners for all events.
     * @param event - Optional. The name of the event whose listeners should be cleared.
     *                If omitted, all event listeners are cleared.
     * @returns The instance of the EventEmitter for method chaining.
     */
    clearListener(event) {
        if (event) {
            this.callbacks[event] = [];
        }
        else {
            this.callbacks = {};
        }
        return this;
    }
    /**
     * Adds a listener for a specific event type. Initializes the event if it's not already
     * present and ensures the listener is valid.
     * @param event - The name of the event to listen to.
     * @param listener - The function to call when the event is emitted. Can return a promise.
     * @returns The instance of the EventEmitter for method chaining.
     */
    on(event, listener) {
        this.checkListener(listener);
        this.init(event);
        this.callbacks[event].push(listener);
        return this;
    }
    /**
     * Removes a listener from a specific event. If no listener is provided, all listeners
     * for the event are removed.
     * @param event - The name of the event to remove a listener from.
     * @param listener - Optional. The specific listener to remove. If not provided, all
     *                   listeners for the event are removed.
     * @returns The instance of the EventEmitter for method chaining.
     */
    off(event, listener) {
        if (listener) {
            this.checkListener(listener);
        }
        const eventName = event;
        this.init();
        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // There is no callbacks with this key
            return this;
        }
        if (listener) {
            this.callbacks[eventName] = this.callbacks[eventName].filter((value) => value !== listener);
        }
        else {
            // Remove all listeners if no specific listener is provided
            this.callbacks[eventName] = [];
        }
        return this;
    }
    /**
     * Emits an event, invoking all registered listeners for that event with the provided
     * arguments. If any listener returns a promise, the method itself will return a promise
     * that resolves when all listeners have been processed.
     * @param event - The name of the event to emit.
     * @param args - Arguments to pass to each listener when invoked.
     * @returns A boolean or a promise resolving to a boolean indicating if listeners were
     *          successfully called and resolved/ran without error.
     */
    emit(event, ...args) {
        const eventName = event;
        // Initialize the event
        this.init(eventName);
        // If there are no callbacks, return false
        if (this.callbacks[eventName].length <= 0) {
            return false;
        }
        // Get all results
        const results = this.callbacks[eventName].map((callback) => {
            try {
                // Execute callback and capture the result
                const result = callback(...args);
                // If result is a promise, wrap it in Promise.resolve to handle uniformly
                return result instanceof Promise ? result : Promise.resolve(result);
            }
            catch (e) {
                console.error(`Error in event listener for event: ${eventName}`, e); // Logging error
                // Even if an error occurs, continue processing other callbacks
                return Promise.resolve();
            }
        });
        // Check if any result is a promise
        const hasPromise = results.some((result) => result instanceof Promise);
        // If there is at least one promise, return a promise that resolves when all promises resolve
        if (hasPromise) {
            return Promise.all(results)
                .then(() => true)
                .catch((e) => {
                console.error(`Error handling promises for event: ${eventName}`, e); // Logging error
                return false;
            });
        }
        else {
            // If no promises, return true
            return true;
        }
    }
    /**
     * Adds a listener for a specific event that will only be invoked once. After the first
     * invocation, the listener will be automatically removed.
     * @param event - The name of the event to listen to once.
     * @param listener - The function to invoke once when the event is emitted.
     * @returns The instance of the EventEmitter for method chaining.
     */
    once(event, listener) {
        this.checkListener(listener);
        const onceListener = (...args) => {
            // Use a sync wrapper to ensure the listener is removed immediately after execution
            const result = listener(...args);
            // Remove the listener immediately
            this.off(event, onceListener);
            // Handle async listeners by wrapping the result in Promise.resolve
            return result instanceof Promise ? result : Promise.resolve(result);
        };
        return this.on(event, onceListener);
    }
};

class Pipeline extends EventEmitter$1 {
    // Available steps for this pipeline
    _steps = new Map();
    // Used to cache the results of processors using their id field
    cache = new Map();
    // Keeps the index of the last updated processor in the registered
    // processors list and will be used to invalidate the cache
    // -1 means all new processors should be processed
    lastProcessorIndexUpdated = -1;
    constructor(steps) {
        super();
        if (steps) {
            steps.forEach((step) => this.register(step));
        }
    }
    /**
     * Clears the `cache` array
     */
    clearCache() {
        this.cache = new Map();
        this.lastProcessorIndexUpdated = -1;
    }
    /**
     * Registers a new processor
     *
     * @param processor
     * @param priority
     */
    register(processor, priority = -1) {
        if (!processor) {
            throw Error('Processor is not defined');
        }
        if (processor.type === null) {
            throw Error('Processor type is not defined');
        }
        if (this.findProcessorIndexByID(processor.id) > -1) {
            throw Error(`Processor ID ${processor.id} is already defined`);
        }
        // Binding the propsUpdated callback to the Pipeline
        processor.on('propsUpdated', this.processorPropsUpdated.bind(this, processor));
        this.addProcessorByPriority(processor, priority);
        this.afterRegistered(processor);
        return processor;
    }
    /**
     * Tries to register a new processor
     * @param processor
     * @param priority
     */
    tryRegister(processor, priority = -1) {
        try {
            return this.register(processor, priority);
        }
        catch (_) {
            return undefined;
        }
    }
    /**
     * Removes a processor from the list
     *
     * @param processor
     */
    unregister(processor) {
        if (!processor)
            return;
        if (this.findProcessorIndexByID(processor.id) === -1)
            return;
        const subSteps = this._steps.get(processor.type);
        if (subSteps && subSteps.length) {
            this._steps.set(processor.type, subSteps.filter((proc) => proc.id !== processor.id));
            // Remove the event listener
            processor.off('propsUpdated', this.processorPropsUpdated.bind(this, processor));
            this.emit('updated', processor);
        }
    }
    /**
     * Registers a new processor
     *
     * @param processor
     * @param priority
     */
    addProcessorByPriority(processor, priority = -1) {
        let subSteps = this._steps.get(processor.type);
        if (!subSteps) {
            const newSubStep = [];
            this._steps.set(processor.type, newSubStep);
            subSteps = newSubStep;
        }
        if (priority < 0 || priority >= subSteps.length) {
            subSteps.push(processor);
        }
        else {
            subSteps.splice(priority, 0, processor);
        }
    }
    /**
     * Flattens the _steps Map and returns a list of steps with their correct priorities
     */
    get steps() {
        let steps = [];
        for (const type of this.getSortedProcessorTypes()) {
            const subSteps = this._steps.get(type);
            if (subSteps && subSteps.length) {
                steps = steps.concat(subSteps);
            }
        }
        // To remove any undefined elements
        return steps.filter((s) => s);
    }
    /**
     * Accepts ProcessType and returns an array of the registered processes
     * with the give type
     *
     * @param type
     */
    getStepsByType(type) {
        return this.steps.filter((process) => process.type === type);
    }
    /**
     * Returns a list of ProcessorType according to their priority
     */
    getSortedProcessorTypes() {
        return Array.from(this._steps.keys()).sort((a, b) => Number(a) - Number(b));
    }
    async process(data) {
        const lastProcessorIndexUpdated = this.lastProcessorIndexUpdated;
        const steps = this.steps;
        let prev = data;
        try {
            for (const processor of steps) {
                const processorIndex = this.findProcessorIndexByID(processor.id);
                if (processorIndex >= lastProcessorIndexUpdated) {
                    // We should execute process() here since the last
                    // updated processor was before "processor".
                    // This is to ensure that we always have correct and up to date
                    // data from processors and also to skip them when necessary
                    prev = await processor.process(prev);
                    this.cache.set(processor.id, prev);
                }
                else {
                    // Cached results already exist
                    prev = this.cache.get(processor.id);
                    if (prev === undefined) {
                        prev = await processor.process(prev);
                    }
                }
            }
        }
        catch (e) {
            log.error(e);
            // Trigger the onError callback
            this.emit('error', prev);
            throw e;
        }
        // Means the pipeline is up to date
        this.lastProcessorIndexUpdated = steps.length;
        // Triggers the afterProcess callbacks with the results
        this.emit('afterProcess', prev);
        return prev;
    }
    async processInParallel(data) {
        const steps = this.steps;
        // No need for processor index check because all processors run in parallel
        const results = await Promise.all(steps.map((processor) => processor.process(data)));
        results.forEach((result, index) => this.cache.set(steps[index].id, result));
        this.lastProcessorIndexUpdated = steps.length;
        this.emit('afterProcess', results);
        return results;
    }
    /**
     * Removes all processors from the pipeline
     */
    clearProcessors() {
        this._steps.clear();
        this.clearCache();
    }
    /**
     * Returns processor by ID
     *
     * @param id
     */
    getProcessorByID(processorID) {
        const index = this.findProcessorIndexByID(processorID);
        return index > -1 ? this.steps[index] : null;
    }
    /**
     * Returns the registered processor's index in _steps array
     *
     * @param processorID
     */
    findProcessorIndexByID(processorID) {
        return this.steps.findIndex((p) => p.id == processorID);
    }
    async runProcessorByID(processorID, dataOrRunAllFollowing, runAllFollowing = true) {
        const processorIndex = this.findProcessorIndexByID(processorID);
        if (processorIndex === -1) {
            throw Error(`Processor ID ${processorID} not found`);
        }
        // Determine the actual type of dataOrRunAllFollowing
        let data;
        if (typeof dataOrRunAllFollowing === 'boolean') {
            runAllFollowing = dataOrRunAllFollowing;
        }
        else {
            data = dataOrRunAllFollowing;
        }
        if (runAllFollowing) {
            this.lastProcessorIndexUpdated = processorIndex;
            // Clear cache for all processors after the rerun processor
            this.clearCacheAfterProcessorIndex(processorIndex);
        }
        else {
            // If not re-running all, just clear the cache for the specific processor
            this.cache.delete(processorID);
        }
        return data ? this.process(data) : this.process();
    }
    /**
     * Clears the cache for all processors after the specified index
     *
     * @param index
     */
    clearCacheAfterProcessorIndex(index) {
        this.steps.slice(index).forEach((processor) => {
            this.cache.delete(processor.id);
        });
    }
    /**
     * Sets the last updates processors index locally
     * This is used to invalid or skip a processor in
     * the process() method
     */
    setLastProcessorIndex(processor) {
        const processorIndex = this.findProcessorIndexByID(processor.id);
        if (this.lastProcessorIndexUpdated > processorIndex) {
            this.lastProcessorIndexUpdated = processorIndex;
        }
    }
    processorPropsUpdated(processor) {
        this.setLastProcessorIndex(processor);
        this.emit('propsUpdated');
        this.emit('updated', processor);
    }
    afterRegistered(processor) {
        this.setLastProcessorIndex(processor);
        this.emit('afterRegister');
        this.emit('updated', processor);
    }
}

function deepEqual(obj1, obj2) {
    if (typeof obj1 !== typeof obj2)
        return false;
    if (obj1 === null || obj2 === null)
        return obj1 === obj2;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length)
            return false;
        return obj1.every((item, index) => deepEqual(item, obj2[index]));
    }
    if (Array.isArray(obj1) || Array.isArray(obj2))
        return false;
    if (obj1 instanceof Set && obj2 instanceof Set) {
        if (obj1.size !== obj2.size)
            return false;
        for (const item of obj1) {
            if (!obj2.has(item))
                return false;
        }
        return true;
    }
    if (obj1 instanceof Map && obj2 instanceof Map) {
        if (obj1.size !== obj2.size)
            return false;
        for (const [key, value] of obj1) {
            if (!deepEqual(value, obj2.get(key)))
                return false;
        }
        return true;
    }
    if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2))
        return false;
    const keys1 = Reflect.ownKeys(obj1);
    const keys2 = Reflect.ownKeys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key]))
            return false;
    }
    return true;
}
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// The order of enum items define the processing order of the processor type
// e.g. Extractor = 0 will be processed before Transformer = 1
class Processor extends EventEmitter$1 {
    id;
    name;
    static _statusTypes = ['idle', 'running', 'completed'];
    _props;
    _status;
    constructor(props, name) {
        super();
        this._props = {};
        this._status = 'idle';
        this.id = generateUUID();
        this.name = name ?? this.constructor.name;
        if (props)
            this.setProps(props);
    }
    /**
     * process is used to call beforeProcess and afterProcess callbacks
     * This function is just a wrapper that calls _process()
     *
     * @param args
     */
    async process(...args) {
        if (this.validateProps instanceof Function) {
            this.validateProps(...args);
        }
        this._status = 'running';
        this.emit('beforeProcess', ...args);
        try {
            const result = await this._process(...args);
            this._status = 'completed';
            this.emit('afterProcess', ...args);
            return result;
        }
        catch (error) {
            const errorObj = error instanceof Error ? error : new Error(String(error));
            this._status = 'idle';
            this.emit('error', errorObj, ...args);
            this.emit('afterProcess', ...args);
            throw errorObj;
        }
    }
    setProps(props) {
        const updatedProps = {
            ...this._props,
            ...props
        };
        if (!deepEqual(updatedProps, this._props)) {
            this._props = updatedProps;
            this.emit('propsUpdated', this);
        }
        return this;
    }
    get props() {
        return this._props;
    }
    get status() {
        return this._status;
    }
}

class StorageExtractor extends Processor {
    get type() {
        return ProcessorType.Extractor;
    }
    async _process(opts) {
        return await this.props.storage.get(opts);
    }
}

class ServerInitiator extends Processor {
    get type() {
        return ProcessorType.Initiator;
    }
    async _process() {
        return Object.entries(this.props.serverStorageOptions)
            .filter(([_, val]) => typeof val !== 'function')
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    }
}

class StorageResponseToArrayTransformer extends Processor {
    get type() {
        return ProcessorType.Transformer;
    }
    castData(data) {
        if (!data || !data.length) {
            return [];
        }
        if (!this.props.header || !this.props.header.columns) {
            return data;
        }
        const columns = Header.leafColumns(this.props.header.columns);
        // If it's a 2d array already
        if (data[0] instanceof Array) {
            return data.map((row) => {
                let pad = 0;
                return columns.map((column, i) => {
                    // Default `data` is provided for this column
                    if (column.data !== undefined) {
                        pad++;
                        if (typeof column.data === 'function') {
                            return column.data(row);
                        }
                        else {
                            return column.data;
                        }
                    }
                    return row[i - pad];
                });
            });
        }
        // If it's an array of objects (but not array of arrays, i.e JSON payload)
        if (typeof data[0] === 'object' && !(data[0] instanceof Array)) {
            return data.map((row) => columns.map((column, i) => {
                if (column.data !== undefined) {
                    if (typeof column.data === 'function') {
                        return column.data(row);
                    }
                    else {
                        return column.data;
                    }
                }
                else if (column.id) {
                    return row[column.id];
                }
                else {
                    log$1.error(`Could not find the correct cell for column at position ${i}. Make sure either 'id' or 'selector' is defined for all columns.`);
                    return null;
                }
            }));
        }
        return [];
    }
    async _process(storageResponse) {
        return {
            data: this.castData(storageResponse.data),
            total: storageResponse.total
        };
    }
}

function HTMLElement$1(props) {
    return _$3(props.parentElement || 'span', {
        dangerouslySetInnerHTML: { __html: props.content }
    });
}

function html(content, parentElement) {
    return _$3(HTMLElement$1, { content: content, parentElement: parentElement });
}

class Cell extends Base {
    // Because a Cell is a subset of TCell type
    data;
    constructor(data) {
        super();
        this.update(data);
    }
    cast(data) {
        if (data instanceof HTMLElement) {
            return html(data.outerHTML);
        }
        return data;
    }
    /**
     * Updates the Cell's data
     *
     * @param data
     */
    update(data) {
        this.data = this.cast(data);
        return this;
    }
}

class Row extends Base {
    _cells = [];
    constructor(cells) {
        super();
        this.cells = cells || [];
    }
    cell(index) {
        return this._cells[index];
    }
    get cells() {
        return this._cells;
    }
    set cells(cells) {
        this._cells = cells;
    }
    toArray() {
        return this.cells.map((cell) => cell.data);
    }
    /**
     * Creates a new Row from an array of Cell(s)
     * This method generates a new ID for the Row and all nested elements
     *
     * @param cells
     * @returns Row
     */
    static fromCells(cells) {
        return new Row(cells.map((cell) => new Cell(cell.data)));
    }
    get length() {
        return this.cells.length;
    }
}

function oneDtoTwoD(data) {
    if (data[0] && !(data[0] instanceof Array)) {
        return [data];
    }
    return data;
}

class Tabular extends Base {
    _rows = [];
    _length = 0;
    constructor(rows) {
        super();
        if (rows instanceof Array) {
            this.data = rows;
        }
        else if (rows instanceof Row) {
            this.data = [rows];
        }
        else {
            this.data = [];
        }
    }
    get data() {
        return this._rows;
    }
    set data(rows) {
        this._rows = rows;
    }
    get length() {
        return this._length || this.data.length;
    }
    // We want to sent the length when storage is ServerStorage
    set length(len) {
        this._length = len;
    }
    toArray() {
        return this.data.map((row) => row.toArray());
    }
    /**
     * Creates a new Tabular from an array of Row(s)
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param rows
     * @returns Tabular
     */
    static fromRows(rows) {
        return new Tabular(rows.map((row) => Row.fromCells(row.cells)));
    }
    /**
     * Creates a new Tabular from a 2D array
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param data
     * @returns Tabular
     */
    static fromArray(data) {
        data = oneDtoTwoD(data);
        return new Tabular(data.map((row) => new Row(row.map((cell) => new Cell(cell)))));
    }
}

class ArrayToTabularTransformer extends Processor {
    get type() {
        return ProcessorType.Transformer;
    }
    async _process(arrayResponse) {
        const tabular = Tabular.fromArray(arrayResponse.data);
        // For server-side storage
        tabular.length = arrayResponse.total;
        return tabular;
    }
}

class PipelineUtils {
    static createFromConfig(config) {
        const pipeline = new Pipeline();
        if (config.internal.storage instanceof ServerStorage) {
            pipeline.register(new ServerInitiator({
                serverStorageOptions: config.options.server
            }));
        }
        pipeline.register(new StorageExtractor({ storage: config.internal.storage }));
        pipeline.register(new StorageResponseToArrayTransformer({ header: config.internal.header }));
        pipeline.register(new ArrayToTabularTransformer());
        return pipeline;
    }
}

var enUS = {
    pagination: {
        previous: 'Previous',
        next: 'Next',
        ellipsis: '...',
        page: (page) => `Page ${page}`
    },
    loading: 'Loading...',
    noRecordsFound: 'No matching records found',
    error: 'An error happened while fetching the data'
};

class Translator {
    _language;
    _defaultLanguage;
    constructor(language) {
        this._language = language;
        this._defaultLanguage = enUS;
    }
    /**
     * Tries to split the message with "." and find
     * the key in the given language
     *
     * @param message
     * @param lang
     */
    getString(message, lang) {
        if (!lang || !message)
            return null;
        const splitted = message.split('.');
        const key = splitted[0];
        if (lang[key]) {
            const val = lang[key];
            if (this.isValidElement(val)) {
                return val;
            }
            else if (typeof val === 'string') {
                return () => val;
            }
            else if (typeof val === 'function') {
                return val;
            }
            else {
                return this.getString(splitted.slice(1).join('.'), val);
            }
        }
        return null;
    }
    /**
     * Checks if the given value is a valid VNode
     *
     * @param val
     */
    isValidElement(val) {
        return t$2(val);
    }
    /**
     * Translates the given message using the current language.
     * Falls back to the default language if the translation is not available.
     *
     * @param message
     * @param args
     */
    translate(message, ...args) {
        const translated = this.getString(message, this._language);
        let messageFormat;
        if (translated) {
            messageFormat = translated;
        }
        else {
            messageFormat = this.getString(message, this._defaultLanguage);
        }
        if (messageFormat) {
            return typeof messageFormat === 'function' ? messageFormat(...args) : messageFormat;
        }
        return message;
    }
}

class PluginManager {
    plugins;
    constructor() {
        this.plugins = [];
    }
    get(id) {
        return this.plugins.find((p) => p.id === id);
    }
    add(plugin) {
        if (!plugin.id) {
            log$1.error('Plugin ID cannot be empty');
            return this;
        }
        if (this.get(plugin.id)) {
            log$1.error(`Duplicate plugin ID: ${plugin.id}`);
            return this;
        }
        this.plugins.push({
            ...plugin,
            props: plugin.props
        });
        return this;
    }
    remove(id) {
        const plugin = this.get(id);
        if (plugin) {
            this.plugins.splice(this.plugins.indexOf(plugin), 1);
        }
        return this;
    }
    list(position) {
        let plugins;
        if (position != null || position != undefined) {
            plugins = this.plugins.filter((p) => p.position === position);
        }
        else {
            plugins = this.plugins;
        }
        return plugins.sort((a, b) => (a.order && b.order ? a.order - b.order : 1));
    }
}

class StateManager {
    state;
    listeners = [];
    isDispatching = false;
    constructor(initialState) {
        this.state = initialState;
    }
    /**
     * Retrieves the current state.
     *
     * @returns The current state.
     */
    getState = () => this.state;
    /**
     * Retrieves the list of current listeners.
     *
     * @returns An array of listener functions.
     */
    getListeners = () => this.listeners;
    /**
     * Dispatches an action to the state manager by executing the provided reducer function.
     * It prevents nested dispatches.
     *
     * @param reducer A function that takes the current state and returns the new state.
     * @returns The new state after applying the reducer.
     */
    dispatch = (reducer) => {
        if (typeof reducer !== 'function') {
            throw new Error('Reducer is not a function');
        }
        if (this.isDispatching) {
            throw new Error('Reducers may not dispatch actions');
        }
        this.isDispatching = true;
        const prevState = this.state;
        try {
            this.state = reducer(this.state);
        }
        finally {
            this.isDispatching = false;
        }
        for (const listener of this.listeners) {
            listener(this.state, prevState);
        }
        return this.state;
    };
    /**
     * Subscribes a listener to state changes.
     * The listener is called whenever the state changes, with both the current and previous state.
     *
     * @param listener A function that will be called when the state changes.
     * @returns A function that can be called to unsubscribe the listener.
     */
    subscribe = (listener) => {
        if (typeof listener !== 'function') {
            throw new Error('Listener is not a function');
        }
        this.listeners = [...this.listeners, listener];
        return () => (this.listeners = this.listeners.filter((lis) => lis !== listener));
    };
}

class Config {
    internalConfig = {};
    options = {};
    constructor() {
        this.assign(Config.defaultOption());
        this.assignInteral(Config.defaultConfig());
    }
    assign(partialOption) {
        Utils.shallowMerge(this.options, partialOption);
        return this;
    }
    assignInteral(partialConfig) {
        Utils.shallowMerge(this.internalConfig, partialConfig);
        return this;
    }
    update(partialOption) {
        if (!partialOption)
            return this;
        this.assign(Config.fromPartialOption({
            ...this.options,
            ...partialOption
        }));
        this.assignInteral(Config.fromPartialConfig(this));
        return this;
    }
    get internal() {
        return this.internalConfig;
    }
    static defaultConfig() {
        return {
            state: new StateManager({
                status: Status.Init,
                tabular: null,
                header: null
            }),
            plugin: new PluginManager()
        };
    }
    static defaultOption() {
        return {
            position: 'bottom',
            resetPageOnUpdate: false,
            pageNumber: 1,
            pageSize: 10,
            pageRange: 2,
            display: {
                showPrevious: true,
                showNext: true,
                showPageNumbers: true,
                hideFirstOnEllipsisShow: false,
                hideLastOnEllipsisShow: false,
                autoHidePrevious: false,
                autoHideNext: false
            },
            className: {
                container: '',
                active: 'active',
                disable: 'disabled',
                pageList: 'pages',
                pageButton: 'page-item',
                prevButton: 'page-prev',
                nextButton: 'page-next'
            }
        };
    }
    static fromPartialConfig(config) {
        // Header
        config.assignInteral({
            header: Header.createFromConfig(config)
        });
        // Storage
        config.assignInteral({
            storage: StorageUtils.createFromConfig(config)
        });
        // Pipeline
        config.assignInteral({
            pipeline: PipelineUtils.createFromConfig(config)
        });
        // Translator
        config.assignInteral({
            translator: new Translator(config.options.language)
        });
        // Clear existing plugins list to prevent duplicate errors
        config.internal.plugin = new PluginManager();
        // Additional plugins
        if (config.options.plugins) {
            config.options.plugins.forEach((p) => config.internal.plugin.add(p));
        }
        return config.internal;
    }
    static fromPartialOption(partialOption) {
        const config = new Config().assign(partialOption);
        return config.options;
    }
}
const ConfigContext = Q$1(undefined);

var f$2=0;function u$2(e,t,n,o,i,u){t||(t={});var a,c,p=t;if("ref"in p)for(c in p={},t)"ref"==c?a=t[c]:p[c]=t[c];var l={type:e,props:p,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--f$2,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a) void 0===p[c]&&(p[c]=a[c]);return l$2.vnode&&l$2.vnode(l),l}

function className(...args) {
    const prefix = 'paginatorjs';
    return `${prefix}${args.reduce((prev, cur) => `${prev}-${cur}`, '')}`;
}
function classJoin(...classNames) {
    return classNames
        .map((x) => (x ? x.toString() : ''))
        .filter((x) => x)
        .reduce((className, prev) => `${className || ''} ${prev}`, '')
        .trim();
}

const PageButton = ({ page, isActive, onClick, option, lang, text }) => {
    const content = text || lang('pagination.page', page);
    const textString = Utils.isString(content) ? content : '';
    return (u$2("button", { tabIndex: 0, role: "button", type: "button", onClick: onClick, className: classJoin(isActive ? classJoin(className('currentPage'), option.className.active) : '', option.className.pageButton), title: textString, "aria-label": textString, children: lang(`${page}`) }));
};
const EllipsisButton = ({ option, lang }) => (u$2("button", { tabIndex: -1, disabled: true, className: classJoin(className('spread'), option.className.pageButton, option.className.disable), children: lang('pagination.ellipsis') }));
const ActionButton = ({ act, onClick, option, text }) => {
    const textString = Utils.isString(text) ? text : '';
    return (u$2("button", { tabIndex: 0, role: "button", type: "button", onClick: onClick, className: classJoin(option.className.pageButton, act === 'prevBtn' ? option.className.prevButton : option.className.nextButton), title: textString, "aria-label": textString, children: text }));
};
const ActionButtonDisabled = ({ act, option, text }) => {
    const textString = Utils.isString(text) ? text : '';
    return (u$2("button", { tabIndex: -1, disabled: true, className: classJoin(className('disabled'), option.className.pageButton, act === 'prevBtn' ? option.className.prevButton : option.className.nextButton, option.className.disable), title: textString, "aria-label": textString, children: text }));
};

var t$1,r$1,u$1,i$1,o$1=0,f$1=[],c$1=l$2,e$1=c$1.__b,a$1=c$1.__r,v$2=c$1.diffed,l$1=c$1.__c,m=c$1.unmount,s$1=c$1.__;function p$2(n,t){c$1.__h&&c$1.__h(r$1,n,o$1||t),o$1=0;var u=r$1.__H||(r$1.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function d$1(n){return o$1=1,h$2(D$1,n)}function h$2(n,u,i){var o=p$2(t$1++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):D$1(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r$1,!r$1.__f)){var f=function(n,t,r){if(!o.__c.__H)return  true;var u=o.__c.__H.__.filter(function(n){return !!n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=o.__c.props!==n;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=true);}}),c&&c.call(this,n,t,r)||i};r$1.__f=true;var c=r$1.shouldComponentUpdate,e=r$1.componentWillUpdate;r$1.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r$1.shouldComponentUpdate=f;}return o.__N||o.__}function y$2(n,u){var i=p$2(t$1++,3);!c$1.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r$1.__H.__h.push(i));}function _$2(n,u){var i=p$2(t$1++,4);!c$1.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r$1.__h.push(i));}function A$1(n){return o$1=5,T$2(function(){return {current:n}},[])}function F$2(n,t,r){o$1=6,_$2(function(){if("function"==typeof n){var r=n(t());return function(){n(null),r&&"function"==typeof r&&r();}}if(n)return n.current=t(),function(){return n.current=null}},null==r?r:r.concat(n));}function T$2(n,r){var u=p$2(t$1++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function q$2(n,t){return o$1=8,T$2(function(){return n},t)}function x(n){var u=r$1.context[n.__c],i=p$2(t$1++,9);return i.c=n,u?(null==i.__&&(i.__=true,u.sub(r$1)),u.props.value):n.__}function j$1(){for(var n;n=f$1.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B$1),n.__H.__h=[];}catch(t){n.__H.__h=[],c$1.__e(t,n.__v);}}c$1.__b=function(n){r$1=null,e$1&&e$1(n);},c$1.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s$1&&s$1(n,t);},c$1.__r=function(n){a$1&&a$1(n),t$1=0;var i=(r$1=n.__c).__H;i&&(u$1===r$1?(i.__h=[],r$1.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0;})):(i.__h.forEach(z),i.__h.forEach(B$1),i.__h=[],t$1=0)),u$1=r$1;},c$1.diffed=function(n){v$2&&v$2(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f$1.push(t)&&i$1===c$1.requestAnimationFrame||((i$1=c$1.requestAnimationFrame)||w$1)(j$1)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0;})),u$1=r$1=null;},c$1.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return !n.__||B$1(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],c$1.__e(r,n.__v);}}),l$1&&l$1(n,t);},c$1.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n);}catch(n){t=n;}}),r.__H=void 0,t&&c$1.__e(t,r.__v));};var k="function"==typeof requestAnimationFrame;function w$1(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,35);k&&(t=requestAnimationFrame(r));}function z(n){var t=r$1,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r$1=t;}function B$1(n){var t=r$1;n.__c=n.__(),r$1=t;}function C(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D$1(n,t){return "function"==typeof t?t(n):t}

const useOption = () => {
    const context = x(ConfigContext);
    if (context === undefined) {
        throw new Error('useOption must be used within a ConfigProvider');
    }
    return context.options;
};

const useConfig = () => {
    const context = x(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context.internal;
};

function useTranslator() {
    const config = useConfig();
    return function (message, ...args) {
        return config.translator.translate(message, ...args);
    };
}

class PaginationLimit extends Processor {
    validateProps() {
        if (isNaN(Number(this.props.limit)) || isNaN(Number(this.props.page))) {
            throw Error('Invalid parameters passed');
        }
    }
    get type() {
        return ProcessorType.Limit;
    }
    async _process(tabular) {
        const pageNumber = this.props.page;
        const pageSize = this.props.limit;
        const totalNumber = tabular.data.length;
        const start = pageSize * (pageNumber - 1) + 1;
        const end = Math.min(pageNumber * pageSize, totalNumber);
        return new Tabular(tabular.data.slice(start - 1, end));
    }
}

class ServerPaginationLimit extends Processor {
    get type() {
        return ProcessorType.ServerLimit;
    }
    async _process(options) {
        const updates = {};
        if (this.props.url) {
            updates['url'] = this.props.url(options.url, this.props.page, this.props.limit);
        }
        if (this.props.body) {
            updates['body'] = this.props.body(options.body, this.props.page, this.props.limit);
        }
        return {
            ...options,
            ...updates
        };
    }
}

const i=Symbol.for("preact-signals");function t(){if(r>1){r--;return}let i,t=false;while(void 0!==s){let o=s;s=void 0;f++;while(void 0!==o){const n=o.o;o.o=void 0;o.f&=-3;if(!(8&o.f)&&v$1(o))try{o.c();}catch(o){if(!t){i=o;t=true;}}o=n;}}f=0;r--;if(t)throw i}function o(i){if(r>0)return i();r++;try{return i()}finally{t();}}let n,s;function h$1(i){const t=n;n=void 0;try{return i()}finally{n=t;}}let r=0,f=0,e=0;function c(i){if(void 0===n)return;let t=i.n;if(void 0===t||t.t!==n){t={i:0,S:i,p:n.s,n:void 0,t:n,e:void 0,x:void 0,r:t};if(void 0!==n.s)n.s.n=t;n.s=t;i.n=t;if(32&n.f)i.S(t);return t}else if(-1===t.i){t.i=0;if(void 0!==t.n){t.n.p=t.p;if(void 0!==t.p)t.p.n=t.n;t.p=n.s;t.n=void 0;n.s.n=t;n.s=t;}return t}}function u(i,t){this.v=i;this.i=0;this.n=void 0;this.t=void 0;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;}u.prototype.brand=i;u.prototype.h=function(){return  true};u.prototype.S=function(i){const t=this.t;if(t!==i&&void 0===i.e){i.x=t;this.t=i;if(void 0!==t)t.e=i;else h$1(()=>{var i;null==(i=this.W)||i.call(this);});}};u.prototype.U=function(i){if(void 0!==this.t){const t=i.e,o=i.x;if(void 0!==t){t.x=o;i.e=void 0;}if(void 0!==o){o.e=t;i.x=void 0;}if(i===this.t){this.t=o;if(void 0===o)h$1(()=>{var i;null==(i=this.Z)||i.call(this);});}}};u.prototype.subscribe=function(i){return E$1(()=>{const t=this.value,o=n;n=void 0;try{i(t);}finally{n=o;}})};u.prototype.valueOf=function(){return this.value};u.prototype.toString=function(){return this.value+""};u.prototype.toJSON=function(){return this.value};u.prototype.peek=function(){const i=n;n=void 0;try{return this.value}finally{n=i;}};Object.defineProperty(u.prototype,"value",{get(){const i=c(this);if(void 0!==i)i.i=this.i;return this.v},set(i){if(i!==this.v){if(f>100)throw new Error("Cycle detected");this.v=i;this.i++;e++;r++;try{for(let i=this.t;void 0!==i;i=i.x)i.t.N();}finally{t();}}}});function d(i,t){return new u(i,t)}function v$1(i){for(let t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return  true;return  false}function l(i){for(let t=i.s;void 0!==t;t=t.n){const o=t.S.n;if(void 0!==o)t.r=o;t.S.n=t;t.i=-1;if(void 0===t.n){i.s=t;break}}}function y$1(i){let t,o=i.s;while(void 0!==o){const i=o.p;if(-1===o.i){o.S.U(o);if(void 0!==i)i.n=o.n;if(void 0!==o.n)o.n.p=i;}else t=o;o.S.n=o.r;if(void 0!==o.r)o.r=void 0;o=i;}i.s=t;}function a(i,t){u.call(this,void 0);this.x=i;this.s=void 0;this.g=e-1;this.f=4;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;}a.prototype=new u;a.prototype.h=function(){this.f&=-3;if(1&this.f)return  false;if(32==(36&this.f))return  true;this.f&=-5;if(this.g===e)return  true;this.g=e;this.f|=1;if(this.i>0&&!v$1(this)){this.f&=-2;return  true}const i=n;try{l(this);n=this;const i=this.x();if(16&this.f||this.v!==i||0===this.i){this.v=i;this.f&=-17;this.i++;}}catch(i){this.v=i;this.f|=16;this.i++;}n=i;y$1(this);this.f&=-2;return  true};a.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(let i=this.s;void 0!==i;i=i.n)i.S.S(i);}u.prototype.S.call(this,i);};a.prototype.U=function(i){if(void 0!==this.t){u.prototype.U.call(this,i);if(void 0===this.t){this.f&=-33;for(let i=this.s;void 0!==i;i=i.n)i.S.U(i);}}};a.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let i=this.t;void 0!==i;i=i.x)i.t.N();}};Object.defineProperty(a.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const i=c(this);this.h();if(void 0!==i)i.i=this.i;if(16&this.f)throw this.v;return this.v}});function w(i,t){return new a(i,t)}function _$1(i){const o=i.u;i.u=void 0;if("function"==typeof o){r++;const s=n;n=void 0;try{o();}catch(t){i.f&=-2;i.f|=8;b$1(i);throw t}finally{n=s;t();}}}function b$1(i){for(let t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0;i.s=void 0;_$1(i);}function g$2(i){if(n!==this)throw new Error("Out-of-order effect");y$1(this);n=i;this.f&=-2;if(8&this.f)b$1(this);t();}function p$1(i){this.x=i;this.u=void 0;this.s=void 0;this.o=void 0;this.f=32;}p$1.prototype.c=function(){const i=this.S();try{if(8&this.f)return;if(void 0===this.x)return;const t=this.x();if("function"==typeof t)this.u=t;}finally{i();}};p$1.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1;this.f&=-9;_$1(this);l(this);r++;const i=n;n=this;return g$2.bind(this,i)};p$1.prototype.N=function(){if(!(2&this.f)){this.f|=2;this.o=s;s=this;}};p$1.prototype.d=function(){this.f|=8;if(!(1&this.f))b$1(this);};p$1.prototype.dispose=function(){this.d();};function E$1(i){const t=new p$1(i);try{t.c();}catch(i){t.d();throw i}const o=t.d.bind(t);o[Symbol.dispose]=o;return o}

let h,p,_=[];E$1(function(){h=this.N;})();function v(t,e){l$2[t]=e.bind(null,l$2[t]||(()=>{}));}function g$1(t){if(p)p();p=t&&t.S();}function b({data:t}){const i=useSignal(t);i.value=t;const[n,f]=T$2(()=>{let t=this,n=this.__v;while(n=n.__)if(n.__c){n.__c.__$f|=4;break}const o=w(()=>{let t=i.value.value;return 0===t?0:true===t?"":t||""}),f=w(()=>!Array.isArray(o.value)&&!t$2(o.value)),r=E$1(function(){this.N=T$1;if(f.value){const i=o.value;if(t.__v&&t.__v.__e&&3===t.__v.__e.nodeType)t.__v.__e.data=i;}}),u=this.__$u.d;this.__$u.d=function(){r();u.call(this);};return [f,o]},[]);return n.value?f.peek():f.value}b.displayName="_st";Object.defineProperties(u.prototype,{constructor:{configurable:true,value:void 0},type:{configurable:true,value:b},props:{configurable:true,get(){return {data:this}}},__b:{configurable:true,value:1}});v("__b",(t,i)=>{if("string"==typeof i.type){let t,e=i.props;for(let n in e){if("children"===n)continue;let o=e[n];if(o instanceof u){if(!t)i.__np=t={};t[n]=o;e[n]=o.peek();}}}t(i);});v("__r",(t,i)=>{if(i.type!==k$1){g$1();let t,e=i.__c;if(e){e.__$f&=-2;t=e.__$u;if(void 0===t)e.__$u=t=function(t){let i;E$1(function(){i=this;});i.c=()=>{e.__$f|=1;e.setState({});};return i}();}g$1(t);}t(i);});v("__e",(t,i,e,n)=>{g$1();t(i,e,n);});v("diffed",(t,i)=>{g$1();let e;if("string"==typeof i.type&&(e=i.__e)){let t=i.__np,n=i.props;if(t){let i=e.U;if(i)for(let e in i){let n=i[e];if(void 0!==n&&!(e in t)){n.d();i[e]=void 0;}}else {i={};e.U=i;}for(let o in t){let f=i[o],r=t[o];if(void 0===f){f=y(e,o,r,n);i[o]=f;}else f.o(r,n);}}}t(i);});function y(t,i,e,n){const o=i in t&&void 0===t.ownerSVGElement,f=d(e);return {o:(t,i)=>{f.value=t;n=i;},d:E$1(function(){this.N=T$1;const e=f.value.value;if(n[i]!==e){n[i]=e;if(o)t[i]=e;else if(e)t.setAttribute(i,e);else t.removeAttribute(i);}})}}v("unmount",(t,i)=>{if("string"==typeof i.type){let t=i.__e;if(t){const i=t.U;if(i){t.U=void 0;for(let t in i){let e=i[t];if(e)e.d();}}}}else {let t=i.__c;if(t){const i=t.__$u;if(i){t.__$u=void 0;i.d();}}}t(i);});v("__h",(t,i,e,n)=>{if(n<3||9===n)i.__$f|=2;t(i,e,n);});x$1.prototype.shouldComponentUpdate=function(t,i){const e=this.__$u,n=e&&void 0!==e.s;for(let t in i)return  true;if(this.__f||"boolean"==typeof this.u&&true===this.u){const t=2&this.__$f;if(!(n||t||4&this.__$f))return  true;if(1&this.__$f)return  true}else {if(!(n||4&this.__$f))return  true;if(3&this.__$f)return  true}for(let i in t)if("__source"!==i&&t[i]!==this.props[i])return  true;for(let i in this.props)if(!(i in t))return  true;return  false};function useSignal(t,i){return T$2(()=>d(t,i),[])}const q$1=t=>{queueMicrotask(()=>{queueMicrotask(t);});};function F$1(){o(()=>{let t;while(t=_.shift())h.call(t);});}function T$1(){if(1===_.push(this))(l$2.requestAnimationFrame||q$1)(F$1);}

const usePagination = (option, initialPage) => {
    const config = useConfig();
    const processor = A$1();
    const currentPage = useSignal(initialPage);
    const total = useSignal(0);
    const { server, pageRange, pageSize, resetPageOnUpdate } = option;
    // Rendered
    y$2(() => {
        config.eventEmitter.emit('rendered');
    }, []);
    // Initialize and set up the processor
    y$2(() => {
        if (server && (server.pageUrl || server.pageBody)) {
            processor.current = new ServerPaginationLimit({
                limit: pageSize,
                page: currentPage.value,
                url: server.pageUrl,
                body: server.pageBody
            });
            config.pipeline.on('afterProcess', (storage) => {
                if (storage && storage instanceof Tabular) {
                    total.value = storage.length;
                }
            });
        }
        else {
            processor.current = new PaginationLimit({
                limit: pageSize,
                page: currentPage.value
            });
            // Pagination (all Limit processors) is the last step in the pipeline
            // and we assume that at this stage, we have the rows that we care about.
            // Let's grab the rows before processing Pagination and set total number of rows
            processor.current.on('beforeProcess', (storage) => {
                total.value = storage.length;
            });
        }
        config.pipeline.register(processor.current);
        config.pipeline.on('updated', onUpdate);
        // We need to make sure that the state is set
        // to the default props when an error happens
        config.pipeline.on('error', () => {
            total.value = 0;
            currentPage.value = 0;
        });
        return () => {
            config.pipeline.unregister(processor.current);
            config.pipeline.off('updated', onUpdate);
        };
    }, [option, initialPage]);
    const onUpdate = (updatedProcessor) => {
        // This is to ensure that the current page is set to 0
        // when a processor is updated for some reason
        if (resetPageOnUpdate && updatedProcessor !== processor.current) {
            currentPage.value = 0;
            if (processor.current && processor.current.props.page !== 0) {
                processor.current.setProps({ page: 0 });
            }
        }
    };
    const setPage = (page) => {
        if (page < 0 || page === currentPage.value || page > getTotalPage())
            return;
        currentPage.value = page;
        processor.current?.setProps({ page });
    };
    const getTotalPage = () => Math.ceil(total.value / option.pageSize);
    const goPage = (pageNumber, type) => {
        if (type === 'prev') {
            config.eventEmitter.emit('previousClick', pageNumber);
        }
        if (type === 'next') {
            config.eventEmitter.emit('nextClick', pageNumber);
        }
        if (!type) {
            config.eventEmitter.emit('pageClick', pageNumber);
        }
        if (pageNumber === 1) {
            config.eventEmitter.emit('isFirstPage');
        }
        else if (pageNumber === getTotalPage()) {
            config.eventEmitter.emit('isLastPage');
        }
        setPage(pageNumber);
    };
    return {
        currentPage,
        setPage,
        goPage,
        getTotalPage,
        pageRange
    };
};

function g(n,t){for(var e in t)n[e]=t[e];return n}function E(n,t){for(var e in n)if("__source"!==e&&!(e in t))return  true;for(var r in t)if("__source"!==r&&n[r]!==t[r])return  true;return  false}function N(n,t){this.props=n,this.context=t;}(N.prototype=new x$1).isPureReactComponent=true,N.prototype.shouldComponentUpdate=function(n,t){return E(this.props,n)||E(this.state,t)};var T=l$2.__b;l$2.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),T&&T(n);};var A="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function D(n){function t(t){var e=g({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=A,t.render=t,t.prototype.isReactComponent=t.__f=true,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var F=l$2.__e;l$2.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);F(n,t,e,r);};var U=l$2.unmount;function V(n,t,e){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),null!=(n=g({},n)).__c&&(n.__c.__P===e&&(n.__c.__P=t),n.__c.__e=true,n.__c=null),n.__k=n.__k&&n.__k.map(function(n){return V(n,t,e)})),n}function W(n,t,e){return n&&e&&(n.__v=null,n.__k=n.__k&&n.__k.map(function(n){return W(n,t,e)}),n.__c&&n.__c.__P===t&&(n.__e&&e.appendChild(n.__e),n.__c.__e=true,n.__c.__P=e)),n}function P(){this.__u=0,this.o=null,this.__b=null;}function j(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function B(){this.i=null,this.l=null;}l$2.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&32&n.__u&&(n.type=null),U&&U(n);},(P.prototype=new x$1).__c=function(n,t){var e=t.__c,r=this;null==r.o&&(r.o=[]),r.o.push(e);var u=j(r.__v),o=false,i=function(){o||(o=true,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=W(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__a:r.__b=null});t=r.o.pop();)t.forceUpdate();}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i);},P.prototype.componentWillUnmount=function(){this.o=[];},P.prototype.render=function(n,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=V(this.__b,r,o.__O=o.__P);}this.__b=null;}var i=e.__a&&_$3(k$1,null,n.fallback);return i&&(i.__u&=-33),[_$3(k$1,null,e.__a?null:n.children),i]};var H=function(n,t,e){if(++e[1]===e[0]&&n.l.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.l.size))for(e=n.i;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.i=e=e[2];}};(B.prototype=new x$1).__a=function(n){var t=this,e=j(t.__v),r=t.l.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),H(t,n,r)):u();};e?e(o):o();}},B.prototype.render=function(n){this.i=null,this.l=new Map;var t=H$1(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.l.set(t[e],this.i=[1,0,this.i]);return n.children},B.prototype.componentDidUpdate=B.prototype.componentDidMount=function(){var n=this;this.l.forEach(function(t,e){H(n,e,t);});};var q="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,G=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,J=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,K=/[A-Z0-9]/g,Q="undefined"!=typeof document,X=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(n)};x$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(x$1.prototype,t,{configurable:true,get:function(){return this["UNSAFE_"+t]},set:function(n){Object.defineProperty(this,t,{configurable:true,writable:true,value:n});}});});var en=l$2.event;function rn(){}function un(){return this.cancelBubble}function on(){return this.defaultPrevented}l$2.event=function(n){return en&&(n=en(n)),n.persist=rn,n.isPropagationStopped=un,n.isDefaultPrevented=on,n.nativeEvent=n};var cn={enumerable:false,configurable:true,get:function(){return this.class}},fn=l$2.vnode;l$2.vnode=function(n){"string"==typeof n.type&&function(n){var t=n.props,e=n.type,u={},o=-1===e.indexOf("-");for(var i in t){var l=t[i];if(!("value"===i&&"defaultValue"in t&&null==l||Q&&"children"===i&&"noscript"===e||"class"===i||"className"===i)){var c=i.toLowerCase();"defaultValue"===i&&"value"in t&&null==t.value?i="value":"download"===i&&true===l?l="":"translate"===c&&"no"===l?l=false:"o"===c[0]&&"n"===c[1]?"ondoubleclick"===c?i="ondblclick":"onchange"!==c||"input"!==e&&"textarea"!==e||X(t.type)?"onfocus"===c?i="onfocusin":"onblur"===c?i="onfocusout":J.test(i)&&(i=c):c=i="oninput":o&&G.test(i)?i=i.replace(K,"-$&").toLowerCase():null===l&&(l=void 0),"oninput"===c&&u[i=c]&&(i="oninputCapture"),u[i]=l;}}"select"==e&&u.multiple&&Array.isArray(u.value)&&(u.value=H$1(t.children).forEach(function(n){n.props.selected=-1!=u.value.indexOf(n.props.value);})),"select"==e&&null!=u.defaultValue&&(u.value=H$1(t.children).forEach(function(n){n.props.selected=u.multiple?-1!=u.defaultValue.indexOf(n.props.value):u.defaultValue==n.props.value;})),t.class&&!t.className?(u.class=t.class,Object.defineProperty(u,"className",cn)):(t.className&&!t.class||t.class&&t.className)&&(u.class=u.className=t.className),n.props=u;}(n),n.$$typeof=q,fn&&fn(n);};var an=l$2.__r;l$2.__r=function(n){an&&an(n),n.__c;};var sn=l$2.diffed;l$2.diffed=function(n){sn&&sn(n);var t=n.props,e=n.__e;null!=e&&"textarea"===n.type&&"value"in t&&t.value!==e.value&&(e.value=null==t.value?"":t.value);};

const PageRenderer = D((_, ref) => {
    const option = useOption();
    const display = option.display;
    const lang = useTranslator();
    const { currentPage, setPage, goPage, getTotalPage, pageRange } = usePagination(option, option.pageNumber);
    // Expose the methods to the parent component
    F$2(ref, () => ({
        setPage,
        currentPage: currentPage.value,
        totalPage: getTotalPage()
    }));
    const renderPageNumbers = () => {
        const totalPage = getTotalPage(); // Calculate the total number of pages
        const pagerNumbers = []; // Array to store the page buttons
        // If there is no page to render, return an empty array
        if (pageRange < 0)
            return pagerNumbers;
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
                pagerNumbers.push(u$2(PageButton, { page: i, isActive: currentPage.value === i, onClick: () => goPage(i), option: option, lang: lang, text: lang('pagination.page', i + 1) }, `page-${i}`));
            }
            return pagerNumbers;
        }
        // If range start is close to the beginning, render pages directly
        if (rangeStart <= 3) {
            for (let i = 1; i < rangeStart; i++) {
                pagerNumbers.push(u$2(PageButton, { page: i, isActive: false, onClick: () => goPage(i), option: option, lang: lang }, `page-${i}`));
            }
        }
        else {
            // Render ellipsis and optionally the first page if range start is far
            if (!display.hideFirstOnEllipsisShow) {
                pagerNumbers.push(u$2(PageButton, { page: 1, isActive: false, onClick: () => goPage(1), option: option, lang: lang }, 'page-1'));
            }
            pagerNumbers.push(u$2(EllipsisButton, { option: option, lang: lang }, 'ellipsis-start'));
        }
        // Loop through the calculated range to render page buttons
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pagerNumbers.push(u$2(PageButton, { page: i, isActive: currentPage.value === i, onClick: () => goPage(i), option: option, lang: lang }, `page-${i}`));
        }
        // If the range end is near the last pages, render remaining pages
        if (rangeEnd >= totalPage - 2) {
            for (let i = rangeEnd + 1; i <= totalPage; i++) {
                pagerNumbers.push(u$2(PageButton, { page: i, isActive: false, onClick: () => goPage(i), option: option, lang: lang }, `page-${i}`));
            }
        }
        else {
            // Render ellipsis and optionally the last page if range end is far
            pagerNumbers.push(u$2(EllipsisButton, { option: option, lang: lang }, 'ellipsis-end'));
            if (!display.hideLastOnEllipsisShow) {
                pagerNumbers.push(u$2(PageButton, { page: totalPage, isActive: false, onClick: () => goPage(totalPage), option: option, lang: lang }, `page-${totalPage}`));
            }
        }
        return pagerNumbers;
    };
    return (u$2("div", { className: classJoin(className('pages'), option.className.pageList), children: [display.showPrevious && currentPage.value <= 1 ? (!display.autoHidePrevious && (u$2(ActionButtonDisabled, { act: 'prevBtn', option: option, text: lang('pagination.previous') }, 'prev'))) : (u$2(ActionButton, { act: 'prevBtn', onClick: () => goPage(currentPage.value - 1, 'prev'), option: option, text: lang('pagination.previous') }, 'prev')), display.showPageNumbers && renderPageNumbers(), display.showNext && currentPage.value >= getTotalPage() ? (!display.autoHideNext && (u$2(ActionButtonDisabled, { act: 'nextBtn', option: option, text: lang('pagination.next') }, 'next'))) : (u$2(ActionButton, { act: 'nextBtn', onClick: () => goPage(currentPage.value + 1, 'next'), option: option, text: lang('pagination.next') }, 'next'))] }));
});

function useStore() {
    const config = useConfig();
    return config.state;
}

function useSelector(selector) {
    const store = useStore();
    const current = useSignal(selector(store.getState()));
    y$2(() => {
        const unsubscribe = store.subscribe(() => {
            const updated = selector(store.getState());
            if (current.value !== updated) {
                current.value = updated;
            }
        });
        return unsubscribe;
    }, []);
    return current.value;
}

/**
 * Throttle a given function
 *
 * @param fn Function to be called
 * @param wait Throttle timeout in milliseconds
 *
 * @returns Throttled function
 */
const throttle = (fn, wait = 100) => {
    let timeoutId;
    let lastTime = Date.now();
    const execute = (...args) => {
        lastTime = Date.now();
        fn(...args);
    };
    return (...args) => {
        const currentTime = Date.now();
        const elapsed = currentTime - lastTime;
        if (elapsed >= wait) {
            // If enough time has passed since the last call, execute the function immediately
            execute(...args);
        }
        else {
            // If not enough time has passed, schedule the function call after the remaining delay
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                execute(...args);
                timeoutId = 0;
            }, wait - elapsed);
        }
    };
};

const SetStatusToRendered = () => (state) => {
    if (state.status === Status.Loaded) {
        return {
            ...state,
            status: Status.Rendered
        };
    }
    return state;
};
const SetLoadingData = () => (state) => {
    return {
        ...state,
        status: Status.Loading
    };
};
const SetData = (data) => (state) => {
    if (!data)
        return state;
    return {
        ...state,
        tabular: data,
        status: Status.Loaded
    };
};
const SetDataErrored = () => (state) => {
    return {
        ...state,
        tabular: null,
        status: Status.Error
    };
};
const SetHeader = (header) => (state) => {
    return {
        ...state,
        header: header || null
    };
};

function Container() {
    const config = useConfig();
    const option = useOption();
    const { dispatch } = useStore();
    const status = useSelector((state) => state.status);
    const tabular = useSelector((state) => state.tabular);
    const containerRef = b$2();
    const pageRendererRef = A$1(null);
    const processPipeline = throttle(async () => {
        dispatch(SetLoadingData());
        try {
            const result = await config.pipeline.process();
            if (result instanceof Tabular) {
                dispatch(SetData(result));
            }
            Promise.resolve().then(() => {
                dispatch(SetStatusToRendered());
            });
        }
        catch (e) {
            log$1.error(e);
            dispatch(SetDataErrored());
        }
    }, 100);
    // Process Pipeline
    y$2(() => {
        // Set the initial header object
        dispatch(SetHeader(config.header));
        // Process the pipeline
        processPipeline();
        config.pipeline.on('updated', processPipeline);
        return () => config.pipeline.off('updated', processPipeline);
    }, []);
    // Ready
    y$2(() => {
        if (config.header && status === Status.Loaded && tabular?.length) {
            config.eventEmitter.emit('ready');
        }
    }, [tabular, option, containerRef]);
    // Render Paginator
    y$2(() => {
        const ele = containerRef.current;
        if (ele) {
            if (option.container) {
                if (option.position === 'bottom') {
                    option.container.appendChild(ele);
                }
                else {
                    option.container.insertBefore(ele, option.container.firstChild);
                }
            }
        }
    }, []);
    // Handle events
    y$2(() => {
        const handleGo = (pageNumber) => {
            if (pageRendererRef.current) {
                pageRendererRef.current.setPage(pageNumber);
            }
        };
        config.eventEmitter.on('go', handleGo);
        return () => config.eventEmitter.off('go', handleGo);
    }, [pageRendererRef]);
    // Render data after the paginator is rendered
    y$2(() => {
        if (option.dataRender && status === Status.Rendered && tabular?.length && pageRendererRef.current) {
            config.eventEmitter.emit('beforePaging', pageRendererRef.current.currentPage);
            option.dataRender(tabular.toArray());
            config.eventEmitter.emit('afterPaging', pageRendererRef.current.currentPage);
        }
    }, [status]);
    return (u$2("div", { ref: containerRef, className: classJoin(className('container'), option.className.container), children: u$2(PageRenderer, { ref: pageRendererRef }) }));
}

function PluginRenderer(props) {
    const config = useConfig();
    if (props.pluginId) {
        // Render a single plugin
        const plugin = config.plugin.get(props.pluginId);
        if (!plugin)
            return null;
        return _$3(k$1, {}, _$3(plugin.component, {
            plugin: plugin,
            ...props.props,
            ...plugin.props
        }));
    }
    else if (props.position !== undefined) {
        // Render using a specific plugin position
        return _$3(k$1, {}, config.plugin.list(props.position).map((p) => {
            return _$3(p.component, { plugin: p, ...props.props, ...p.props });
        }));
    }
    return null;
}

function HeaderContainer() {
    const option = useOption();
    const isActive = useSignal(true);
    const headerRef = A$1(null);
    y$2(() => {
        if (headerRef.current && headerRef.current.children.length === 0) {
            isActive.value = false;
        }
    }, [headerRef]);
    if (isActive.value) {
        return (u$2("div", { ref: headerRef, className: classJoin(className('plugin', 'head'), option.pluginClassName?.header), children: u$2(PluginRenderer, { position: PluginPosition.Header }) }));
    }
    return null;
}

function FooterContainer() {
    const option = useOption();
    const isActive = useSignal(true);
    const footerRef = A$1(null);
    y$2(() => {
        if (footerRef.current && footerRef.current.children.length === 0) {
            isActive.value = false;
        }
    }, [footerRef]);
    if (isActive.value) {
        return (u$2("div", { ref: footerRef, className: classJoin(className('plugin', 'footer'), option.pluginClassName?.footer), children: u$2(PluginRenderer, { position: PluginPosition.Footer }) }));
    }
    return null;
}

function PluginContainer() {
    const option = useOption();
    const status = useSelector((state) => state.status);
    return (u$2("div", { role: "complementary", className: classJoin(className('plugin', 'container'), status === Status.Loading ? className('plugin', 'loading') : null, option.pluginClassName?.container), children: [status === Status.Loading && u$2("div", { className: className('plugin', 'loading-bar') }), u$2(HeaderContainer, {}), u$2("div", { className: classJoin(className('plugin', 'wrapper'), option.pluginClassName?.wrapper), children: u$2(PluginRenderer, { position: PluginPosition.Body }) }), u$2(FooterContainer, {})] }));
}

class EventEmitter {
    // Initialize callbacks with an empty object
    callbacks = {};
    /**
     * Initializes the callbacks for a given event. If the event does not already have
     * an entry in the callbacks object, a new empty array is created for it.
     * @param event - The name of the event to initialize. If not provided, it checks
     *                 for undefined events and initializes them if needed.
     */
    init(event) {
        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    }
    /**
     * Checks if a listener is a valid function. Throws a TypeError if the listener
     * is not a function.
     * @param listener - The listener to check. Should be a function that either returns void
     *                   or a Promise that resolves to void.
     */
    checkListener(listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('The listener must be a function');
        }
    }
    /**
     * Checks whether a specific event has been registered within the emitter.
     * @param event - The name of the event to check for existence.
     * @returns A boolean indicating whether the event exists in the callbacks.
     */
    hasEvent(event) {
        return this.callbacks[event] !== undefined;
    }
    /**
     * Retrieves all the listeners currently registered to the emitter.
     * @returns An object containing all registered events and their associated listeners.
     *          Each key is a string representing the event name, mapping to an array of
     *          listener functions.
     */
    listeners() {
        return this.callbacks;
    }
    /**
     * Adds a listener function for the specified event. This method is an alias for the
     * `on` method, purely for semantic purposes.
     * @param event - The name of the event to listen to.
     * @param listener - The function to invoke when the event is emitted. Can be asynchronous.
     * @returns The instance of the EventEmitter for method chaining.
     */
    addListener(event, listener) {
        return this.on(event, listener);
    }
    /**
     * Clears all listeners for a specific event or, if no event is provided, clears all
     * listeners for all events.
     * @param event - Optional. The name of the event whose listeners should be cleared.
     *                If omitted, all event listeners are cleared.
     * @returns The instance of the EventEmitter for method chaining.
     */
    clearListener(event) {
        if (event) {
            this.callbacks[event] = [];
        }
        else {
            this.callbacks = {};
        }
        return this;
    }
    /**
     * Adds a listener for a specific event type. Initializes the event if it's not already
     * present and ensures the listener is valid.
     * @param event - The name of the event to listen to.
     * @param listener - The function to call when the event is emitted. Can return a promise.
     * @returns The instance of the EventEmitter for method chaining.
     */
    on(event, listener) {
        this.checkListener(listener);
        this.init(event);
        this.callbacks[event].push(listener);
        return this;
    }
    /**
     * Removes a listener from a specific event. If no listener is provided, all listeners
     * for the event are removed.
     * @param event - The name of the event to remove a listener from.
     * @param listener - Optional. The specific listener to remove. If not provided, all
     *                   listeners for the event are removed.
     * @returns The instance of the EventEmitter for method chaining.
     */
    off(event, listener) {
        if (listener) {
            this.checkListener(listener);
        }
        const eventName = event;
        this.init();
        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // There is no callbacks with this key
            return this;
        }
        if (listener) {
            this.callbacks[eventName] = this.callbacks[eventName].filter((value) => value !== listener);
        }
        else {
            // Remove all listeners if no specific listener is provided
            this.callbacks[eventName] = [];
        }
        return this;
    }
    /**
     * Emits an event, invoking all registered listeners for that event with the provided
     * arguments. If any listener returns a promise, the method itself will return a promise
     * that resolves when all listeners have been processed.
     * @param event - The name of the event to emit.
     * @param args - Arguments to pass to each listener when invoked.
     * @returns A boolean or a promise resolving to a boolean indicating if listeners were
     *          successfully called and resolved/ran without error.
     */
    emit(event, ...args) {
        const eventName = event;
        // Initialize the event
        this.init(eventName);
        // If there are no callbacks, return false
        if (this.callbacks[eventName].length <= 0) {
            return false;
        }
        // Get all results
        const results = this.callbacks[eventName].map((callback) => {
            try {
                // Execute callback and capture the result
                const result = callback(...args);
                // If result is a promise, wrap it in Promise.resolve to handle uniformly
                return result instanceof Promise ? result : Promise.resolve(result);
            }
            catch (e) {
                console.error(`Error in event listener for event: ${eventName}`, e); // Logging error
                // Even if an error occurs, continue processing other callbacks
                return Promise.resolve();
            }
        });
        // Check if any result is a promise
        const hasPromise = results.some((result) => result instanceof Promise);
        // If there is at least one promise, return a promise that resolves when all promises resolve
        if (hasPromise) {
            return Promise.all(results)
                .then(() => true)
                .catch((e) => {
                console.error(`Error handling promises for event: ${eventName}`, e); // Logging error
                return false;
            });
        }
        else {
            // If no promises, return true
            return true;
        }
    }
    /**
     * Adds a listener for a specific event that will only be invoked once. After the first
     * invocation, the listener will be automatically removed.
     * @param event - The name of the event to listen to once.
     * @param listener - The function to invoke once when the event is emitted.
     * @returns The instance of the EventEmitter for method chaining.
     */
    once(event, listener) {
        this.checkListener(listener);
        const onceListener = (...args) => {
            // Use a sync wrapper to ensure the listener is removed immediately after execution
            const result = listener(...args);
            // Remove the listener immediately
            this.off(event, onceListener);
            // Handle async listeners by wrapping the result in Promise.resolve
            return result instanceof Promise ? result : Promise.resolve(result);
        };
        return this.on(event, onceListener);
    }
}

class Paginator extends EventEmitter {
    static version = '2.2.48';
    config;
    plugin;
    constructor(config) {
        super();
        this.config = new Config().assignInteral({ instance: this, eventEmitter: this }).update(config);
        this.plugin = this.config.internal.plugin;
    }
    get version() {
        return Paginator.version;
    }
    updateConfig(config) {
        this.config.update(config);
        return this;
    }
    forceRender() {
        if (!this.config || !this.config.options.container) {
            return log$1.error('Container is empty. Make sure you call render() before forceRender()', true);
        }
        // Destroy the current Paginator instance
        this.emit('beforeDestroy');
        this.destroy();
        this.emit('afterDestroy');
        // Recreate the Paginator instance
        G$1(this.createElement(), this.config.options.container);
        // Render plugin container as well
        if (this.config.options.pluginContainer) {
            G$1(this.createPluginElement(), this.config.options.pluginContainer);
        }
        return this;
    }
    destroy() {
        // Clear cache or perform other cleanup tasks if needed
        this.config.internal.pipeline.clearCache();
        if (!this.config.options.container) {
            return log$1.error('Container is empty. Make sure you call render() before destroy()', true);
        }
        G$1(null, this.config.options.container);
        // Destroy plugin container as well
        if (this.config.options.pluginContainer) {
            G$1(null, this.config.options.pluginContainer);
        }
    }
    render(container) {
        if (!container) {
            log$1.error('Container element cannot be null', true);
        }
        if (container.childNodes.length > 0) {
            log$1.error(`The container element ${container} is not empty. Make sure the container is empty and call render() again`);
            return this;
        }
        this.config.options.container = container;
        G$1(this.createElement(), container);
        // Render plugin container as well
        if (this.config.options.pluginContainer) {
            G$1(this.createPluginElement(), this.config.options.pluginContainer);
        }
        return this;
    }
    createPluginElement() {
        return _$3(ConfigContext.Provider, {
            value: this.config,
            children: _$3(PluginContainer, {})
        });
    }
    createElement() {
        return _$3(ConfigContext.Provider, {
            value: this.config,
            children: _$3(Container, {})
        });
    }
}

class PluginAPI {
    useStore = useStore;
    useSelector = useSelector;
    useConfig = useConfig;
    useOption = useOption;
    useTranslator = useTranslator;
    // Preact
    useEffect = y$2;
    useCallback = q$2;
    useState = d$1;
    useRef = A$1;
    useMemo = T$2;
    useReducer = h$2;
}
const pluginAPI = new PluginAPI();

/**
 * Creates a debounced function that delays the invocation of the provided function
 * until after the specified wait time has elapsed since the last time it was called.
 *
 * @param func - The original function to debounce.
 * @param waitFor - The number of milliseconds to delay the function call.
 *
 * @returns A debounced function that returns a Promise resolving to the result of the original function.
 */
const debounce = (func, waitFor) => {
    let timeoutId;
    return (...args) => new Promise((resolve) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

class PluginUtil {
    constructor() {
        // Prevent instantiation of this static utility class
    }
    // Status
    static Status = Status;
    // Base
    static Base = Base;
    // Header
    static leafColumns = Header.leafColumns;
    static tabularFormat = Header.tabularFormat;
    // Cell
    static Cell = Cell;
    // Row
    static Row = Row;
    // Plugin
    static PluginRenderer = PluginRenderer;
    // Debounce
    static debounce = debounce;
    // Throttle
    static throttle = throttle;
    // Style
    static classJoin = classJoin;
    static className = (...args) => className('plugin', ...args);
}

export { Paginator, PluginPosition, PluginUtil, _$3 as h, html, pluginAPI };
