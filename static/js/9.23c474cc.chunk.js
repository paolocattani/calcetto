(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[9],{1314:function(e,a,t){"use strict";t.r(a);var r=t(7),l=t.n(r),c=t(10),n=t(62),i=t(301),s=t(2),o=t(0),d=t(149),b=t(428),u=t(377),m=t(195),f=t(107),j=t(285),O=t(321),v=t(126),h=t.n(v),x=t(49),p=t(75),y=t(24),N=t(40),P=t(11),g=t(298),w=Object(o.lazy)((function(){return t.e(18).then(t.bind(null,1307))}));a.default=function(){var e=Object(N.c)(),a=Object(y.g)(),t=Object(g.a)(["common","auth","player"]).t,r=Object(N.d)(p.a.getUser),v=Object(o.useState)(!1),C=Object(i.a)(v,2),I=C[0],F=C[1],E=Object(O.a)(r.name),k=E.value,R=E.bind,S=Object(O.a)(r.surname),L=S.value,V=S.bind,T=Object(O.a)(r.phone),z=T.value,G=T.bind,M=Object(O.a)(r.birthday),q=M.value,A=M.setValue,H=function(){var t=Object(n.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),e(P.a.update.request({user:Object(c.a)(Object(c.a)({},r),{},{name:k.trim(),surname:L.trim(),phone:z.trim(),birthday:q}),history:a}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(s.jsx)(d.a,{md:{span:"6",offset:"3"},sm:"12",children:Object(s.jsxs)(b.a,{style:{textAlign:"left",width:"100%",height:"auto",margin:"auto",color:"white"},className:"default-background",children:[Object(s.jsxs)(u.a,{onSubmit:H,children:[Object(s.jsx)(b.a.Header,{as:"h2",children:Object(s.jsxs)(m.a,{children:[Object(s.jsx)(d.a,{md:"9",children:t("auth:manage")}),Object(s.jsx)(d.a,{md:"3",children:Object(s.jsxs)(f.a,{variant:"outline-warning",className:"float-right",onClick:function(){return a.push("/")},children:[Object(s.jsx)(x.n,{})," ",t("auth:close")]})})]})}),Object(s.jsx)(b.a.Body,{children:Object(s.jsxs)(j.a,{children:[Object(s.jsxs)(u.a.Group,{as:m.a,controlId:"username",children:[Object(s.jsx)(u.a.Label,{column:!0,children:t("auth:username")}),Object(s.jsx)(d.a,{sm:"9",children:Object(s.jsx)(u.a.Control,{plaintext:!0,value:r.username,readOnly:!0,style:{fontSize:"larger",fontWeight:"bolder"},className:"default-color-white "})})]}),Object(s.jsxs)(u.a.Group,{as:m.a,controlId:"email",children:[Object(s.jsx)(u.a.Label,{column:!0,children:t("auth:email.email")}),Object(s.jsx)(d.a,{sm:"9",children:Object(s.jsx)(u.a.Control,{plaintext:!0,value:r.email,readOnly:!0,style:{fontSize:"larger",fontWeight:"bolder"},className:"default-color-white"})})]}),Object(s.jsxs)(u.a.Group,{as:m.a,controlId:"role",children:[Object(s.jsx)(u.a.Label,{column:!0,children:t("player:role.role")}),Object(s.jsx)(d.a,{sm:"9",children:Object(s.jsx)(u.a.Control,{plaintext:!0,value:r.role,readOnly:!0,style:{fontSize:"larger",fontWeight:"bolder"},className:"default-color-white"})})]}),Object(s.jsxs)(u.a.Row,{children:[Object(s.jsx)(d.a,{children:Object(s.jsxs)(u.a.Group,{controlId:"name",children:[Object(s.jsx)(u.a.Label,{children:t("auth:name")}),Object(s.jsx)(u.a.Control,Object(c.a)({required:!0,type:"text",placeholder:t("auth:name")},R))]})}),Object(s.jsx)(d.a,{children:Object(s.jsxs)(u.a.Group,{controlId:"surname",children:[Object(s.jsx)(u.a.Label,{children:t("auth:surname")}),Object(s.jsx)(u.a.Control,Object(c.a)({required:!0,type:"text",placeholder:t("auth:surname")},V))]})})]}),Object(s.jsxs)(u.a.Row,{children:[Object(s.jsx)(d.a,{children:Object(s.jsxs)(u.a.Group,{controlId:"phone",children:[Object(s.jsx)(u.a.Label,{children:t("auth:mobile")}),Object(s.jsx)(u.a.Control,Object(c.a)({required:!0,type:"text",placeholder:t("auth:mobile")},G))]})}),Object(s.jsx)(d.a,{children:Object(s.jsxs)(u.a.Group,{controlId:"birthday",children:[Object(s.jsx)(u.a.Label,{children:t("auth:birthday")}),Object(s.jsx)(u.a.Control,{as:function(){return Object(s.jsx)(h.a,{selected:new Date(q),locale:"it-IT",dateFormat:"dd/MM/yyyy",onChange:function(e){return A(e||new Date)}})}})]})})]})]})}),Object(s.jsxs)(b.a.Footer,{style:{height:"10vh"},children:[Object(s.jsxs)(f.a,{variant:"outline-success",type:"submit",className:"float-right",children:[Object(s.jsx)(x.m,{})," ",t("common:save")]}),Object(s.jsxs)(f.a,{variant:"outline-danger",className:"float-left",onClick:function(){return F(!0)},children:[Object(s.jsx)(x.q,{})," ",t("auth:delete")]})]})]}),Object(s.jsx)(w,{show:I,onHide:function(){return F(!1)}})]})})}},299:function(e,a,t){"use strict";var r=t(0),l=t.n(r).a.createContext({controlId:void 0});a.a=l},301:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(145);function l(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,l=!1,c=void 0;try{for(var n,i=e[Symbol.iterator]();!(r=(n=i.next()).done)&&(t.push(n.value),!a||t.length!==a);r=!0);}catch(s){l=!0,c=s}finally{try{r||null==i.return||i.return()}finally{if(l)throw c}}return t}}(e,a)||Object(r.a)(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},304:function(e,a,t){"use strict";var r=t(5),l=t(9),c=t(12),n=t.n(c),i=t(0),s=t.n(i),o=t(6),d=t.n(o),b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},u=s.a.forwardRef((function(e,a){var t=e.as,c=void 0===t?"div":t,i=e.className,o=e.type,d=void 0===o?"valid":o,b=e.tooltip,u=void 0!==b&&b,m=Object(l.a)(e,["as","className","type","tooltip"]);return s.a.createElement(c,Object(r.a)({},m,{ref:a,className:n()(i,d+"-"+(u?"tooltip":"feedback"))}))}));u.displayName="Feedback",u.propTypes=b,a.a=u},321:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var r=t(301),l=t(0),c=function(e){var a=Object(l.useState)(e),t=Object(r.a)(a,2),c=t[0],n=t[1];return{value:c,setValue:n,reset:function(){return n(e)},bind:{value:c,onChange:function(e){return n(e.currentTarget.value)}}}}},322:function(e,a,t){"use strict";var r=t(5),l=t(9),c=t(12),n=t.n(c),i=(t(196),t(0)),s=t.n(i),o=(t(61),t(304)),d=t(299),b=t(16),u=s.a.forwardRef((function(e,a){var t,c,o=e.bsPrefix,u=e.bsCustomPrefix,m=e.type,f=e.size,j=e.htmlSize,O=e.id,v=e.className,h=e.isValid,x=void 0!==h&&h,p=e.isInvalid,y=void 0!==p&&p,N=e.plaintext,P=e.readOnly,g=e.custom,w=e.as,C=void 0===w?"input":w,I=Object(l.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=Object(i.useContext)(d.a).controlId,E=g?[u,"custom"]:[o,"form-control"],k=E[0],R=E[1];if(o=Object(b.a)(k,R),N)(c={})[o+"-plaintext"]=!0,t=c;else if("file"===m){var S;(S={})[o+"-file"]=!0,t=S}else if("range"===m){var L;(L={})[o+"-range"]=!0,t=L}else if("select"===C&&g){var V;(V={})[o+"-select"]=!0,V[o+"-select-"+f]=f,t=V}else{var T;(T={})[o]=!0,T[o+"-"+f]=f,t=T}return s.a.createElement(C,Object(r.a)({},I,{type:m,size:j,ref:a,readOnly:P,id:O||F,className:n()(v,t,x&&"is-valid",y&&"is-invalid")}))}));u.displayName="FormControl",a.a=Object.assign(u,{Feedback:o.a})},377:function(e,a,t){"use strict";var r=t(5),l=t(9),c=t(12),n=t.n(c),i=t(0),s=t.n(i),o=(t(196),t(304)),d=t(299),b=t(16),u=s.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,u=e.className,m=e.type,f=void 0===m?"checkbox":m,j=e.isValid,O=void 0!==j&&j,v=e.isInvalid,h=void 0!==v&&v,x=e.isStatic,p=e.as,y=void 0===p?"input":p,N=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),P=Object(i.useContext)(d.a),g=P.controlId,w=P.custom?[o,"custom-control-input"]:[c,"form-check-input"],C=w[0],I=w[1];return c=Object(b.a)(C,I),s.a.createElement(y,Object(r.a)({},N,{ref:a,type:f,id:t||g,className:n()(u,c,O&&"is-valid",h&&"is-invalid",x&&"position-static")}))}));u.displayName="FormCheckInput";var m=u,f=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.bsCustomPrefix,o=e.className,u=e.htmlFor,m=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(i.useContext)(d.a),j=f.controlId,O=f.custom?[c,"custom-control-label"]:[t,"form-check-label"],v=O[0],h=O[1];return t=Object(b.a)(v,h),s.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:u||j,className:n()(o,t)}))}));f.displayName="FormCheckLabel";var j=f,O=s.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,u=e.bsCustomPrefix,f=e.inline,O=void 0!==f&&f,v=e.disabled,h=void 0!==v&&v,x=e.isValid,p=void 0!==x&&x,y=e.isInvalid,N=void 0!==y&&y,P=e.feedbackTooltip,g=void 0!==P&&P,w=e.feedback,C=e.className,I=e.style,F=e.title,E=void 0===F?"":F,k=e.type,R=void 0===k?"checkbox":k,S=e.label,L=e.children,V=e.custom,T=e.as,z=void 0===T?"input":T,G=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),M="switch"===R||V,q=M?[u,"custom-control"]:[c,"form-check"],A=q[0],H=q[1];c=Object(b.a)(A,H);var B=Object(i.useContext)(d.a).controlId,D=Object(i.useMemo)((function(){return{controlId:t||B,custom:M}}),[B,M,t]),W=M||null!=S&&!1!==S&&!L,J=s.a.createElement(m,Object(r.a)({},G,{type:"switch"===R?"checkbox":R,ref:a,isValid:p,isInvalid:N,isStatic:!W,disabled:h,as:z}));return s.a.createElement(d.a.Provider,{value:D},s.a.createElement("div",{style:I,className:n()(C,c,M&&"custom-"+R,O&&c+"-inline")},L||s.a.createElement(s.a.Fragment,null,J,W&&s.a.createElement(j,{title:E},S),(p||N)&&s.a.createElement(o.a,{type:p?"valid":"invalid",tooltip:g},w))))}));O.displayName="FormCheck",O.Input=m,O.Label=j;var v=O,h=s.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,u=e.className,m=e.isValid,f=e.isInvalid,j=e.lang,O=e.as,v=void 0===O?"input":O,h=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),x=Object(i.useContext)(d.a),p=x.controlId,y=x.custom?[o,"custom-file-input"]:[c,"form-control-file"],N=y[0],P=y[1];return c=Object(b.a)(N,P),s.a.createElement(v,Object(r.a)({},h,{ref:a,id:t||p,type:"file",lang:j,className:n()(u,c,m&&"is-valid",f&&"is-invalid")}))}));h.displayName="FormFileInput";var x=h,p=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.bsCustomPrefix,o=e.className,u=e.htmlFor,m=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(i.useContext)(d.a),j=f.controlId,O=f.custom?[c,"custom-file-label"]:[t,"form-file-label"],v=O[0],h=O[1];return t=Object(b.a)(v,h),s.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:u||j,className:n()(o,t),"data-browse":m["data-browse"]}))}));p.displayName="FormFileLabel";var y=p,N=s.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,u=e.bsCustomPrefix,m=e.disabled,f=void 0!==m&&m,j=e.isValid,O=void 0!==j&&j,v=e.isInvalid,h=void 0!==v&&v,p=e.feedbackTooltip,N=void 0!==p&&p,P=e.feedback,g=e.className,w=e.style,C=e.label,I=e.children,F=e.custom,E=e.lang,k=e["data-browse"],R=e.as,S=void 0===R?"div":R,L=e.inputAs,V=void 0===L?"input":L,T=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),z=F?[u,"custom"]:[c,"form-file"],G=z[0],M=z[1];c=Object(b.a)(G,M);var q=Object(i.useContext)(d.a).controlId,A=Object(i.useMemo)((function(){return{controlId:t||q,custom:F}}),[q,F,t]),H=null!=C&&!1!==C&&!I,B=s.a.createElement(x,Object(r.a)({},T,{ref:a,isValid:O,isInvalid:h,disabled:f,as:V,lang:E}));return s.a.createElement(d.a.Provider,{value:A},s.a.createElement(S,{style:w,className:n()(g,c,F&&"custom-file")},I||s.a.createElement(s.a.Fragment,null,F?s.a.createElement(s.a.Fragment,null,B,H&&s.a.createElement(y,{"data-browse":k},C)):s.a.createElement(s.a.Fragment,null,H&&s.a.createElement(y,null,C),B),(O||h)&&s.a.createElement(o.a,{type:O?"valid":"invalid",tooltip:N},P))))}));N.displayName="FormFile",N.Input=x,N.Label=y;var P=N,g=t(322),w=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,o=e.children,u=e.controlId,m=e.as,f=void 0===m?"div":m,j=Object(l.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(b.a)(t,"form-group");var O=Object(i.useMemo)((function(){return{controlId:u}}),[u]);return s.a.createElement(d.a.Provider,{value:O},s.a.createElement(f,Object(r.a)({},j,{ref:a,className:n()(c,t)}),o))}));w.displayName="FormGroup";var C=w,I=(t(61),t(149)),F=s.a.forwardRef((function(e,a){var t=e.as,c=void 0===t?"label":t,o=e.bsPrefix,u=e.column,m=e.srOnly,f=e.className,j=e.htmlFor,O=Object(l.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),v=Object(i.useContext)(d.a).controlId;o=Object(b.a)(o,"form-label");var h="col-form-label";"string"===typeof u&&(h=h+" "+h+"-"+u);var x=n()(f,o,m&&"sr-only",u&&h);return j=j||v,u?s.a.createElement(I.a,Object(r.a)({as:"label",className:x,htmlFor:j},O)):s.a.createElement(c,Object(r.a)({ref:a,className:x,htmlFor:j},O))}));F.displayName="FormLabel",F.defaultProps={column:!1,srOnly:!1};var E=F,k=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,i=e.as,o=void 0===i?"small":i,d=e.muted,u=Object(l.a)(e,["bsPrefix","className","as","muted"]);return t=Object(b.a)(t,"form-text"),s.a.createElement(o,Object(r.a)({},u,{ref:a,className:n()(c,t,d&&"text-muted")}))}));k.displayName="FormText";var R=k,S=s.a.forwardRef((function(e,a){return s.a.createElement(v,Object(r.a)({},e,{ref:a,type:"switch"}))}));S.displayName="Switch",S.Input=v.Input,S.Label=v.Label;var L=S,V=t(32),T=Object(V.a)("form-row"),z=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.inline,i=e.className,o=e.validated,d=e.as,u=void 0===d?"form":d,m=Object(l.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(b.a)(t,"form"),s.a.createElement(u,Object(r.a)({},m,{ref:a,className:n()(i,o&&"was-validated",c&&t+"-inline")}))}));z.displayName="Form",z.defaultProps={inline:!1},z.Row=T,z.Group=C,z.Control=g.a,z.Check=v,z.File=P,z.Switch=L,z.Label=E,z.Text=R;a.a=z},428:function(e,a,t){"use strict";var r=t(5),l=t(9),c=t(12),n=t.n(c),i=t(0),s=t.n(i),o=t(16),d=t(32),b=t(103),u=t(148),m=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,i=e.variant,d=e.as,b=void 0===d?"img":d,u=Object(l.a)(e,["bsPrefix","className","variant","as"]),m=Object(o.a)(t,"card-img");return s.a.createElement(b,Object(r.a)({ref:a,className:n()(i?m+"-"+i:m,c)},u))}));m.displayName="CardImg",m.defaultProps={variant:null};var f=m,j=Object(b.a)("h5"),O=Object(b.a)("h6"),v=Object(d.a)("card-body"),h=Object(d.a)("card-title",{Component:j}),x=Object(d.a)("card-subtitle",{Component:O}),p=Object(d.a)("card-link",{Component:"a"}),y=Object(d.a)("card-text",{Component:"p"}),N=Object(d.a)("card-header"),P=Object(d.a)("card-footer"),g=Object(d.a)("card-img-overlay"),w=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,d=e.bg,b=e.text,m=e.border,f=e.body,j=e.children,O=e.as,h=void 0===O?"div":O,x=Object(l.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),p=Object(o.a)(t,"card"),y=Object(i.useMemo)((function(){return{cardHeaderBsPrefix:p+"-header"}}),[p]);return s.a.createElement(u.a.Provider,{value:y},s.a.createElement(h,Object(r.a)({ref:a},x,{className:n()(c,p,d&&"bg-"+d,b&&"text-"+b,m&&"border-"+m)}),f?s.a.createElement(v,null,j):j))}));w.displayName="Card",w.defaultProps={body:!1},w.Img=f,w.Title=h,w.Subtitle=x,w.Body=v,w.Link=p,w.Text=y,w.Header=N,w.Footer=P,w.ImgOverlay=g;a.a=w}}]);
//# sourceMappingURL=9.23c474cc.chunk.js.map