import{o as s,d as o,e,t as r,i as f,c as $,l as g,g as h,z as M,A as H,F as p,h as b,f as k,G as v,n as S,p as I,m as z,j as w,w as x,q as T,Q as C,T as B,R as N,S as O}from"./vendor.28fd920d.js";import{_ as y}from"./index.c5a9c4d5.js";const Y={class:"h-full flex flex-col"},F={class:"py-4 px-8 bg-white shadow-xl"},L={class:"font-black text-2xl mb-2"},j={class:"text-sm text-gray-400"},A={class:"flex-grow m-4 p-4 bg-white rounded shadow-xl"},Tt={props:{title:{type:String,default:""},desc:{type:String,default:""}},setup(t){return(l,u)=>(s(),o("div",Y,[e("div",F,[e("h1",L,r(t.title),1),e("p",j,r(t.desc),1)]),e("div",A,[f(l.$slots,"default")])]))}};function D(t){if(!t)return"";t=typeof t=="number"?new Date(t):new Date(t.toString().replace(/-/g,"/"));const l=t.getFullYear(),u=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,_=t.getDate()<10?"0"+t.getDate():t.getDate(),a=t.getHours()<10?"0"+t.getHours():t.getHours(),n=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),c=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return`${l}-${u}-${_} ${a}:${n}:${c}`}function P(t){return t||(t=0),parseFloat(String(t)).toLocaleString("en-US")}const V=t=>D(t),q=t=>D(t).slice(0,10),E=t=>P(t);const d=t=>(M("data-v-2111688f"),t=t(),H(),t),W=d(()=>e("div",null,null,-1)),G=d(()=>e("div",null,null,-1)),Q=d(()=>e("div",null,null,-1)),R=d(()=>e("div",null,null,-1)),U=d(()=>e("div",null,null,-1)),J=d(()=>e("div",null,null,-1)),K=d(()=>e("div",null,null,-1)),X=d(()=>e("div",null,null,-1)),Z=d(()=>e("div",null,null,-1)),tt=d(()=>e("div",null,null,-1)),et=d(()=>e("div",null,null,-1)),st=d(()=>e("div",null,null,-1)),nt=[W,G,Q,R,U,J,K,X,Z,tt,et,st],ot={props:{mainColor:{type:String,default:"#f00"},size:{type:Number,default:80}},setup(t){const l=t,u=$(()=>({"--loadingColor":l.mainColor,"--loadingSize":`${l.size}px`,"--loadingScale":l.size/40}));return(_,a)=>(s(),o("div",{style:g(h(u)),class:"icon_loading"},nt,4))}};var lt=y(ot,[["__scopeId","data-v-2111688f"]]);const at={class:"table_wrapper"},it={class:"table_section"},ut={key:0},dt={class:"loading"},ct=["colspan"],rt={key:1},_t={key:2},pt={class:"empty"},ft=["colspan"],ht={props:{listTitles:{type:Array,default:()=>[],required:!0},listData:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},fixedHead:{type:Boolean,default:!1},maxHeight:{type:String,default:"initial"},emptyText:{type:String,default:"\u66AB\u7121\u8CC7\u6599"}},setup(t){const l=t,u=$(()=>({"--baseTableHeight":l.maxHeight}));return(_,a)=>(s(),o("div",{style:g(h(u)),class:S(["base_table",{fixed_head:t.fixedHead},{limit_height:t.maxHeight}])},[e("div",at,[e("table",it,[e("thead",null,[e("tr",null,[(s(!0),o(p,null,b(t.listTitles,(n,c)=>(s(),o("th",{key:c,style:g({width:n.width,minWidth:n.width,maxWidth:n.width})},r(n.label),5))),128))])]),t.loading?(s(),o("tbody",ut,[e("tr",dt,[e("td",{colspan:t.listTitles.length},[k(lt,{mainColor:"rgb(191, 219, 254)"})],8,ct)])])):t.listData&&t.listData.length>0?(s(),o("tbody",rt,[(s(!0),o(p,null,b(t.listData,(n,c)=>(s(),o("tr",{key:c},[(s(!0),o(p,null,b(t.listTitles,(i,m)=>(s(),o("td",{key:m},[i.type==="slot"?f(_.$slots,i.key,{key:0,thisData:n},void 0,!0):i.type==="thousand"?(s(),o(p,{key:1},[v(r(h(E)(n[i.key])),1)],64)):i.type==="date"?(s(),o(p,{key:2},[v(r(h(q)(n[i.key])),1)],64)):i.type==="time"?(s(),o(p,{key:3},[v(r(h(V)(n[i.key])),1)],64)):(s(),o(p,{key:4},[v(r(n[i.key]),1)],64))]))),128))]))),128))])):(s(),o("tbody",_t,[e("tr",pt,[e("td",{colspan:t.listTitles.length},r(t.emptyText),9,ft)])]))])])],6))}};var Ct=y(ht,[["__scopeId","data-v-290bc3df"]]);const mt={props:{duration:{type:Number,default:300},closeOut:{type:Boolean,default:!0},custom:{type:Boolean,default:!1},animation_mask:{type:String,default:"fade",validator(t){return["","fade"].includes(t)}},animation_popup:{type:String,default:"slide-down",validator(t){return["","slide-down","slide-left"].includes(t)}}},emits:["close"],setup(t,{emit:l}){const u=t;I(()=>{a.value=!0,document.body.style.overflow="hidden"});const _=i=>{u.closeOut&&n()},a=z(!1),n=()=>{a.value=!1,setTimeout(()=>{l("close"),document.body.style.overflow="initial"},u.duration)},c=$(()=>({"--popupDuration":`${u.duration/1e3}s`}));return(i,m)=>(s(),w(O,{to:"body"},[k(B,{name:t.animation_mask},{default:x(()=>[T(e("div",{class:"mask",style:g(h(c)),onClick:_},[k(B,{name:t.animation_popup},{default:x(()=>[T(e("div",{class:S(!t.custom&&"popup"),onClick:m[0]||(m[0]=N(()=>{},["stop"]))},[f(i.$slots,"default",{close:n},void 0,!0)],2),[[C,a.value]])]),_:3},8,["name"])],4),[[C,a.value]])]),_:3},8,["name"])]))}};var gt=y(mt,[["__scopeId","data-v-322da88e"]]);const vt={class:"popup_box"},yt={class:"title"},$t={class:"content"},bt=["onClick"],kt=["onClick"],xt={props:{title:{type:String,default:""},content:{type:String,default:""},duration:{type:Number,default:300},closeOut:{type:Boolean,default:!0},custom:{type:Boolean,default:!1},animation_mask:{type:String,default:"fade",validator(t){return["","fade"].includes(t)}},animation_popup:{type:String,default:"slide-down",validator(t){return["","slide-down","slide-left"].includes(t)}}},emits:["close","submit"],setup(t,{emit:l}){const u=a=>{l("submit",a)},_=()=>{l("close")};return(a,n)=>(s(),w(gt,{duration:t.duration,closeOut:t.closeOut,custom:t.custom,animation_mask:t.animation_mask,animation_popup:t.animation_popup,onClose:_},{default:x(({close:c})=>[e("div",vt,[f(a.$slots,"title",{},()=>[e("h1",yt,r(t.title),1)],!0),f(a.$slots,"content",{},()=>[e("h2",$t,r(t.content),1)],!0),f(a.$slots,"footer",{},()=>[e("button",{class:"btn btn_confirm",onClick:i=>u(c)},"\u78BA\u8A8D",8,bt),e("button",{class:"btn btn_cancel",onClick:c},"\u53D6\u6D88",8,kt)],!0)])]),_:3},8,["duration","closeOut","custom","animation_mask","animation_popup"]))}};var Bt=y(xt,[["__scopeId","data-v-78d0e2e7"]]);export{Ct as B,gt as M,Bt as P,Tt as _};