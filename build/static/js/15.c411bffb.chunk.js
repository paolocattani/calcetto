(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[15],{273:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var r=a(125),n=a(9),o=a.n(n),i=a(0),l=a.n(i);function s(e){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function b(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function d(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function m(e){return t=e,(t-=0)===t?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1);var t}function p(e){return e.split(";").map((function(e){return e.trim()})).filter((function(e){return e})).reduce((function(e,t){var a,r=t.indexOf(":"),n=m(t.slice(0,r)),o=t.slice(r+1).trim();return n.startsWith("webkit")?e[(a=n,a.charAt(0).toUpperCase()+a.slice(1))]=o:e[n]=o,e}),{})}var v=!1;try{v=!0}catch(h){}function y(e){return null===e?null:"object"===s(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"===typeof e?{prefix:"fas",iconName:e}:void 0}function O(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?c({},e,t):{}}function j(e){var t=e.forwardedRef,a=b(e,["forwardedRef"]),n=a.icon,o=a.mask,i=a.symbol,l=a.className,s=a.title,f=y(n),m=O("classes",[].concat(d(function(e){var t,a=e.spin,r=e.pulse,n=e.fixedWidth,o=e.inverse,i=e.border,l=e.listItem,s=e.flip,f=e.size,u=e.rotation,b=e.pull,d=(c(t={"fa-spin":a,"fa-pulse":r,"fa-fw":n,"fa-inverse":o,"fa-border":i,"fa-li":l,"fa-flip-horizontal":"horizontal"===s||"both"===s,"fa-flip-vertical":"vertical"===s||"both"===s},"fa-".concat(f),"undefined"!==typeof f&&null!==f),c(t,"fa-rotate-".concat(u),"undefined"!==typeof u&&null!==u&&0!==u),c(t,"fa-pull-".concat(b),"undefined"!==typeof b&&null!==b),c(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(d).map((function(e){return d[e]?e:null})).filter((function(e){return e}))}(a)),d(l.split(" ")))),p=O("transform","string"===typeof a.transform?r.d.transform(a.transform):a.transform),h=O("mask",y(o)),P=Object(r.b)(f,u({},m,{},p,{},h,{symbol:i,title:s}));if(!P)return function(){var e;!v&&console&&"function"===typeof console.error&&(e=console).error.apply(e,arguments)}("Could not find icon",f),null;var N=P.abstract,g={ref:t};return Object.keys(a).forEach((function(e){j.defaultProps.hasOwnProperty(e)||(g[e]=a[e])})),x(N[0],g)}j.displayName="FontAwesomeIcon",j.propTypes={border:o.a.bool,className:o.a.string,mask:o.a.oneOfType([o.a.object,o.a.array,o.a.string]),fixedWidth:o.a.bool,inverse:o.a.bool,flip:o.a.oneOf(["horizontal","vertical","both"]),icon:o.a.oneOfType([o.a.object,o.a.array,o.a.string]),listItem:o.a.bool,pull:o.a.oneOf(["right","left"]),pulse:o.a.bool,rotation:o.a.oneOf([0,90,180,270]),size:o.a.oneOf(["lg","xs","sm","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:o.a.bool,symbol:o.a.oneOfType([o.a.bool,o.a.string]),title:o.a.string,transform:o.a.oneOfType([o.a.string,o.a.object]),swapOpacity:o.a.bool},j.defaultProps={border:!1,className:"",mask:null,fixedWidth:!1,inverse:!1,flip:null,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,symbol:!1,title:"",transform:null,swapOpacity:!1};var x=function e(t,a){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"===typeof a)return a;var n=(a.children||[]).map((function(a){return e(t,a)})),o=Object.keys(a.attributes||{}).reduce((function(e,t){var r=a.attributes[t];switch(t){case"class":e.attrs.className=r,delete a.attributes.class;break;case"style":e.attrs.style=p(r);break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=r:e.attrs[m(t)]=r}return e}),{attrs:{}}),i=r.style,l=void 0===i?{}:i,s=b(r,["style"]);return o.attrs.style=u({},o.attrs.style,{},l),t.apply(void 0,[a.tag,u({},o.attrs,{},s)].concat(d(n)))}.bind(null,l.a.createElement)},295:function(e,t,a){"use strict";var r=a(2),n=a(5),o=a(7),i=a.n(o),l=a(0),s=a.n(l),c=(a(169),a(271)),f=a(268),u=a(11),b=s.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,b=e.className,d=e.type,m=void 0===d?"checkbox":d,p=e.isValid,v=void 0!==p&&p,y=e.isInvalid,O=void 0!==y&&y,j=e.isStatic,x=e.as,h=void 0===x?"input":x,P=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),N=Object(l.useContext)(f.a),g=N.controlId,w=N.custom?[c,"custom-control-input"]:[o,"form-check-input"],I=w[0],E=w[1];return o=Object(u.a)(I,E),s.a.createElement(h,Object(r.a)({},P,{ref:t,type:m,id:a||g,className:i()(b,o,v&&"is-valid",O&&"is-invalid",j&&"position-static")}))}));b.displayName="FormCheckInput";var d=b,m=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,c=e.className,b=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),m=Object(l.useContext)(f.a),p=m.controlId,v=m.custom?[o,"custom-control-label"]:[a,"form-check-label"],y=v[0],O=v[1];return a=Object(u.a)(y,O),s.a.createElement("label",Object(r.a)({},d,{ref:t,htmlFor:b||p,className:i()(c,a)}))}));m.displayName="FormCheckLabel";var p=m,v=s.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,b=e.bsCustomPrefix,m=e.inline,v=void 0!==m&&m,y=e.disabled,O=void 0!==y&&y,j=e.isValid,x=void 0!==j&&j,h=e.isInvalid,P=void 0!==h&&h,N=e.feedbackTooltip,g=void 0!==N&&N,w=e.feedback,I=e.className,E=e.style,C=e.title,k=void 0===C?"":C,F=e.type,S=void 0===F?"checkbox":F,R=e.label,A=e.children,T=e.custom,L=e.as,V=void 0===L?"input":L,z=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),D="switch"===S||T,M=D?[b,"custom-control"]:[o,"form-check"],W=M[0],B=M[1];o=Object(u.a)(W,B);var G=Object(l.useContext)(f.a).controlId,H=Object(l.useMemo)((function(){return{controlId:a||G,custom:D}}),[G,D,a]),J=null!=R&&!1!==R&&!A,U=s.a.createElement(d,Object(r.a)({},z,{type:"switch"===S?"checkbox":S,ref:t,isValid:x,isInvalid:P,isStatic:!J,disabled:O,as:V}));return s.a.createElement(f.a.Provider,{value:H},s.a.createElement("div",{style:E,className:i()(I,o,D&&"custom-"+S,v&&o+"-inline")},A||s.a.createElement(s.a.Fragment,null,U,J&&s.a.createElement(p,{title:k},R),(x||P)&&s.a.createElement(c.a,{type:x?"valid":"invalid",tooltip:g},w))))}));v.displayName="FormCheck",v.Input=d,v.Label=p;var y=v,O=s.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,b=e.className,d=e.isValid,m=e.isInvalid,p=e.lang,v=e.as,y=void 0===v?"input":v,O=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),j=Object(l.useContext)(f.a),x=j.controlId,h=j.custom?[c,"custom-file-input"]:[o,"form-control-file"],P=h[0],N=h[1];return o=Object(u.a)(P,N),s.a.createElement(y,Object(r.a)({},O,{ref:t,id:a||x,type:"file",lang:p,className:i()(b,o,d&&"is-valid",m&&"is-invalid")}))}));O.displayName="FormFileInput";var j=O,x=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,c=e.className,b=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),m=Object(l.useContext)(f.a),p=m.controlId,v=m.custom?[o,"custom-file-label"]:[a,"form-file-label"],y=v[0],O=v[1];return a=Object(u.a)(y,O),s.a.createElement("label",Object(r.a)({},d,{ref:t,htmlFor:b||p,className:i()(c,a),"data-browse":d["data-browse"]}))}));x.displayName="FormFileLabel";var h=x,P=s.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,b=e.bsCustomPrefix,d=e.disabled,m=void 0!==d&&d,p=e.isValid,v=void 0!==p&&p,y=e.isInvalid,O=void 0!==y&&y,x=e.feedbackTooltip,P=void 0!==x&&x,N=e.feedback,g=e.className,w=e.style,I=e.label,E=e.children,C=e.custom,k=e.lang,F=e["data-browse"],S=e.as,R=void 0===S?"div":S,A=e.inputAs,T=void 0===A?"input":A,L=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),V=C?[b,"custom"]:[o,"form-file"],z=V[0],D=V[1];o=Object(u.a)(z,D);var M=Object(l.useContext)(f.a).controlId,W=Object(l.useMemo)((function(){return{controlId:a||M,custom:C}}),[M,C,a]),B=null!=I&&!1!==I&&!E,G=s.a.createElement(j,Object(r.a)({},L,{ref:t,isValid:v,isInvalid:O,disabled:m,as:T,lang:k}));return s.a.createElement(f.a.Provider,{value:W},s.a.createElement(R,{style:w,className:i()(g,o,C&&"custom-file")},E||s.a.createElement(s.a.Fragment,null,C?s.a.createElement(s.a.Fragment,null,G,B&&s.a.createElement(h,{"data-browse":F},I)):s.a.createElement(s.a.Fragment,null,B&&s.a.createElement(h,null,I),G),(v||O)&&s.a.createElement(c.a,{type:v?"valid":"invalid",tooltip:P},N))))}));P.displayName="FormFile",P.Input=j,P.Label=h;var N=P,g=a(277),w=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,c=e.children,b=e.controlId,d=e.as,m=void 0===d?"div":d,p=Object(n.a)(e,["bsPrefix","className","children","controlId","as"]);a=Object(u.a)(a,"form-group");var v=Object(l.useMemo)((function(){return{controlId:b}}),[b]);return s.a.createElement(f.a.Provider,{value:v},s.a.createElement(m,Object(r.a)({},p,{ref:t,className:i()(o,a)}),c))}));w.displayName="FormGroup";var I=w,E=(a(62),a(129)),C=s.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"label":a,c=e.bsPrefix,b=e.column,d=e.srOnly,m=e.className,p=e.htmlFor,v=Object(n.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),y=Object(l.useContext)(f.a).controlId;c=Object(u.a)(c,"form-label");var O="col-form-label";"string"===typeof b&&(O=O+"-"+b);var j=i()(m,c,d&&"sr-only",b&&O);return p=p||y,b?s.a.createElement(E.a,Object(r.a)({as:"label",className:j,htmlFor:p},v)):s.a.createElement(o,Object(r.a)({ref:t,className:j,htmlFor:p},v))}));C.displayName="FormLabel",C.defaultProps={column:!1,srOnly:!1};var k=C,F=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,l=e.as,c=void 0===l?"small":l,f=e.muted,b=Object(n.a)(e,["bsPrefix","className","as","muted"]);return a=Object(u.a)(a,"form-text"),s.a.createElement(c,Object(r.a)({},b,{ref:t,className:i()(o,a,f&&"text-muted")}))}));F.displayName="FormText";var S=F,R=s.a.forwardRef((function(e,t){return s.a.createElement(y,Object(r.a)({},e,{ref:t,type:"switch"}))}));R.displayName="Switch",R.Input=y.Input,R.Label=y.Label;var A=R,T=a(26),L=Object(T.a)("form-row"),V=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.inline,l=e.className,c=e.validated,f=e.as,b=void 0===f?"form":f,d=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return a=Object(u.a)(a,"form"),s.a.createElement(b,Object(r.a)({},d,{ref:t,className:i()(l,c&&"was-validated",o&&a+"-inline")}))}));V.displayName="Form",V.defaultProps={inline:!1},V.Row=L,V.Group=I,V.Control=g.a,V.Check=y,V.File=N,V.Switch=A,V.Label=k,V.Text=S;t.a=V},308:function(e,t,a){"use strict";var r=a(2),n=a(5),o=a(7),i=a.n(o),l=a(0),s=a.n(l),c=a(11),f=a(26),u=a(86),b=a(127),d=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,l=e.variant,f=e.as,u=void 0===f?"img":f,b=Object(n.a)(e,["bsPrefix","className","variant","as"]),d=Object(c.a)(a,"card-img");return s.a.createElement(u,Object(r.a)({ref:t,className:i()(l?d+"-"+l:d,o)},b))}));d.displayName="CardImg",d.defaultProps={variant:null};var m=d,p=Object(u.a)("h5"),v=Object(u.a)("h6"),y=Object(f.a)("card-body"),O=Object(f.a)("card-title",{Component:p}),j=Object(f.a)("card-subtitle",{Component:v}),x=Object(f.a)("card-link",{Component:"a"}),h=Object(f.a)("card-text",{Component:"p"}),P=Object(f.a)("card-header"),N=Object(f.a)("card-footer"),g=Object(f.a)("card-img-overlay"),w=s.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,f=e.bg,u=e.text,d=e.border,m=e.body,p=e.children,v=e.as,O=void 0===v?"div":v,j=Object(n.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),x=Object(c.a)(a,"card"),h=Object(l.useMemo)((function(){return{cardHeaderBsPrefix:x+"-header"}}),[x]);return s.a.createElement(b.a.Provider,{value:h},s.a.createElement(O,Object(r.a)({ref:t},j,{className:i()(o,x,f&&"bg-"+f,u&&"text-"+u,d&&"border-"+d)}),m?s.a.createElement(y,null,p):p))}));w.displayName="Card",w.defaultProps={body:!1},w.Img=m,w.Title=O,w.Subtitle=j,w.Body=y,w.Link=x,w.Text=h,w.Header=P,w.Footer=N,w.ImgOverlay=g;t.a=w}}]);
//# sourceMappingURL=15.c411bffb.chunk.js.map