(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[10],{1299:function(e,t,n){"use strict";var a=n(8),r=n(3),c=n(12),o=n.n(c),l=n(0),s=n.n(l),i=n(32),u=n(16),d=Object(i.a)("input-group-append"),b=Object(i.a)("input-group-prepend"),j=Object(i.a)("input-group-text",{Component:"span"}),p=s.a.forwardRef((function(e,t){var n=e.bsPrefix,c=e.size,l=e.className,i=e.as,d=void 0===i?"div":i,b=Object(a.a)(e,["bsPrefix","size","className","as"]);return n=Object(u.a)(n,"input-group"),s.a.createElement(d,Object(r.a)({ref:t},b,{className:o()(l,n,c&&n+"-"+c)}))}));p.displayName="InputGroup";var O=Object(r.a)({},p,{Text:j,Radio:function(e){return s.a.createElement(j,null,s.a.createElement("input",Object(r.a)({type:"radio"},e)))},Checkbox:function(e){return s.a.createElement(j,null,s.a.createElement("input",Object(r.a)({type:"checkbox"},e)))},Append:d,Prepend:b});t.a=O},1312:function(e,t,n){"use strict";n.r(t);var a=n(14),r=n(4),c=n.n(r),o=n(22),l=n(303),s=n(2),i=n(0),u=n.n(i),d=n(25),b=n(38),j=n(9),p=n(515),O=n.n(p),f=n(66),m=n(1299),h=n(324),x=n(105),v=n(49),g=n(61),y=function(e){var t,n,a,r=e.onClick,c=e.name,o=e.isWinner,l=e.span,i=e.rowIndex,u=e.colIndex,d=e.pair,j=e.buttonDisabled,p=e.isLast,f=e.renderCustomComponent,y=Object(b.d)(g.a.isAdmin);return a=p?Object(s.jsx)(v.r,{size:"lg",color:"gold"}):o?Object(s.jsx)(v.c,{size:"lg",color:"green"}):Object(s.jsx)(v.a,{size:"1x",color:"red"}),Object(s.jsx)("td",{rowSpan:l,className:i%2===0?[O.a.cell,O.a.borderBottom].join(" "):O.a.cell,children:Object(s.jsxs)(m.a,{className:O.a.container,children:[Object(s.jsx)(m.a.Prepend,{className:O.a.prepend,children:Object(s.jsx)(m.a.Text,{children:i})}),y&&f?f(i,u,p,d):Object(s.jsx)(h.a,{placeholder:"Username"+u,value:d?"".concat(null===(t=d.player1)||void 0===t?void 0:t.name," - ").concat(null===(n=d.player2)||void 0===n?void 0:n.name):c,"aria-label":"Username","aria-describedby":"Username",readOnly:u>1||!y,size:"lg"}),y?Object(s.jsx)(m.a.Append,{children:Object(s.jsx)(x.a,{disabled:!y||j,className:O.a.append,onClick:function(e){return r(e,i,u,!o)},children:a})}):null]})})},_=n(148),C=n(377),w=n(424),N=n(50),I=u.a.forwardRef((function(e,t){var n=e.getOptionLabel,a=e.styles,r=e.rowIndex,c=e.options,o=e.onChange,u=e.defaultValue,d=e.tournamentId,b=Object(i.useState)(),j=Object(l.a)(b,2),p=j[0],O=j[1];return Object(s.jsx)(C.a,{defaultValue:u,components:w.f,styles:a,options:c,onChange:function(e,t){var n=e||Object(N.getEmptyPair)("-",d);O(n),o&&o(n,r,t)},getOptionLabel:n,value:p,placeholder:"Cerca...",isSearchable:!0,isClearable:!0})})),S=function(e){var t=e.onClick,n=e.elements,a=e.pairsSelect,r=e.rowNumber,c=void 0===r?64:r,o=e.onSelectPair,l=Object(b.d)(g.f.getTournament),i=Object(_.b)(2,c)+1,u=function(e,t,n,a,r,c,o){for(var l=[],i=new Array(a).fill(0),u=function(e){for(var t=[NaN,Object(f.b)(2,e)+1],n=1,a=1;a<=e;a++)if(!t[a]){t[a]=n;for(var r=Math.pow(2,n),c=1;a+r*c<e+1;c++)t[a+r*c]=n;n++}return t}(n),d=function(t,n,a,r){var l={container:function(e){return Object(j.a)(Object(j.a)({},e),{},{flex:"1 1 auto"})},option:function(e){return Object(j.a)(Object(j.a)({},e),{},{zIndex:6})},menuList:function(e){return Object(j.a)(Object(j.a)({},e),{},{flex:"1 1 auto",zIndex:5,height:"auto"})}},i=function(e){var t,n;return e.id?"".concat(e.placement).concat(e.stage1Name," : ").concat(e.alias?e.alias:"".concat(null===(t=e.player1)||void 0===t?void 0:t.name," - ").concat(null===(n=e.player2)||void 0===n?void 0:n.name," ")):"-"};return console.log("Render stage2 select :",t,n,a,r),Object(s.jsx)(I,{tournamentId:e,styles:l,defaultValue:r,options:c,rowIndex:t,onChange:o,getOptionLabel:i})},b=1;b<=n;b++){for(var p=[],m=0;m<u[b];m++){i[m]+=1;var h=t[m]?t[m][i[m]-1]:{name:"",isWinner:!1,matchId:0,cellRowIndex:0,cellColIndex:0,parentId:0};p.push(Object(s.jsx)(y,Object(j.a)({renderCustomComponent:0===m?d:void 0,span:Math.pow(2,m),rowIndex:i[m],colIndex:m+1,onClick:r,buttonDisabled:k(i[m],m,t),isLast:1===t[m].length},h),"cell : ".concat(m,"-").concat(i[m]-1)))}l.push(Object(s.jsx)("tr",{className:O.a.row,children:p},"row : ".concat(b)))}return l}(l.id,n,c,i,t,a,o),d=function(e){for(var t=[],n=1;n<=e;n++)t.push(Object(s.jsx)("td",{className:O.a.headerCell,style:{width:"".concat(100/e,"%")},children:Object(s.jsx)("strong",{children:"Stage-".concat(n)})},"header ".concat(n)));return t}(i);return Object(s.jsxs)("table",{className:O.a.table,children:[Object(s.jsx)("thead",{children:Object(s.jsx)("tr",{children:d})}),Object(s.jsx)("tbody",{className:O.a.body,children:u})]})};var k=function(e,t,n){return n[t]&&1===n[t].length||(e%2!==0?!n[t][e-1].pair||n[t][e]&&!n[t][e].pair:!n[t][e-1].pair||n[t][e-2]&&!n[t][e-2].pair)},L=n(146),B=n(196),z=n(336),P=n.n(z),E=n(11),R=n(74),A=n(358),T=n(107),q=n(87);t.default=function(){var e=Object(d.g)(),t=Object(b.c)(),n=Object(b.d)(g.e.getCells),r=Object(b.d)(g.e.getCount),u=Object(b.d)(g.e.isLoading),j=Object(b.d)(g.f.getTournament),p=Object(i.useState)(),O=Object(l.a)(p,2),f=O[0],m=O[1];Object(i.useEffect)((function(){Object(o.a)(c.a.mark((function e(){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(E.e.setLoading(!0)),e.next=3,Object(T.b)({tournamentId:j.id});case 3:n=e.sent,q.b.includes(n.code)&&m(n.pairs),t(E.e.setLoading(!1));case 6:case"end":return e.stop()}}),e)})))()}),[j.id]);return n&&f&&r?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(L.a,{className:P.a.toolsBarContainer,children:Object(s.jsx)(B.a,{className:P.a.toolsBarRow,children:Object(s.jsx)(L.a,{children:Object(s.jsxs)(x.a,{variant:"secondary",className:"float-left",onClick:function(){e.push("/stage1")},children:[Object(s.jsx)(v.h,{})," Indietro"]})})})}),Object(s.jsx)(A.a,{}),Object(s.jsx)(S,{pairsSelect:f,onClick:function(e,r,c,o){var l=Object(a.a)(n),s=null,i=null,u=null;r%2!==0?(s=l[c-1][r-1],i=l[c-1][r]):(s=l[c-1][r-1],i=l[c-1][r-2]),u=l[c][s.matchId-1],console.log(" onClick : ",s,i,u),s.isWinner=o,i.isWinner=!o,u&&(u.pair=o?s.pair:i.pair),t(E.e.updateCell.request({cells:[s,i,u]})),t(E.e.setCells(l))},rowNumber:r,elements:n,onSelectPair:function(e,r,c){if(console.log(" onSelectPair : ",e,r),f){var o=Object(a.a)(n),l=e,s=o[0][r-1].pair,i=Object(a.a)(f);l&&l.id&&(i=i.filter((function(e){return e.id!==l.id}))),s&&s.id&&(i=[].concat(Object(a.a)(i),[s])),m(i),o[0][r-1].pair=l,console.log(" onSelectPair : ",o[0][r-1]),t(E.e.setCells(o)),t(E.e.updateCell.request({cells:[o[0][r-1]]}))}}})]}):Object(s.jsx)(R.LoadingModal,{show:u})}},303:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(142);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(s){r=!0,c=s}finally{try{a||null==l.return||l.return()}finally{if(r)throw c}}return n}}(e,t)||Object(a.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},336:function(e,t,n){e.exports={functionsList:"common_functionsList__3B3UB",toolsBarContainer:"common_toolsBarContainer__1nanA",toolsBarRow:"common_toolsBarRow__r8q12"}},358:function(e,t,n){"use strict";var a=n(2),r=(n(0),n(61)),c=n(38),o=n(196),l=n(146),s=n(296),i=n(100),u=n(300);t.a=function(){var e=Object(c.d)(r.f.getTournament),t=Object(u.a)(["tournament"]).t;return Object(a.jsx)(o.a,{children:Object(a.jsx)(l.a,{children:Object(a.jsx)("h2",{className:"float-left",children:Object(a.jsxs)(s.a,{variant:"info",children:[Object(a.jsxs)("span",{children:[t("tournament:".concat(e.public?"public":"private","_tournament"))," "]}),Object(a.jsxs)("strong",{children:['"',e.name.toUpperCase(),'"']}),Object(a.jsx)("span",{children:Object(a.jsxs)("i",{children:[" - ".concat(Object(i.a)(e.date)," "),Object(a.jsxs)("small",{children:[" @ ",t("tournament:progress.".concat(e.progress))]}),null]})})]})})})})}},515:function(e,t,n){e.exports={table:"style_table__2Kzbq",cell:"style_cell__1Tgmm",borderBottom:"style_borderBottom__2eMt1",headerCell:"style_headerCell__2Jwbq",container:"style_container__3mFJG",row:"style_row__3YvC9",prepend:"style_prepend__1aYFO",append:"style_append__1Z8QN",center:"style_center__3xWH5"}}}]);
//# sourceMappingURL=10.bfbf0177.chunk.js.map