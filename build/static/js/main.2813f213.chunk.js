(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[3],{100:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"f",(function(){return c})),n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return u}));var a=n(59),r=function(){return o(new Date)};function c(e){switch(e){case a.a.New:return"Nuovo";case a.a.PairsSelection:return"Selezione Coppie";case a.a.Stage1:return"Fase 1";case a.a.Stage2:return"Fase 2";default:return""}}function o(e){var t=new Date(e),n=""+(t.getMonth()+1),a=""+t.getDate(),r=t.getFullYear();return n.length<2&&(n="0"+n),a.length<2&&(a="0"+a),[r,n,a].join("/")}new RegExp("^d{10}$");var i=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})"),s=new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");function u(e,t){return Math.log(t)/Math.log(e)}},122:function(e,t,n){"use strict";n.r(t),n.d(t,"LoadingModal",(function(){return f})),n.d(t,"GenericToast",(function(){return b})),n.d(t,"LogSessionContext",(function(){return m})),n.d(t,"RedirectionControl",(function(){return v}));var a=n(120),r=n(0),c=n.n(r),o=n(78),i=n(57),s=n(118),u=n(239),l=n(28),d=n(31),p=n(58),f=function(e){var t=e.message,n=e.show,a=e.onHide,r=void 0===a?function(){return n=!1}:a;return c.a.createElement(o.a,{show:n,onHide:r,size:"xl",centered:!0},c.a.createElement(o.a.Header,{closeButton:!0},c.a.createElement(o.a.Title,null,"Caricamento....")),c.a.createElement(o.a.Body,null,t||"Caricamento...."),c.a.createElement(o.a.Footer,null,c.a.createElement(i.a,{animation:"border",variant:"light"}),c.a.createElement(i.a,{animation:"border",variant:"primary"}),c.a.createElement(i.a,{animation:"border",variant:"secondary"}),c.a.createElement(i.a,{animation:"border",variant:"success"}),c.a.createElement(i.a,{animation:"border",variant:"danger"}),c.a.createElement(i.a,{animation:"border",variant:"warning"}),c.a.createElement(i.a,{animation:"border",variant:"info"}),c.a.createElement(i.a,{animation:"border",variant:"dark"})))},b=function(e){var t=e.message,n=e.type;return t&&""!==t?c.a.createElement(s.a,{className:"rounded mr-2 mx-auto",key:"".concat(n,"-message"),show:""!==t},c.a.createElement(s.a.Header,{closeButton:!1},c.a.createElement("strong",null,"Operazione completata !")),c.a.createElement(s.a.Body,null,c.a.createElement(u.a,{variant:n},t))):null},m=function(){var e=Object(d.d)(p.a.getSession);return c.a.createElement(c.a.Fragment,null,Object.entries(e).map((function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return c.a.createElement("p",null,n," : ",r)})))};function v(e){var t=Object(l.h)();return c.a.createElement("div",null,c.a.createElement("h1",null,"Current Ruote : ",c.a.createElement("code",null,t.pathname)))}},124:function(e,t,n){"use strict";n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return p}));var a=n(26),r=n(13),c=n(10),o=n.n(c),i=n(22),s=n(63),u=function(e){return{id:null,tId:0,rowNumber:0,player1:Object(s.b)(),player2:Object(s.b)(),alias:e||"",stage1Name:"",placement:0,paid1:!1,paid2:!1}},l=function(e,t){Object(i.a)(o.a.mark((function n(){var a,r;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("/api/v1/pair/list/?tId=".concat(t),{method:"GET",headers:{"Content-Type":"application/json"}});case 2:return a=n.sent,n.next=5,a.json();case 5:r=n.sent,e(r);case 7:case"end":return n.stop()}}),n)})))()};var d={option:function(e,t){return Object(r.a)({},e,{backgroundColor:"white",color:"black","&:hover":{backgroundColor:"#64bd9c",color:"white"}})},input:function(e){return Object(r.a)({},e,{backgroundColor:"#64bd9c"})},control:function(e){return Object(r.a)({},e,{height:"3vmin",marginBottom:"auto"})},singleValue:function(e){return Object(r.a)({},e)},valueContainer:function(e){return Object(r.a)({},e,{height:"100%",fontSize:"larger"})}},p=function(){var e=Object(i.a)(o.a.mark((function e(t){var n,r,c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/pair/list/?tId=".concat(t),{method:"GET",headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.next=8,fetch(t?"/api/v1/player/list/".concat(t):"/api/v1/player/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 8:return n=e.sent,e.next=11,n.json();case 11:return c=e.sent,i=[].concat(Object(a.a)(c),[Object(s.b)("Nessun Giocatore")]),console.log("rows : ",r),e.abrupt("return",{rows:r,players:i});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},131:function(e,t){},132:function(e,t){},133:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.GoalKeeper="Portiere",e.Master="Master",e.Striker="Attaccante"}(a||(a={}))},134:function(e,t){},135:function(e,t){},136:function(e,t){},137:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var a=n(100),r=function(e){for(var t=[NaN,Object(a.c)(2,e)+1],n=1,r=1;r<=e;r++)if(!t[r]){t[r]=n;for(var c=Math.pow(2,n),o=1;r+c*o<e+1;o++)t[r+c*o]=n;n++}return t},c=function(e){return{name:"",winner:!1,id:0,parentId:0}},o=function(e){var t=Object(a.c)(2,e)+1,n=2*e,r=new Array(t).fill([]).map((function(e,t){n/=2;for(var a=!0,r=0,c=[],o=0;o<n;o++)a&&r++,a=!a,c.push({id:r,parentId:0===t?0:o+1,name:"".concat(t,"-").concat(o+1),pair:void 0,winner:!1});return[].concat(c)}));return console.log("generateStructure : ",r),r}},145:function(e,t,n){e.exports=n.p+"static/media/header.7774471e.jpg"},151:function(e,t,n){"use strict";var a=n(131);n.o(a,"PlayerRole")&&n.d(t,"PlayerRole",(function(){return a.PlayerRole}));var r=n(132);n.o(r,"PlayerRole")&&n.d(t,"PlayerRole",(function(){return r.PlayerRole}));var c=n(133);n.d(t,"PlayerRole",(function(){return c.a}));n(59),n(134),n(135),n(136)},159:function(e,t,n){e.exports=n(234)},16:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return c}));var a="Request",r="Success",c="Failure"},164:function(e,t,n){},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return o.a})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return s}));var a=n(15),r=n(16),c={getPairs:Object(a.createAsyncAction)("".concat("[Pair]"," Get Pair ").concat(r.b),"".concat("[Pair]"," Get Pair ").concat(r.c),"".concat("[Pair]"," Get Pair ").concat(r.a))()},o=(n(46),n(23),n(39)),i={setSelectedPairs:Object(a.createAction)("".concat("[Stage1]"," Set Selected Pairs"))()},s={fetchStage2:Object(a.createAsyncAction)("".concat("[Stage2]"," Fetch Stage2 ").concat(Request),"".concat("[Stage2]"," Fetch Stage2 ").concat(r.c),"".concat("[Stage2]"," Fetch Stage2 ").concat(r.a))(),updateCell:Object(a.createAsyncAction)("".concat("[Stage2]"," Update Stage2 Cell ").concat(Request),"".concat("[Stage2]"," Update Stage2 Cell ").concat(r.c),"".concat("[Stage2]"," Update Stage2 Cell ").concat(r.a))(),setCells:Object(a.createAction)("".concat("[Stage2]"," Set Cells"))()}},174:function(e,t,n){},23:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(15),r=n(16),c="[Tournament]",o={getTournaments:Object(a.createAsyncAction)("".concat(c," Get Tournament ").concat(r.b),"".concat(c," Get Tournament ").concat(r.c),"".concat(c," Get Tournament ").concat(r.a))(),setTournament:Object(a.createAction)("".concat(c," Set Tournament"))(),saveTournament:Object(a.createAsyncAction)("".concat(c," Save Tournament ").concat(r.b),"".concat(c," Save Tournament ").concat(r.c),"".concat(c," Save Tournament ").concat(r.a))()}},234:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(27),o=n.n(c),i=(n(164),n(165),n(166),n(10)),s=n.n(i),u=n(22),l=n(145),d=n.n(l),p=n(244),f=n(248),b=n(249),m=n(247),v=n(245),g=n(148),h=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(2),n.e(13)]).then(n.bind(null,360))})),j=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(14),n.e(17)]).then(n.bind(null,365))})),O=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(15),n.e(9)]).then(n.bind(null,363))})),w=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(12)]).then(n.bind(null,362))})),y=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,361))})),S=[{path:"/login",label:"Login",exact:!0,ComponentToRender:Object(a.lazy)((function(){return n.e(11).then(n.bind(null,358))})),visible:!1,private:!1,index:0},{path:"/",label:"Home",exact:!0,ComponentToRender:j,visible:!1,private:!0,index:10},{path:"/tournament",label:"Selezione Coppie",exact:!0,ComponentToRender:O,visible:!1,private:!0,index:20},{path:"/stage1",label:"Torneo fase 1",exact:!0,ComponentToRender:w,visible:!1,private:!0,index:30},{path:"/player",label:"Gestione Giocatori",exact:!0,ComponentToRender:h,visible:!0,private:!0,index:40},{path:"/user",label:"Gestione Utente",exact:!0,ComponentToRender:Object(a.lazy)((function(){return Promise.all([n.e(7),n.e(16)]).then(n.bind(null,359))})),visible:!1,private:!0,index:50},{path:"/stage2",label:"Torneo fase 2",exact:!0,ComponentToRender:y,visible:!1,private:!0,index:100},{path:"*",label:"Not Found",exact:!1,ComponentToRender:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,122)).then((function(e){return{default:e.RedirectionControl}}))})),visible:!1,private:!0,index:1e3}],x=S;var A=n(51),E=n(31),P=n(58),T=n(17),k=function(){var e=Object(E.c)(),t=Object(E.d)(P.a.getSession),n=function(){var t=Object(u.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/v1/auth/logout");case 2:t.sent.ok&&e(T.b.updateSession(null));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),a={backgroundImage:"url(".concat(d.a,")"),backgroundSize:"cover",padding:"60px 0px 10px 0px",minHeight:"28vh"};return r.a.createElement("header",null,r.a.createElement(p.a,{style:a},r.a.createElement("h1",{style:{margin:"5vh"}},r.a.createElement("strong",{style:{color:"white"}},"Calcetto C.S.M")),t.isAuthenticated?r.a.createElement(f.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},r.a.createElement(f.a.Brand,{as:A.b,to:"/"},"Home"),r.a.createElement(f.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(f.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(b.a,{className:"mr-auto"},x.map((function(e){return e.visible?e.private&&!t.isAuthenticated?null:r.a.createElement(b.a.Link,{as:A.b,key:e.index,to:e.path},e.label):null}))),t.user?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{alignRight:!0,as:v.a},r.a.createElement(g.a,{style:{opacity:1},variant:"outline-warning",size:"lg",disabled:!0},r.a.createElement("strong",{style:{color:"#64bd9c",fontSize:"larger"}},t.user.username)),r.a.createElement(m.a.Toggle,{split:!0,variant:"outline-warning",id:"dropdown-custom-2"}),r.a.createElement(m.a.Menu,{className:"default-background default-border-yellow"},r.a.createElement(m.a.Item,{className:"default-color-white default-hover-green",as:"button",variant:"warning",onClick:n,eventKey:"1"},"Log out"),r.a.createElement(m.a.Divider,{style:{borderTopColor:"#ffc107"}}),r.a.createElement(m.a.Item,{className:"default-color-white default-hover-green",as:A.b,to:"/user",eventKey:"2"},"Gestione Utente")))):null)):null))},C=n(122),R=n(28),L=n(13),N=function(e){var t=Object(E.d)(P.a.isAuthenticated),n=Object(E.d)(P.a.getSession);return a.createElement(R.b,Object.assign({},e,{render:function(r){var c=r.location;return t&&"/login"===c.pathname?(console.log("ProtectedRoute => redirect to Home"),a.createElement(R.a,Object.assign({},e,{to:{pathname:"/",state:{from:c}}}))):e.private?t?(console.log("ProtectedRoute => render component : ",function(e){var t=S.find((function(t){return t.path===e}));return t?t.label:"route ".concat(e," not found!")}(c.pathname)),a.createElement(e.ComponentToRender,e)):(console.log("ProtectedRoute => redirect to Login : ",Object(L.a)({},n)),a.createElement(R.a,Object.assign({},e,{to:{pathname:"/login",state:{from:c}}}))):(console.log("ProtectedRoute => public route : ",Object(L.a)({},e)),a.createElement(e.ComponentToRender,e))}}))},G=(n(174),n(246)),z=n(121),M=n(149),q=n(150);z.c.add(M.a,q.a);var I=function(e){var t=Object(E.c)();return Object(a.useEffect)((function(){t(T.b.checkAuthentication.request({}))}),[t]),r.a.createElement("div",{className:"App"},r.a.createElement(k,null),r.a.createElement(G.a,{fluid:!0,style:{marginBottom:"20vh"}},r.a.createElement(a.Suspense,{fallback:r.a.createElement(C.LoadingModal,{show:!0,message:"....Caricamento"})},r.a.createElement(R.d,null,x.map((function(e){return r.a.createElement(N,Object.assign({},e,{key:e.index}))}))))))},F=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(n){var a=e.installing;null!=a&&(a.onstatechange=function(n){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var B,H=n(155),Z=n(101),W=n(26),D=n(156),J=n(50),K=n(14),$=n(15),_=n(23),V=Object($.createReducer)({tournament:null,tournamentsList:[],isLoading:!1}).handleAction([_.a.getTournaments.request,_.a.saveTournament.request],(function(e){return Object(L.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([_.a.getTournaments.failure,_.a.saveTournament.failure],(function(e,t){var n=t.payload.message;return Object(L.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(_.a.getTournaments.success,(function(e,t){var n=t.payload.results;return Object(L.a)({},e,{tournament:n&&n.length>0?n[0]:e.tournament,tournamentsList:n,isLoading:!1})})).handleAction(_.a.setTournament,(function(e,t){var n=t.payload;return Object(L.a)({},e,{tournament:n,isLoading:!1})})).handleAction(_.a.saveTournament.success,(function(e,t){var n=t.payload.result;return Object(L.a)({},e,{tournament:n,isLoading:!1})})),Y=n(46),Q=Object($.createReducer)({isLoading:!1}).handleAction([Y.a.getPlayers.request],(function(e){return Object(L.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([Y.a.getPlayers.failure],(function(e,t){var n=t.payload.message;return Object(L.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(Y.a.getPlayers.success,(function(e,t){var n=t.payload.results;return Object(L.a)({},e,{playersList:n,isLoading:!1})})),X=Object($.createReducer)({isLoading:!1}).handleAction([T.a.getPairs.request],(function(e){return Object(L.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([T.a.getPairs.failure],(function(e,t){var n=t.payload.message;return Object(L.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(T.a.getPairs.success,(function(e,t){var n=t.payload.results;return Object(L.a)({},e,{pairList:n,isLoading:!1})})),ee=n(39);!function(e){e.Admin="Admin",e.User="User"}(B||(B={}));var te=Object($.createReducer)({isAuthenticated:!1,isAdmin:!1,isLoading:!1}).handleAction([ee.a.checkAuthentication.request],(function(e){return Object(L.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([ee.a.checkAuthentication.failure],(function(e,t){var n=t.payload.message;return Object(L.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(ee.a.updateSession,(function(e,t){var n=t.payload;return Object(L.a)({},e,{user:n||void 0,isAuthenticated:!!n,isAdmin:!!n&&n.role===B.Admin,isLoading:!1})})).handleAction(ee.a.checkAuthentication.success,(function(e,t){var n=t.payload.user;return Object(L.a)({},e,{user:n,isAuthenticated:!!n,isAdmin:!!n&&n.role===B.Admin,isLoading:!1})})),ne=n(124),ae={selectedPairs:[Object(ne.d)("placeholder")],isLoading:!1},re=Object($.createReducer)(ae).handleAction([T.c.setSelectedPairs],(function(e,t){var n=t.payload,a=n.stageName,r=n.rows,c=e.selectedRows?e.selectedRows:new Map;c.set(a,r);var o=e.selectedPairs?[].concat(Object(W.a)(e.selectedPairs.filter((function(e){return null===e.id||e.stage1Name!==a}))),Object(W.a)(r.map((function(e){return e.pair})))):Object(W.a)(r.map((function(e){return e.pair})));return Object(L.a)({},e,{selectedRows:c,selectedPairs:o,isLoading:!0})})),ce=Object($.createReducer)({isLoading:!1}).handleAction([T.d.fetchStage2.request],(function(e){return Object(L.a)({},e,{isLoading:!0})})).handleAction([T.d.fetchStage2.failure],(function(e,t){var n=t.payload.message;return Object(L.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction([T.d.fetchStage2.success],(function(e,t){var n=t.payload,a=n.cells,r=n.rowsNumber;return console.log("Stage2Action.fetchStage2.success :",{cells:a,rowsNumber:r}),{cells:a,rowsNumber:r,isLoading:!1}})).handleAction([T.d.setCells],(function(e,t){var n=t.payload;return Object(L.a)({},e,{cells:n})})),oe=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch((null===t||void 0===t?void 0:t.tId)?"/api/v1/tournament/".concat(t.tId):"/api/v1/tournament/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 3:return n=e.sent,e.next=6,n.json();case 6:return a=e.sent,e.abrupt("return",{results:a});case 10:return e.prev=10,e.t0=e.catch(0),se(e.t0),e.abrupt("return",{results:[]});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),ie=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.model,e.prev=1,e.next=4,fetch("/api/v1/tournament",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 4:return a=e.sent,e.next=7,a.json();case 7:return r=e.sent,console.log("postTournament : ",r),e.abrupt("return",{result:r});case 12:return e.prev=12,e.t0=e.catch(1),se(e.t0),e.abrupt("return",{result:null});case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),se=function(e){throw console.warn("Failed to fetch tournaments",e),new Error("Something went wrong")},ue=s.a.mark(de),le=s.a.mark(pe);function de(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(K.b)(oe,e.payload);case 3:return t=n.sent,n.next=6,Object(K.c)(_.a.getTournaments.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(K.c)(_.a.getTournaments.failure(n.t0));case 12:case"end":return n.stop()}}),ue,null,[[0,8]])}function pe(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log("post saga : ",e.payload),n.next=4,Object(K.b)(ie,e.payload);case 4:return t=n.sent,n.next=7,Object(K.c)(_.a.saveTournament.success(t));case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(0),n.next=13,Object(K.c)(_.a.saveTournament.failure(n.t0));case 13:case"end":return n.stop()}}),le,null,[[0,9]])}var fe=[Object(K.d)(_.a.getTournaments.request,de),Object(K.d)(_.a.saveTournament.request,pe)],be=n(63),me=s.a.mark(ve);function ve(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log("getPlayersSaga"),n.next=4,Object(K.b)(be.a,e.payload);case 4:return t=n.sent,console.log("getPlayersSaga: ",t),n.next=8,Object(K.c)(Y.a.getPlayers.success(t));case 8:n.next=14;break;case 10:return n.prev=10,n.t0=n.catch(0),n.next=14,Object(K.c)(Y.a.getPlayers.failure(n.t0));case 14:case"end":return n.stop()}}),me,null,[[0,10]])}var ge=[Object(K.d)(Y.a.getPlayers.request,ve)],he=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.tId,e.prev=1,console.log("fetchPairs : ",n),e.next=5,fetch("/api/v1/pair/list/?tId=".concat(n),{method:"GET",headers:{"Content-Type":"application/json"}});case 5:return a=e.sent,e.next=8,a.json();case 8:return r=e.sent,console.log("fetchPairs : ",n,r),e.abrupt("return",{results:r});case 13:return e.prev=13,e.t0=e.catch(1),je(e.t0),e.abrupt("return",{results:[]});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),je=function(e){throw console.warn("Pair Error : ",e),new Error("Something went wrong")},Oe=s.a.mark(we);function we(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(K.b)(he,e.payload);case 3:return t=n.sent,console.log("getPairsSaga : ",t),n.next=7,Object(K.c)(T.a.getPairs.success(t));case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(0),n.next=13,Object(K.c)(T.a.getPairs.failure(n.t0));case 13:case"end":return n.stop()}}),Oe,null,[[0,9]])}var ye=[Object(K.d)(T.a.getPairs.request,we)],Se=n(152),xe=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(Se.a)(t),e.prev=1,e.next=4,fetch("/api/v1/auth/");case 4:return n=e.sent,e.next=7,n.json();case 7:return a=e.sent,console.log("SessionContext.user : ",a),e.abrupt("return",{user:a&&n.ok?a:void 0});case 12:return e.prev=12,e.t0=e.catch(1),Ae("SessionContext.error :"),e.abrupt("return",{user:void 0});case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),Ae=function(e){throw console.warn("Session Error : ",e),new Error("Something went wrong")},Ee=s.a.mark(Pe);function Pe(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(K.b)(xe,e.payload);case 3:return t=n.sent,n.next=6,Object(K.c)(ee.a.checkAuthentication.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(K.c)(ee.a.checkAuthentication.failure(n.t0));case 12:case"end":return n.stop()}}),Ee,null,[[0,8]])}var Te=[Object(K.d)(ee.a.checkAuthentication.request,Pe)],ke=n(137),Ce=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a,r,c,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.count,a=t.tournamentId,r=Object(ke.a)(n),e.prev=2,e.next=5,fetch("/api/v1/stage2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tournamentId:a,structure:r})});case 5:return c=e.sent,e.next=8,c.json();case 8:return o=e.sent,e.abrupt("return",{cells:o,rowsNumber:n});case 12:return e.prev=12,e.t0=e.catch(2),Re(e.t0),e.abrupt("return",{cells:r,rowsNumber:n});case 16:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}(),Re=function(e){throw console.warn("Stage2 Error : ",e),new Error("Something went wrong")},Le=s.a.mark(Ne);function Ne(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(K.b)(Ce,e.payload);case 3:return t=n.sent,n.next=6,Object(K.c)(T.d.fetchStage2.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(K.c)(T.d.fetchStage2.failure(n.t0));case 12:case"end":return n.stop()}}),Le,null,[[0,8]])}var Ge=[Object(K.d)(T.d.fetchStage2.request,Ne)],ze=s.a.mark(Ue),Me=J.d,qe=Object(D.a)(),Ie={tournamentState:V,playerState:Q,pairState:X,sessionState:te,stage1State:re,stage2State:ce},Fe=Object(J.e)(Object(J.c)(Ie),Me(Object(J.a)(qe)));function Ue(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(K.a)([].concat(Object(W.a)(fe),Object(W.a)(ge),Object(W.a)(ye),Object(W.a)(Te),Object(W.a)(Ge)));case 2:case"end":return e.stop()}}),ze)}qe.run(Ue),Object(Z.setDefaultLocale)("it"),Object(Z.registerLocale)("it",H.a),o.a.render(r.a.createElement(E.a,{store:Fe},r.a.createElement(A.a,null,r.a.createElement(I,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");F?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):U(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):U(t,e)}))}}()},39:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(15),r=n(16),c={checkAuthentication:Object(a.createAsyncAction)("".concat("[Session]"," Get Session ").concat(r.b),"".concat("[Session]"," Get Session ").concat(r.c),"".concat("[Session]"," Get Session ").concat(r.a))(),updateSession:Object(a.createAction)("".concat("[Session]"," Set Session"))()}},46:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(15),r=n(16),c={getPlayers:Object(a.createAsyncAction)("".concat("[Player]"," Get Player ").concat(r.b),"".concat("[Player]"," Get Player ").concat(r.c),"".concat("[Player]"," Get Player ").concat(r.a))()}},58:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={isLoading:function(e){var t=e.sessionState.isLoading;return t},getUser:function(e){return e.sessionState.user},isAdmin:function(e){var t=e.sessionState.isAdmin;return t},isAuthenticated:function(e){var t=e.sessionState.isAuthenticated;return t},getSession:function(e){return e.sessionState}}},59:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.New="New",e.PairsSelection="PairsSelection",e.Stage1="Stage1",e.Stage2="Stage2"}(a||(a={}))},63:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return l}));var a=n(10),r=n.n(a),c=n(26),o=n(22),i=n(151),s=function(){var e=Object(o.a)(r.a.mark((function e(t){var n,a,o,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.tId,a=t.addEmpty,e.prev=1,e.next=4,fetch(n?"/api/v1/player/list/".concat(n):"/api/v1/player/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 4:return o=e.sent,e.next=7,o.json();case 7:return i=e.sent,e.abrupt("return",{results:a?[].concat(Object(c.a)(i),[l("Nessun Giocatore")]):i});case 11:return e.prev=11,e.t0=e.catch(1),u(e.t0),e.abrupt("return",{results:[]});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),u=function(e){throw console.warn("Player Error : ",e),new Error("Something went wrong")};function l(e){return{id:null,name:"",surname:"",alias:"",label:e||"",role:i.PlayerRole.GoalKeeper,email:"",phone:"",match_played:0,match_won:0,total_score:0,editable:!1}}}},[[159,4,5]]]);
//# sourceMappingURL=main.2813f213.chunk.js.map