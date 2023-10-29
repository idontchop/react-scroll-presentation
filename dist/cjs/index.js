"use strict";var e=require("react"),t=require("styled-components"),r="1.0.36-dev";const n=t.div`
    overflow: clip;
`,l=t.div`
    overflow-y: scroll;
    overflow-x: hidden;
`,i=e.createContext({current:"",scroll:0,scrollHeight:0,height:0,setScrollToSlide:e=>{}}),o={hold:1,slideBy:20,direction:"bottom"},s=e=>("object"!=typeof e?e=o:Object.keys(o).forEach((t=>{e.hasOwnProperty(t)||(e[t]=o[t])})),[e]),c={empty:()=>[{},{}],fadeOut(e,t,r){let n={height:(r=s(r)).hold?`context${r.hold}`:"context1",position:"sticky",top:0},l={width:"100%",position:"absolute"},i=t/5;return"development"===process.env.NODE_ENV&&console.log("y:",e,"yFullView:",t),e>100?(l.zIndex="-9999",l.opacity="0"):e>i&&(l.opacity=""+(100-i-(e-i))/(100-i)),[n,l]},springIn(e,t,r){let n={position:"sticky",transition:`transform ${(r=s(r)).transitionSpeed?r.transitionSpeed:1}s ease,\n                opacity ${r.transitionSpeed?r.transitionSpeed:1}s ease`,top:0,overflow:"hidden",width:"100%"};return e<0-t+t/3?(n.transform="right"===r.direction?"translateX(15%)":"left"===r.direction?"translateX(-15%)":"translateY(15%)",n.opacity="0.1"):n.opacity="1",[{},n]},slideIn(e,t,r){void 0===r&&(r={});let n={position:"sticky",top:0,overflow:"hidden",width:"100%"},l={},i=t;return void 0!==r.hold?l.height="context"+(r.hold+1):l.height="children3",n.transform=e<0?"translateX(-100%)":e>i?"translateX(0%)":r.right?`translateX(${100-(e-0)/(i-0)*100}%)`:`translateX(${(e-0)/(i-0)*100-100}%)`,n.right=r.right?"-50%":"50%",[l,n]},slideOut:(e,t,r)=>[{height:"slideOut"},{position:"slideOut"}],slideMe(e,t,r){void 0===r&&(r={});let n={position:"sticky",top:0,overflow:"hidden",width:"100%"},l={};return r.hold&&(l.height="context"+(r.hold+1)),n.transform=e<t?"translateX(-100%)":e>100?"translateX(0%)":r.right?`translateX(${100-(e-t)/(100-t)*200}%)`:`translateX(${(e-t)/(100-t)*200-100}%)`,n.right=r.right?"-50%":"50%",[l,n]},header(e,t,r){r=s(r);return[{zIndex:11,height:"1px",position:"sticky",top:0},{zIndex:11,width:"100%",position:"absolute"}]}},a={numChildren:1,scrollViewPort:!1,scrollSpeed:1},d=(e,t,r,n,l)=>{let i=(100-t-(l?0:t))/n;return[i,e<0?-1:e>r&&!l?n+1:Math.floor(e/i),e<0||e>r&&!l?0:(e-t)%i/i*100]},u=e=>e.scrollViewPort?`context${e.scrollSpeed}`:`children${e.scrollSpeed}`,h=(e,t,r)=>{let n=100-t>t?100-t:t;return void 0!==r&&r.numChildren||(console.error("ERROR: ","Children Style Method didn't receive numChildren."),r=a),Object.keys(a).forEach((e=>{r.hasOwnProperty(e)||(r[e]=a[e])})),[n,r]},p=(e,t,r)=>{let n={};return r.background&&(n.backgroundImage=`url(${r.background})`,n.backgroundPosition="center",n.backgroundSize="contain",n.backgroundRepeat="no-repeat"),r.fullScreen&&(n.height="100vh",n.width="100%"),n},f={empty:()=>[{},{},[]],transition(e,t,r){let[n,l]=h(0,t,r),[i,o,s]=d(e,t,n,l.numChildren,l.toEnd),c=new Array(l.numChildren).fill({}).map(((e,t)=>{let r={top:0,position:"absolute",opacity:"0",transition:`opacity ${l.transitionSpeed?l.transitionSpeed:1}s`};return t===o&&(r.opacity="1"),r})),a=p(0,0,l);return[{height:u(l),position:"relative"},Object.assign(Object.assign({},a),{position:"sticky",overflow:"visible",top:0}),c]},alternateSlideIn(e,t,r){let[n,l]=h(0,t,r),[i,o,s]=d(e,t,n,l.numChildren,l.toEnd),c=new Array(l.numChildren).fill({}).map(((r,n)=>{let i={top:0,transition:e<0-t?"":`transform ${l.transitionSpeed?l.transitionSpeed:1}s`};return n>o&&(i.transform="translate3d(-100%,0,0)"),l.staticFirstChild&&0===n&&(delete i.transform,delete i.transition),i})),a=p(0,0,l);return[{height:u(l),overflow:"visible",display:"block",position:"relative"},Object.assign(Object.assign({},a),{WebkitPosition:"sticky",position:"sticky",overflow:"visible",top:0}),c]},revealSlideIn(e,t,r){let[n,l]=h(0,t,r);return[{height:"context1",position:"relative"},{position:"sticky",overflow:"visible",top:0},new Array(l.numChildren).fill({}).map(((t,r)=>{let n={transform:"translateX(-100%)"};return e>=0&&(n.transition=`transform ${1+r/10}s`,n.transform="translateX(-100%)"),n}))]}};"function"==typeof SuppressedError&&SuppressedError;const g=t=>{var r,n;if((null===(n=null===(r=t.props)||void 0===r?void 0:r.style)||void 0===n?void 0:n.position)&&"sticky"===t.props.style.position){let r=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]])}return r}(t.props.style,["position"]),n=t.props.className?"sticky "+t.props.className:"sticky";return e.cloneElement(t,{style:r,className:n})}return t};exports.ConfigurableSlide=t=>{const r=e.useRef(null),n=e.useRef(null),[l,o]=e.useState(0),[s,a]=e.useState(0),d=e.useContext(i),[u,h]=e.useState({}),[p,y]=e.useState({}),[m,v]=e.useState([]),S=e=>{let t=(e=>{let t=0;if(e.current)for(let r=0;r<e.current.children.length;r++)t+=e.current.children.item(r).clientHeight;return t})(r);if(!e)return"auto";let[n,l]=e.split(/(context|children)(\d)$/).filter(Boolean);return["context","children"].includes(n)?"context"===n?d.height?d.height*parseInt(l)+"px":"100%":r.current?t*parseInt(l)+"px":"100%":e};return e.useEffect((()=>{n.current&&void 0!==t.startScroll&&(d.scroll,n.current.offsetTop,d.height,void 0!==t.startScroll?o((d.scroll-t.startScroll)/n.current.scrollHeight*100):o(0),a(d.height<=n.current.scrollHeight?d.height/n.current.scrollHeight*100:0))}),[d.scroll,d.height]),e.useEffect((()=>{let[e,r]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(c).includes(e))),r=c.empty();return t.length>0&&(r=t.map((t=>c[t](l,s,e[t]))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);e.height=S(e.height);let[n,i,o]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(f).includes(e))),r=f.empty(),n=e.children&&Array.isArray(e.children)?e.children.length:1;return t.length>0&&(r=t.map((t=>f[t](l,s,Object.assign({numChildren:n},e[t])))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(t);n.height&&(n.height=S(n.height)),h(Object.assign(e,n)),y(Object.assign(r,i)),v(o)}),[l,s]),e.createElement("div",{ref:n,style:u},g(e.createElement("div",{ref:r,style:p},t.header&&e.createElement("div",{style:{position:"sticky",top:0,border:0,padding:0,margin:0}},t.header),e.Children.map(t.children,((t,r)=>{let n=r<m.length?m[r]:{};return e.createElement("div",{style:n},void 0!==t?e.cloneElement(t):void 0)})))))},exports.HelloWorld=t=>{const r=e.useRef(null),n=e.useContext(i),[l,o]=e.useState(0);return window.addEventListener("scroll",(e=>{})),e.useEffect((()=>{r&&r.current&&o(r.current.scrollTop)}),[]),e.createElement("div",{style:{height:t.small?"100px":"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}},e.createElement("p",null,t.title?t.title:n.current?n.current:"unknown title"),e.createElement("p",{ref:r,style:{textAlign:"center",fontSize:t.small?"1em":"5vw",margin:"auto"}},t.children?t.children:"Hello World, react-scroll-presentation"))},exports.Presentation=t=>{const[o,s]=e.useState(0),[c,a]=e.useState(0),d=e.useRef(new Array),u=e.useRef(),h=e.useRef(),[p,f]=e.useState(-1),[g,y]=e.useState(!1),[m,v]=e.useState([]),[S,b]=e.useState([]),[E,w]=e.useState(""),k=(e,r)=>{e=e<0?0:e>=S.length?S.length-1:e;let n={left:0,top:S[e],behavior:"auto"};t.fullScreen?window.scrollTo(0,S[e]):h.current.scrollTo(n)},O=(e,r)=>{var n;if("number"==typeof e)e<0||e>=S.length?console.error("setScrollToSlide received slide out of bounds",0):k(e);else{let r=0;for(;r<t.children.length&&(!(null===(n=t.children[r].props)||void 0===n?void 0:n.title)||t.children[r].props.title!==e);r++);r===t.children.length?console.error("setScrollToSlide received unknown title"):k(r)}};return e.useEffect((()=>{var e;for(let t=0;t<S.length;t++)p>=S[t]&&(t===S.length-1||p<S[t+1])&&w((null===(e=m[t].props)||void 0===e?void 0:e.title)?m[t].props.title:t);if(t.fullScreen){const e=e=>{f(window.scrollY),y(window.scrollY!==p)};return document.addEventListener("scroll",e),()=>document.removeEventListener("scroll",e)}if(null==h?void 0:h.current){const e=e=>{f(h.current.scrollTop),y(h.current.scrollY!==p)};return h.current.addEventListener("scroll",e),()=>(null==h?void 0:h.current)&&h.current.removeEventListener("scroll",e)}}),[p]),e.useEffect((()=>{if(Array.isArray(t.children))v(t.children.map(((t,r)=>e.cloneElement(t,{startScroll:S[r],endScroll:S[r+1],ref:d.current[r]}))));else if(t.children){let r=[e.cloneElement(t.children,{startScroll:0,ref:d.current[0]})];v(r)}}),[t,S]),e.useEffect((()=>{}),[d]),e.useEffect((()=>{var e;let t=[0];if(null===(e=u.current)||void 0===e?void 0:e.children.length){let e=0;for(let r=0;r<u.current.children.length;r++){let n=u.current.children.item(r).scrollHeight;e+=n,r<u.current.children.length-1&&(t[r+1]=0===r?n:t[r]+n)}s(e),b((e=>e.length===t.length&&e.every(((e,r)=>e===t[r]))?e:t))}}),[m,p]),e.useEffect((()=>{console.log("DEVELOPMENT: ","react-scroll-presentation",r),console.log(u.current.children),console.log(t.children,e.isValidElement(t.children[0]));let n=document.createElement("style");n.innerText="    \n     .sticky {\n        display: block;\n        position: -webkit-sticky;\n        position: -moz-sticky;\n        position: -o-sticky;\n        position: -ms-sticky;\n        position: sticky;\n     }",document.head.appendChild(n),a(window.innerHeight)}),[]),t.fullScreen?e.createElement(n,{fullScreen:!0,ref:u},e.createElement(i.Provider,{value:{scroll:p,setScrollToSlide:e=>O(e),current:E,scrollHeight:o-c,height:c}},m)):e.createElement(l,{ref:h,className:t.className?t.className:""},e.createElement(n,{style:{height:o},ref:u},e.createElement(i.Provider,{value:{scroll:p,setScrollToSlide:e=>O(e),current:E,scrollHeight:o-h.current?h.current.clientHeight:0,height:h.current?h.current.clientHeight:0}},m)))},exports.PresentationContext=i;
//# sourceMappingURL=index.js.map
