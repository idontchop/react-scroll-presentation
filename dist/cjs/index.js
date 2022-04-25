"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("styled-components");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=r(e),n=r(t);const i=n.default.div`
    contain: paint;
`,o=n.default.div`
    overflow-y: scroll;
    overflow-x: hidden;
`,s=l.default.createContext({current:"",scroll:0,scrollHeight:0,height:0,setScrollToSlide:e=>{}}),c={hold:1,slideBy:20,direction:"bottom"},a=e=>("object"!=typeof e?e=c:Object.keys(c).forEach((t=>{e.hasOwnProperty(t)||(e[t]=c[t])})),[e]),d={empty:()=>[{},{}],fadeOut(e,t,r){let l={height:(r=a(r)).hold?`context${r.hold}`:"context1",position:"sticky",top:0},n={width:"100%",position:"absolute"},i=t/5;return"development"===process.env.NODE_ENV&&console.log("y:",e,"yFullView:",t),e>100?(n.zIndex="-9999",n.opacity="0"):e>i&&(n.opacity=""+(100-i-(e-i))/(100-i)),[l,n]},springIn(e,t,r){let l={position:"sticky",transition:`transform ${(r=a(r)).transitionSpeed?r.transitionSpeed:1}s ease,\n                opacity ${r.transitionSpeed?r.transitionSpeed:1}s ease`,top:0,overflow:"hidden",width:"100%"};return e<0-t+t/3?(l.transform="right"===r.direction?"translateX(15%)":"left"===r.direction?"translateX(-15%)":"translateY(15%)",l.opacity="0.1"):l.opacity="1",[{},l]},slideIn(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold?n.height="context"+(r.hold+1):n.height="children3",l.transform=e<0?"translateX(-100%)":e>25?"translateX(0%)":r.right?`translateX(${100-(e-0)/25*100}%)`:`translateX(${(e-0)/25*100-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},slideOut:(e,t,r)=>[{height:"slideOut"},{position:"slideOut"}],slideMe(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold&&(n.height="context"+(r.hold+1)),l.transform=e<t?"translateX(-100%)":e>100?"translateX(0%)":r.right?`translateX(${100-(e-t)/(100-t)*200}%)`:`translateX(${(e-t)/(100-t)*200-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},header(e,t,r){r=a(r);return[{zIndex:11,height:"1px",position:"sticky",top:0},{zIndex:11,width:"100%",position:"absolute"}]}},u={numChildren:1,scrollViewPort:!1,scrollSpeed:1},h=(e,t,r,l,n)=>{let i=(100-t-(n?0:t))/l;return[i,e<0?-1:e>r&&!n?l+1:Math.floor(e/i),e<0||e>r&&!n?0:(e-t)%i/i*100]},p=e=>e.scrollViewPort?`context${e.scrollSpeed}`:`children${e.scrollSpeed}`,f=(e,t,r)=>{let l=100-t>t?100-t:t;return void 0!==r&&r.numChildren||(console.error("ERROR: ","Children Style Method didn't receive numChildren."),r=u),Object.keys(u).forEach((e=>{r.hasOwnProperty(e)||(r[e]=u[e])})),[l,r]},g=(e,t,r)=>{let l={};return r.background&&(l.backgroundImage=`url(${r.background})`,l.backgroundPosition="center",l.backgroundSize="contain",l.backgroundRepeat="no-repeat"),r.fullScreen&&(l.height="100vh",l.width="100%",e>0&&(l.opacity="0.8")),l},y={empty:()=>[{},{},[]],transition(e,t,r){let[l,n]=f(0,t,r),[i,o,s]=h(e,t,l,n.numChildren,n.toEnd),c=new Array(n.numChildren).fill({}).map(((e,t)=>{let r={top:0,position:"absolute",opacity:"0",transition:`opacity ${n.transitionSpeed?n.transitionSpeed:1}s`};return t===o&&(r.opacity="1"),r})),a=g(e,0,n);return[{height:p(n),position:"relative"},Object.assign(Object.assign({},a),{position:"sticky",overflow:"visible",top:0}),c]},alternateSlideIn(e,t,r){let[l,n]=f(0,t,r),[i,o,s]=h(e,t,l,n.numChildren,n.toEnd),c=new Array(n.numChildren).fill({}).map(((r,l)=>{let i={top:0,transition:e<0-t?"":`transform ${n.transitionSpeed?n.transitionSpeed:1}s`};return l>o&&(i.transform="translateX(-100%)"),n.staticFirstChild&&0===l&&(delete i.transform,delete i.transition),i})),a=g(e,0,n);return[{height:p(n),position:"relative"},Object.assign(Object.assign({},a),{WebkitPosition:"sticky",position:"sticky",overflow:"visible",top:0}),c]},revealSlideIn(e,t,r){let[l,n]=f(0,t,r);return[{height:"context1",position:"relative"},{position:"sticky",overflow:"visible",top:0},new Array(n.numChildren).fill({}).map(((t,r)=>{let l={transform:"translateX(-100%)"};return e>=0&&(l.transition=`transform ${1+r/10}s`,l.transform="translateX(-100%)"),l}))]}};const m=e=>{var t,r;if((null===(r=null===(t=e.props)||void 0===t?void 0:t.style)||void 0===r?void 0:r.position)&&"sticky"===e.props.style.position){let t=
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function(e,t){var r={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(r[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(l=Object.getOwnPropertySymbols(e);n<l.length;n++)t.indexOf(l[n])<0&&Object.prototype.propertyIsEnumerable.call(e,l[n])&&(r[l[n]]=e[l[n]])}return r}(e.props.style,["position"]),r=n.default((({className:r})=>l.default.cloneElement(e,{style:t,className:e.props.className?r+e.props.className:r})))`    position: -webkit-sticky;
            position: -moz-sticky;
            position: -o-sticky;
            position: -ms-sticky;
            position: sticky;`;return l.default.createElement(r,null)}return e};exports.ConfigurableSlide=t=>{const r=e.useRef(null),n=e.useRef(null),[i,o]=e.useState(0),[c,a]=e.useState(0),u=l.default.useContext(s),[h,p]=e.useState({}),[f,g]=e.useState({}),[v,S]=e.useState([]),b=e=>{if(!e)return"100%";let[t,l]=e.split(/(context|children)(\d)$/).filter(Boolean);if(["context","children"].includes(t)){let e=(e=>{let t=0;if(e.current)for(let r=0;r<e.current.children.length;r++)t+=e.current.children.item(r).clientHeight;return t})(r);return"context"===t?u.height?u.height*parseInt(l)+"px":"100%":r.current?e*parseInt(l)+"px":"100%"}return e};return e.useEffect((()=>{if(n.current&&void 0!==t.startScroll){let e=u.scroll-(n.current.offsetTop-u.height);"development"===process.env.NODE_ENV&&console.log(e,[(u.scroll-t.startScroll)/n.current.scrollHeight*100,u.height/n.current.scrollHeight*100],e/(n.current.clientHeight+u.height)*100,u.scroll,t.startScroll,n.current.scrollHeight),void 0!==t.startScroll?o((u.scroll-t.startScroll)/n.current.scrollHeight*100):o(0),a(u.height<=n.current.scrollHeight?u.height/n.current.scrollHeight*100:0)}}),[u.scroll,u.height]),e.useEffect((()=>{let[e,r]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(d).includes(e))),r=d.empty();return t.length>0&&(r=t.map((t=>d[t](i,c,e[t]))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);e.height=e.height?b(e.height):"100%";let[l,n,o]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(y).includes(e))),r=y.empty(),l=e.children&&Array.isArray(e.children)?e.children.length:1;return t.length>0&&(r=t.map((t=>y[t](i,c,Object.assign({numChildren:l},e[t])))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);l.height&&(l.height=b(l.height)),p(Object.assign(e,l)),g(Object.assign(r,n)),S(o)}),[i,c]),l.default.createElement("div",{ref:n,style:h},m(l.default.createElement("div",{ref:r,style:f},t.header&&l.default.createElement("div",{style:{position:"sticky",top:0,border:0,padding:0,margin:0}},t.header),l.default.Children.map(t.children,((e,t)=>{let r=t<v.length?v[t]:{};return l.default.createElement("div",{style:r},void 0!==e?l.default.cloneElement(e):void 0)})))))},exports.HelloWorld=t=>{const r=e.useRef(null),n=l.default.useContext(s),[i,o]=e.useState(0);return window.addEventListener("scroll",(e=>{})),e.useEffect((()=>{r&&r.current&&o(r.current.scrollTop)}),[]),l.default.createElement("div",{style:{height:t.small?"100px":"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}},l.default.createElement("p",null,t.title?t.title:n.current?n.current:"unknown title"),l.default.createElement("p",{ref:r,style:{textAlign:"center",fontSize:t.small?"1em":"5vw",margin:"auto"}},t.children?t.children:"Hello World, react-scroll-presentation"))},exports.Presentation=t=>{const[r,n]=e.useState(0),c=e.useRef(new Array),a=e.useRef(),d=e.useRef(),[u,h]=e.useState(-1),[p,f]=e.useState(!1),[g,y]=e.useState([]),[m,v]=e.useState([]),[S,b]=e.useState(""),E=(e,r)=>{e=e<0?0:e>=m.length?m.length-1:e;let l={left:0,top:m[e],behavior:"auto"};t.fullScreen?window.scrollTo(0,m[e]):d.current.scrollTo(l)},w=(e,r)=>{var l;if("number"==typeof e)e<0||e>=m.length?console.error("setScrollToSlide received slide out of bounds",0):E(e);else{let r=0;for(;r<t.children.length&&(!(null===(l=t.children[r].props)||void 0===l?void 0:l.title)||t.children[r].props.title!==e);r++);r===t.children.length?console.error("setScrollToSlide received unknown title"):E(r)}};return e.useEffect((()=>{for(let e=0;e<m.length;e++)u>=m[e]&&(e===m.length-1||u<m[e+1])&&b(t.children[e].props.title?t.children[e].props.title:e);if(t.fullScreen){const e=e=>{h(window.scrollY),f(window.scrollY!==u)};return document.addEventListener("scroll",e),()=>document.removeEventListener("scroll",e)}if(a.current){const e=e=>{h(d.current.scrollTop),f(d.current.scrollY!==u)};return d.current.addEventListener("scroll",e),()=>d.current.addEventListener("scroll",e)}}),[u]),e.useEffect((()=>{if(Array.isArray(t.children))y(t.children.map(((e,t)=>l.default.cloneElement(e,{startScroll:m[t],endScroll:m[t+1],ref:c.current[t]}))));else if(t.children){let e=[l.default.cloneElement(t.children,{startScroll:0,ref:c.current[0]})];y(e)}}),[t,m]),e.useEffect((()=>{}),[c]),e.useEffect((()=>{var e;let t=[0];if(null===(e=a.current)||void 0===e?void 0:e.children.length){let e=0;for(let r=0;r<a.current.children.length;r++){let l=a.current.children.item(r).scrollHeight;e+=l,r<a.current.children.length-1&&(t[r+1]=0===r?l:t[r]+l)}n(e),v((e=>e.length===t.length&&e.every(((e,r)=>e===t[r]))?e:t))}}),[g,u]),e.useEffect((()=>{let e=require("../../package.json");console.log("DEVELOPMENT: ","react-scroll-presentation",e.version),console.log(a.current.children),console.log(t.children,l.default.isValidElement(t.children[0]),t.children[0].props)}),[]),t.fullScreen?l.default.createElement(i,{fullScreen:!0,ref:a},l.default.createElement(s.Provider,{value:{scroll:u,setScrollToSlide:e=>w(e),current:S,scrollHeight:r-window.innerHeight,height:window.innerHeight}},g)):l.default.createElement(o,{ref:d,className:t.className?t.className:""},l.default.createElement(i,{style:{height:r},ref:a},l.default.createElement(s.Provider,{value:{scroll:u,setScrollToSlide:e=>w(e),current:S,scrollHeight:r-d.current?d.current.clientHeight:0,height:d.current?d.current.clientHeight:0}},g)))},exports.PresentationContext=s;
//# sourceMappingURL=index.js.map
