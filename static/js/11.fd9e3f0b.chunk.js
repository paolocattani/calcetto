(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[11],{1305:function(e,a,t){"use strict";t.r(a);var r=t(10),l=t(7),c=t.n(l),s=t(62),i=t(2),n=t(321),o=t(377),u=t(149),d=t(107),b=(t(0),t(126)),m=t.n(b),j=t(376),f=(t(1306),t(151)),h=t(11),p=t(40),O=t(24),v=t(34),x=t(354),y=t(298),w=t(58),N=t(355);a.default=Object(O.i)((function(){var e=Object(p.c)(),a=Object(O.g)(),t=Object(y.a)(["common","auth","player"]).t,l=[{value:w.PlayerRole.NotAPlayer,label:t("player:role.none")},{value:w.PlayerRole.GoalKeeper,label:t("player:role.goalKeeper")},{value:w.PlayerRole.Striker,label:t("player:role.striker")},{value:w.PlayerRole.Master,label:t("player:role.master")}],b=Object(n.a)(""),I=b.value,g=b.bind,F=b.reset,C=Object(n.a)(""),k=C.value,E=C.bind,R=C.reset,V=Object(n.a)(""),L=V.value,S=V.bind,T=V.reset,G=Object(n.a)(""),M=G.value,D=G.bind,q=G.reset,A=Object(n.a)(""),B=A.value,J=A.bind,K=A.reset,z=Object(n.a)(""),H=z.value,Q=z.bind,U=z.reset,W=Object(n.a)(""),X=W.value,Y=W.bind,Z=W.reset,$=Object(n.a)(""),_=$.value,ee=$.bind,ae=$.reset,te=Object(n.a)(new Date),re=te.value,le=te.setValue,ce=te.reset,se=Object(n.a)(l[0]),ie=se.value,ne=se.setValue,oe=se.reset,ue=function(){var e=[];return I||e.push("auth:error.username"),k||e.push("auth:error.name"),L||e.push("auth:error.surname"),M||e.push("auth:error.email.address"),f.a.test(M)||e.push("auth:error.email.validation"),B||e.push("auth:error.email.confirm"),f.a.test(B)||e.push("auth:error.email.validation"),M!==B&&e.push("auth:error.email.match"),H||e.push("auth:error.password.password"),f.c.test(H)||e.push("auth:error.password.validation"),X||e.push("auth:error.password.confirm"),f.c.test(X)||e.push("auth:error.password.validation"),H!==X&&e.push("auth:error.password.match"),0===e.length||(e.forEach((function(e){return v.b.error(t(e))})),!1)},de=function(){var t=Object(s.a)(c.a.mark((function t(r){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r.preventDefault(),ue()){t.next=3;break}return t.abrupt("return");case 3:e(h.a.registration.request({username:I.trim(),name:k.trim(),surname:L.trim(),email:M.trim(),confirmEmail:B.trim(),password:H.trim(),confirmPassword:X.trim(),phone:_.trim(),birthday:re,playerRole:ie.value,history:a}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(i.jsxs)(o.a,{onSubmit:de,children:[Object(i.jsxs)(o.a.Row,{children:[Object(i.jsx)(u.a,{children:Object(i.jsx)(x.a,Object(r.a)({controlId:"username",label:t("auth:username"),placeholder:t("auth:username")},g))}),Object(i.jsx)(u.a,{children:Object(i.jsx)(x.a,Object(r.a)({controlId:"name",label:t("auth:name"),placeholder:t("auth:name")},E))}),Object(i.jsx)(u.a,{children:Object(i.jsx)(x.a,Object(r.a)({controlId:"surname",label:t("auth:surname"),placeholder:t("auth:surname")},S))})]}),Object(i.jsxs)(o.a.Row,{children:[Object(i.jsx)(u.a,{children:Object(i.jsx)(x.a,Object(r.a)({controlId:"email",label:t("auth:email.email"),type:"email",placeholder:t("auth:email.email")},D))}),Object(i.jsx)(u.a,{children:Object(i.jsx)(x.a,Object(r.a)({controlId:"cemail",label:t("auth:email.confirm"),type:"email",placeholder:t("auth:email.confirm")},J))})]}),Object(i.jsxs)(o.a.Row,{children:[Object(i.jsxs)(u.a,{children:[Object(i.jsx)(x.a,Object(r.a)({controlId:"password",label:t(N.a),type:"password",placeholder:t(N.a)},Q)),Object(i.jsx)(x.a,Object(r.a)({controlId:"cpassword",label:t("auth:password.confirm"),type:"password",placeholder:t(N.a)},Y))]}),Object(i.jsx)(u.a,{md:6,style:{display:"flex",alignItems:"center"},children:Object(i.jsxs)("ul",{children:[Object(i.jsxs)("strong",{children:[t("auth:password.criteria.title")," :"]}),Object(i.jsx)("li",{children:t("auth:password.criteria.c1")},"pass-1"),Object(i.jsx)("li",{children:t("auth:password.criteria.c2")},"pass-2"),Object(i.jsx)("li",{children:t("auth:password.criteria.c3")},"pass-3"),Object(i.jsx)("li",{children:t("auth:password.criteria.c4")},"pass-4")]})})]}),Object(i.jsxs)(o.a.Row,{children:[Object(i.jsx)(u.a,{md:3,children:Object(i.jsx)(x.a,Object(r.a)({controlId:"phone",label:t("auth:mobile"),placeholder:t("auth:mobile")},ee))}),Object(i.jsx)(u.a,{md:3,children:Object(i.jsxs)(o.a.Group,{controlId:"birthday",children:[Object(i.jsx)(o.a.Label,{onClick:function(e){return e.preventDefault()},children:t("auth:birthday")}),Object(i.jsx)(m.a,{id:"birthday",className:"datepicker",dateFormat:"dd/MM/yyyy",selected:re,onChange:function(e){return le(e)}})]})}),Object(i.jsx)(u.a,{md:6,children:Object(i.jsxs)(o.a.Group,{children:[Object(i.jsx)(o.a.Label,{children:t("player:role.role")}),Object(i.jsx)(j.a,{id:"playerRole",textFieldProps:{label:"Ruolo"},value:ie,onChange:function(e){var a;(a=e)&&ne(a)},options:l,styles:P}),Object(i.jsx)(o.a.Text,{className:"text-muted default-color-green",children:t("auth:player")})]})})]}),Object(i.jsx)(d.a,{id:"registerButton",variant:"outline-success",className:"float-right",type:"submit",size:"lg",children:t("common:confirm")}),Object(i.jsx)(d.a,{id:"resetButton",variant:"outline-danger",className:"float-left",onClick:function(){F(),R(),T(),q(),K(),U(),Z(),ae(),ce(),oe()},type:"submit",children:t("common:reset")})]})}));var P={control:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"38px"})},input:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"38px"})},option:function(e,a){a.data,a.isDisabled,a.isFocused,a.isSelected;return Object(r.a)(Object(r.a)({},e),{},{color:"black"})},placeholder:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"38px"})},singleValue:function(e,a){a.data;return Object(r.a)(Object(r.a)({},e),{},{height:"38px"})},clearIndicator:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"38px"})},indicatorSeparator:function(e){return Object(r.a)({},e)}}},1306:function(e,a,t){},321:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var r=t(301),l=t(0),c=function(e){var a=Object(l.useState)(e),t=Object(r.a)(a,2),c=t[0],s=t[1];return{value:c,setValue:s,reset:function(){return s(e)},bind:{value:c,onChange:function(e){return s(e.currentTarget.value)}}}}},354:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var r=t(2),l=(t(0),t(377)),c=function(e){var a=e.controlId,t=e.label,c=e.placeholder,s=e.type,i=void 0===s?"text":s,n=e.required,o=e.value,u=e.onChange,d=e.validFeedback,b=e.invalidFeedback;return Object(r.jsxs)(l.a.Group,{controlId:a,children:[t?Object(r.jsx)(l.a.Label,{children:t}):null,Object(r.jsx)(l.a.Control,{required:n,type:i,placeholder:c,value:o,onChange:u}),d?Object(r.jsx)(l.a.Control.Feedback,{children:d}):null,b?Object(r.jsx)(l.a.Control.Feedback,{type:"invalid",children:b}):null]})}},355:function(e,a,t){"use strict";t.d(a,"a",(function(){return r})),t.d(a,"b",(function(){return l})),t.d(a,"c",(function(){return c}));var r="auth:password.password",l="common:loading",c="tournament:select"},377:function(e,a,t){"use strict";var r=t(5),l=t(9),c=t(12),s=t.n(c),i=t(0),n=t.n(i),o=(t(196),t(304)),u=t(299),d=t(16),b=n.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,b=e.className,m=e.type,j=void 0===m?"checkbox":m,f=e.isValid,h=void 0!==f&&f,p=e.isInvalid,O=void 0!==p&&p,v=e.isStatic,x=e.as,y=void 0===x?"input":x,w=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),N=Object(i.useContext)(u.a),P=N.controlId,I=N.custom?[o,"custom-control-input"]:[c,"form-check-input"],g=I[0],F=I[1];return c=Object(d.a)(g,F),n.a.createElement(y,Object(r.a)({},w,{ref:a,type:j,id:t||P,className:s()(b,c,h&&"is-valid",O&&"is-invalid",v&&"position-static")}))}));b.displayName="FormCheckInput";var m=b,j=n.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.bsCustomPrefix,o=e.className,b=e.htmlFor,m=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),j=Object(i.useContext)(u.a),f=j.controlId,h=j.custom?[c,"custom-control-label"]:[t,"form-check-label"],p=h[0],O=h[1];return t=Object(d.a)(p,O),n.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:b||f,className:s()(o,t)}))}));j.displayName="FormCheckLabel";var f=j,h=n.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,b=e.bsCustomPrefix,j=e.inline,h=void 0!==j&&j,p=e.disabled,O=void 0!==p&&p,v=e.isValid,x=void 0!==v&&v,y=e.isInvalid,w=void 0!==y&&y,N=e.feedbackTooltip,P=void 0!==N&&N,I=e.feedback,g=e.className,F=e.style,C=e.title,k=void 0===C?"":C,E=e.type,R=void 0===E?"checkbox":E,V=e.label,L=e.children,S=e.custom,T=e.as,G=void 0===T?"input":T,M=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),D="switch"===R||S,q=D?[b,"custom-control"]:[c,"form-check"],A=q[0],B=q[1];c=Object(d.a)(A,B);var J=Object(i.useContext)(u.a).controlId,K=Object(i.useMemo)((function(){return{controlId:t||J,custom:D}}),[J,D,t]),z=D||null!=V&&!1!==V&&!L,H=n.a.createElement(m,Object(r.a)({},M,{type:"switch"===R?"checkbox":R,ref:a,isValid:x,isInvalid:w,isStatic:!z,disabled:O,as:G}));return n.a.createElement(u.a.Provider,{value:K},n.a.createElement("div",{style:F,className:s()(g,c,D&&"custom-"+R,h&&c+"-inline")},L||n.a.createElement(n.a.Fragment,null,H,z&&n.a.createElement(f,{title:k},V),(x||w)&&n.a.createElement(o.a,{type:x?"valid":"invalid",tooltip:P},I))))}));h.displayName="FormCheck",h.Input=m,h.Label=f;var p=h,O=n.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,b=e.className,m=e.isValid,j=e.isInvalid,f=e.lang,h=e.as,p=void 0===h?"input":h,O=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),v=Object(i.useContext)(u.a),x=v.controlId,y=v.custom?[o,"custom-file-input"]:[c,"form-control-file"],w=y[0],N=y[1];return c=Object(d.a)(w,N),n.a.createElement(p,Object(r.a)({},O,{ref:a,id:t||x,type:"file",lang:f,className:s()(b,c,m&&"is-valid",j&&"is-invalid")}))}));O.displayName="FormFileInput";var v=O,x=n.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.bsCustomPrefix,o=e.className,b=e.htmlFor,m=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),j=Object(i.useContext)(u.a),f=j.controlId,h=j.custom?[c,"custom-file-label"]:[t,"form-file-label"],p=h[0],O=h[1];return t=Object(d.a)(p,O),n.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:b||f,className:s()(o,t),"data-browse":m["data-browse"]}))}));x.displayName="FormFileLabel";var y=x,w=n.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,b=e.bsCustomPrefix,m=e.disabled,j=void 0!==m&&m,f=e.isValid,h=void 0!==f&&f,p=e.isInvalid,O=void 0!==p&&p,x=e.feedbackTooltip,w=void 0!==x&&x,N=e.feedback,P=e.className,I=e.style,g=e.label,F=e.children,C=e.custom,k=e.lang,E=e["data-browse"],R=e.as,V=void 0===R?"div":R,L=e.inputAs,S=void 0===L?"input":L,T=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),G=C?[b,"custom"]:[c,"form-file"],M=G[0],D=G[1];c=Object(d.a)(M,D);var q=Object(i.useContext)(u.a).controlId,A=Object(i.useMemo)((function(){return{controlId:t||q,custom:C}}),[q,C,t]),B=null!=g&&!1!==g&&!F,J=n.a.createElement(v,Object(r.a)({},T,{ref:a,isValid:h,isInvalid:O,disabled:j,as:S,lang:k}));return n.a.createElement(u.a.Provider,{value:A},n.a.createElement(V,{style:I,className:s()(P,c,C&&"custom-file")},F||n.a.createElement(n.a.Fragment,null,C?n.a.createElement(n.a.Fragment,null,J,B&&n.a.createElement(y,{"data-browse":E},g)):n.a.createElement(n.a.Fragment,null,B&&n.a.createElement(y,null,g),J),(h||O)&&n.a.createElement(o.a,{type:h?"valid":"invalid",tooltip:w},N))))}));w.displayName="FormFile",w.Input=v,w.Label=y;var N=w,P=t(322),I=n.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,o=e.children,b=e.controlId,m=e.as,j=void 0===m?"div":m,f=Object(l.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(d.a)(t,"form-group");var h=Object(i.useMemo)((function(){return{controlId:b}}),[b]);return n.a.createElement(u.a.Provider,{value:h},n.a.createElement(j,Object(r.a)({},f,{ref:a,className:s()(c,t)}),o))}));I.displayName="FormGroup";var g=I,F=(t(61),t(149)),C=n.a.forwardRef((function(e,a){var t=e.as,c=void 0===t?"label":t,o=e.bsPrefix,b=e.column,m=e.srOnly,j=e.className,f=e.htmlFor,h=Object(l.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),p=Object(i.useContext)(u.a).controlId;o=Object(d.a)(o,"form-label");var O="col-form-label";"string"===typeof b&&(O=O+" "+O+"-"+b);var v=s()(j,o,m&&"sr-only",b&&O);return f=f||p,b?n.a.createElement(F.a,Object(r.a)({as:"label",className:v,htmlFor:f},h)):n.a.createElement(c,Object(r.a)({ref:a,className:v,htmlFor:f},h))}));C.displayName="FormLabel",C.defaultProps={column:!1,srOnly:!1};var k=C,E=n.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,i=e.as,o=void 0===i?"small":i,u=e.muted,b=Object(l.a)(e,["bsPrefix","className","as","muted"]);return t=Object(d.a)(t,"form-text"),n.a.createElement(o,Object(r.a)({},b,{ref:a,className:s()(c,t,u&&"text-muted")}))}));E.displayName="FormText";var R=E,V=n.a.forwardRef((function(e,a){return n.a.createElement(p,Object(r.a)({},e,{ref:a,type:"switch"}))}));V.displayName="Switch",V.Input=p.Input,V.Label=p.Label;var L=V,S=t(32),T=Object(S.a)("form-row"),G=n.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.inline,i=e.className,o=e.validated,u=e.as,b=void 0===u?"form":u,m=Object(l.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(d.a)(t,"form"),n.a.createElement(b,Object(r.a)({},m,{ref:a,className:s()(i,o&&"was-validated",c&&t+"-inline")}))}));G.displayName="Form",G.defaultProps={inline:!1},G.Row=T,G.Group=g,G.Control=P.a,G.Check=p,G.File=N,G.Switch=L,G.Label=k,G.Text=R;a.a=G}}]);
//# sourceMappingURL=11.fd9e3f0b.chunk.js.map