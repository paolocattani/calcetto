(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[3],{106:function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return i}));var a=n(63);function r(e){switch(e){case a.a.New:return"Nuovo";case a.a.PairsSelection:return"Selezione Coppie";case a.a.Stage1:return"Fase 1";case a.a.Stage2:return"Fase 2";default:return""}}function c(e){var t=new Date(e),n=""+(t.getMonth()+1),a=""+t.getDate(),r=t.getFullYear();return n.length<2&&(n="0"+n),a.length<2&&(a="0"+a),[r,n,a].join("/")}new RegExp("^d{10}$");var o=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})"),s=new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");function i(e,t){return Math.log(t)/Math.log(e)}},126:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={isLoading:function(e){var t=e.tournamentState.isLoading;return t},getTournament:function(e){return e.tournamentState.tournament},getTournamentsList:function(e){return e.tournamentState.tournamentsList}}},128:function(e,t,n){"use strict";n.r(t),n.d(t,"LoadingModal",(function(){return v})),n.d(t,"YesNoModal",(function(){return j})),n.d(t,"GenericToast",(function(){return O})),n.d(t,"LogSessionContext",(function(){return y})),n.d(t,"RedirectionControl",(function(){return S}));var a=n(124),r=n(0),c=n.n(r),o=n(52),s=n(30),i=n(255),u=n(168),l=n(129),d=n(105),f=n(122),p=n(256),m=n(19),b=n(35),g=n(54),v=(n(186),function(e){var t=e.message,n=e.show,a=e.onHide,r=void 0===a?function(){return n=!1}:a;return c.a.createElement(o.a,{show:n,onHide:r,size:"xl",centered:!0},c.a.createElement(o.a.Header,{closeButton:!0},c.a.createElement(o.a.Title,null,"Caricamento....")),c.a.createElement(o.a.Body,null,t||"Caricamento...."),c.a.createElement(o.a.Footer,null,c.a.createElement(s.a,{animation:"border",variant:"light"}),c.a.createElement(s.a,{animation:"border",variant:"primary"}),c.a.createElement(s.a,{animation:"border",variant:"secondary"}),c.a.createElement(s.a,{animation:"border",variant:"success"}),c.a.createElement(s.a,{animation:"border",variant:"danger"}),c.a.createElement(s.a,{animation:"border",variant:"warning"}),c.a.createElement(s.a,{animation:"border",variant:"info"}),c.a.createElement(s.a,{animation:"border",variant:"dark"})))}),h={color:"whitesmoke",backgroundColor:"#343a40",borderColor:"#ffc107"},j=function(e){var t=e.title,n=e.message,a=e.show,r=e.onHide,f=void 0===r?function(){return a=!1}:r,p=e.onClick;return c.a.createElement(o.a,{className:"YesNoModal",show:a,onHide:f,centered:!0,style:{borderColor:"#ffc107",borderWidth:"3px"}},c.a.createElement(o.a.Header,{closeButton:!0,style:h},c.a.createElement(o.a.Title,null,t)),c.a.createElement(o.a.Body,{style:h},c.a.createElement(i.a,{fluid:!0},c.a.createElement(u.a,{style:{fontSize:"larger"}},n),c.a.createElement(u.a,{style:{padding:"2rem 0rem 0rem 0rem"}},c.a.createElement(l.a,null,c.a.createElement(d.a,{variant:"outline-secondary",className:"float-left",onClick:function(){return f()}},"Annulla")),c.a.createElement(l.a,null,c.a.createElement(d.a,{variant:"outline-success",className:"float-right",onClick:function(){return p()}},"Conferma"))))),c.a.createElement(o.a.Footer,{style:h},c.a.createElement(s.a,{animation:"border",variant:"light"}),c.a.createElement(s.a,{animation:"border",variant:"primary"}),c.a.createElement(s.a,{animation:"border",variant:"secondary"}),c.a.createElement(s.a,{animation:"border",variant:"success"}),c.a.createElement(s.a,{animation:"border",variant:"danger"}),c.a.createElement(s.a,{animation:"border",variant:"warning"}),c.a.createElement(s.a,{animation:"border",variant:"info"}),c.a.createElement(s.a,{animation:"border",variant:"dark"})))},O=function(e){var t=e.message,n=e.type;return t&&""!==t?c.a.createElement(f.a,{className:"rounded mr-2 mx-auto",key:"".concat(n,"-message"),show:""!==t},c.a.createElement(f.a.Header,{closeButton:!1},c.a.createElement("strong",null,"Operazione completata !")),c.a.createElement(f.a.Body,null,c.a.createElement(p.a,{variant:n},t))):null},y=function(){var e=Object(b.d)(g.a.getSession);return c.a.createElement(c.a.Fragment,null,Object.entries(e).map((function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return c.a.createElement("p",null,n," : ",r)})))};function S(e){var t=Object(m.h)();return c.a.createElement("div",null,c.a.createElement("h1",null,"Current Ruote : ",c.a.createElement("code",null,t.pathname)))}},13:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return c}));var a="Request",r="Success",c="Failure"},130:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.None="No",e.NotAPlayer="Non sono un giocatore",e.GoalKeeper="Portiere",e.Master="Master",e.Striker="Attaccante"}(a||(a={}))},131:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"e",(function(){return r.a})),n.d(t,"c",(function(){return c.a})),n.d(t,"d",(function(){return o})),n.d(t,"b",(function(){return s.a}));var a={isLoading:function(e){var t=e.pairState.isLoading;return t},getPairsList:function(e){return e.pairState.pairList}},r=n(126),c=n(134),o={isLoading:function(e){var t=e.stage2State.isLoading;return t},getCells:function(e){return e.stage2State.cells},getRowsNumber:function(e){return e.stage2State.rowsNumber}},s=n(54)},133:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return d}));var a=n(31),r=n(14),c=n(8),o=n.n(c),s=n(21),i=n(66),u=function(e){return{id:null,tId:0,rowNumber:0,player1:Object(i.b)(),player2:Object(i.b)(),alias:e||"",stage1Name:"",placement:0,paid1:!1,paid2:!1}};var l={option:function(e,t){return Object(r.a)({},e,{backgroundColor:"white",color:"black","&:hover":{backgroundColor:"#64bd9c",color:"white"}})},input:function(e){return Object(r.a)({},e,{backgroundColor:"#64bd9c"})},control:function(e){return Object(r.a)({},e,{height:"3vmin",marginBottom:"auto"})},singleValue:function(e){return Object(r.a)({},e)},valueContainer:function(e){return Object(r.a)({},e,{height:"100%",fontSize:"larger"})}},d=function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r,c,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/pair/list/?tId=".concat(t),{method:"GET",headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.next=8,fetch(t?"/api/v1/player/list/".concat(t):"/api/v1/player/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 8:return n=e.sent,e.next=11,n.json();case 11:return c=e.sent,s=[].concat(Object(a.a)(c),[Object(i.b)("Nessun Giocatore")]),console.log("rows : ",r),e.abrupt("return",{rows:r,players:s});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},134:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={isLoading:function(e){var t=e.stage1State.isLoading;return t},getSelectedRows:function(e){return e.stage1State.selectedRows||null},getSelectedPairs:function(e){return e.stage1State.selectedPairs},getNeedRefresh:function(e){return e.stage1State.needRefresh}}},142:function(e,t){},143:function(e,t){},144:function(e,t){},145:function(e,t){},146:function(e,t){},147:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var a=n(106),r=function(e){for(var t=[NaN,Object(a.c)(2,e)+1],n=1,r=1;r<=e;r++)if(!t[r]){t[r]=n;for(var c=Math.pow(2,n),o=1;r+c*o<e+1;o++)t[r+c*o]=n;n++}return t},c=function(e){return{name:"",isWinner:!1,matchId:0,cellRowIndex:0,cellColIndex:0,parentId:0}},o=function(e){var t=Object(a.c)(2,e)+1,n=2*e;return new Array(t).fill([]).map((function(e,t){n/=2;for(var a=!0,r=0,c=[],o=0;o<n;o++)a&&r++,a=!a,c.push({matchId:r,cellColIndex:t,cellRowIndex:o,parentId:0===t?0:o+1,name:"".concat(t,"-").concat(o+1),pair:void 0,isWinner:!1});return[].concat(c)}))}},155:function(e,t,n){e.exports=n.p+"static/media/header.7774471e.jpg"},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return o.a})),n.d(t,"b",(function(){return s.a})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return u}));var a=n(15),r=n(13),c={getPairs:Object(a.createAsyncAction)("".concat("[Pair]"," Get Pair ").concat(r.b),"".concat("[Pair]"," Get Pair ").concat(r.c),"".concat("[Pair]"," Get Pair ").concat(r.a))()},o=(n(48),n(20)),s=n(29),i={setSelectedPairs:Object(a.createAction)("".concat("[Stage1]"," Set Selected Pairs"))(),stage1Watcher:Object(a.createAsyncAction)("".concat("[Stage1]"," Watch Stage1 ").concat(Request),"".concat("[Stage1]"," Watch Stage1 ").concat(r.c),"".concat("[Stage1]"," Watch Stage1 ").concat(r.a))()},u={fetchStage2:Object(a.createAsyncAction)("".concat("[Stage2]"," Fetch Stage2 ").concat(Request),"".concat("[Stage2]"," Fetch Stage2 ").concat(r.c),"".concat("[Stage2]"," Fetch Stage2 ").concat(r.a))(),updateCell:Object(a.createAsyncAction)("".concat("[Stage2]"," Update Stage2 Cell ").concat(Request),"".concat("[Stage2]"," Update Stage2 Cell ").concat(r.c),"".concat("[Stage2]"," Update Stage2 Cell ").concat(r.a))(),delete:Object(a.createAsyncAction)("".concat("[Stage2]"," Delete Stage2 ").concat(Request),"".concat("[Stage2]"," Delete Stage2 ").concat(r.c),"".concat("[Stage2]"," Delete Stage2 ").concat(r.a))(),setCells:Object(a.createAction)("".concat("[Stage2]"," Set Cells"))()}},170:function(e,t,n){e.exports=n(250)},175:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){},192:function(e,t,n){},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(15),r=n(13),c="[Tournament]",o={getTournaments:Object(a.createAsyncAction)("".concat(c," Get Tournament ").concat(r.b),"".concat(c," Get Tournament ").concat(r.c),"".concat(c," Get Tournament ").concat(r.a))(),setTournament:Object(a.createAction)("".concat(c," Set Tournament"))(),saveTournament:Object(a.createAsyncAction)("".concat(c," Save Tournament ").concat(r.b),"".concat(c," Save Tournament ").concat(r.c),"".concat(c," Save Tournament ").concat(r.a))(),updateTournament:Object(a.createAsyncAction)("".concat(c," Update Tournament Progress ").concat(r.b),"".concat(c," Update Tournament Progress ").concat(r.c),"".concat(c," Update Tournament Progress ").concat(r.a))()}},250:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(24),o=n.n(c),s=(n(175),n(176),n(177),n(8)),i=n.n(s),u=n(21),l=n(155),d=n.n(l),f=n(263),p=n(266),m=n(267),b=n(265),g=n(264),v=n(105),h=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(2),n.e(13)]).then(n.bind(null,376))})),j=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(15),n.e(16)]).then(n.bind(null,377))})),O=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(6)]).then(n.bind(null,374))})),y=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(11)]).then(n.bind(null,373))})),S=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,375))})),x=[{path:"/login",label:"Login",exact:!0,ComponentToRender:Object(a.lazy)((function(){return n.e(12).then(n.bind(null,371))})),visible:!1,private:!1,index:0},{path:"/",label:"Home",exact:!0,ComponentToRender:j,visible:!1,private:!0,index:10},{path:"/tournament",label:"Selezione Coppie",exact:!0,ComponentToRender:O,visible:!1,private:!0,index:20},{path:"/stage1",label:"Torneo fase 1",exact:!0,ComponentToRender:y,visible:!1,private:!0,index:30},{path:"/player",label:"Gestione Giocatori",exact:!0,ComponentToRender:h,visible:!0,private:!0,index:40},{path:"/user",label:"Gestione Utente",exact:!0,ComponentToRender:Object(a.lazy)((function(){return Promise.all([n.e(9),n.e(14)]).then(n.bind(null,372))})),visible:!1,private:!0,index:50},{path:"/stage2",label:"Torneo fase 2",exact:!0,ComponentToRender:S,visible:!1,private:!0,index:100},{path:"*",label:"Not Found",exact:!1,ComponentToRender:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,128)).then((function(e){return{default:e.RedirectionControl}}))})),visible:!1,private:!0,index:1e3}],w=x;var E=n(57),A=n(35),T=n(54),P=n(17),k=function(){var e=Object(A.c)(),t=Object(A.d)(T.a.getSession),n=function(){var t=Object(u.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/v1/auth/logout");case 2:t.sent.ok&&e(P.b.updateSession({user:void 0}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),a={backgroundImage:"url(".concat(d.a,")"),backgroundSize:"cover",padding:"60px 0px 10px 0px",minHeight:"28vh"};return r.a.createElement("header",null,r.a.createElement(f.a,{style:a},r.a.createElement("h1",{style:{margin:"5vh"}},r.a.createElement("strong",{style:{color:"white"}},"Calcetto C.S.M")),t.isAuthenticated?r.a.createElement(p.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},r.a.createElement(p.a.Brand,{as:E.b,to:"/"},"Home"),r.a.createElement(p.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(p.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(m.a,{className:"mr-auto"},w.map((function(e){return e.visible?e.private&&!t.isAuthenticated?null:r.a.createElement(m.a.Link,{as:E.b,key:e.index,to:e.path},e.label):null}))),t.user?r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{alignRight:!0,as:g.a},r.a.createElement(v.a,{style:{opacity:1},variant:"outline-warning",size:"lg",disabled:!0},r.a.createElement("strong",{style:{color:"#64bd9c",fontSize:"larger"}},t.user.username)),r.a.createElement(b.a.Toggle,{split:!0,variant:"outline-warning",id:"dropdown-custom-2"}),r.a.createElement(b.a.Menu,{className:"default-background default-border-yellow"},r.a.createElement(b.a.Item,{className:"default-color-white default-hover-green",as:"button",onClick:n,eventKey:"1"},"Log out"),r.a.createElement(b.a.Divider,{style:{borderTopColor:"#ffc107"}}),r.a.createElement(b.a.Item,{className:"default-color-white default-hover-green",as:E.b,to:"/user",eventKey:"2"},"Gestione Utente")))):null)):null))},C=n(128),L=n(19),R=n(14),N=function(e){var t=Object(A.d)(T.a.isAuthenticated),n=Object(A.d)(T.a.getSession);return a.createElement(L.b,Object.assign({},e,{render:function(r){var c=r.location;return t&&"/login"===c.pathname?(console.log("ProtectedRoute => redirect to Home"),a.createElement(L.a,Object.assign({},e,{to:{pathname:"/",state:{from:c}}}))):e.private?t?(console.log("ProtectedRoute => render component : ",function(e){var t=x.find((function(t){return t.path===e}));return t?t.label:"route ".concat(e," not found!")}(c.pathname)),a.createElement(e.ComponentToRender,e)):(console.log("ProtectedRoute => redirect to Login : ",Object(R.a)({},n)),a.createElement(L.a,Object.assign({},e,{to:{pathname:"/login",state:{from:c}}}))):(console.log("ProtectedRoute => public route : ",Object(R.a)({},e)),a.createElement(e.ComponentToRender,e))}}))},I=n(139),M=n(140),q=n(153),G=n(152),z=function(e){Object(q.a)(n,e);var t=Object(G.a)(n);function n(){var e;Object(I.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={error:void 0,errorInfo:void 0},e}return Object(M.a)(n,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){var e=this.state;e.error;if(e.errorInfo){return r.a.createElement("div",null,r.a.createElement("h2",{className:"error"},"An unexpected error has occurred."),void 0)}return this.props.children}}]),n}(r.a.Component),W=(n(187),n(255)),U=n(125),F=n(159),D=n(160),H=n(41);n(191),n(192);U.c.add(F.a,D.a);var B=function(e){var t=Object(A.c)(),n=Object(L.g)();return Object(a.useEffect)((function(){t(P.b.checkAuthentication.request({history:n}))}),[n,t]),r.a.createElement("div",{className:"App"},r.a.createElement(z,null,r.a.createElement(k,null),r.a.createElement(W.a,{fluid:!0,style:{marginBottom:"20vh"}},r.a.createElement(H.a,{autoClose:2e3}),r.a.createElement(a.Suspense,{fallback:r.a.createElement(C.LoadingModal,{show:!0,message:"....Caricamento"})},r.a.createElement(L.d,null,w.map((function(e){return r.a.createElement(N,Object.assign({},e,{key:e.index}))})))))))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(n){var a=e.installing;null!=a&&(a.onstatechange=function(n){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Z,V=n(165),K=n(107),$=n(31),Y=n(78),X=n(56),Q=n(12),ee=n(15),te=n(20),ne=Object(ee.createReducer)({tournament:null,tournamentsList:[],isLoading:!1}).handleAction([te.a.getTournaments.request,te.a.saveTournament.request,te.a.updateTournament.request],(function(e){return Object(R.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([te.a.getTournaments.failure,te.a.saveTournament.failure,te.a.updateTournament.failure],(function(e,t){var n=t.payload.message;return Object(R.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(te.a.getTournaments.success,(function(e,t){var n=t.payload.results;return Object(R.a)({},e,{tournament:n&&n.length>0?n[0]:e.tournament,tournamentsList:n,isLoading:!1})})).handleAction(te.a.setTournament,(function(e,t){var n=t.payload;return Object(R.a)({},e,{tournament:n,isLoading:!1})})).handleAction([te.a.saveTournament.success,te.a.updateTournament.success],(function(e,t){var n=t.payload.result;return Object(R.a)({},e,{tournament:n,isLoading:!1})})),ae=n(48),re=Object(ee.createReducer)({isLoading:!1}).handleAction([ae.a.getPlayers.request],(function(e){return Object(R.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([ae.a.getPlayers.failure],(function(e,t){var n=t.payload.message;return Object(R.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(ae.a.getPlayers.success,(function(e,t){var n=t.payload.results;return Object(R.a)({},e,{playersList:n,isLoading:!1})})),ce=Object(ee.createReducer)({isLoading:!1}).handleAction([P.a.getPairs.request],(function(e){return Object(R.a)({},e,{isLoading:!0,errorMessage:void 0})})).handleAction([P.a.getPairs.failure],(function(e,t){var n=t.payload.message;return Object(R.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction(P.a.getPairs.success,(function(e,t){var n=t.payload.results;return Object(R.a)({},e,{pairList:n,isLoading:!1})})),oe=n(29);!function(e){e.Admin="Admin",e.User="User"}(Z||(Z={}));var se=Object(ee.createReducer)({isAuthenticated:!1,isAdmin:!1,isLoading:!1}).handleAction([oe.a.checkAuthentication.request],(function(e){return Object(R.a)(Object(R.a)({},e),{},{isLoading:!0,errorMessage:void 0})})).handleAction([oe.a.checkAuthentication.failure],(function(e,t){var n=t.payload.message;return Object(R.a)(Object(R.a)({},e),{},{errorMessage:n,isLoading:!1})})).handleAction([oe.a.checkAuthentication.success,oe.a.register.success,oe.a.login.success,oe.a.updateSession],(function(e,t){var n=t.payload,a=n.user,r=n.message;return{user:a,showMessage:n.showMessage,message:r,isAuthenticated:!!a,isAdmin:!!a&&a.role===Z.Admin,isLoading:!1}})),ie=n(133),ue={needRefresh:!1,selectedPairs:[Object(ie.c)("placeholder")],isLoading:!1},le=Object(ee.createReducer)(ue).handleAction([P.c.stage1Watcher.request],(function(e){return Object(R.a)({},e,{needRefresh:!1})})).handleAction([P.c.stage1Watcher.failure],(function(e){return Object(R.a)({},e)})).handleAction([P.c.stage1Watcher.success],(function(e){return Object(R.a)({},e,{needRefresh:!0})})).handleAction([P.c.setSelectedPairs],(function(e,t){var n=t.payload,a=n.stageName,r=n.rows,c=e.selectedRows?e.selectedRows:new Map;c.set(a,r);var o=e.selectedPairs?[].concat(Object($.a)(e.selectedPairs.filter((function(e){return null===e.id||e.stage1Name!==a}))),Object($.a)(r.map((function(e){return e.pair})))):Object($.a)(r.map((function(e){return e.pair})));return Object(R.a)({},e,{selectedRows:c,selectedPairs:o,isLoading:!0})})),de=Object(ee.createReducer)({isLoading:!1}).handleAction([P.d.fetchStage2.request],(function(e){return Object(R.a)({},e,{isLoading:!0})})).handleAction([P.d.fetchStage2.failure],(function(e,t){var n=t.payload.message;return Object(R.a)({},e,{errorMessage:n,isLoading:!1})})).handleAction([P.d.fetchStage2.success],(function(e,t){var n=t.payload,a=n.cells,r=n.rowsNumber;return console.log("Stage2Action.fetchStage2.success :",{cells:a,rowsNumber:r}),{cells:a,rowsNumber:r,isLoading:!1}})).handleAction([P.d.setCells],(function(e,t){var n=t.payload;return Object(R.a)({},e,{cells:n})})),fe=n(95),pe=i.a.mark(ge),me=i.a.mark(ve),be=i.a.mark(he);function ge(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(Q.b)(fe.a,e.payload);case 3:return t=n.sent,n.next=6,Object(Q.c)(te.a.getTournaments.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(Q.c)(te.a.getTournaments.failure(n.t0));case 12:case"end":return n.stop()}}),pe,null,[[0,8]])}function ve(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(Q.b)(fe.c,e.payload);case 3:return t=n.sent,n.next=6,Object(Q.c)(te.a.saveTournament.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(Q.c)(te.a.saveTournament.failure(n.t0));case 12:case"end":return n.stop()}}),me,null,[[0,8]])}function he(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(Q.b)(fe.d,e.payload);case 3:return t=n.sent,n.next=6,Object(Q.c)(te.a.saveTournament.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(Q.c)(te.a.saveTournament.failure(n.t0));case 12:case"end":return n.stop()}}),be,null,[[0,8]])}var je=[Object(Q.f)(te.a.getTournaments.request,ge),Object(Q.f)(te.a.saveTournament.request,ve),Object(Q.f)(te.a.updateTournament.request,he)],Oe=n(66),ye=i.a.mark(Se);function Se(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log("getPlayersSaga"),n.next=4,Object(Q.b)(Oe.a,e.payload);case 4:return t=n.sent,console.log("getPlayersSaga: ",t),n.next=8,Object(Q.c)(ae.a.getPlayers.success(t));case 8:n.next=14;break;case 10:return n.prev=10,n.t0=n.catch(0),n.next=14,Object(Q.c)(ae.a.getPlayers.failure(n.t0));case 14:case"end":return n.stop()}}),ye,null,[[0,10]])}var xe=[Object(Q.f)(ae.a.getPlayers.request,Se)],we=n(28),Ee=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.tId,e.prev=1,console.log("fetchPairs : ",n),e.next=5,fetch("/api/v1/pair/list/?tId=".concat(n),{method:"GET",headers:{"Content-Type":"application/json"}});case 5:return a=e.sent,e.next=8,a.json();case 8:return r=e.sent,console.log("fetchPairs : ",n,r),e.abrupt("return",{results:r});case 13:return e.prev=13,e.t0=e.catch(1),Object(we.a)(e.t0,"Error pairs fetch"),e.abrupt("return",{results:[]});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),Ae=i.a.mark(Te);function Te(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(Q.b)(Ee,e.payload);case 3:return t=n.sent,n.next=6,Object(Q.c)(P.a.getPairs.success(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(Q.c)(P.a.getPairs.failure(n.t0));case 12:case"end":return n.stop()}}),Ae,null,[[0,8]])}var Pe,ke=[Object(Q.f)(P.a.getPairs.request,Te)],Ce=n(161);!function(e){e.SESSION_EXPIRED="session_expired",e.NEED_REFRESH="need_refresh"}(Pe||(Pe={}));var Le=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(Ce.a)(t),e.prev=1,e.next=4,fetch("/api/v1/auth/");case 4:return n=e.sent,e.next=7,n.json();case 7:return a=e.sent,e.abrupt("return",{user:a&&n.ok?a:void 0});case 11:return e.prev=11,e.t0=e.catch(1),Object(we.a)("SessionContext.error ","Connection error."),e.abrupt("return",{user:void 0});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),Re=function(e){return Object(Y.d)((function(t){var n=function(e){return console.log("Connected...")},a=function(e){if(e){var n=JSON.parse(e.data);n.status===Pe.SESSION_EXPIRED&&(t(n),c())}},r=function(e){console.error("An Error Occur: ",e),t(Y.a),c()};e.addEventListener("open",n),e.addEventListener("message",a),e.addEventListener("error",r);var c=function(){e.removeEventListener("open",n),e.removeEventListener("message",a),e.removeEventListener("error",r),e.close()};return c}),Y.b.expanding())},Ne=i.a.mark(Me),Ie=i.a.mark(qe);function Me(e){var t,n;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload,a.prev=1,a.next=4,Object(Q.b)(Le,t);case 4:return n=a.sent,a.next=7,Object(Q.c)(oe.a.checkAuthentication.success(n));case 7:return a.next=9,Object(Q.c)(oe.a.sessionControl.request({history:t.history}));case 9:a.next=15;break;case 11:return a.prev=11,a.t0=a.catch(1),a.next=15,Object(Q.c)(oe.a.checkAuthentication.failure(a.t0));case 15:case"end":return a.stop()}}),Ne,null,[[1,11]])}function qe(e){var t,n,a;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,console.log("watchSessionSaga : start"),t=new EventSource("/sse/v1/session"),r.next=5,Object(Q.b)(Re,t);case 5:n=r.sent;case 6:return r.next=9,Object(Q.e)(n);case 9:if(!(a=r.sent)){r.next=16;break}return console.log("Message from queue : ",a),H.b.error("La tua sessione \xe8 scaduta"),r.next=15,Object(Q.c)(oe.a.updateSession({user:void 0}));case 15:e.payload.history.push("/login");case 16:r.next=6;break;case 18:r.next=23;break;case 20:r.prev=20,r.t0=r.catch(0),console.log("watchSessionSaga.err : ",r.t0);case 23:case"end":return r.stop()}}),Ie,null,[[0,20]])}var Ge=[Object(Q.f)(oe.a.checkAuthentication.request,Me),Object(Q.g)(oe.a.sessionControl.request,qe)],ze=n(147),We=function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/stage2",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({tId:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ue=function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/v1/stage2/cells",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cell1:t,cell2:n})});case 3:return a=e.sent,e.next=6,a.json();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(we.a)(e.t0,"Error stage2 update");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}(),Fe=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a,r,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.count,a=t.tournamentId,0!==n){e.next=5;break}return e.next=4,De(a);case 4:n=e.sent;case 5:return r=Object(ze.a)(n),e.prev=6,e.next=9,fetch("/api/v1/stage2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tournamentId:a,structure:r})});case 9:return c=e.sent,e.next=12,c.json();case 12:return o=e.sent,e.abrupt("return",{cells:o,rowsNumber:n});case 16:return e.prev=16,e.t0=e.catch(6),Object(we.a)(e.t0,"Error stage2 fetch"),e.abrupt("return",{cells:r,rowsNumber:n});case 20:case"end":return e.stop()}}),e,null,[[6,16]])})));return function(t){return e.apply(this,arguments)}}(),De=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=0,e.prev=1,e.next=4,fetch("/api/v1/stage2/count",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tournamentId:t})});case 4:return a=e.sent,e.next=7,a.json();case 7:n=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),Object(we.a)(e.t0,"Error stage2 count");case 13:return e.prev=13,e.abrupt("return",n);case 16:case"end":return e.stop()}}),e,null,[[1,10,13,16]])})));return function(t){return e.apply(this,arguments)}}(),He=n(87),Be=n(131),Je=i.a.mark(Ve),_e=i.a.mark(Ke),Ze=i.a.mark($e);function Ve(e){var t,n;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(Q.b)(We,e.payload.tId);case 3:return t=a.sent,a.next=6,Object(Q.c)(P.d.delete.success(t));case 6:return a.next=8,Object(Q.d)(Be.e.getTournament);case 8:return(n=a.sent).progress=He.TournamentProgress.Stage1,console.log("deleteStage2Saga : ",n),H.b.success("Fase 2 eiminata..."),a.next=14,Object(Q.c)(P.e.updateTournament.request({model:n}));case 14:a.next=21;break;case 16:return a.prev=16,a.t0=a.catch(0),a.next=20,Object(Q.c)(P.d.delete.failure(a.t0));case 20:H.b.error("Error while deleting Stage2");case 21:case"end":return a.stop()}}),Je,null,[[0,16]])}function Ke(e){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(Q.b)(Fe,e.payload);case 3:return t=n.sent,n.next=6,Object(Q.c)(P.d.fetchStage2.success(t));case 6:n.next=13;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,Object(Q.c)(P.d.fetchStage2.failure(n.t0));case 12:H.b.error("Error while fetching Stage2");case 13:case"end":return n.stop()}}),_e,null,[[0,8]])}function $e(e){var t,n,a;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,n=t.cell1,a=t.cell2,r.prev=1,r.next=4,Object(Q.b)(Ue,n,a);case 4:return r.next=6,Object(Q.c)(P.d.updateCell.success({}));case 6:r.next=13;break;case 8:return r.prev=8,r.t0=r.catch(1),r.next=12,Object(Q.c)(P.d.updateCell.failure(r.t0));case 12:H.b.error("Error while updating Stage2");case 13:case"end":return r.stop()}}),Ze,null,[[1,8]])}var Ye=[Object(Q.f)(P.d.fetchStage2.request,Ke),Object(Q.f)(P.d.updateCell.request,$e),Object(Q.f)(P.d.delete.request,Ve)],Xe=i.a.mark(at),Qe=X.d,et=Object(Y.c)(),tt={tournamentState:ne,playerState:re,pairState:ce,sessionState:se,stage1State:le,stage2State:de},nt=Object(X.e)(Object(X.c)(tt),Qe(Object(X.a)(et)));function at(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Q.a)([].concat(Object($.a)(je),Object($.a)(xe),Object($.a)(ke),Object($.a)(Ge),Object($.a)(Ye)));case 2:case"end":return e.stop()}}),Xe)}et.run(at),Object(K.setDefaultLocale)("it"),Object(K.registerLocale)("it",V.a),o.a.render(r.a.createElement(a.StrictMode,null,r.a.createElement(A.a,{store:nt},r.a.createElement(E.a,null,r.a.createElement(B,null)))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");J?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):_(t,e)}))}}(),window.console||(window.console={}),["log","debug","warn","info"].forEach((function(e){return window.console[e]=function(){}}))},28:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(41),r=function(e,t){throw console.error("".concat(t),e),a.b.error(t),new Error("Something went wrong : ".concat(t))}},29:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(15),r=n(13),c={register:Object(a.createAsyncAction)("".concat("[Session]"," Register ").concat(r.b),"".concat("[Session]"," Register ").concat(r.c),"".concat("[Session]"," Register ").concat(r.a))(),login:Object(a.createAsyncAction)("".concat("[Session]"," Login ").concat(r.b),"".concat("[Session]"," Login ").concat(r.c),"".concat("[Session]"," Login ").concat(r.a))(),checkAuthentication:Object(a.createAsyncAction)("".concat("[Session]"," Get Session ").concat(r.b),"".concat("[Session]"," Get Session ").concat(r.c),"".concat("[Session]"," Get Session ").concat(r.a))(),sessionControl:Object(a.createAsyncAction)("".concat("[Session]"," Watch Session ").concat(r.b),"".concat("[Session]"," Watch Session ").concat(r.c),"".concat("[Session]"," Watch Session ").concat(r.a))(),updateSession:Object(a.createAction)("".concat("[Session]"," Set Session"))()}},48:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(15),r=n(13),c={getPlayers:Object(a.createAsyncAction)("".concat("[Player]"," Get Player ").concat(r.b),"".concat("[Player]"," Get Player ").concat(r.c),"".concat("[Player]"," Get Player ").concat(r.a))()}},54:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={isLoading:function(e){var t=e.sessionState.isLoading;return t},isAdmin:function(e){var t=e.sessionState.isAdmin;return t},isAuthenticated:function(e){var t=e.sessionState.isAuthenticated;return t},getUser:function(e){return e.sessionState.user},getSession:function(e){return e.sessionState}}},63:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.New="New",e.PairsSelection="PairsSelection",e.Stage1="Stage1",e.Stage2="Stage2"}(a||(a={}))},66:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return l}));var a=n(8),r=n.n(a),c=n(31),o=n(21),s=n(87),i=n(28),u=function(){var e=Object(o.a)(r.a.mark((function e(t){var n,a,o,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.tId,a=t.addEmpty,e.prev=1,e.next=4,fetch(n?"/api/v1/player/list/".concat(n):"/api/v1/player/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 4:return o=e.sent,e.next=7,o.json();case 7:return s=e.sent,e.abrupt("return",{results:a?[].concat(Object(c.a)(s),[l("Nessun Giocatore")]):s});case 11:return e.prev=11,e.t0=e.catch(1),Object(i.a)(e.t0,"Error players fetch"),e.abrupt("return",{results:[]});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();function l(e){return{id:null,name:"",surname:"",alias:"",label:e||"",role:s.PlayerRole.GoalKeeper,email:"",phone:"",match_played:0,match_won:0,total_score:0,editable:!1}}},87:function(e,t,n){"use strict";var a=n(142);n.o(a,"PlayerRole")&&n.d(t,"PlayerRole",(function(){return a.PlayerRole})),n.o(a,"TournamentProgress")&&n.d(t,"TournamentProgress",(function(){return a.TournamentProgress}));var r=n(143);n.o(r,"PlayerRole")&&n.d(t,"PlayerRole",(function(){return r.PlayerRole})),n.o(r,"TournamentProgress")&&n.d(t,"TournamentProgress",(function(){return r.TournamentProgress}));var c=n(130);n.d(t,"PlayerRole",(function(){return c.a}));var o=n(63);n.d(t,"TournamentProgress",(function(){return o.a}));n(144),n(145),n(146)},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return l}));var a=n(8),r=n.n(a),c=n(21),o=n(28),s=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch((null===t||void 0===t?void 0:t.tId)?"/api/v1/tournament/".concat(t.tId):"/api/v1/tournament/list",{method:"GET",headers:{"Content-Type":"application/json"}});case 3:return n=e.sent,e.next=6,n.json();case 6:return a=e.sent,e.abrupt("return",{results:a});case 10:return e.prev=10,e.t0=e.catch(0),Object(o.a)(e.t0,"Error fetching Tournaments"),e.abrupt("return",{results:[]});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.model,e.prev=1,e.next=4,fetch("/api/v1/tournament",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 4:return a=e.sent,e.next=7,a.json();case 7:return c=e.sent,console.log("postTournament : ",c),e.abrupt("return",{result:c});case 12:return e.prev=12,e.t0=e.catch(1),Object(o.a)(e.t0,"Error updating Tournament"),e.abrupt("return",{result:null});case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.model,e.prev=1,e.next=4,fetch("/api/v1/tournament",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 4:return a=e.sent,e.next=7,a.json();case 7:return c=e.sent,e.abrupt("return",{result:c});case 11:return e.prev=11,e.t0=e.catch(1),Object(o.a)(e.t0,"Error updating Tournament"),e.abrupt("return",{result:n});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,c,s,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.model,e.prev=1,e.next=4,fetch("/api/v1/tournament/isValid",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 4:return a=e.sent,e.next=7,a.json();case 7:return c=e.sent,s=c.isValid,i=c.errorMessage,e.abrupt("return",{isValid:s,errorMessage:i});case 13:return e.prev=13,e.t0=e.catch(1),Object(o.a)(e.t0,"Error validating Tournament"),e.abrupt("return",{isValid:!1,errorMessage:""});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}()}},[[170,4,5]]]);
//# sourceMappingURL=main.f3b89fe1.chunk.js.map