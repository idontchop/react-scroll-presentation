"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("styled-components");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=r(e),n=r(t);const i=n.default.div`
    contain: paint;
`,o=n.default.div`
    overflow: scroll;
`,s=l.default.createContext({scroll:0,scrollHeight:0,height:0}),c={empty:()=>[{},{}],fadeOut(e,t,r){let l={position:"absolute",border:"1px solid yellow"},n=t;return console.log("y:",e,"yFullView:",t),e>100?l.opacity="0":e>n&&(l.opacity=""+(n-(e-n))/(100-n)),[{height:"context2",position:"sticky",top:0,border:"2px solid green"},l]},slideIn(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold?n.height="context"+(r.hold+1):n.height="children3",l.transform=e<0?"translateX(-100%)":e>25?"translateX(0%)":r.right?`translateX(${100-(e-0)/25*100}%)`:`translateX(${(e-0)/25*100-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},slideOut:(e,t,r)=>[{height:"slideOut"},{position:"slideOut"}],slideMe(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold&&(n.height="context"+(r.hold+1)),l.transform=e<t?"translateX(-100%)":e>100?"translateX(0%)":r.right?`translateX(${100-(e-t)/(100-t)*200}%)`:`translateX(${(e-t)/(100-t)*200-100}%)`,l.right=r.right?"-50%":"50%",[n,l]}},a={numChildren:1,scrollSpeed:1},u=(e,t,r,l,n)=>{let i=(100-t-(n?0:t))/l;return[i,e<0?-1:e>r&&!n?l+1:Math.floor(e/i),e<0||e>r&&!n?0:(e-t)%i/i*100]},d={empty:()=>[{},{},[]],transition(e,t,r){let l=100-t>t?100-t:t;if(void 0===r||!r.numChildren)return[{},{},[]];Object.keys(a).forEach((e=>{r.hasOwnProperty(e)||(r[e]=a[e])}));let[n,i,o]=u(e,t,l,r.numChildren,r.toEnd),s=new Array(r.numChildren).fill({}).map(((e,t)=>{let l={top:0,position:"absolute",opacity:"0",transition:`opacity ${r.transitionSpeed?r.transitionSpeed:1}s`};return t===i&&(l.opacity="1"),l}));return[{height:r.scrollViewPort?`context${r.scrollSpeed}`:`children${r.scrollSpeed}`,border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},s]},alternateSlideIn(e,t,r){let l=100-t>t?100-t:t;if(void 0===r||!r.numChildren)return[{},{},[]];Object.keys(a).forEach((e=>{r.hasOwnProperty(e)||(r[e]=a[e])}));let[n,i,o]=u(e,t,l,r.numChildren,r.toEnd),s=new Array(r.numChildren).fill({}).map(((e,t)=>{let l={top:0,right:"50%",transition:`transform ${r.transitionSpeed?r.transitionSpeed:1}s`};return t>=i&&(l.transform="translateX(-100%)"),l}));return r.scrollViewPort,r.scrollSpeed,[{height:"context5",border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},s]}};exports.ConfigurableSlide=t=>{const r=e.useRef(null),n=e.useRef(null),[i,o]=e.useState(0),[a,u]=e.useState(0),h=l.default.useContext(s),[f,g]=e.useState({}),[p,m]=e.useState({}),[y,v]=e.useState([]),S=e=>{if(!e)return"100%";let[t,l]=e.split(/(context|children)(\d)$/).filter(Boolean),n=(e=>{let t=0;if(e.current)for(let r=0;r<e.current.children.length;r++)t+=e.current.children.item(r).clientHeight;return t})(r);return"context"===t?h.height?h.height*parseInt(l)+"px":"100%":r.current?n*parseInt(l)+"px":"100%"};return e.useEffect((()=>{if(n.current&&n.current&&h.scroll>=n.current.offsetTop-h.height&&h.scroll<=n.current.offsetTop+n.current.clientHeight&&void 0!==t.startScroll){let e=h.scroll-(n.current.offsetTop-h.height);console.log(e,[(h.scroll-t.startScroll)/n.current.scrollHeight*100,h.height/n.current.scrollHeight*100],e/(n.current.clientHeight+h.height)*100,h.scroll,t.startScroll,n.current.scrollHeight),void 0!==t.startScroll?o((h.scroll-t.startScroll)/n.current.scrollHeight*100):o(0),u(h.height<=n.current.scrollHeight?h.height/n.current.scrollHeight*100:0)}}),[h.scroll,h.height]),e.useEffect((()=>{let[e,r]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(c).includes(e))),r=c.empty();return t.length>0&&(r=t.map((t=>c[t](i,a,e[t]))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);e.height=e.height?S(e.height):"100%";let[l,n,o]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(d).includes(e))),r=d.empty(),l=e.children&&Array.isArray(e.children)?e.children.length:1;return t.length>0&&(r=t.map((t=>d[t](i,a,Object.assign({numChildren:l},e[t])))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);l.height&&(l.height=S(l.height)),g(Object.assign(e,l)),m(Object.assign(r,n)),v(o)}),[i,a]),l.default.createElement("div",{ref:n,style:f},l.default.createElement("div",{ref:r,style:p},l.default.Children.map(t.children,((e,t)=>{let r=t<y.length?y[t]:{};return l.default.createElement("div",{style:r},void 0!==e?l.default.cloneElement(e):void 0)}))))},exports.HelloWorld=t=>{const r=e.useRef(null),[n,i]=e.useState(0);return window.addEventListener("scroll",(e=>{})),e.useEffect((()=>{r&&r.current&&i(r.current.scrollTop)}),[]),l.default.createElement("div",{style:{height:t.small?"100px":"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}},l.default.createElement("p",null,t.title),l.default.createElement("p",{ref:r,style:{textAlign:"center",fontSize:t.small?"1em":"5em",margin:"auto"}},t.children?t.children:"Hello World, react-scroll-presentation"))},exports.Presentation=t=>{const[r,n]=e.useState(0),c=e.useRef(new Array),a=e.useRef(),u=e.useRef(),[d,h]=e.useState(-1),[f,g]=e.useState(!1),[p,m]=e.useState([]),[y,v]=e.useState([]);return e.useEffect((()=>{if(t.fullScreen){const e=e=>{h(window.scrollY),g(window.scrollY!==d)};return document.addEventListener("scroll",e),()=>document.removeEventListener("scroll",e)}if(a.current){const e=e=>{h(u.current.scrollTop),g(u.current.scrollY!==d)};return u.current.addEventListener("scroll",e),()=>u.current.addEventListener("scroll",e)}}),[d]),e.useEffect((()=>{if(Array.isArray(t.children))m(t.children.map(((e,t)=>l.default.cloneElement(e,{startScroll:y[t],endScroll:y[t+1],ref:c.current[t]}))));else if(t.children){let e=[l.default.cloneElement(t.children,{startScroll:0,ref:c.current[0]})];m(e)}}),[t,y]),e.useEffect((()=>{}),[c]),e.useEffect((()=>{var e;let t=[0];if(null===(e=a.current)||void 0===e?void 0:e.children.length){let e=0;for(let r=0;r<a.current.children.length;r++){let l=a.current.children.item(r).scrollHeight;e+=l,r<a.current.children.length-1&&(t[r+1]=0===r?l:t[r]+l)}n(e),console.log(y,r,a.current.children.item(0).clientHeight),v((e=>e.length===t.length&&e.every(((e,r)=>e===t[r]))?e:t))}}),[p,d]),t.fullScreen?l.default.createElement(i,{fullScreen:!0,ref:a},l.default.createElement(s.Provider,{value:{scroll:d,scrollHeight:r-window.innerHeight,height:window.innerHeight}},p)):l.default.createElement(o,{ref:u,className:t.className?t.className:""},l.default.createElement(i,{style:{height:r},ref:a},l.default.createElement(s.Provider,{value:{scroll:d,scrollHeight:r-u.current?u.current.clientHeight:0,height:u.current?u.current.clientHeight:0}},p)))};
