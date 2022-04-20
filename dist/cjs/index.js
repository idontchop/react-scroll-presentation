"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("styled-components");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=r(e),n=r(t);const o=n.default.div`
    contain: paint;
`,i=n.default.div`
    overflow-y: scroll;
    overflow-x: hidden;
`,s=l.default.createContext({current:"",scroll:0,scrollHeight:0,height:0,setScrollToSlide:e=>{}}),c={hold:1,slideBy:20},d=e=>("object"!=typeof e?e=c:Object.keys(c).forEach((t=>{e.hasOwnProperty(t)||(e[t]=c[t])})),[e]),a={empty:()=>[{},{}],fadeOut(e,t,r){let l={height:(r=d(r)).hold?`context${r.hold}`:"context1",position:"sticky",top:0,border:"2px solid green"},n={width:"100%",position:"absolute",border:"1px solid yellow"},o=t/5;return console.log("y:",e,"yFullView:",t),e>100?(n.zIndex="-9999",n.opacity="0"):e>o&&(n.opacity=""+(100-o-(e-o))/(100-o)),[l,n]},slideIn(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold?n.height="context"+(r.hold+1):n.height="children3",l.transform=e<0?"translateX(-100%)":e>25?"translateX(0%)":r.right?`translateX(${100-(e-0)/25*100}%)`:`translateX(${(e-0)/25*100-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},slideOut:(e,t,r)=>[{height:"slideOut"},{position:"slideOut"}],slideMe(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold&&(n.height="context"+(r.hold+1)),l.transform=e<t?"translateX(-100%)":e>100?"translateX(0%)":r.right?`translateX(${100-(e-t)/(100-t)*200}%)`:`translateX(${(e-t)/(100-t)*200-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},header(e,t,r){r=d(r);return[{height:"1px",position:"sticky",top:0,border:"2px solid green"},{width:"100%",position:"absolute",border:"1px solid yellow"}]}},u={numChildren:1,scrollViewPort:!1,scrollSpeed:1},h=(e,t,r,l,n)=>{let o=(100-t-(n?0:t))/l;return[o,e<0?-1:e>r&&!n?l+1:Math.floor(e/o),e<0||e>r&&!n?0:(e-t)%o/o*100]},f=e=>e.scrollViewPort?`context${e.scrollSpeed}`:`children${e.scrollSpeed}`,p=(e,t,r)=>{let l=100-t>t?100-t:t;return void 0!==r&&r.numChildren||(console.error("ERROR: ","Children Style Method didn't receive numChildren."),r=u),Object.keys(u).forEach((e=>{r.hasOwnProperty(e)||(r[e]=u[e])})),[l,r]},g={empty:()=>[{},{},[]],transition(e,t,r){let[l,n]=p(0,t,r),[o,i,s]=h(e,t,l,n.numChildren,n.toEnd),c=new Array(n.numChildren).fill({}).map(((e,t)=>{let r={top:0,position:"absolute",opacity:"0",transition:`opacity ${n.transitionSpeed?n.transitionSpeed:1}s`};return t===i&&(r.opacity="1"),r}));return[{height:f(n),border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},c]},alternateSlideIn(e,t,r){let[l,n]=p(0,t,r),[o,i,s]=h(e,t,l,n.numChildren,n.toEnd),c=new Array(n.numChildren).fill({}).map(((e,t)=>{let r={top:0,right:"50%",transition:`transform ${n.transitionSpeed?n.transitionSpeed:1}s`};return t>i&&(r.transform="translateX(-100%)"),r}));return[{height:f(n),border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},c]},revealSlideIn(e,t,r){let[l,n]=p(0,t,r);return[{height:"context1",position:"relative"},{position:"sticky",overflow:"visible",top:0},new Array(n.numChildren).fill({}).map(((t,r)=>{let l={transform:"translateX(-100%)"};return e>=0&&(l.transition=`transform ${1+r/10}s`,l.transform="translateX(-100%)"),l}))]}};exports.ConfigurableSlide=t=>{const r=e.useRef(null),n=e.useRef(null),[o,i]=e.useState(0),[c,d]=e.useState(0),u=l.default.useContext(s),[h,f]=e.useState({}),[p,m]=e.useState({}),[v,y]=e.useState([]),S=e=>{if(!e)return"100%";let[t,l]=e.split(/(context|children)(\d)$/).filter(Boolean),n=(e=>{let t=0;if(e.current)for(let r=0;r<e.current.children.length;r++)t+=e.current.children.item(r).clientHeight;return t})(r);return"context"===t?u.height?u.height*parseInt(l)+"px":"100%":r.current?n*parseInt(l)+"px":"100%"};return e.useEffect((()=>{if(n.current&&n.current&&u.scroll>=n.current.offsetTop-u.height&&u.scroll<=n.current.offsetTop+n.current.clientHeight&&void 0!==t.startScroll){let e=u.scroll-(n.current.offsetTop-u.height);console.log(e,[(u.scroll-t.startScroll)/n.current.scrollHeight*100,u.height/n.current.scrollHeight*100],e/(n.current.clientHeight+u.height)*100,u.scroll,t.startScroll,n.current.scrollHeight),void 0!==t.startScroll?i((u.scroll-t.startScroll)/n.current.scrollHeight*100):i(0),d(u.height<=n.current.scrollHeight?u.height/n.current.scrollHeight*100:0)}}),[u.scroll,u.height]),e.useEffect((()=>{let[e,r]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(a).includes(e))),r=a.empty();return t.length>0&&(r=t.map((t=>a[t](o,c,e[t]))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);e.height=e.height?S(e.height):"100%";let[l,n,i]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(g).includes(e))),r=g.empty(),l=e.children&&Array.isArray(e.children)?e.children.length:1;return t.length>0&&(r=t.map((t=>g[t](o,c,Object.assign({numChildren:l},e[t])))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);l.height&&(l.height=S(l.height)),f(Object.assign(e,l)),m(Object.assign(r,n)),y(i)}),[o,c]),l.default.createElement("div",{ref:n,style:h},l.default.createElement("div",{ref:r,style:p},l.default.Children.map(t.children,((e,t)=>{let r=t<v.length?v[t]:{};return l.default.createElement("div",{style:r},void 0!==e?l.default.cloneElement(e):void 0)}))))},exports.HelloWorld=t=>{const r=e.useRef(null),n=l.default.useContext(s),[o,i]=e.useState(0);return window.addEventListener("scroll",(e=>{})),e.useEffect((()=>{r&&r.current&&i(r.current.scrollTop)}),[]),l.default.createElement("div",{style:{height:t.small?"100px":"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}},l.default.createElement("p",null,t.title?t.title:n.current?n.current:"unknown title"),l.default.createElement("p",{ref:r,style:{textAlign:"center",fontSize:t.small?"1em":"5vw",margin:"auto"}},t.children?t.children:"Hello World, react-scroll-presentation"))},exports.Presentation=t=>{const[r,n]=e.useState(0),c=e.useRef(new Array),d=e.useRef(),a=e.useRef(),[u,h]=e.useState(-1),[f,p]=e.useState(!1),[g,m]=e.useState([]),[v,y]=e.useState([]),[S,w]=e.useState(""),E=e=>{e=e<0?0:e>=v.length?v.length-1:e;let r={left:0,top:v[e],behavior:"auto"};t.fullScreen?window.scrollTo(0,v[e]):a.current.scrollTo(r)},b=e=>{var r;if("number"==typeof e)e<0||e>=v.length?console.error("setScrollToSlide received slide out of bounds",0):E(e);else{let l=0;for(;l<t.children.length&&(!(null===(r=t.children[l].props)||void 0===r?void 0:r.title)||t.children[l].props.title!==e);l++);l===t.children.length?console.error("setScrollToSlide received unknown title"):E(l)}};return e.useEffect((()=>{for(let e=0;e<v.length;e++)u>=v[e]&&(e===v.length-1||u<v[e+1])&&w(t.children[e].props.title?t.children[e].props.title:e);if(t.fullScreen){const e=e=>{h(window.scrollY),p(window.scrollY!==u)};return document.addEventListener("scroll",e),()=>document.removeEventListener("scroll",e)}if(d.current){const e=e=>{h(a.current.scrollTop),p(a.current.scrollY!==u)};return a.current.addEventListener("scroll",e),()=>a.current.addEventListener("scroll",e)}}),[u]),e.useEffect((()=>{if(Array.isArray(t.children))m(t.children.map(((e,t)=>l.default.cloneElement(e,{startScroll:v[t],endScroll:v[t+1],ref:c.current[t]}))));else if(t.children){let e=[l.default.cloneElement(t.children,{startScroll:0,ref:c.current[0]})];m(e)}}),[t,v]),e.useEffect((()=>{}),[c]),e.useEffect((()=>{var e;let t=[0];if(null===(e=d.current)||void 0===e?void 0:e.children.length){let e=0;for(let r=0;r<d.current.children.length;r++){let l=d.current.children.item(r).scrollHeight;e+=l,r<d.current.children.length-1&&(t[r+1]=0===r?l:t[r]+l)}n(e),y((e=>e.length===t.length&&e.every(((e,r)=>e===t[r]))?e:t))}}),[g,u]),e.useEffect((()=>{console.log("DEVELOPMENT: ","react-scroll-presentation",process.env.version),console.log(d.current.children),console.log(t.children,l.default.isValidElement(t.children[0]),t.children[0].props)}),[]),t.fullScreen?l.default.createElement(o,{fullScreen:!0,ref:d},l.default.createElement(s.Provider,{value:{scroll:u,setScrollToSlide:e=>b(e),current:S,scrollHeight:r-window.innerHeight,height:window.innerHeight}},g)):l.default.createElement(i,{ref:a,className:t.className?t.className:""},l.default.createElement(o,{style:{height:r},ref:d},l.default.createElement(s.Provider,{value:{scroll:u,setScrollToSlide:e=>b(e),current:S,scrollHeight:r-a.current?a.current.clientHeight:0,height:a.current?a.current.clientHeight:0}},g)))},exports.PresentationContext=s;
//# sourceMappingURL=index.js.map
