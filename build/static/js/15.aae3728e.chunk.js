(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[15],{1319:function(e,t,a){"use strict";a.r(t);var r=a(9),n=a(3),c=a.n(n),i=a(22),o=a(301),l=a(2),s=a(0),d=a(376),u=a(377),b=a(107),m=a(149),f=a(429),j=a(25),O=a(50),v=a(59);function h(e){return{id:0,name:e||"",ownerId:0,date:new Date,progress:v.TournamentProgress.New,public:!0,autoOrder:!0,label:e||""}}var p=function(e){var t=e.innerProps;return Object(l.jsx)("span",Object(r.a)({style:x},t))},x={alignSelf:"stretch",backgroundColor:"green",marginBottom:8,marginTop:8,marginRight:10,width:1},y={width:"100%",margin:"auto",backgroundColor:"inherit",borderColor:"#ffc107",borderWidth:"3px",textAlign:"left"},g=a(102),w=a(126),N=a.n(w),C=a(41),P=a(24),I=a(35),F=a(298),k=function(){var e=Object(j.g)(),t=Object(C.c)(),a=Object(F.a)(["common","tournament"]).t,r=Object(s.useState)(""),n=Object(o.a)(r,2),d=n[0],f=n[1],O=Object(s.useState)(new Date),v=Object(o.a)(O,2),p=v[0],x=v[1],y=Object(s.useState)(!0),g=Object(o.a)(y,2),w=g[0],k=g[1],E=function(){var r=Object(i.a)(c.a.mark((function r(n){var i;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.preventDefault(),d){r.next=4;break}return I.b.error(a("tournament:error.name")),r.abrupt("return");case 4:(i=h(d)).date=p,i.public=w,t(P.a.save.request({tournament:i,history:e}));case 8:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return Object(l.jsxs)(u.a,{onSubmit:E,children:[Object(l.jsxs)(u.a.Row,{children:[Object(l.jsx)(m.a,{md:6,children:Object(l.jsxs)(u.a.Group,{controlId:"formBasicEmail",children:[Object(l.jsx)(u.a.Label,{children:a("tournament:name")}),Object(l.jsx)(u.a.Control,{"data-cy":"new-name",type:"text",required:!0,placeholder:a("tournament:name"),maxLength:30,value:d,onChange:function(e){return f(e.currentTarget.value)}})]})}),Object(l.jsx)(m.a,{md:3,children:Object(l.jsxs)(u.a.Group,{children:[Object(l.jsx)(u.a.Label,{children:a("tournament:date")}),Object(l.jsx)(u.a.Control,{"data-cy":"new-date",as:function(){return Object(l.jsx)(N.a,{highlightDates:[new Date],locale:"it",selected:p,dateFormat:"dd/MM/yyyy",onChange:function(e){return x(e||new Date)}})}})]})}),Object(l.jsx)(m.a,{md:3,children:Object(l.jsxs)(u.a.Group,{controlId:"visible",children:[Object(l.jsxs)(u.a.Label,{children:[a("tournament:visibility")," "]}),Object(l.jsxs)(u.a.Control,{as:"select",onChange:function(){return k(!w)},"data-cy":"new-visibility",children:[Object(l.jsx)("option",{children:a("tournament:public")}),Object(l.jsx)("option",{children:a("tournament:private")})]})]})})]}),Object(l.jsx)(u.a.Row,{children:Object(l.jsx)(m.a,{children:Object(l.jsx)(b.a,{disabled:!d,type:"submit",size:"lg",variant:"outline-warning","data-cy":"new-submit",className:"float-right default-color-white",children:Object(l.jsx)("span",{style:{fontSize:"larger",fontWeight:"bolder"},children:a("common:continue")})})})})]})},E=a(150),S=a(11),R=a(75),T=a(355),L=(t.default=function(){var e=Object(C.c)(),t=Object(j.g)(),a=Object(F.a)(["common","tournament"]).t,r=Object(C.d)(R.a.isAdmin),n=Object(C.d)(E.a.getTournamentsList),v=Object(C.d)(E.a.getTournament),h=Object(s.useState)(!1),x=Object(o.a)(h,2),w=x[0],N=x[1],P=function(){var n=Object(i.a)(c.a.mark((function n(i){return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:i.preventDefault(),v?r?t.push("/tournament"):(console.log("Fetching pairs for tournament : ",v.id),e(S.b.fetch.request({tId:v.id,history:t}))):I.b.error(a("common:error.generic"));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),V=function(t){e(S.f.setTournament(null)),N(t)};return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)(m.a,{md:{span:"6",offset:"3"},sm:"12",children:Object(l.jsxs)(f.a,{style:y,"data-cy":"tournament-form",children:[Object(l.jsx)(f.a.Header,{as:"h2",children:a("tournament:tournament")}),Object(l.jsx)(f.a.Body,{children:Object(l.jsx)(m.a,{children:n&&0!==n.length||r?r&&w?Object(l.jsx)(k,{}):Object(l.jsxs)(u.a,{onSubmit:P,children:[Object(l.jsx)("label",{htmlFor:"tournamentSelect",children:a(T.c)}),Object(l.jsx)(d.a,{id:"tournamentSelect","aria-label":a(T.c),components:{IndicatorSeparator:p},styles:L,value:v,options:n,placeholder:a("tournament:search"),isSearchable:!0,getOptionLabel:function(e){var t=e.name,r=e.date,n=e.progress;return"".concat(t," - ").concat(Object(g.a)(r)," @ ").concat(a("tournament:progress.".concat(n)))},isClearable:!0,onChange:function(t){return e(S.f.setTournament(t))}}),Object(l.jsxs)(b.a,{"data-cy":"select-submit",type:"submit",size:"lg",variant:"outline-warning",className:"float-right default-color-white",disabled:!v,children:[Object(l.jsx)("span",{style:{fontSize:"larger",fontWeight:"bolder",padding:"1vw"},children:a("continue")}),Object(l.jsx)(O.l,{size:"lg"})]})]}):Object(l.jsx)("p",{className:"text-white text-justify font-italic lead",children:Object(l.jsxs)("strong",{children:[" ",a("tournament:error.none")]})})})}),Object(l.jsx)(f.a.Footer,{children:r?w?Object(l.jsx)(b.a,{type:"button","data-cy":"select-tournament",size:"lg",variant:"outline-warning",className:"float-left default-color-white",onClick:function(){return V(!1)},children:a(T.c)}):Object(l.jsx)(b.a,{type:"button","data-cy":"new-tournament",size:"lg",variant:"outline-warning",className:"float-left default-color-white",onClick:function(){return V(!0)},children:a("tournament:new")}):null})]})})})},{option:function(e){return Object(r.a)(Object(r.a)({},e),{},{backgroundColor:"white",color:"black","&:hover":{backgroundColor:"#64bd9c",color:"white"}})},control:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"3vmin",marginBottom:"40px"})},singleValue:function(e){return Object(r.a)({},e)},valueContainer:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"100%",fontSize:"larger",alignItems:"center",justifyContent:"flex-start","&:active":{height:"100%",fontSize:"larger",justifyContent:"flex-start",alignItems:"center"}})}})},301:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(145);function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],r=!0,n=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(l){n=!0,c=l}finally{try{r||null==o.return||o.return()}finally{if(n)throw c}}return a}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},355:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return c}));var r="auth:password.password",n="common:loading",c="tournament:select"},377:function(e,t,a){"use strict";var r=a(6),n=a(10),c=a(12),i=a.n(c),o=a(0),l=a.n(o),s=(a(196),a(304)),d=a(299),u=a(16),b=l.a.forwardRef((function(e,t){var a=e.id,c=e.bsPrefix,s=e.bsCustomPrefix,b=e.className,m=e.type,f=void 0===m?"checkbox":m,j=e.isValid,O=void 0!==j&&j,v=e.isInvalid,h=void 0!==v&&v,p=e.isStatic,x=e.as,y=void 0===x?"input":x,g=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),w=Object(o.useContext)(d.a),N=w.controlId,C=w.custom?[s,"custom-control-input"]:[c,"form-check-input"],P=C[0],I=C[1];return c=Object(u.a)(P,I),l.a.createElement(y,Object(r.a)({},g,{ref:t,type:f,id:a||N,className:i()(b,c,O&&"is-valid",h&&"is-invalid",p&&"position-static")}))}));b.displayName="FormCheckInput";var m=b,f=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.bsCustomPrefix,s=e.className,b=e.htmlFor,m=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(o.useContext)(d.a),j=f.controlId,O=f.custom?[c,"custom-control-label"]:[a,"form-check-label"],v=O[0],h=O[1];return a=Object(u.a)(v,h),l.a.createElement("label",Object(r.a)({},m,{ref:t,htmlFor:b||j,className:i()(s,a)}))}));f.displayName="FormCheckLabel";var j=f,O=l.a.forwardRef((function(e,t){var a=e.id,c=e.bsPrefix,b=e.bsCustomPrefix,f=e.inline,O=void 0!==f&&f,v=e.disabled,h=void 0!==v&&v,p=e.isValid,x=void 0!==p&&p,y=e.isInvalid,g=void 0!==y&&y,w=e.feedbackTooltip,N=void 0!==w&&w,C=e.feedback,P=e.className,I=e.style,F=e.title,k=void 0===F?"":F,E=e.type,S=void 0===E?"checkbox":E,R=e.label,T=e.children,L=e.custom,V=e.as,z=void 0===V?"input":V,D=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),A="switch"===S||L,B=A?[b,"custom-control"]:[c,"form-check"],M=B[0],G=B[1];c=Object(u.a)(M,G);var q=Object(o.useContext)(d.a).controlId,H=Object(o.useMemo)((function(){return{controlId:a||q,custom:A}}),[q,A,a]),W=A||null!=R&&!1!==R&&!T,J=l.a.createElement(m,Object(r.a)({},D,{type:"switch"===S?"checkbox":S,ref:t,isValid:x,isInvalid:g,isStatic:!W,disabled:h,as:z}));return l.a.createElement(d.a.Provider,{value:H},l.a.createElement("div",{style:I,className:i()(P,c,A&&"custom-"+S,O&&c+"-inline")},T||l.a.createElement(l.a.Fragment,null,J,W&&l.a.createElement(j,{title:k},R),(x||g)&&l.a.createElement(s.a,{type:x?"valid":"invalid",tooltip:N},C))))}));O.displayName="FormCheck",O.Input=m,O.Label=j;var v=O,h=l.a.forwardRef((function(e,t){var a=e.id,c=e.bsPrefix,s=e.bsCustomPrefix,b=e.className,m=e.isValid,f=e.isInvalid,j=e.lang,O=e.as,v=void 0===O?"input":O,h=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),p=Object(o.useContext)(d.a),x=p.controlId,y=p.custom?[s,"custom-file-input"]:[c,"form-control-file"],g=y[0],w=y[1];return c=Object(u.a)(g,w),l.a.createElement(v,Object(r.a)({},h,{ref:t,id:a||x,type:"file",lang:j,className:i()(b,c,m&&"is-valid",f&&"is-invalid")}))}));h.displayName="FormFileInput";var p=h,x=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.bsCustomPrefix,s=e.className,b=e.htmlFor,m=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(o.useContext)(d.a),j=f.controlId,O=f.custom?[c,"custom-file-label"]:[a,"form-file-label"],v=O[0],h=O[1];return a=Object(u.a)(v,h),l.a.createElement("label",Object(r.a)({},m,{ref:t,htmlFor:b||j,className:i()(s,a),"data-browse":m["data-browse"]}))}));x.displayName="FormFileLabel";var y=x,g=l.a.forwardRef((function(e,t){var a=e.id,c=e.bsPrefix,b=e.bsCustomPrefix,m=e.disabled,f=void 0!==m&&m,j=e.isValid,O=void 0!==j&&j,v=e.isInvalid,h=void 0!==v&&v,x=e.feedbackTooltip,g=void 0!==x&&x,w=e.feedback,N=e.className,C=e.style,P=e.label,I=e.children,F=e.custom,k=e.lang,E=e["data-browse"],S=e.as,R=void 0===S?"div":S,T=e.inputAs,L=void 0===T?"input":T,V=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),z=F?[b,"custom"]:[c,"form-file"],D=z[0],A=z[1];c=Object(u.a)(D,A);var B=Object(o.useContext)(d.a).controlId,M=Object(o.useMemo)((function(){return{controlId:a||B,custom:F}}),[B,F,a]),G=null!=P&&!1!==P&&!I,q=l.a.createElement(p,Object(r.a)({},V,{ref:t,isValid:O,isInvalid:h,disabled:f,as:L,lang:k}));return l.a.createElement(d.a.Provider,{value:M},l.a.createElement(R,{style:C,className:i()(N,c,F&&"custom-file")},I||l.a.createElement(l.a.Fragment,null,F?l.a.createElement(l.a.Fragment,null,q,G&&l.a.createElement(y,{"data-browse":E},P)):l.a.createElement(l.a.Fragment,null,G&&l.a.createElement(y,null,P),q),(O||h)&&l.a.createElement(s.a,{type:O?"valid":"invalid",tooltip:g},w))))}));g.displayName="FormFile",g.Input=p,g.Label=y;var w=g,N=a(322),C=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,s=e.children,b=e.controlId,m=e.as,f=void 0===m?"div":m,j=Object(n.a)(e,["bsPrefix","className","children","controlId","as"]);a=Object(u.a)(a,"form-group");var O=Object(o.useMemo)((function(){return{controlId:b}}),[b]);return l.a.createElement(d.a.Provider,{value:O},l.a.createElement(f,Object(r.a)({},j,{ref:t,className:i()(c,a)}),s))}));C.displayName="FormGroup";var P=C,I=(a(62),a(149)),F=l.a.forwardRef((function(e,t){var a=e.as,c=void 0===a?"label":a,s=e.bsPrefix,b=e.column,m=e.srOnly,f=e.className,j=e.htmlFor,O=Object(n.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),v=Object(o.useContext)(d.a).controlId;s=Object(u.a)(s,"form-label");var h="col-form-label";"string"===typeof b&&(h=h+" "+h+"-"+b);var p=i()(f,s,m&&"sr-only",b&&h);return j=j||v,b?l.a.createElement(I.a,Object(r.a)({as:"label",className:p,htmlFor:j},O)):l.a.createElement(c,Object(r.a)({ref:t,className:p,htmlFor:j},O))}));F.displayName="FormLabel",F.defaultProps={column:!1,srOnly:!1};var k=F,E=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,o=e.as,s=void 0===o?"small":o,d=e.muted,b=Object(n.a)(e,["bsPrefix","className","as","muted"]);return a=Object(u.a)(a,"form-text"),l.a.createElement(s,Object(r.a)({},b,{ref:t,className:i()(c,a,d&&"text-muted")}))}));E.displayName="FormText";var S=E,R=l.a.forwardRef((function(e,t){return l.a.createElement(v,Object(r.a)({},e,{ref:t,type:"switch"}))}));R.displayName="Switch",R.Input=v.Input,R.Label=v.Label;var T=R,L=a(33),V=Object(L.a)("form-row"),z=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.inline,o=e.className,s=e.validated,d=e.as,b=void 0===d?"form":d,m=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return a=Object(u.a)(a,"form"),l.a.createElement(b,Object(r.a)({},m,{ref:t,className:i()(o,s&&"was-validated",c&&a+"-inline")}))}));z.displayName="Form",z.defaultProps={inline:!1},z.Row=V,z.Group=P,z.Control=N.a,z.Check=v,z.File=w,z.Switch=T,z.Label=k,z.Text=S;t.a=z},429:function(e,t,a){"use strict";var r=a(6),n=a(10),c=a(12),i=a.n(c),o=a(0),l=a.n(o),s=a(16),d=a(33),u=a(103),b=a(148),m=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,o=e.variant,d=e.as,u=void 0===d?"img":d,b=Object(n.a)(e,["bsPrefix","className","variant","as"]),m=Object(s.a)(a,"card-img");return l.a.createElement(u,Object(r.a)({ref:t,className:i()(o?m+"-"+o:m,c)},b))}));m.displayName="CardImg",m.defaultProps={variant:null};var f=m,j=Object(u.a)("h5"),O=Object(u.a)("h6"),v=Object(d.a)("card-body"),h=Object(d.a)("card-title",{Component:j}),p=Object(d.a)("card-subtitle",{Component:O}),x=Object(d.a)("card-link",{Component:"a"}),y=Object(d.a)("card-text",{Component:"p"}),g=Object(d.a)("card-header"),w=Object(d.a)("card-footer"),N=Object(d.a)("card-img-overlay"),C=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,d=e.bg,u=e.text,m=e.border,f=e.body,j=e.children,O=e.as,h=void 0===O?"div":O,p=Object(n.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),x=Object(s.a)(a,"card"),y=Object(o.useMemo)((function(){return{cardHeaderBsPrefix:x+"-header"}}),[x]);return l.a.createElement(b.a.Provider,{value:y},l.a.createElement(h,Object(r.a)({ref:t},p,{className:i()(c,x,d&&"bg-"+d,u&&"text-"+u,m&&"border-"+m)}),f?l.a.createElement(v,null,j):j))}));C.displayName="Card",C.defaultProps={body:!1},C.Img=f,C.Title=h,C.Subtitle=p,C.Body=v,C.Link=x,C.Text=y,C.Header=g,C.Footer=w,C.ImgOverlay=N;t.a=C}}]);
//# sourceMappingURL=15.aae3728e.chunk.js.map