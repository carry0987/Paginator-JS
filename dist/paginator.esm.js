// Container status
var Status;
(function (Status) {
    Status[Status["Init"] = 0] = "Init";
    Status[Status["Loading"] = 1] = "Loading";
    Status[Status["Loaded"] = 2] = "Loaded";
    Status[Status["Rendered"] = 3] = "Rendered";
    Status[Status["Error"] = 4] = "Error";
})(Status || (Status = {}));

var n,l$1,u$1,i$1,o$1,r$1,f$1,e$1,c$1,s$1,a$1,h$1={},p$1=[],v$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,y$1=Array.isArray;function d$1(n,l){for(var u in l)n[u]=l[u];return n}function w$1(n){var l=n.parentNode;l&&l.removeChild(n);}function _$1(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return g(l,f,i,o,null)}function g(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u$1:r,__i:-1,__u:0};return null==r&&null!=l$1.vnode&&l$1.vnode(f),f}function m$1(){return {current:null}}function k$1(n){return n.children}function b(n,l){this.props=n,this.context=l;}function x(n,l){if(null==l)return n.__?x(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?x(n):null}function C$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C$1(n)}}function M(n){(!n.__d&&(n.__d=!0)&&i$1.push(n)&&!P$1.__r++||o$1!==l$1.debounceRendering)&&((o$1=l$1.debounceRendering)||r$1)(P$1);}function P$1(){var n,u,t,o,r,e,c,s;for(i$1.sort(f$1);n=i$1.shift();)n.__d&&(u=i$1.length,o=void 0,e=(r=(t=n).__v).__e,c=[],s=[],t.__P&&((o=d$1({},r)).__v=r.__v+1,l$1.vnode&&l$1.vnode(o),O(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[e]:null,c,null==e?x(r):e,!!(32&r.__u),s),o.__v=r.__v,o.__.__k[o.__i]=o,j$1(c,o,s),o.__e!=e&&C$1(o)),i$1.length>u&&i$1.sort(f$1));P$1.__r=0;}function S(n,l,u,t,i,o,r,f,e,c,s){var a,v,y,d,w,_=t&&t.__k||p$1,g=l.length;for(u.__d=e,$(u,l,_),e=u.__d,a=0;a<g;a++)null!=(y=u.__k[a])&&"boolean"!=typeof y&&"function"!=typeof y&&(v=-1===y.__i?h$1:_[y.__i]||h$1,y.__i=a,O(n,y,v,i,o,r,f,e,c,s),d=y.__e,y.ref&&v.ref!=y.ref&&(v.ref&&N(v.ref,null,y),s.push(y.ref,y.__c||d,y)),null==w&&null!=d&&(w=d),65536&y.__u||v.__k===y.__k?(e&&!e.isConnected&&(e=x(v)),e=I(y,e,n)):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=w;}function $(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)r=t+a,null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?g(null,i,null,null,null):y$1(i)?g(k$1,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?g(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=L(i,u,r,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:f<r?f==r-1&&(a=f-r):a=0,f!==t+a&&(i.__u|=65536))):(o=u[r])&&null==o.key&&o.__e&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=x(o)),V(o,o,!1),u[r]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=x(o)),V(o,o));}function I(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=I(t[i],l,u));return l}n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8===l.nodeType);return l}function L(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type&&0==(131072&e.__u))return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++;}}return -1}function T(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||v$1.test(l)?u:u+"px";}function A(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||T(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/i,"$1")),l=l.toLowerCase()in n||"onFocusOut"===l||"onFocusIn"===l?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=e$1,n.addEventListener(l,o?s$1:c$1,o)):n.removeEventListener(l,o?s$1:c$1,o);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function F$1(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=e$1++;else if(u.t<t.u)return;return t(l$1.event?l$1.event(u):u)}}}function O(n,u,t,i,o,r,f,e,c,s){var a,h,p,v,w,_,g,m,x,C,M,P,$,I,H,L=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l$1.__b)&&a(u);n:if("function"==typeof L)try{if(m=u.props,x=(a=L.contextType)&&i[a.__c],C=a?x?x.props.value:a.__:i,t.__c?g=(h=u.__c=t.__c).__=h.__E:("prototype"in L&&L.prototype.render?u.__c=h=new L(m,C):(u.__c=h=new b(m,C),h.constructor=L,h.render=q$1),x&&x.sub(h),h.props=m,h.state||(h.state={}),h.context=C,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),null==h.__s&&(h.__s=h.state),null!=L.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d$1({},h.__s)),d$1(h.__s,L.getDerivedStateFromProps(m,h.__s))),v=h.props,w=h.state,h.__v=u,p)null==L.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==L.getDerivedStateFromProps&&m!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,C),!h.__e&&(null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,C)||u.__v===t.__v)){for(u.__v!==t.__v&&(h.props=m,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),M=0;M<h._sb.length;M++)h.__h.push(h._sb[M]);h._sb=[],h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,C),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,w,_);});}if(h.context=C,h.props=m,h.__P=n,h.__e=!1,P=l$1.__r,$=0,"prototype"in L&&L.prototype.render){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),I=0;I<h._sb.length;I++)h.__h.push(h._sb[I]);h._sb=[];}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++$<25);h.state=h.__s,null!=h.getChildContext&&(i=d$1(d$1({},i),h.getChildContext())),p||null==h.getSnapshotBeforeUpdate||(_=h.getSnapshotBeforeUpdate(v,w)),S(n,y$1(H=null!=a&&a.type===k$1&&null==a.key?a.props.children:a)?H:[H],u,t,i,o,r,f,e,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&f.push(h),g&&(h.__E=h.__=null);}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l$1.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=z$1(t.__e,u,t,i,o,r,f,c,s);(a=l$1.diffed)&&a(u);}function j$1(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)N(t[i],t[++i],t[++i]);l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function z$1(l,u,t,i,o,r,f,e,c){var s,a,p,v,d,_,g,m=t.props,k=u.props,b=u.type;if("svg"===b?o="http://www.w3.org/2000/svg":"math"===b?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=r)for(s=0;s<r.length;s++)if((d=r[s])&&"setAttribute"in d==!!b&&(b?d.localName===b:3===d.nodeType)){l=d,r[s]=null;break}if(null==l){if(null===b)return document.createTextNode(k);l=document.createElementNS(o,b,k.is&&k),r=null,e=!1;}if(null===b)m===k||e&&l.data===k||(l.data=k);else {if(r=r&&n.call(l.childNodes),m=t.props||h$1,!e&&null!=r)for(m={},s=0;s<l.attributes.length;s++)m[(d=l.attributes[s]).name]=d.value;for(s in m)if(d=m[s],"children"==s);else if("dangerouslySetInnerHTML"==s)p=d;else if("key"!==s&&!(s in k)){if("value"==s&&"defaultValue"in k||"checked"==s&&"defaultChecked"in k)continue;A(l,s,null,d,o);}for(s in k)d=k[s],"children"==s?v=d:"dangerouslySetInnerHTML"==s?a=d:"value"==s?_=d:"checked"==s?g=d:"key"===s||e&&"function"!=typeof d||m[s]===d||A(l,s,d,m[s],o);if(a)e||p&&(a.__html===p.__html||a.__html===l.innerHTML)||(l.innerHTML=a.__html),u.__k=[];else if(p&&(l.innerHTML=""),S(l,y$1(v)?v:[v],u,t,i,"foreignObject"===b?"http://www.w3.org/1999/xhtml":o,r,f,r?r[0]:t.__k&&x(t,0),e,c),null!=r)for(s=r.length;s--;)null!=r[s]&&w$1(r[s]);e||(s="value",void 0!==_&&(_!==l[s]||"progress"===b&&!_||"option"===b&&_!==m[s])&&A(l,s,_,m[s],o),s="checked",void 0!==g&&g!==l[s]&&A(l,s,g,m[s],o));}return l}function N(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$1.__e(n,t);}}function V(n,u,t){var i,o;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&V(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||w$1(n.__e),n.__c=n.__=n.__e=n.__d=void 0;}function q$1(n,l,u){return this.constructor(n,u)}function B$1(u,t,i){var o,r,f,e;l$1.__&&l$1.__(u,t),r=(o="function"==typeof i)?null:t.__k,f=[],e=[],O(t,u=(!o&&i||t).__k=_$1(k$1,null,[u]),r||h$1,h$1,t.namespaceURI,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),j$1(f,u,e);}function G(n,l){var u={__c:l="__cC"+a$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=!0,M(n);});},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=p$1.slice,l$1={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,b.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d$1({},this.state),"function"==typeof n&&(n=n(d$1({},u),this.props)),n&&d$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this));},b.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),M(this));},b.prototype.render=k$1,i$1=[],r$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f$1=function(n,l){return n.__v.__b-l.__v.__b},P$1.__r=0,e$1=0,c$1=F$1(!1),s$1=F$1(!0),a$1=0;

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
        body: (encode && method.toUpperCase() !== 'GET') ? encodeFormData(data) : data,
        beforeSend: beforeSend,
        success: (responseData) => {
            success?.(responseData);
        },
        error: (caughtError) => {
            error?.(caughtError);
        }
    };
    return doFetch(fetchOptions);
}
// Alias for sendData
const fetchData = sendData;

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
    static fetchData = fetchData;
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

class StateManager {
    state;
    listeners = [];
    isDispatching = false;
    constructor(initialState) {
        this.state = initialState;
    }
    getState = () => this.state;
    getListeners = () => this.listeners;
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
    subscribe = (listener) => {
        if (typeof listener !== 'function') {
            throw new Error('Listener is not a function');
        }
        this.listeners = [...this.listeners, listener];
        return () => (this.listeners = this.listeners.filter((lis) => lis !== listener));
    };
}

/**
 * Base Storage class. All storage implementation must inherit this class
 */
class Storage {
}

class MemoryStorage extends Storage {
    data = () => [];
    constructor(data) {
        super();
        this.set(data);
    }
    async get() {
        const data = await this.data();
        return {
            data: data,
            total: data.length,
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

/**
 * Centralized logging lib
 *
 * This class needs some improvements but so far it has been used to have a coherent way to log
 */
class Logger {
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
}
var log = new Logger();

class ServerStorage extends Storage {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    handler(response) {
        if (typeof this.options.handle === 'function') {
            return this.options.handle(response);
        }
        return Promise.resolve(response);
    }
    async get(options) {
        // this.options is the initial config object
        // options is the runtime config passed by the pipeline (e.g. search component)
        const opts = {
            ...this.options,
            ...options,
        };
        // if `options.data` is provided, the current ServerStorage
        // implementation will be ignored and we let options.data to
        // handle the request. Useful when HTTP client needs to be
        // replaced with something else
        if (typeof opts.data === 'function') {
            return opts.data(opts);
        }
        return await fetchData({
            url: opts.url,
            data: opts,
            ...opts.param
        }).then(this.handler.bind(this))
            .then((res) => {
            return {
                data: opts.then ? opts.then(res) : [],
                total: typeof opts.total === 'function' ? opts.total(res) : 0
            };
        })
            .catch((error) => {
            log.error(`Error in get method: ${error.message}`, true);
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
            storage = new MemoryStorage(config.options.data);
        }
        if (config.options.server) {
            storage = new ServerStorage(config.options.server);
        }
        if (!storage) {
            throw new Error('Could not determine the storage type');
        }
        return storage;
    }
}

const defaults = {
    store: new StateManager({
        status: Status.Init,
        data: null,
    }),
    position: 'bottom',
    resetPageOnUpdate: false,
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
    display: {
        showPrevious: true,
        showNext: true,
        showPageNumbers: true,
        showNavigator: false,
        hideFirstOnEllipsisShow: false,
        hideLastOnEllipsisShow: false,
        autoHidePrevious: false,
        autoHideNext: false
    },
    className: {
        container: '',
        prefix: 'pagination',
        active: 'active',
        disable: 'disabled',
        ul: 'pagination',
        pageButton: 'page-item',
        prevButton: 'page-item',
        nextButton: 'page-item',
        loading: 'loading',
        notfound: 'notfound',
        error: 'error'
    },
    customize: {
        prevText: '&laquo;',
        nextText: '&raquo;',
        ellipsisText: '...',
        formatNavigator: '{currentPage} of {totalPage}',
        pageLink: ''
    },
    utilities: {
        formatResult: (data) => data,
        triggerPagingOnInit: true,
        resetPageNumberOnInit: false,
        hideOnlyOnePage: false,
        onError: (err) => console.error('Pagination error:', err)
    }
};
const ConfigContext = G(undefined);
class Config {
    options = {};
    constructor() {
        Utils.deepMerge(this.options, defaults);
    }
    assign(partialConfig) {
        Utils.deepMerge(this.options, partialConfig);
        return this;
    }
    update(partialConfig) {
        if (!partialConfig)
            return this;
        this.assign(Config.fromPartialConfig(partialConfig));
        return this;
    }
    static fromPartialConfig(partialConfig) {
        const config = new Config().assign(partialConfig);
        config.assign({
            storage: StorageUtils.createFromConfig(config),
        });
        return config.options;
    }
}

var t,r,u,i,o=0,f=[],c=[],e=l$1,a=e.__b,v=e.__r,l=e.diffed,m=e.__c,s=e.unmount,d=e.__;function h(n,t){e.__h&&e.__h(r,n,o||t),o=0;var u=r.__H||(r.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({__V:c}),u.__[n]}function p(n){return o=1,y(D,n)}function y(n,u,i){var o=h(t++,2);if(o.t=n,!o.__c&&(o.__=[D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return !0;var u=o.__c.__H.__.filter(function(n){return !!n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0);}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r.shouldComponentUpdate=f;}return o.__N||o.__}function _(n,u){var i=h(t++,3);!e.__s&&C(i.__H,u)&&(i.__=n,i.i=u,r.__H.__h.push(i));}function F(n){return o=5,q(function(){return {current:n}},[])}function q(n,r){var u=h(t++,7);return C(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function P(n){var u=r.context[n.__c],i=h(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function j(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B),n.__H.__h=[];}catch(t){n.__H.__h=[],e.__e(t,n.__v);}}e.__b=function(n){r=null,a&&a(n);},e.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),d&&d(n,t);},e.__r=function(n){v&&v(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0;})):(i.__h.forEach(z),i.__h.forEach(B),i.__h=[],t=0)),u=r;},e.diffed=function(n){l&&l(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===e.requestAnimationFrame||((i=e.requestAnimationFrame)||w)(j)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c;})),u=r=null;},e.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return !n.__||B(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],e.__e(r,n.__v);}}),m&&m(n,t);},e.unmount=function(n){s&&s(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n);}catch(n){t=n;}}),r.__H=void 0,t&&e.__e(t,r.__v));};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);k&&(t=requestAnimationFrame(r));}function z(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t;}function B(n){var t=r;n.__c=n.__(),r=t;}function C(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return "function"==typeof t?t(n):t}

const useConfig = () => {
    const context = P(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

function useStore() {
    const config = useConfig();
    return config.store;
}

function useSelector(selector) {
    const store = useStore();
    const [current, setCurrent] = p(selector(store.getState()));
    _(() => {
        const unsubscribe = store.subscribe(() => {
            const updated = selector(store.getState());
            if (current !== updated) {
                setCurrent(updated);
            }
        });
        return unsubscribe;
    }, []);
    return current;
}

const SetData = (data) => (state) => {
    if (!data)
        return state;
    return {
        ...state,
        data: data,
        status: Status.Loaded,
    };
};
const SetLoadingData = () => (state) => {
    return {
        ...state,
        status: Status.Loading,
    };
};
const SetDataErrored = () => (state) => {
    return {
        ...state,
        data: null,
        status: Status.Error,
    };
};

function Container() {
    const config = useConfig();
    const { dispatch } = useStore();
    const status = useSelector((state) => state.status);
    const data = useSelector((state) => state.data);
    const containerRef = F(null);
    const process = (async () => {
        if (status === 0) {
            dispatch(SetData(data));
            return;
        }
    });
    _(() => {
        dispatch(SetLoadingData());
        try {
            process();
        }
        catch (e) {
            log.error(e);
            dispatch(SetDataErrored());
        }
        const ele = containerRef.current;
        if (ele) {
            ele.className = 'paginator';
            if (config.className.container) {
                ele.classList.add(config.className.container);
            }
            if (config.container) {
                if (config.position === 'bottom') {
                    config.container.appendChild(ele);
                }
                else {
                    config.container.insertBefore(ele, config.container.firstChild);
                }
            }
        }
    }, [config]);
    return (_$1("div", { ref: containerRef }));
}

class EventEmitter {
    // Initialize callbacks with an empty object
    callbacks = {};
    init(event) {
        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    }
    checkListener(listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('The listener must be a function');
        }
    }
    hasEvent(event) {
        return this.callbacks[event] !== undefined;
    }
    listeners() {
        return this.callbacks;
    }
    addListener(event, listener) {
        return this.on(event, listener);
    }
    clearListener(event) {
        if (event) {
            this.callbacks[event] = [];
        }
        else {
            this.callbacks = {};
        }
        return this;
    }
    on(event, listener) {
        this.checkListener(listener);
        this.init(event);
        this.callbacks[event].push(listener);
        return this;
    }
    off(event, listener) {
        this.checkListener(listener);
        const eventName = event;
        this.init();
        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // There is no callbacks with this key
            return this;
        }
        this.callbacks[eventName] = this.callbacks[eventName].filter((value) => value != listener);
        return this;
    }
    async emit(event, ...args) {
        const eventName = event;
        // Initialize the event
        this.init(eventName);
        // If there are callbacks for this event
        if (this.callbacks[eventName].length > 0) {
            // Execute all callbacks and wait for them to complete if they are promises
            await Promise.all(this.callbacks[eventName].map(async (value) => await value(...args)));
            return true;
        }
        return false;
    }
    once(event, listener) {
        this.checkListener(listener);
        const onceListener = async (...args) => {
            await listener(...args);
            this.off(event, onceListener);
        };
        return this.on(event, onceListener);
    }
}

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

class Paginator extends EventEmitter {
    static version = '1.0.5';
    config;
    constructor(config) {
        super();
        this.config = new Config()
            .assign({ instance: this, eventEmitter: this })
            .update(config);
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
            return log.error('Container is empty. Make sure you call render() before forceRender()', true);
        }
        this.destroy();
        // Recreate the Paginator instance
        B$1(this.createElement(), this.config.options.container);
        return this;
    }
    destroy() {
        // Clear cache or perform other cleanup tasks if needed
        if (!this.config.options.container) {
            return log.error('Container is empty. Make sure you call render() before destroy()', true);
        }
        B$1(null, this.config.options.container);
    }
    render(container) {
        if (!container) {
            log.error('Container element cannot be null', true);
        }
        if (container.childNodes.length > 0) {
            log.error(`The container element ${container} is not empty. Make sure the container is empty and call render() again`);
            return this;
        }
        this.config.options.container = container;
        B$1(this.createElement(), container);
        return this;
    }
    createElement() {
        return _$1(ConfigContext.Provider, {
            value: this.config.options,
            children: _$1(Container, {}),
        });
    }
}

function HTMLElement(props) {
    return _$1(props.parentElement || 'span', {
        dangerouslySetInnerHTML: { __html: props.content },
    });
}

function html(content, parentElement) {
    return _$1(HTMLElement, { content: content, parentElement: parentElement });
}

export { b as Component, Config, Paginator, _$1 as createElement, m$1 as createRef, _$1 as h, html, useConfig, _ as useEffect, F as useRef, p as useState };
