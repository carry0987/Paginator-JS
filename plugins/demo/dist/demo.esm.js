import { PluginPosition } from '@carry0987/paginator';

var l;l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},"function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout;

var f=0;function u(e,t,n,o,i,u){t||(t={});var a,l$1=t;"ref"in t&&(a=t.ref,delete t.ref);var p={type:e,props:l$1,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};return l.vnode&&l.vnode(p),p}

const HelloWorld = () => {
    return (u("div", { children: "Hello World" }));
};

const helloWorldPlugin = {
    id: 'helloWorldPlugin',
    component: HelloWorld,
    position: PluginPosition.Body,
    order: 1
};

export { helloWorldPlugin as default };
