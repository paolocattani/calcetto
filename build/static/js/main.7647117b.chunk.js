(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[2],{113:function(e,t,a){e.exports=a.p+"static/media/header.7774471e.jpg"},124:function(e,t,a){e.exports=a(199)},129:function(e,t,a){},138:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(23),l=a.n(o),c=(a(129),a(130),a(131),a(31)),i=a.n(c),u=a(32),s=a(46),m=a(16),d=a(113),p=a.n(d),b=a(208),v=a(210),E=a(211),f=a(206),h=r.a.lazy((function(){return Promise.all([a.e(1),a.e(10)]).then(a.bind(null,330))})),g=r.a.lazy((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,332))})),x=r.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(5),a.e(6)]).then(a.bind(null,334))})),O=r.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(7)]).then(a.bind(null,331))})),j=r.a.lazy((function(){return a.e(11).then(a.bind(null,328))})),y=r.a.lazy((function(){return a.e(12).then(a.bind(null,329))})),w=[{path:"/login",label:"Login",exact:!0,ComponentToRender:r.a.lazy((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,333))})),visible:!1,private:!1,index:0},{path:"/",label:"Home",exact:!0,ComponentToRender:g,visible:!1,private:!0,index:10},{path:"/tournament/:tId",label:"Selezione Coppie",exact:!0,ComponentToRender:x,visible:!1,private:!0,index:20},{path:"/stage1/:tId",label:"Torneo fase 1",exact:!0,ComponentToRender:O,visible:!1,private:!0,index:30},{path:"/player",label:"Gestione Giocatori",exact:!0,ComponentToRender:h,visible:!0,private:!0,index:40},{path:"/stage2/:tId",label:"Torneo fase 2",exact:!0,ComponentToRender:j,visible:!1,private:!0,index:50},{path:"*",label:"Not Found",exact:!1,ComponentToRender:y,visible:!1,private:!0,index:1e3}],C=w;var k=a(36),T=a(42),z=a(17),R=a(203),S=a(209),P=a(205),A=a(117),H=a(57),L=a(207),B=a(97),I=function(e){var t=e.show,a=e.onHide,o=Object(k.d)(),l=Object(m.a)(o,2),c=l[0],d=l[1],p=Object(n.useState)(""),b=Object(m.a)(p,2),v=b[0],E=b[1],h=Object(B.a)(""),g=h.value,x=h.bind,O=Object(z.g)(),j=c.email,y=c.username,w=function(e){E(e),setTimeout((function(){return E("")}),3e3)},C=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/v1/auth/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:j,username:y,password:g})});case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,console.log("onSubmitLogin : ",n,r),n.ok&&r?(d(Object(u.a)({},c,{name:"",surname:"",email:"",role:"",isAuthenticated:!1})),a(),O.push("/")):401===n.status?w("Utente o Password errata"):w("Errore durante il processo di registrazione. Riprovare piu tardi"),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("onSubmitLogin : ",e.t0),w("Errore durante il processo di registrazione. Riprovare piu tardi");case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),T=v?r.a.createElement(R.a,{key:"auth-alert",variant:"danger"},v," "):null,I=j&&y?r.a.createElement(S.a,{onSubmit:C},r.a.createElement(S.a.Group,{as:P.a,controlId:"email"},r.a.createElement(S.a.Label,{column:!0,sm:"2"},"Email"),r.a.createElement(A.a,{sm:"10"},r.a.createElement(S.a.Control,{plaintext:!0,readOnly:!0,defaultValue:j}))),r.a.createElement(S.a.Group,{as:P.a,controlId:"username"},r.a.createElement(S.a.Label,{column:!0,sm:"2"},"Username"),r.a.createElement(A.a,{sm:"10"},r.a.createElement(S.a.Control,{plaintext:!0,readOnly:!0,defaultValue:y}))),r.a.createElement(S.a.Group,{as:P.a,controlId:"password"},r.a.createElement(S.a.Label,{column:!0,sm:"2"},"Password"),r.a.createElement(A.a,{sm:"10"},r.a.createElement(S.a.Control,Object.assign({type:"password",placeholder:"Password"},x)))),r.a.createElement(f.a,{size:"lg",variant:"outline-danger",type:"submit"},"Conferma")):r.a.createElement("p",null,r.a.createElement("strong",null,"Eliminazione non possibile")," ");return r.a.createElement(H.a,{show:t,onHide:a,size:"lg",centered:!0},r.a.createElement(H.a.Header,{closeButton:!0},r.a.createElement(H.a.Title,null,"Elimina Utente")),r.a.createElement(H.a.Body,null,r.a.createElement(L.a,{fluid:!0},T,I)))},G=function(e){var t=Object(k.d)(),a=Object(m.a)(t,2),o=a[0],l=a[1],c=Object(n.useState)(!1),d=Object(m.a)(c,2),h=d[0],g=d[1],x=function(){var e=Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/auth/logout");case 2:e.sent.ok&&l(Object(u.a)({},o,{name:"",surname:"",email:"",role:"",isAuthenticated:!1}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O={backgroundImage:"url(".concat(p.a,")"),backgroundSize:"cover",padding:"60px 0px 10px 0px",minHeight:"28vh"},j={color:"##ffc107",fontSize:"4vh",padding:"0vw 2vw"};return r.a.createElement("header",null,r.a.createElement(b.a,{style:O},r.a.createElement("h1",{style:{margin:"5vh"}},r.a.createElement("strong",{style:{color:"white"}},"Calcetto C.S.M")),o.isAuthenticated?r.a.createElement(v.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},r.a.createElement(v.a.Brand,{as:T.b,to:"/"},"Home"),r.a.createElement(v.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(v.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(E.a,{className:"mr-auto"},C.map((function(e){return e.visible?e.private&&!o.isAuthenticated?null:r.a.createElement(E.a.Link,{as:T.b,key:e.index,to:e.path},e.label):null}))),o.name?r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a.Text,{style:j},r.a.createElement("strong",{style:{color:"#64bd9c"}},o.name)),r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{variant:"outline-warning",onClick:x},"Log out"),r.a.createElement(f.a,{variant:"outline-danger",onClick:function(){return g(!0)}},"Elimina Utente"))):null)):null),r.a.createElement(I,{show:h,onHide:function(){return g(!1)}}))},N=a(95),F=function(e){return n.createElement(k.a.Consumer,null,(function(t){var a=Object(m.a)(t,1)[0];return n.createElement(z.b,Object.assign({},e,{render:function(t){var r=t.location;return a.isAuthenticated&&"/login"===r.pathname?(console.log("ProtectedRoute => redirect to Home"),n.createElement(z.a,Object.assign({},e,{to:{pathname:"/",state:{from:r}}}))):e.private?a.isAuthenticated?(console.log("ProtectedRoute => render component : ",function(e){var t=w.find((function(t){return t.path===e}));return t?t.label:"route ".concat(e," not found!")}(r.pathname)),n.createElement(e.ComponentToRender,e)):(console.log("ProtectedRoute => redirect to Login : ",Object(u.a)({},a)),n.createElement(z.a,Object.assign({},e,{to:{pathname:"/login",state:{from:r}}}))):(console.log("ProtectedRoute => public route : ",Object(u.a)({},e)),n.createElement(e.ComponentToRender,e))}}))}))},U=(a(138),a(101)),J=a(119),V=a(120);U.c.add(J.a,V.a);var D=function(e){return r.a.createElement("div",{className:"App"},r.a.createElement(G,null),r.a.createElement(L.a,{fluid:!0},r.a.createElement(n.Suspense,{fallback:r.a.createElement(N.b,{show:!0,message:"....Caricamento"})},r.a.createElement(z.d,null,C.map((function(e){return r.a.createElement(F,Object.assign({},e,{key:e.index}))}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(123),M=a(79);Object(M.setDefaultLocale)("it"),Object(M.registerLocale)("it",W.a),l.a.render(r.a.createElement(T.a,null,r.a.createElement(k.b,null,r.a.createElement(D,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},36:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"d",(function(){return d})),a.d(t,"b",(function(){return p})),a.d(t,"c",(function(){return b}));var n=a(31),r=a.n(n),o=a(32),l=a(46),c=a(16),i=a(0),u=a.n(i),s={isAuthenticated:!1},m=Object(i.createContext)([s,function(){}]),d=function(){return Object(i.useContext)(m)},p=function(e){var t=e.children,a=Object(i.useState)(s),n=Object(c.a)(a,2),d=n[0],p=n[1],b=[d,p];return Object(i.useEffect)((function(){Object(l.a)(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/v1/auth/");case 3:return t=e.sent,e.next=6,t.json();case 6:(a=e.sent)&&t.ok?p(Object(o.a)({isAuthenticated:!0},a)):p(s),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("SessionContext.error :",e.t0),p(s);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()}),[]),console.log("sessionContext.session: ",d),u.a.createElement(m.Provider,{value:b},d?t:null)},b=function(e){return!!(e&&e.isAuthenticated&&e.role)&&(e.isAuthenticated&&"Admin"===e.role)}},95:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return s}));var n=a(0),r=a.n(n),o=a(57),l=a(40),c=a(94),i=a(203),u=function(e){var t=e.message,a=e.show,n=e.onHide,c=void 0===n?function(){return a=!1}:n;return r.a.createElement(o.a,{show:a,onHide:c,size:"xl",centered:!0},r.a.createElement(o.a.Header,{closeButton:!0},r.a.createElement(o.a.Title,null,"Caricamento....")),r.a.createElement(o.a.Body,null,t),r.a.createElement(o.a.Footer,null,r.a.createElement(l.a,{animation:"border",variant:"light"}),r.a.createElement(l.a,{animation:"border",variant:"primary"}),r.a.createElement(l.a,{animation:"border",variant:"secondary"}),r.a.createElement(l.a,{animation:"border",variant:"success"}),r.a.createElement(l.a,{animation:"border",variant:"danger"}),r.a.createElement(l.a,{animation:"border",variant:"warning"}),r.a.createElement(l.a,{animation:"border",variant:"info"}),r.a.createElement(l.a,{animation:"border",variant:"dark"})))},s=function(e){var t=e.message,a=e.type;return t&&""!==t?r.a.createElement(c.a,{className:"rounded mr-2 mx-auto",key:"".concat(a,"-message"),show:""!==t},r.a.createElement(c.a.Header,{closeButton:!1},r.a.createElement("strong",null,"Operazione completata !")),r.a.createElement(c.a.Body,null,r.a.createElement(i.a,{variant:a},t))):null}},97:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(16),r=a(0),o=function(e){var t=Object(r.useState)(e),a=Object(n.a)(t,2),o=a[0],l=a[1];return{value:o,setValue:l,reset:function(){return l("")},bind:{value:o,onChange:function(e){l(e.target.value)}}}}}},[[124,3,4]]]);
//# sourceMappingURL=main.7647117b.chunk.js.map