(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[10],{264:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var r=t(80),l=t(0),n=function(e){var a=Object(l.useState)(e),t=Object(r.a)(a,2),n=t[0],s=t[1];return{value:n,setValue:s,reset:function(){return s("")},bind:{value:n,onChange:function(e){s(e.currentTarget.value)}}}}},281:function(e,a,t){"use strict";var r=t(3),l=t(6),n=t(8),s=t.n(n),c=t(0),i=t.n(c),o=(t(157),t(254)),u=t(251),m=t(11),d=i.a.forwardRef((function(e,a){var t=e.id,n=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,b=e.isValid,f=e.isInvalid,p=e.isStatic,v=e.as,E=void 0===v?"input":v,O=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","isStatic","as"]),j=Object(c.useContext)(u.a),h=j.controlId;return n=j.custom?Object(m.b)(o,"custom-control-input"):Object(m.b)(n,"form-check-input"),i.a.createElement(E,Object(r.a)({},O,{ref:a,id:t||h,className:s()(d,n,b&&"is-valid",f&&"is-invalid",p&&"position-static")}))}));d.displayName="FormCheckInput",d.defaultProps={type:"checkbox"};var b=d,f=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.bsCustomPrefix,o=e.className,d=e.htmlFor,b=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(u.a),p=f.controlId;return t=f.custom?Object(m.b)(n,"custom-control-label"):Object(m.b)(t,"form-check-label"),i.a.createElement("label",Object(r.a)({},b,{ref:a,htmlFor:d||p,className:s()(o,t)}))}));f.displayName="FormCheckLabel";var p=f,v=i.a.forwardRef((function(e,a){var t=e.id,n=e.bsPrefix,d=e.bsCustomPrefix,f=e.inline,v=e.disabled,E=e.isValid,O=e.isInvalid,j=e.feedback,h=e.className,y=e.style,x=e.title,g=e.type,N=e.label,P=e.children,I=e.custom,w=e.as,C=void 0===w?"input":w,k=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedback","className","style","title","type","label","children","custom","as"]),F="switch"===g||I;n=F?Object(m.b)(d,"custom-control"):Object(m.b)(n,"form-check");var L=Object(c.useContext)(u.a).controlId,R=Object(c.useMemo)((function(){return{controlId:t||L,custom:F}}),[L,F,t]),S=null!=N&&!1!==N&&!P,V=i.a.createElement(b,Object(r.a)({},k,{type:"switch"===g?"checkbox":g,ref:a,isValid:E,isInvalid:O,isStatic:!S,disabled:v,as:C}));return i.a.createElement(u.a.Provider,{value:R},i.a.createElement("div",{style:y,className:s()(h,n,F&&"custom-"+g,f&&n+"-inline")},P||i.a.createElement(i.a.Fragment,null,V,S&&i.a.createElement(p,{title:x},N),(E||O)&&i.a.createElement(o.a,{type:E?"valid":"invalid"},j))))}));v.displayName="FormCheck",v.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""},v.Input=b,v.Label=p;var E=v,O=i.a.forwardRef((function(e,a){var t=e.id,n=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,b=e.isValid,f=e.isInvalid,p=e.lang,v=e.as,E=void 0===v?"input":v,O=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),j=Object(c.useContext)(u.a),h=j.controlId;return n=j.custom?Object(m.b)(o,"custom-file-input"):Object(m.b)(n,"form-control-file"),i.a.createElement(E,Object(r.a)({},O,{ref:a,id:t||h,type:"file",lang:p,className:s()(d,n,b&&"is-valid",f&&"is-invalid")}))}));O.displayName="FormFileInput";var j=O,h=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.bsCustomPrefix,o=e.className,d=e.htmlFor,b=Object(l.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(u.a),p=f.controlId;return t=f.custom?Object(m.b)(n,"custom-file-label"):Object(m.b)(t,"form-file-label"),i.a.createElement("label",Object(r.a)({},b,{ref:a,htmlFor:d||p,className:s()(o,t),"data-browse":b["data-browse"]}))}));h.displayName="FormFileLabel";var y=h,x=i.a.forwardRef((function(e,a){var t=e.id,n=e.bsPrefix,d=e.bsCustomPrefix,b=e.disabled,f=e.isValid,p=e.isInvalid,v=e.feedback,E=e.className,O=e.style,h=e.label,x=e.children,g=e.custom,N=e.lang,P=e["data-browse"],I=e.as,w=void 0===I?"div":I,C=e.inputAs,k=void 0===C?"input":C,F=Object(l.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]);n=g?Object(m.b)(d,"custom"):Object(m.b)(n,"form-file");var L=Object(c.useContext)(u.a).controlId,R=Object(c.useMemo)((function(){return{controlId:t||L,custom:g}}),[L,g,t]),S=null!=h&&!1!==h&&!x,V=i.a.createElement(j,Object(r.a)({},F,{ref:a,isValid:f,isInvalid:p,disabled:b,as:k,lang:N}));return i.a.createElement(u.a.Provider,{value:R},i.a.createElement(w,{style:O,className:s()(E,n,g&&"custom-file")},x||i.a.createElement(i.a.Fragment,null,g?i.a.createElement(i.a.Fragment,null,V,S&&i.a.createElement(y,{"data-browse":P},h)):i.a.createElement(i.a.Fragment,null,S&&i.a.createElement(y,null,h),V),(f||p)&&i.a.createElement(o.a,{type:f?"valid":"invalid"},v))))}));x.displayName="FormFile",x.defaultProps={disabled:!1,isValid:!1,isInvalid:!1},x.Input=j,x.Label=y;var g=x,N=t(262),P=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,o=e.children,d=e.controlId,b=e.as,f=void 0===b?"div":b,p=Object(l.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(m.b)(t,"form-group");var v=Object(c.useMemo)((function(){return{controlId:d}}),[d]);return i.a.createElement(u.a.Provider,{value:v},i.a.createElement(f,Object(r.a)({},p,{ref:a,className:s()(n,t)}),o))}));P.displayName="FormGroup";var I=P,w=(t(70),t(260)),C=i.a.forwardRef((function(e,a){var t=e.as,n=void 0===t?"label":t,o=e.bsPrefix,d=e.column,b=e.srOnly,f=e.className,p=e.htmlFor,v=Object(l.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),E=Object(c.useContext)(u.a).controlId;o=Object(m.b)(o,"form-label");var O="col-form-label";"string"===typeof d&&(O=O+"-"+d);var j=s()(f,o,b&&"sr-only",d&&O);return p=p||E,d?i.a.createElement(w.a,Object(r.a)({as:"label",className:j,htmlFor:p},v)):i.a.createElement(n,Object(r.a)({ref:a,className:j,htmlFor:p},v))}));C.displayName="FormLabel",C.defaultProps={column:!1,srOnly:!1};var k=C,F=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,c=e.as,o=void 0===c?"small":c,u=e.muted,d=Object(l.a)(e,["bsPrefix","className","as","muted"]);return t=Object(m.b)(t,"form-text"),i.a.createElement(o,Object(r.a)({},d,{ref:a,className:s()(n,t,u&&"text-muted")}))}));F.displayName="FormText";var L=F,R=i.a.forwardRef((function(e,a){return i.a.createElement(E,Object(r.a)({},e,{ref:a,type:"switch"}))}));R.displayName="Switch",R.Input=E.Input,R.Label=E.Label;var S=R,V=t(25),G=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.inline,c=e.className,o=e.validated,u=e.as,d=void 0===u?"form":u,b=Object(l.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(m.b)(t,"form"),i.a.createElement(d,Object(r.a)({},b,{ref:a,className:s()(c,o&&"was-validated",n&&t+"-inline")}))}));G.displayName="Form",G.defaultProps={inline:!1},G.Row=Object(V.a)("form-row"),G.Group=I,G.Control=N.a,G.Check=E,G.File=g,G.Switch=S,G.Label=k,G.Text=L;a.a=G},353:function(e,a,t){"use strict";t.r(a);var r=t(15),l=t(9),n=t.n(l),s=t(24),c=t(264),i=t(281),o=t(260),u=t(150),m=t(0),d=t.n(m),b=t(103),f=t.n(b),p=t(269),v=(t(354),t(102)),E=t(18),O=t(29),j=t(17),h=t(127),y=[{value:h.PlayerRole.None,label:"Non sono un giocatore"},{value:h.PlayerRole.GoalKeeper,label:"Portiere"},{value:h.PlayerRole.Striker,label:"Attaccante"},{value:h.PlayerRole.Master,label:"Master"}];a.default=Object(j.i)((function(e){var a=e.setErrorMessage,t=Object(O.c)(),r=Object(j.g)(),l=Object(c.a)(""),m=l.value,b=l.bind,h=l.reset,g=Object(c.a)(""),N=g.value,P=g.bind,I=g.reset,w=Object(c.a)(""),C=w.value,k=w.bind,F=w.reset,L=Object(c.a)(""),R=L.value,S=L.bind,V=L.reset,G=Object(c.a)(""),q=G.value,M=G.bind,T=G.reset,A=Object(c.a)(""),D=A.value,J=A.bind,U=A.reset,z=Object(c.a)(""),B=z.value,K=z.bind,H=z.reset,Q=Object(c.a)(""),W=Q.value,X=Q.bind,Y=Q.reset,Z=Object(c.a)(""),$=Z.value,_=Z.setValue,ee=Z.reset,ae=Object(c.a)(y[0]),te=ae.value,re=ae.setValue,le=ae.reset,ne=function(e){a(e),setTimeout((function(){return a("")}),3e3)},se=function(){var e=Object(s.a)(n.a.mark((function e(a){var l,s,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),m?N?C?R?v.a.test(R)?q?v.a.test(q)?R!==q?(ne("Le email non corrispondono"),0):D?v.e.test(D)?B?v.e.test(B)?D===B||(ne("Le password non corrispondono"),0):(ne("La password non rispetta i criteri"),0):(ne("Inserire la conferma password"),0):(ne("La password non rispetta i criteri"),0):(ne("Inserire una password"),0):(ne("Inserire una email valida"),0):(ne("Inserire la conferma email"),0):(ne("Inserire una email valida"),0):(ne("Inserire una email"),0):(ne("Inserire il cognome"),0):(ne("Inserire il nome"),0):(ne("Scegli uno username"),0)){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,fetch("/api/v1/auth/register",{method:"POST",body:JSON.stringify({username:m,name:N,surname:C,email:R,password:D,phone:W,birthday:$,playerRole:te}),headers:{"Content-Type":"application/json"}});case 6:return l=e.sent,e.next=9,l.json();case 9:if(s=e.sent,!l.ok||!s){e.next=16;break}c={type:"success",message:"Benvenuto ".concat(s.username," !")},t(E.b.updateSession({user:s,message:c})),t(E.b.sessionControl.request({history:r})),e.next=24;break;case 16:e.t0=l.status,e.next=401===e.t0?19:403===e.t0?21:23;break;case 19:return ne("Utente o Password errata"),e.abrupt("break",24);case 21:return ne("Utente o Email gia registrati"),e.abrupt("break",24);case 23:return e.abrupt("break",24);case 24:e.next=30;break;case 26:e.prev=26,e.t1=e.catch(3),console.error("onSubmitLogin : ",e.t1),ne("Errore durante il processo di registrazione. Riprovare piu tardi");case 30:case"end":return e.stop()}}),e,null,[[3,26]])})));return function(a){return e.apply(this,arguments)}}();return d.a.createElement(i.a,{onSubmit:se},d.a.createElement(i.a.Row,null,d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"username"},d.a.createElement(i.a.Label,null,"Username"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"text",placeholder:"username"},b)))),d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"name"},d.a.createElement(i.a.Label,null,"Nome"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"text",placeholder:"Nome"},P)))),d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"surname"},d.a.createElement(i.a.Label,null,"Cognome"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"text",placeholder:"Cognome"},k))))),d.a.createElement(i.a.Row,null,d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"email"},d.a.createElement(i.a.Label,null,"Email"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"email",placeholder:"Email"},S)))),d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"cemail"},d.a.createElement(i.a.Label,null,"Conferma Email"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"email",placeholder:"Conferma Email"},M))))),d.a.createElement(i.a.Row,null,d.a.createElement(o.a,null,d.a.createElement(i.a.Group,{controlId:"password"},d.a.createElement(i.a.Label,null,"Password"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"password",placeholder:"Password"},J))),d.a.createElement(i.a.Group,{controlId:"cpassword"},d.a.createElement(i.a.Label,null,"Conferma Password"),d.a.createElement(i.a.Control,Object.assign({required:!0,type:"password",placeholder:"Conferma Password"},K)))),d.a.createElement(o.a,{md:6,style:{display:"flex",alignItems:"center"}},d.a.createElement("ul",null,d.a.createElement("strong",null,"La password deve rispettare i sequenti criteri :"),d.a.createElement("li",{key:"pass-1"},"Almeno 1 carattere minuscolo"),d.a.createElement("li",{key:"pass-2"},"Almeno 1 carattere maiuscolo"),d.a.createElement("li",{key:"pass-3"},"Almeno 1 carattere numerico"),d.a.createElement("li",{key:"pass-5"},"Tra 8 e 16 caratteri")))),d.a.createElement(i.a.Row,null,d.a.createElement(o.a,{md:3},d.a.createElement(i.a.Group,{controlId:"phone"},d.a.createElement(i.a.Label,null,"Telefono"),d.a.createElement(i.a.Control,Object.assign({type:"text",placeholder:"Telefono"},X)))),d.a.createElement(o.a,{md:3},d.a.createElement(i.a.Group,{controlId:"birthday"},d.a.createElement(i.a.Label,null,"Data di nascita"),d.a.createElement(f.a,{className:"datepicker",dateFormat:"dd/MM/yyyy",required:!0,selected:$,onChange:function(e){return _(e)}}))),d.a.createElement(o.a,{md:6},d.a.createElement(i.a.Group,null,d.a.createElement(i.a.Label,null,"Ruolo"),d.a.createElement(p.a,{dateFormat:"dd/MM/yyyy",value:te,onChange:function(e){return re(e)},options:y,styles:x}),d.a.createElement(i.a.Text,{className:"text-muted default-color-green"},"Sei un giocatore? Assegna qui il tuo ruolo.")))),d.a.createElement(u.a,{variant:"outline-success",className:"float-right",type:"submit",size:"lg"},"Conferma"),d.a.createElement(u.a,{variant:"outline-danger",className:"float-left",onClick:function(){h(),I(),F(),V(),T(),U(),H(),Y(),ee(),le()},type:"submit"},"Reset"))}));var x={control:function(e){return Object(r.a)({},e,{height:"38px"})},input:function(e){return Object(r.a)({},e,{height:"38px"})},option:function(e,a){a.data,a.isDisabled,a.isFocused,a.isSelected;return Object(r.a)({},e,{color:"black"})},placeholder:function(e){return Object(r.a)({},e,{height:"38px"})},singleValue:function(e,a){a.data;return Object(r.a)({},e,{height:"38px"})},clearIndicator:function(e){return Object(r.a)({},e,{height:"38px"})},indicatorSeparator:function(e){return Object(r.a)({},e)}}},354:function(e,a,t){}}]);
//# sourceMappingURL=10.c6ef13a6.chunk.js.map