(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[7],{1301:function(e,t,r){"use strict";var a=r(5),n=r(9),c=r(12),i=r.n(c),s=r(0),o=r.n(s),l=r(107),u=function(){},p=o.a.forwardRef((function(e,t){var r=e.children,c=e.name,p=e.className,d=e.checked,b=e.type,f=e.onChange,j=e.value,m=e.disabled,h=e.inputRef,g=Object(n.a)(e,["children","name","className","checked","type","onChange","value","disabled","inputRef"]),O=Object(s.useState)(!1),y=O[0],x=O[1],v=Object(s.useCallback)((function(e){"INPUT"===e.target.tagName&&x(!0)}),[]),w=Object(s.useCallback)((function(e){"INPUT"===e.target.tagName&&x(!1)}),[]);return o.a.createElement(l.a,Object(a.a)({},g,{ref:t,className:i()(p,y&&"focus",m&&"disabled"),type:void 0,active:!!d,as:"label"}),o.a.createElement("input",{name:c,type:b,value:j,ref:h,autoComplete:"off",checked:!!d,disabled:!!m,onFocus:v,onBlur:w,onChange:f||u}),r)}));p.displayName="ToggleButton",t.a=p},1302:function(e,t,r){},1303:function(e,t,r){"use strict";var a=r(9),n=r(5),c=r(12),i=r.n(c),s=r(0),o=r.n(s),l=r(32),u=r(16),p=Object(l.a)("input-group-append"),d=Object(l.a)("input-group-prepend"),b=Object(l.a)("input-group-text",{Component:"span"}),f=o.a.forwardRef((function(e,t){var r=e.bsPrefix,c=e.size,s=e.className,l=e.as,p=void 0===l?"div":l,d=Object(a.a)(e,["bsPrefix","size","className","as"]);return r=Object(u.a)(r,"input-group"),o.a.createElement(p,Object(n.a)({ref:t},d,{className:i()(s,r,c&&r+"-"+c)}))}));f.displayName="InputGroup";var j=Object(n.a)({},f,{Text:b,Radio:function(e){return o.a.createElement(b,null,o.a.createElement("input",Object(n.a)({type:"radio"},e)))},Checkbox:function(e){return o.a.createElement(b,null,o.a.createElement("input",Object(n.a)({type:"checkbox"},e)))},Append:p,Prepend:d});t.a=j},1315:function(e,t,r){"use strict";r.r(t);var a=r(10),n=r(14),c=r(7),i=r.n(c),s=r(62),o=r(301),l=r(2),u=r(0),p=r.n(u),d=r(1303),b=r(322),f=r(107),j=r(195),m=r(149),h=r(418),g=r.n(h),O=r(24),y=r(40),x=r(34),v=r(63),w=r(298),k=function(e){var t=e.addRow,r=e.optionsLength,a=e.isEditable,n=Object(w.a)(["common","pair","player"]).t,c=r-1,i=c<8?8-c:0;return r?c>=8?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("p",{children:"".concat(n("pair:missing.1"),"...")}),Object(l.jsx)(f.a,{variant:"success",onClick:t,disabled:!a,children:n("pair:add.one")})]}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("p",{children:n("pair:missing.2",{current:c,min:8})}),Object(l.jsx)("p",{children:"".concat(1===i?n("pair:missing.3"):n("pair:missing.4",{diff:i}),"...")}),Object(l.jsx)(v.b,{to:"/player",children:Object(l.jsx)(f.a,{variant:"success",children:n("player:add")})})]}):null},C=r(87),S=r(49),N=r(372),P=r.n(N),T=r(376),E=p.a.forwardRef((function(e,t){var r=e.styles,a=e.row,n=e.columnIndex,c=(e.onUpdate,e.onSelect),i=e.options,s=Object(u.useState)(),p=Object(o.a)(s,2),d=p[0],b=p[1];return Object(l.jsx)(T.a,{styles:r,options:i,onChange:function(e,t){b(e),c(e,a.id,n)},getOptionLabel:function(e){return e.alias},getOptionValue:function(e){var t;return null===(t=e.id)||void 0===t?void 0:t.toString(10)},value:d,placeholder:"Cerca...",isSearchable:!0,isClearable:!0})}));var F={option:function(e,t){return Object(a.a)(Object(a.a)({},e),{},{backgroundColor:"white",color:"black","&:hover":{backgroundColor:"#64bd9c",color:"white"}})},input:function(e){return Object(a.a)(Object(a.a)({},e),{},{backgroundColor:"#64bd9c"})},control:function(e){return Object(a.a)(Object(a.a)({},e),{},{height:"3vmin",marginBottom:"auto"})},singleValue:function(e){return Object(a.a)({},e)},valueContainer:function(e){return Object(a.a)(Object(a.a)({},e),{},{height:"100%",fontSize:"larger"})}},I=r(293),R=r(1301),B="center",L=function(e,t,r,n,c,i,s){return Object(l.jsx)(E,Object(a.a)(Object(a.a)({},e),{},{id:c,row:r,rowIndex:n,columnIndex:c,value:t,onSelect:i,options:s,styles:F}))},_={align:function(){return B},headerStyle:function(e,t){return{width:"7,5%"}},editor:{type:N.Type.CHECKBOX,value:"".concat("Si",":").concat("No")},formatter:function(e,t,r,a){return Object(l.jsx)(I.a,{toggle:!0,className:"mb-2",children:Object(l.jsx)(R.a,{variant:e?"success":"danger",checked:e,value:"1",type:"checkbox",children:e?"Pagato":"Non Pagato"})})}},M=function(e,t,r){return[{dataField:"id",text:"ID",editable:!1,hidden:!0,align:function(){return B}},{dataField:"rowNumber",text:"ID",editable:!1,align:function(){return B}},{dataField:"player1.alias",text:r.player1,align:function(){return B},editorRenderer:function(r,a,n,c,i,s){return L(r,a,n,i,s,e,t)},headerStyle:function(e,t){return{width:"20%"}}},{dataField:"player2.alias",text:r.player2,align:function(){return B},editorRenderer:function(r,a,n,c,i,s){return L(r,a,n,i,s,e,t)},headerStyle:function(e,t){return{width:"20%"}}},{dataField:"alias",text:r.alias,headerStyle:function(e,t){return{width:"25%"}}},{dataField:"stage1Name",text:r.stage1,align:function(){return B},headerStyle:function(e,t){return{width:"10%"}},editor:{type:N.Type.SELECT,options:"abcdefghijklmnopqrstuvwxyz".toUpperCase().split("").map((function(e){return{value:e,label:e}}))}},Object(a.a)({dataField:"paid1",text:"Pagato 1"},_),Object(a.a)({dataField:"paid2",text:"Pagato 2"},_)]},q=(r(1302),r(333)),U=r.n(q),A=r(97),z=r(75),D=r(150),J=r(11),H=r(356),K=r(58),V=r(105),G=r(89),X=r(355),Y=r(50),Q={message:"",onClick:function(){return console.log("")},show:!1,title:""};t.default=Object(O.i)((function(){var e=Object(O.g)(),t=Object(y.c)(),r=Object(w.a)(["common","pair"]).t,c=Object(y.d)(z.a.isAdmin),p=Object(y.d)(D.a.getTournament),h=Object(u.useState)({state:!1,message:r(X.b)}),v=Object(o.a)(h,2),N=v[0],T=v[1],E=Object(u.useState)(Q),F=Object(o.a)(E,2),I=F[0],R=F[1],B=Object(u.useState)({rows:[],players:[]}),L=Object(o.a)(B,2),_=L[0],q=L[1],W=Object(u.useState)([]),Z=Object(o.a)(W,2),$=Z[0],ee=Z[1],te=Object(u.useState)(0),re=Object(o.a)(te,2),ae=re[0],ne=re[1],ce=Object(u.useState)(0),ie=Object(o.a)(ce,2),se=ie[0],oe=ie[1];function le(e){T({state:!1,message:e}),x.b.error(e,{autoClose:1e4})}function ue(e){T({state:!1,message:e}),x.b.success(e)}function pe(e){return de.apply(this,arguments)}function de(){return(de=Object(s.a)(i.a.mark((function e(t){var c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,T({state:!0,message:r(X.b)}),c=Object(Y.getEmptyPair)("",p.id||0),e.next=5,Object(V.d)({pair:c});case 5:s=e.sent,c.id=s.pair.id,c.rowNumber=t||_.rows.length+1,q((function(e){return{rows:[c].concat(Object(n.a)(e.rows)).map((function(e,t){return Object(a.a)(Object(a.a)({},e),{},{rowNumber:t+1})})),players:e.players}})),ue(r("pair:success.add")),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),le(r("pair:error.19"));case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function be(){return(be=Object(s.a)(i.a.mark((function e(){var t,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=_.rows.length+1,r=0;case 2:if(!(r<se)){e.next=9;break}return e.next=5,pe(t);case 5:t++;case 6:r++,e.next=2;break;case 9:oe(0);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(){return(fe=Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,T({state:!0,message:r(X.b)}),t=[],$.forEach((function(e){e.player1&&e.player1.id&&t.push(e.player1),e.player2&&e.player2.id&&t.push(e.player2)})),e.next=6,Object(V.a)({pairsList:$});case 6:q((function(e){return{rows:e.rows.filter((function(e){return!$.find((function(t){return t.id===e.id}))})),players:t?[].concat(t,Object(n.a)(e.players)).sort((function(e,t){return e.alias.localeCompare(t.alias)})):e.players}})),ue(r("pair:success.".concat($.length>1?"deleteMulti":"deleteOne"))),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),le(r("pair:error.18"));case 13:ee([]);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function je(e,t){e&&e.id?t.id?q((function(r){return{rows:r.rows,players:[].concat(Object(n.a)(r.players.filter((function(e){return e.id!==t.id}))),[e]).sort((function(e,t){return e.alias.localeCompare(t.alias)}))}})):q((function(t){return{rows:t.rows,players:[].concat(Object(n.a)(t.players),[e]).sort((function(e,t){return e.alias.localeCompare(t.alias)}))}})):t.id&&q((function(e){return{rows:e.rows,players:e.players.filter((function(e){return e.id!==t.id}))}}))}Object(u.useEffect)((function(){p&&Object(s.a)(i.a.mark((function e(){var t,r,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(V.b)({tId:p.id});case 2:return t=e.sent,r=t.pairsList,e.next=6,Object(A.b)({addEmpty:!0,tId:p.id});case 6:a=e.sent,n=a.playersList,q({rows:r,players:n});case 9:case"end":return e.stop()}}),e)})))()}),[p]);var me=function(){var e=Object(s.a)(i.a.mark((function e(t,a,n){var c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(_.rows.map(function(){var e=Object(s.a)(i.a.mark((function e(c){var s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.id!==a){e.next=12;break}if(s=c,1===n?t.id&&s.player2&&s.player2.id===t.id?(s.player1=Object(Y.getEmptyPlayer)(),le(r("pair:error.17"))):(je(s.player1,t),s.player1=t):t.id&&s.player1&&s.player1.id===t.id?(s.player2=Object(Y.getEmptyPlayer)(),le(r("pair:error.17"))):(je(s.player2,t),s.player2=t),!(!s.alias&&s.player1&&s.player1.id&&s.player2&&s.player2.id)){e.next=8;break}return e.next=6,Object(V.c)({player1Id:s.player1.id,player2Id:s.player2.id});case 6:o=e.sent,s.alias=o.code===G.a.OK&&o.alias?o.alias:"";case 8:return Object(V.f)({pair:s}),e.abrupt("return",s);case 12:return e.abrupt("return",c);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:c=e.sent,q((function(e){return{rows:c,players:e.players}}));case 4:case"end":return e.stop()}}),e)})));return function(t,r,a){return e.apply(this,arguments)}}(),he=function(){var a=Object(s.a)(i.a.mark((function a(){var n,s,o,l,u;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(p.id||(le("".concat(r("pair:error.16"),"...")),setTimeout((function(){return e.push("/")}),5e3)),!(_.rows.length<4)){a.next=4;break}return le(r("pair:error.15")),a.abrupt("return");case 4:if(0===(n=_.rows.filter((function(e){return!e.stage1Name||""===e.stage1Name})).map((function(e){return e.rowNumber}))).length){a.next=8;break}return le(r("pair:error.".concat(1===n.length?"13":"14"),{missingStage1Name:n})),a.abrupt("return");case 8:if(0===(s=_.rows.filter((function(e){return!e.player1||!e.player1.id||!e.player2||!e.player2.id})).map((function(e){return e.rowNumber}))).length){a.next=12;break}return le(r("pair:error.".concat(1===s.length?"11":"12"),{missingPairs:s})),a.abrupt("return");case 12:for(u in 3,o=[],l=_.rows.reduce((function(e,t){return t.stage1Name in e?e[t.stage1Name]++:e[t.stage1Name]=1,e}),{}))l[u]<=3&&o.push(u);if(!(o.length>0)){a.next=19;break}return le(r("pair:error.".concat(1===o.length?"9":"10"),{invalidStage:o,min:4})),a.abrupt("return");case 19:c&&p.progress<K.TournamentProgress.Stage1&&(p.progress=K.TournamentProgress.Stage1,t(J.f.update.request({tournament:p}))),t(J.b.fetch.request({tId:p.id,history:e}));case 21:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();var ge={mode:"checkbox",onSelect:function(e,t){return ee((function(r){var a=!!r.find((function(t){return t.id===e.id}));return t?a?r:[e].concat(Object(n.a)(r)):a?r.filter((function(t){return t.id!==e.id})):r})),!0},onSelectAll:function(e,t){return ee(e?t:[])},style:{backgroundColor:"#c8e6c9"},hideSelectColumn:!c||p.progress>K.TournamentProgress.PairsSelection},Oe=function(){var e=Object(s.a)(i.a.mark((function e(){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,T({state:!0,message:r(X.b)}),e.next=4,fetch("/api/v1/stage1",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({tId:p.id})});case 4:return n=e.sent,e.next=7,n.json();case 7:c&&t(J.f.update.request({tournament:Object(a.a)(Object(a.a)({},p),{},{progress:K.TournamentProgress.PairsSelection})})),ue(r("pair:success.delete")),R(Q),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),le(r("pair:error.8"));case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();function ye(){return(ye=Object(s.a)(i.a.mark((function e(){var t,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(ae){e.next=3;break}return le(r("pair:error.6")),e.abrupt("return");case 3:if(!(p.progress>K.TournamentProgress.PairsSelection)){e.next=6;break}return le(r("pair:error.5")),e.abrupt("return");case 6:T({state:!0,message:r(X.b)}),t="abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),a=0,n=_.rows.map((function(e){return a===ae&&(a=0),e.stage1Name=t[a],a++,Object(V.d)({pair:e}),e})),ue(r("pair:success.stage1Name")),q((function(e){return{rows:n,players:e.players}}));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var xe,ve=Math.floor(Math.floor((_.players.length-1)/2)-(0===_.rows.length?0:_.rows.reduce((function(e,t){var r,a;return!t.player1&&!t.player2||!(null===(r=t.player1)||void 0===r?void 0:r.id)&&!(null===(a=t.player2)||void 0===a?void 0:a.id)?e+1:t.player1&&t.player1.id&&t.player2&&t.player2.id?e:e+.5}),0))),we=$.length<=0||p.progress>K.TournamentProgress.PairsSelection,ke=Object(l.jsxs)(d.a,{children:[Object(l.jsx)(d.a.Prepend,{children:Object(l.jsx)(d.a.Text,{children:r("pair:stage1.set")})}),Object(l.jsx)(b.a,{placeholder:_.rows.length<4?r("pair:error.3"):r("pair:error.4",{max:Math.floor(_.rows.length/4)}),type:"number",step:1,min:0,max:Math.floor(_.rows.length/4),value:0!==ae?ae:void 0,onChange:function(e){return ne(Number(e.currentTarget.value))},disabled:_.rows.length<4||p.progress===K.TournamentProgress.Stage1||p.progress===K.TournamentProgress.Stage2}),Object(l.jsx)(d.a.Append,{children:Object(l.jsx)(f.a,{variant:"primary",onClick:function(){return ye.apply(this,arguments)},disabled:!ae||ae>Math.floor(_.rows.length/4)||_.rows.length<4,children:r("common:exec")})})]}),Ce=Object(l.jsxs)(d.a,{children:[Object(l.jsx)(d.a.Prepend,{children:Object(l.jsx)(d.a.Text,{children:r("pair:add.multi")})}),Object(l.jsx)(b.a,{disabled:ve<=0,type:"number",step:1,min:1,max:ve,placeholder:ve<=0?r("pair:error.1"):r("pair:error.2",{max:ve}),onChange:function(e){return oe(Number(e.currentTarget.value))},value:se||""}),Object(l.jsxs)(d.a.Append,{children:[Object(l.jsx)(f.a,{variant:"primary",onClick:function(e){return oe(ve)},disabled:se>ve,children:r("common:max")}),Object(l.jsx)(f.a,{variant:"primary",onClick:function(){return be.apply(this,arguments)},disabled:!se||se>ve,children:r("common:exec")})]})]}),Se=Object(l.jsxs)("div",{className:U.a.toolsBarContainer,"data-cy":"pair-toolbar",children:[Object(l.jsxs)(j.a,{className:U.a.toolsBar,children:[Object(l.jsx)(m.a,{children:Object(l.jsxs)(f.a,{variant:"secondary",className:"float-left align-middle",onClick:function(){e.push("/")},children:[Object(l.jsx)(S.f,{})," ",r("common:route.home")]})}),p.progress>K.TournamentProgress.PairsSelection?null:Object(l.jsx)(m.a,{children:Object(l.jsxs)(f.a,{variant:"success",className:"align-middle",onClick:function(){return pe()},disabled:ve<=0||!c,children:[Object(l.jsx)(S.k,{})," ",r("pair:add.one")]})}),p.progress>K.TournamentProgress.PairsSelection?null:Object(l.jsx)(m.a,{children:Object(l.jsxs)(f.a,{variant:"danger",className:"align-middle",onClick:function(){return fe.apply(this,arguments)},disabled:we||!c,children:[Object(l.jsx)(S.q,{})," ",1===$.length?r("pair:delete.one"):r("pair:delete.multi")]})}),p.progress!==K.TournamentProgress.Stage1?null:Object(l.jsx)(m.a,{children:Object(l.jsx)(f.a,{variant:"danger",className:"align-middle",onClick:function(){p.progress>K.TournamentProgress.Stage1?le(r("pair:error.7")):R({message:"".concat(r("pair:stage1.resetConfirm")," ?"),onClick:function(){return Oe()},onHide:function(){return R(Q)},show:!0,title:r("pair:stage1.reset")})},disabled:!c,children:r("stage1:reset")})}),Object(l.jsx)(m.a,{children:Object(l.jsxs)(f.a,{variant:"outline-warning",className:"default-color-white float-right align-middle",onClick:he,disabled:!c,children:[Object(l.jsxs)("b",{children:[r("common:continue")," "]})," ",Object(l.jsx)(S.l,{})]})})]}),c&&p.progress<=K.TournamentProgress.PairsSelection?Object(l.jsxs)(l.Fragment,{children:[ke,Ce]}):null]}),Ne={player1:r("pair:field.player1"),player2:r("pair:field.player2"),alias:r("pair:field.alias"),stage1:r("pair:field.stage1"),paid1:r("pair:field.paid1"),paid2:r("pair:field.paid2")};return Object(l.jsxs)("div",{children:[Object(l.jsx)(C.YesNoModal,{message:I.message,title:I.title,onClick:I.onClick,show:I.show}),Object(l.jsx)(C.LoadingModal,{show:N.state,message:N.message}),Object(l.jsxs)(m.a,{children:[Se,Object(l.jsx)(j.a,{children:Object(l.jsx)(m.a,{"data-cy":"pair-table",children:_.rows&&_.players?Object(l.jsx)(g.a,{"data-cy":"pair-table",bootstrap4:!0,keyField:"id",data:_.rows,columns:M(me,_.players,Ne),cellEdit:(xe=c&&p.progress<K.TournamentProgress.Stage1,P()({mode:xe?"click":"none",blurToSave:!0,afterSaveCell:function(e,t,r,a){"player1.alias"!==a.dataField&&"player2.alias"!==a.dataField&&Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/pair",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});case 2:return t=e.sent,e.next=5,t.json();case 5:case"end":return e.stop()}}),e)})))()}})),selectRow:ge,noDataIndication:function(){return Object(l.jsx)(k,{isEditable:c||!1,addRow:function(){return pe()},optionsLength:_.players.length})},caption:Object(l.jsx)(H.a,{}),headerClasses:"default-background default-color-yellow",striped:!0,hover:!0}):null})})]})]})}))},333:function(e,t,r){e.exports={functionsList:"common_functionsList__3B3UB",toolsBarContainer:"common_toolsBarContainer__1nanA",toolsBarRow:"common_toolsBarRow__r8q12"}},355:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return c}));var a="auth:password.password",n="common:loading",c="tournament:select"},356:function(e,t,r){"use strict";var a=r(2),n=(r(0),r(74)),c=r(40),i=r(195),s=r(149),o=r(294),l=r(102),u=r(298);t.a=function(){var e=Object(c.d)(n.f.getTournament),t=Object(u.a)(["tournament"]).t;return Object(a.jsx)(i.a,{children:Object(a.jsx)(s.a,{children:Object(a.jsx)("h2",{className:"float-left",children:Object(a.jsxs)(o.a,{variant:"info",children:[Object(a.jsxs)("span",{children:[t("tournament:".concat(e.public?"public":"private","_tournament"))," "]}),Object(a.jsxs)("strong",{children:['"',e.name.toUpperCase(),'"']}),Object(a.jsx)("span",{children:Object(a.jsxs)("i",{children:[" - ".concat(Object(l.a)(e.date)," "),Object(a.jsxs)("small",{children:[" @ ",t("tournament:progress.".concat(e.progress))]}),null]})})]})})})})}}}]);
//# sourceMappingURL=7.6c282339.chunk.js.map