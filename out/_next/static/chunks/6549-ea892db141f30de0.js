(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6549],{96086:function(e){"use strict";var t=Object.assign.bind(Object);e.exports=t,e.exports.default=e.exports},69107:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return g}});let n=r(38754),o=r(61757)._(r(67294)),i=n._(r(73935)),a=n._(r(97484)),u=r(43101),s=r(2986),c=r(17861);r(2299);let l=r(60394),f=n._(r(46640)),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"",loader:"akamai",dangerouslyAllowSVG:!1,unoptimized:!1};function d(e,t,r,n,o,i){let a=null==e?void 0:e.src;e&&e["data-loaded-src"]!==a&&(e["data-loaded-src"]=a,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&o(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,o=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>o,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{o=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}}))}function h(e){let[t,r]=o.version.split(".",2),n=parseInt(t,10),i=parseInt(r,10);return n>18||18===n&&i>=3?{fetchPriority:e}:{fetchpriority:e}}let m=(0,o.forwardRef)((e,t)=>{let{src:r,srcSet:n,sizes:i,height:a,width:u,decoding:s,className:c,style:l,fetchPriority:f,placeholder:p,loading:m,unoptimized:y,fill:g,onLoadRef:b,onLoadingCompleteRef:T,setBlurComplete:v,setShowAltText:w,onLoad:E,onError:S,...O}=e;return o.default.createElement("img",{...O,...h(f),loading:m,width:u,height:a,decoding:s,"data-nimg":g?"fill":"1",className:c,style:l,sizes:i,srcSet:n,src:r,ref:(0,o.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&d(e,p,b,T,v,y))},[r,p,b,T,v,S,y,t]),onLoad:e=>{d(e.currentTarget,p,b,T,v,y)},onError:e=>{w(!0),"empty"!==p&&v(!0),S&&S(e)}})});function y(e){let{isAppRouter:t,imgAttributes:r}=e,n={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...h(r.fetchPriority)};return t&&i.default.preload?(i.default.preload(r.src,n),null):o.default.createElement(a.default,null,o.default.createElement("link",{key:"__nimg-"+r.src+r.srcSet+r.sizes,rel:"preload",href:r.srcSet?void 0:r.src,...n}))}let g=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(l.RouterContext),n=(0,o.useContext)(c.ImageConfigContext),i=(0,o.useMemo)(()=>{let e=p||n||s.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[n]),{onLoad:a,onLoadingComplete:d}=e,h=(0,o.useRef)(a);(0,o.useEffect)(()=>{h.current=a},[a]);let g=(0,o.useRef)(d);(0,o.useEffect)(()=>{g.current=d},[d]);let[b,T]=(0,o.useState)(!1),[v,w]=(0,o.useState)(!1),{props:E,meta:S}=(0,u.getImgProps)(e,{defaultLoader:f.default,imgConf:i,blurComplete:b,showAltText:v});return o.default.createElement(o.default.Fragment,null,o.default.createElement(m,{...E,unoptimized:S.unoptimized,placeholder:S.placeholder,fill:S.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:T,setShowAltText:w,ref:t}),S.priority?o.default.createElement(y,{isAppRouter:!r,imgAttributes:E}):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},43101:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return u}}),r(2299);let n=r(51083),o=r(2986);function i(e){return void 0!==e.default}function a(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function u(e,t){var r;let u,s,c,{src:l,sizes:f,unoptimized:p=!1,priority:d=!1,loading:h,className:m,quality:y,width:g,height:b,fill:T=!1,style:v,onLoad:w,onLoadingComplete:E,placeholder:S="empty",blurDataURL:O,fetchPriority:C,layout:A,objectFit:P,objectPosition:j,lazyBoundary:_,lazyRoot:R,...I}=e,{imgConf:x,showAltText:L,blurComplete:k,defaultLoader:M}=t,N=x||o.imageConfigDefault;if("allSizes"in N)u=N;else{let e=[...N.deviceSizes,...N.imageSizes].sort((e,t)=>e-t),t=N.deviceSizes.sort((e,t)=>e-t);u={...N,allSizes:e,deviceSizes:t}}let z=I.loader||M;delete I.loader,delete I.srcSet;let H="__next_img_default"in z;if(H){if("custom"===u.loader)throw Error('Image with src "'+l+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=z;z=t=>{let{config:r,...n}=t;return e(n)}}if(A){"fill"===A&&(T=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[A];e&&(v={...v,...e});let t={responsive:"100vw",fill:"100vw"}[A];t&&!f&&(f=t)}let D="",B=a(g),F=a(b);if("object"==typeof(r=l)&&(i(r)||void 0!==r.src)){let e=i(l)?l.default:l;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(s=e.blurWidth,c=e.blurHeight,O=O||e.blurDataURL,D=e.src,!T){if(B||F){if(B&&!F){let t=B/e.width;F=Math.round(e.height*t)}else if(!B&&F){let t=F/e.height;B=Math.round(e.width*t)}}else B=e.width,F=e.height}}let Y=!d&&("lazy"===h||void 0===h);(!(l="string"==typeof l?l:D)||l.startsWith("data:")||l.startsWith("blob:"))&&(p=!0,Y=!1),u.unoptimized&&(p=!0),H&&l.endsWith(".svg")&&!u.dangerouslyAllowSVG&&(p=!0),d&&(C="high");let U=a(y),q=Object.assign(T?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:P,objectPosition:j}:{},L?{}:{color:"transparent"},v),W=k||"empty"===S?null:"blur"===S?'url("data:image/svg+xml;charset=utf-8,'+(0,n.getImageBlurSvg)({widthInt:B,heightInt:F,blurWidth:s,blurHeight:c,blurDataURL:O||"",objectFit:q.objectFit})+'")':'url("'+S+'")',G=W?{backgroundSize:q.objectFit||"cover",backgroundPosition:q.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:W}:{},V=function(e){let{config:t,src:r,unoptimized:n,width:o,quality:i,sizes:a,loader:u}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:s,kind:c}=function(e,t,r){let{deviceSizes:n,allSizes:o}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);n)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:o.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:o,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>o.find(t=>t>=e)||o[o.length-1]))],kind:"x"}}(t,o,a),l=s.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:s.map((e,n)=>u({config:t,src:r,quality:i,width:e})+" "+("w"===c?e:n+1)+c).join(", "),src:u({config:t,src:r,quality:i,width:s[l]})}}({config:u,src:l,unoptimized:p,width:B,quality:U,sizes:f,loader:z});return{props:{...I,loading:Y?"lazy":h,fetchPriority:C,width:B,height:F,decoding:"async",className:m,style:{...q,...G},sizes:V.sizes,srcSet:V.srcSet,src:V.src},meta:{unoptimized:p,priority:d,placeholder:S,fill:T}}}},51083:function(e,t){"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:o,blurDataURL:i,objectFit:a}=e,u=n?40*n:t,s=o?40*o:r,c=u&&s?"viewBox='0 0 "+u+" "+s+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+i+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},31669:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{unstable_getImgProps:function(){return s},default:function(){return c}});let n=r(38754),o=r(43101),i=r(2299),a=r(69107),u=n._(r(46640)),s=e=>{(0,i.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,o.getImgProps)(e,{defaultLoader:u.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"",loader:"akamai",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}},c=a.Image},46640:function(e,t){"use strict";function r(e){let{config:t,src:r,width:n,quality:o}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+n+"&q="+(o||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},25675:function(e,t,r){e.exports=r(31669)},11163:function(e,t,r){e.exports=r(53719)},92703:function(e,t,r){"use strict";var n=r(50414);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,i,a){if(a!==n){var u=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},45697:function(e,t,r){e.exports=r(92703)()},50414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},69590:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,i){try{return function e(i,a){if(i===a)return!0;if(i&&a&&"object"==typeof i&&"object"==typeof a){var u,s,c,l;if(i.constructor!==a.constructor)return!1;if(Array.isArray(i)){if((u=i.length)!=a.length)return!1;for(s=u;0!=s--;)if(!e(i[s],a[s]))return!1;return!0}if(r&&i instanceof Map&&a instanceof Map){if(i.size!==a.size)return!1;for(l=i.entries();!(s=l.next()).done;)if(!a.has(s.value[0]))return!1;for(l=i.entries();!(s=l.next()).done;)if(!e(s.value[1],a.get(s.value[0])))return!1;return!0}if(n&&i instanceof Set&&a instanceof Set){if(i.size!==a.size)return!1;for(l=i.entries();!(s=l.next()).done;)if(!a.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(a)){if((u=i.length)!=a.length)return!1;for(s=u;0!=s--;)if(i[s]!==a[s])return!1;return!0}if(i.constructor===RegExp)return i.source===a.source&&i.flags===a.flags;if(i.valueOf!==Object.prototype.valueOf&&"function"==typeof i.valueOf&&"function"==typeof a.valueOf)return i.valueOf()===a.valueOf();if(i.toString!==Object.prototype.toString&&"function"==typeof i.toString&&"function"==typeof a.toString)return i.toString()===a.toString();if((u=(c=Object.keys(i)).length)!==Object.keys(a).length)return!1;for(s=u;0!=s--;)if(!Object.prototype.hasOwnProperty.call(a,c[s]))return!1;if(t&&i instanceof Element)return!1;for(s=u;0!=s--;)if(("_owner"!==c[s]&&"__v"!==c[s]&&"__o"!==c[s]||!i.$$typeof)&&!e(i[c[s]],a[c[s]]))return!1;return!0}return i!=i&&a!=a}(e,i)}catch(e){if((e.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw e}}},64593:function(e,t,r){"use strict";r.d(t,{q:function(){return Z}});var n,o,i,a,u=r(45697),s=r.n(u),c=r(83524),l=r.n(c),f=r(69590),p=r.n(f),d=r(67294),h=r(96086),m=r.n(h),y={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},g={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"};Object.keys(g).map(function(e){return g[e]});var b={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src",TARGET:"target"},T={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},v=Object.keys(T).reduce(function(e,t){return e[T[t]]=t,e},{}),w=[g.NOSCRIPT,g.SCRIPT,g.STYLE],E="data-react-helmet",S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O=function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")},C=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P=function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},j=function(e,t){var r={};for(var n in e)!(t.indexOf(n)>=0)&&Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},_=function(e,t){if(!e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&("object"==typeof t||"function"==typeof t)?t:e},R=function(e){var t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},I=function(e){var t=k(e,g.TITLE),r=k(e,"titleTemplate");if(r&&t)return r.replace(/%s/g,function(){return Array.isArray(t)?t.join(""):t});var n=k(e,"defaultTitle");return t||n||void 0},x=function(e,t){return t.filter(function(t){return void 0!==t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return A({},e,t)},{})},L=function(e,t,r){var n={};return r.filter(function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&D("Helmet: "+e+' should be of type "Array". Instead found type "'+S(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,r){var o={};r.filter(function(e){for(var r=void 0,i=Object.keys(e),a=0;a<i.length;a++){var u=i[a],s=u.toLowerCase();-1===t.indexOf(s)||r===b.REL&&"canonical"===e[r].toLowerCase()||s===b.REL&&"stylesheet"===e[s].toLowerCase()||(r=s),-1!==t.indexOf(u)&&(u===b.INNER_HTML||u===b.CSS_TEXT||u===b.ITEM_PROP)&&(r=u)}if(!r||!e[r])return!1;var c=e[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][c]&&(o[r][c]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var i=Object.keys(o),a=0;a<i.length;a++){var u=i[a],s=m()({},n[u],o[u]);n[u]=s}return e},[]).reverse()},k=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},M=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout(function(){M(e)},0)}),N=function(e){return clearTimeout(e)},z="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||M:r.g.requestAnimationFrame||M,H="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||N:r.g.cancelAnimationFrame||N,D=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},B=null,F=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,u=e.noscriptTags,s=e.onChangeClientState,c=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;q(g.BODY,n),q(g.HTML,o),U(f,p);var d={baseTag:W(g.BASE,r),linkTags:W(g.LINK,i),metaTags:W(g.META,a),noscriptTags:W(g.NOSCRIPT,u),scriptTags:W(g.SCRIPT,c),styleTags:W(g.STYLE,l)},h={},m={};Object.keys(d).forEach(function(e){var t=d[e],r=t.newTags,n=t.oldTags;r.length&&(h[e]=r),n.length&&(m[e]=d[e].oldTags)}),t&&t(),s(e,h,m)},Y=function(e){return Array.isArray(e)?e.join(""):e},U=function(e,t){void 0!==e&&document.title!==e&&(document.title=Y(e)),q(g.TITLE,t)},q=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(E),o=n?n.split(","):[],i=[].concat(o),a=Object.keys(t),u=0;u<a.length;u++){var s=a[u],c=t[s]||"";r.getAttribute(s)!==c&&r.setAttribute(s,c),-1===o.indexOf(s)&&o.push(s);var l=i.indexOf(s);-1!==l&&i.splice(l,1)}for(var f=i.length-1;f>=0;f--)r.removeAttribute(i[f]);o.length===i.length?r.removeAttribute(E):r.getAttribute(E)!==a.join(",")&&r.setAttribute(E,a.join(","))}},W=function(e,t){var r=document.head||document.querySelector(g.HEAD),n=r.querySelectorAll(e+"["+E+"]"),o=Array.prototype.slice.call(n),i=[],a=void 0;return t&&t.length&&t.forEach(function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n)){if(n===b.INNER_HTML)r.innerHTML=t.innerHTML;else if(n===b.CSS_TEXT)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var u=void 0===t[n]?"":t[n];r.setAttribute(n,u)}}r.setAttribute(E,"true"),o.some(function(e,t){return a=t,r.isEqualNode(e)})?o.splice(a,1):i.push(r)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),i.forEach(function(e){return r.appendChild(e)}),{oldTags:o,newTags:i}},G=function(e){return Object.keys(e).reduce(function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n},"")},V=function(e,t,r,n){var o=G(r),i=Y(t);return o?"<"+e+" "+E+'="true" '+o+">"+R(i,n)+"</"+e+">":"<"+e+" "+E+'="true">'+R(i,n)+"</"+e+">"},K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,r){return t[T[r]||r]=e[r],t},t)},X=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,r){return t[v[r]||r]=e[r],t},t)},$=function(e,t,r){var n,o=K(r,((n={key:t})[E]=!0,n));return[d.createElement(g.TITLE,o,t)]},J=function(e,t,r){switch(e){case g.TITLE:return{toComponent:function(){return $(e,t.title,t.titleAttributes,r)},toString:function(){return V(e,t.title,t.titleAttributes,r)}};case y.BODY:case y.HTML:return{toComponent:function(){return K(t)},toString:function(){return G(t)}};default:return{toComponent:function(){return t.map(function(t,r){var n,o=((n={key:r})[E]=!0,n);return Object.keys(t).forEach(function(e){var r=T[e]||e;if(r===b.INNER_HTML||r===b.CSS_TEXT){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]}),d.createElement(e,o)})},toString:function(){return t.reduce(function(t,n){var o=Object.keys(n).filter(function(e){return!(e===b.INNER_HTML||e===b.CSS_TEXT)}).reduce(function(e,t){var o=void 0===n[t]?t:t+'="'+R(n[t],r)+'"';return e?e+" "+o:o},""),i=n.innerHTML||n.cssText||"",a=-1===w.indexOf(e);return t+"<"+e+" "+E+'="true" '+o+(a?"/>":">"+i+"</"+e+">")},"")}}}},Q=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,u=e.noscriptTags,s=e.scriptTags,c=e.styleTags,l=e.title,f=e.titleAttributes;return{base:J(g.BASE,t,n),bodyAttributes:J(y.BODY,r,n),htmlAttributes:J(y.HTML,o,n),link:J(g.LINK,i,n),meta:J(g.META,a,n),noscript:J(g.NOSCRIPT,u,n),script:J(g.SCRIPT,s,n),style:J(g.STYLE,c,n),title:J(g.TITLE,{title:void 0===l?"":l,titleAttributes:f},n)}},Z=(o=l()(function(e){var t;return{baseTag:(t=[b.HREF,b.TARGET],e.filter(function(e){return void 0!==e[g.BASE]}).map(function(e){return e[g.BASE]}).reverse().reduce(function(e,r){if(!e.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var i=n[o].toLowerCase();if(-1!==t.indexOf(i)&&r[i])return e.concat(r)}return e},[])),bodyAttributes:x(y.BODY,e),defer:k(e,"defer"),encode:k(e,"encodeSpecialCharacters"),htmlAttributes:x(y.HTML,e),linkTags:L(g.LINK,[b.REL,b.HREF],e),metaTags:L(g.META,[b.NAME,b.CHARSET,b.HTTPEQUIV,b.PROPERTY,b.ITEM_PROP],e),noscriptTags:L(g.NOSCRIPT,[b.INNER_HTML],e),onChangeClientState:k(e,"onChangeClientState")||function(){},scriptTags:L(g.SCRIPT,[b.SRC,b.INNER_HTML],e),styleTags:L(g.STYLE,[b.CSS_TEXT],e),title:I(e),titleAttributes:x(y.TITLE,e)}},function(e){B&&H(B),e.defer?B=z(function(){F(e,function(){B=null})}):(F(e),B=null)},Q)(function(){return null}),a=i=function(e){function t(){return O(this,t),_(this,e.apply(this,arguments))}return P(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case g.SCRIPT:case g.NOSCRIPT:return{innerHTML:t};case g.STYLE:return{cssText:t}}throw Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return A({},n,((t={})[r.type]=[].concat(n[r.type]||[],[A({},o,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(n.type){case g.TITLE:return A({},o,((t={})[n.type]=a,t.titleAttributes=A({},i),t));case g.BODY:return A({},o,{bodyAttributes:A({},i)});case g.HTML:return A({},o,{htmlAttributes:A({},i)})}return A({},o,((r={})[n.type]=A({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=A({},t);return Object.keys(e).forEach(function(t){var n;r=A({},r,((n={})[t]=e[t],n))}),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return d.Children.forEach(e,function(e){if(e&&e.props){var o=e.props,i=o.children,a=X(j(o,["children"]));switch(r.warnOnInvalidChildren(e,i),e.type){case g.LINK:case g.META:case g.NOSCRIPT:case g.SCRIPT:case g.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:a,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}}),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=A({},j(e,["children"]));return t&&(r=this.mapChildrenToProps(t,r)),d.createElement(o,r)},C(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(d.Component),i.propTypes={base:s().object,bodyAttributes:s().object,children:s().oneOfType([s().arrayOf(s().node),s().node]),defaultTitle:s().string,defer:s().bool,encodeSpecialCharacters:s().bool,htmlAttributes:s().object,link:s().arrayOf(s().object),meta:s().arrayOf(s().object),noscript:s().arrayOf(s().object),onChangeClientState:s().func,script:s().arrayOf(s().object),style:s().arrayOf(s().object),title:s().string,titleAttributes:s().object,titleTemplate:s().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=Q({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);Z.renderStatic=Z.rewind},83524:function(e,t,r){"use strict";var n=r(67294),o=n&&"object"==typeof n&&"default"in n?n.default:n;function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var a=!!("undefined"!=typeof window&&window.document&&window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw Error("Expected mapStateOnServer to either be undefined or a function.");return function(u){if("function"!=typeof u)throw Error("Expected WrappedComponent to be a React component.");var s,c=[];function l(){s=e(c.map(function(e){return e.props})),f.canUseDOM?t(s):r&&(s=r(s))}var f=function(e){function t(){return e.apply(this,arguments)||this}t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e,t.peek=function(){return s},t.rewind=function(){if(t.canUseDOM)throw Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,c=[],e};var r=t.prototype;return r.UNSAFE_componentWillMount=function(){c.push(this),l()},r.componentDidUpdate=function(){l()},r.componentWillUnmount=function(){var e=c.indexOf(this);c.splice(e,1),l()},r.render=function(){return o.createElement(u,this.props)},t}(n.PureComponent);return i(f,"displayName","SideEffect("+(u.displayName||u.name||"Component")+")"),i(f,"canUseDOM",a),f}}}}]);