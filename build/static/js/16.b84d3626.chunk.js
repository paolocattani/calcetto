(this.webpackJsonpcalcetto=this.webpackJsonpcalcetto||[]).push([[16],{272:function(e,t,n){"use strict";n.d(t,"j",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return f})),n.d(t,"g",(function(){return m})),n.d(t,"i",(function(){return b})),n.d(t,"h",(function(){return g})),n.d(t,"d",(function(){return d})),n.d(t,"k",(function(){return p})),n.d(t,"b",(function(){return E})),n.d(t,"a",(function(){return h}));var r=n(0),a=n.n(r),o=n(273),c=n(125),l=function(e){var t=e.size,n=e.prefix,r=e.iconName,l=e.color;return a.a.createElement(o.a,{color:l,size:t,icon:Object(c.a)({prefix:n,iconName:r})})},i=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"far",iconName:"trash-alt"})},u=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"far",iconName:"save"})},s=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"arrow-alt-circle-right"})},f=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"arrow-alt-circle-left"})},m=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"times"})},b=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"toggle-on"})},g=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"toggle-off"})},d=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"plus"})},p=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"trophy"})},E=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"angle-double-right"})},h=function(e){var t=e.size,n=e.color;return a.a.createElement(l,{size:t,color:n,prefix:"fas",iconName:"ban"})}},377:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n(8),o=n.n(a),c=n(21),l=n(124),i=n(0),u=n.n(i),s=n(284),f=n(129),m=n(308),b=n(295),g=n(105),d=n(19),p=n(272),E=n(63);function h(e){return{id:null,name:e||"",ownerId:null,date:new Date,progress:E.a.New,public:!0,label:e||""}}var v=function(e){var t=e.innerProps;return u.a.createElement("span",Object.assign({style:z},t))},z={alignSelf:"stretch",backgroundColor:"green",marginBottom:8,marginTop:8,marginRight:10,width:1},j={width:"100%",margin:"auto",backgroundColor:"inherit",borderColor:"#ffc107",borderWidth:"3px",textAlign:"left"},O=n(106),w=n(107),x=n.n(w),y=n(35),C=n(20),N=n(41),S=n(95),k=function(e){var t=Object(d.g)(),n=Object(y.c)(),r=Object(i.useState)(""),a=Object(l.a)(r,2),s=a[0],m=a[1],p=Object(i.useState)(new Date),E=Object(l.a)(p,2),v=E[0],z=E[1],j=Object(i.useState)(!0),O=Object(l.a)(j,2),w=O[0],k=O[1],T=function(){var e=Object(c.a)(o.a.mark((function e(r){var a,c,l,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),s){e.next=4;break}return N.b.error("Inserire un nome per il torneo"),e.abrupt("return");case 4:return(a=h(s)).date=v,a.public=w,e.next=9,Object(S.b)({model:a});case 9:c=e.sent,l=c.isValid,i=c.errorMessage,l?(n(C.a.saveTournament.request({model:a})),t.push("/tournament")):N.b.error(i);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return u.a.createElement(b.a,{onSubmit:T},u.a.createElement(b.a.Row,null,u.a.createElement(f.a,{md:6},u.a.createElement(b.a.Group,{controlId:"formBasicEmail"},u.a.createElement(b.a.Label,null,"Nome"),u.a.createElement(b.a.Control,{type:"text",required:!0,placeholder:"Nome Torneo",maxLength:30,value:s,onChange:function(e){return m(e.currentTarget.value)}}))),u.a.createElement(f.a,{md:3},u.a.createElement(b.a.Group,null,u.a.createElement(b.a.Label,null,"Data"),u.a.createElement(b.a.Control,{as:function(){return u.a.createElement(x.a,{highlightDates:[new Date],locale:"it",selected:v,dateFormat:"dd/MM/yyyy",onChange:function(e){return z(e||new Date)}})}}))),u.a.createElement(f.a,{md:3},u.a.createElement(b.a.Group,{controlId:"visible"},u.a.createElement(b.a.Label,null,"Visibilit\xe0 "),u.a.createElement(b.a.Control,{as:"select",onChange:function(){return k(!w)}},u.a.createElement("option",null,"Pubblico"),u.a.createElement("option",null,"Privato"))))),u.a.createElement(b.a.Row,null,u.a.createElement(f.a,null,u.a.createElement(g.a,{type:"submit",size:"lg",variant:"outline-warning",className:"float-right default-color-white"},u.a.createElement("span",{style:{fontSize:"larger",fontWeight:"bolder"}},"Prosegui")))))},T=n(126),D=n(17),I=n(54),L=(t.default=Object(d.i)((function(){var e=Object(y.c)(),t=Object(d.g)(),n=Object(y.d)(I.a.getSession),r=Object(y.d)(T.a.getTournamentsList),a=Object(y.d)(T.a.getTournament),E=Object(i.useState)(!1),h=Object(l.a)(E,2),z=h[0],O=h[1];Object(i.useEffect)((function(){r&&0!==r.length||(console.log("useEffect: ",r),e(D.e.getTournaments.request({})))}),[e,r]);var w=function(){var r=Object(c.a)(o.a.mark((function r(c){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:c.preventDefault(),a?n.isAdmin?t.push("/tournament"):(e(D.a.getPairs.request({tId:a.id})),t.push("/stage1")):N.b.error("Errore, riprovare piu tardi...");case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),x=function(t){e(D.e.setTournament(null)),O(t)};return u.a.createElement(u.a.Fragment,null,u.a.createElement(f.a,{md:{span:"6",offset:"3"},sm:"12"},u.a.createElement(m.a,{style:j},u.a.createElement(m.a.Header,{as:"h2"},"Torneo"),u.a.createElement(m.a.Body,null,u.a.createElement(f.a,null,n.isAdmin&&z?u.a.createElement(k,null):u.a.createElement(b.a,{onSubmit:w},u.a.createElement("label",{htmlFor:"tournamentSelect"},"Selezione Torneo"),u.a.createElement(s.a,{id:"tournamentSelect",components:{IndicatorSeparator:v},styles:P,value:a,options:r,placeholder:"Cerca un torneo",isSearchable:!0,getOptionLabel:L,isClearable:!0,onChange:function(t){return e(D.e.setTournament(t))}}),u.a.createElement(g.a,{type:"submit",size:"lg",variant:"outline-warning",className:"float-right default-color-white",disabled:!a},u.a.createElement("span",{style:{fontSize:"larger",fontWeight:"bolder",padding:"1vw"}},"Prosegui"),u.a.createElement(p.e,{size:"lg"}))))),u.a.createElement(m.a.Footer,null,n.isAdmin?z?u.a.createElement(g.a,{type:"button",size:"lg",variant:"outline-warning",className:"float-left default-color-white",onClick:function(){return x(!1)}},"Seleziona un torneo"):u.a.createElement(g.a,{type:"button",size:"lg",variant:"outline-warning",className:"float-left default-color-white",onClick:function(){return x(!0)}},"Crea un nuovo torneo"):null))))})),function(e){var t=e.name,n=e.date,r=e.progress;return t+" - "+Object(O.b)(n)+"@"+Object(O.e)(r)}),P={option:function(e){return Object(r.a)(Object(r.a)({},e),{},{backgroundColor:"white",color:"black","&:hover":{backgroundColor:"#64bd9c",color:"white"}})},control:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"3vmin",marginBottom:"40px"})},singleValue:function(e){return Object(r.a)({},e)},valueContainer:function(e){return Object(r.a)(Object(r.a)({},e),{},{height:"100%",fontSize:"larger",alignItems:"center",justifyContent:"flex-start","&:active":{height:"100%",fontSize:"larger",justifyContent:"flex-start",alignItems:"center"}})}}}}]);
//# sourceMappingURL=16.b84d3626.chunk.js.map