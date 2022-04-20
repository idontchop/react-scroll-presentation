import e,{useState as t,useRef as r,useEffect as l}from"react";import n from"styled-components";const o=n.div`
    contain: paint;
`,i=n.div`
    overflow-y: scroll;
    overflow-x: hidden;
`,c=e.createContext({current:"",scroll:0,scrollHeight:0,height:0,setScrollToSlide:e=>{}}),s=n=>{const[s,h]=t(0),d=r(new Array),a=r(),u=r(),[p,g]=t(-1),[f,m]=t(!1),[v,y]=t([]),[w,S]=t([]),[E,b]=t(""),x=e=>{e=e<0?0:e>=w.length?w.length-1:e;let t={left:0,top:w[e],behavior:"auto"};n.fullScreen?window.scrollTo(0,w[e]):u.current.scrollTo(t)},O=e=>{var t;if("number"==typeof e)e<0||e>=w.length?console.error("setScrollToSlide received slide out of bounds",0):x(e);else{let r=0;for(;r<n.children.length&&(!(null===(t=n.children[r].props)||void 0===t?void 0:t.title)||n.children[r].props.title!==e);r++);r===n.children.length?console.error("setScrollToSlide received unknown title"):x(r)}};return l((()=>{for(let e=0;e<w.length;e++)p>=w[e]&&(e===w.length-1||p<w[e+1])&&b(n.children[e].props.title?n.children[e].props.title:e);if(n.fullScreen){const e=e=>{g(window.scrollY),m(window.scrollY!==p)};return document.addEventListener("scroll",e),()=>document.removeEventListener("scroll",e)}if(a.current){const e=e=>{g(u.current.scrollTop),m(u.current.scrollY!==p)};return u.current.addEventListener("scroll",e),()=>u.current.addEventListener("scroll",e)}}),[p]),l((()=>{if(Array.isArray(n.children))y(n.children.map(((t,r)=>e.cloneElement(t,{startScroll:w[r],endScroll:w[r+1],ref:d.current[r]}))));else if(n.children){let t=[e.cloneElement(n.children,{startScroll:0,ref:d.current[0]})];y(t)}}),[n,w]),l((()=>{}),[d]),l((()=>{var e;let t=[0];if(null===(e=a.current)||void 0===e?void 0:e.children.length){let e=0;for(let r=0;r<a.current.children.length;r++){let l=a.current.children.item(r).scrollHeight;e+=l,r<a.current.children.length-1&&(t[r+1]=0===r?l:t[r]+l)}h(e),S((e=>e.length===t.length&&e.every(((e,r)=>e===t[r]))?e:t))}}),[v,p]),l((()=>{let t=require("../../package.json");console.log("DEVELOPMENT: ","react-scroll-presentation",t.version),console.log(a.current.children),console.log(n.children,e.isValidElement(n.children[0]),n.children[0].props)}),[]),n.fullScreen?e.createElement(o,{fullScreen:!0,ref:a},e.createElement(c.Provider,{value:{scroll:p,setScrollToSlide:e=>O(e),current:E,scrollHeight:s-window.innerHeight,height:window.innerHeight}},v)):e.createElement(i,{ref:u,className:n.className?n.className:""},e.createElement(o,{style:{height:s},ref:a},e.createElement(c.Provider,{value:{scroll:p,setScrollToSlide:e=>O(e),current:E,scrollHeight:s-u.current?u.current.clientHeight:0,height:u.current?u.current.clientHeight:0}},v)))},h=n=>{const o=r(null),i=e.useContext(c),[s,h]=t(0);return window.addEventListener("scroll",(e=>{})),l((()=>{o&&o.current&&h(o.current.scrollTop)}),[]),e.createElement("div",{style:{height:n.small?"100px":"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}},e.createElement("p",null,n.title?n.title:i.current?i.current:"unknown title"),e.createElement("p",{ref:o,style:{textAlign:"center",fontSize:n.small?"1em":"5vw",margin:"auto"}},n.children?n.children:"Hello World, react-scroll-presentation"))},d={hold:1,slideBy:20},a=e=>("object"!=typeof e?e=d:Object.keys(d).forEach((t=>{e.hasOwnProperty(t)||(e[t]=d[t])})),[e]),u={empty:()=>[{},{}],fadeOut(e,t,r){let l={height:(r=a(r)).hold?`context${r.hold}`:"context1",position:"sticky",top:0,border:"2px solid green"},n={width:"100%",position:"absolute",border:"1px solid yellow"},o=t/5;return"development"===process.env.NODE_ENV&&console.log("y:",e,"yFullView:",t),e>100?(n.zIndex="-9999",n.opacity="0"):e>o&&(n.opacity=""+(100-o-(e-o))/(100-o)),[l,n]},slideIn(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold?n.height="context"+(r.hold+1):n.height="children3",l.transform=e<0?"translateX(-100%)":e>25?"translateX(0%)":r.right?`translateX(${100-(e-0)/25*100}%)`:`translateX(${(e-0)/25*100-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},slideOut:(e,t,r)=>[{height:"slideOut"},{position:"slideOut"}],slideMe(e,t,r){void 0===r&&(r={});let l={position:"sticky",top:0,overflow:"hidden",width:"100%"},n={};return r.hold&&(n.height="context"+(r.hold+1)),l.transform=e<t?"translateX(-100%)":e>100?"translateX(0%)":r.right?`translateX(${100-(e-t)/(100-t)*200}%)`:`translateX(${(e-t)/(100-t)*200-100}%)`,l.right=r.right?"-50%":"50%",[n,l]},header(e,t,r){r=a(r);return[{height:"1px",position:"sticky",top:0,border:"2px solid green",opacity:0,zIndex:"-9999"},{width:"100%",position:"absolute",border:"1px solid yellow"}]}},p={numChildren:1,scrollViewPort:!1,scrollSpeed:1},g=(e,t,r,l,n)=>{let o=(100-t-(n?0:t))/l;return[o,e<0?-1:e>r&&!n?l+1:Math.floor(e/o),e<0||e>r&&!n?0:(e-t)%o/o*100]},f=e=>e.scrollViewPort?`context${e.scrollSpeed}`:`children${e.scrollSpeed}`,m=(e,t,r)=>{let l=100-t>t?100-t:t;return void 0!==r&&r.numChildren||(console.error("ERROR: ","Children Style Method didn't receive numChildren."),r=p),Object.keys(p).forEach((e=>{r.hasOwnProperty(e)||(r[e]=p[e])})),[l,r]},v={empty:()=>[{},{},[]],transition(e,t,r){let[l,n]=m(0,t,r),[o,i,c]=g(e,t,l,n.numChildren,n.toEnd),s=new Array(n.numChildren).fill({}).map(((e,t)=>{let r={top:0,position:"absolute",opacity:"0",transition:`opacity ${n.transitionSpeed?n.transitionSpeed:1}s`};return t===i&&(r.opacity="1"),r}));return[{height:f(n),border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},s]},alternateSlideIn(e,t,r){let[l,n]=m(0,t,r),[o,i,c]=g(e,t,l,n.numChildren,n.toEnd),s=new Array(n.numChildren).fill({}).map(((e,t)=>{let r={top:0,right:"50%",transition:`transform ${n.transitionSpeed?n.transitionSpeed:1}s`};return t>i&&(r.transform="translateX(-100%)"),n.staticFirstChild&&0===t&&(delete r.transform,delete r.transition),r}));return[{height:f(n),border:"1px yellow solid",position:"relative"},{position:"sticky",overflow:"visible",top:0,border:"1px red solid"},s]},revealSlideIn(e,t,r){let[l,n]=m(0,t,r);return[{height:"context1",position:"relative"},{position:"sticky",overflow:"visible",top:0},new Array(n.numChildren).fill({}).map(((t,r)=>{let l={transform:"translateX(-100%)"};return e>=0&&(l.transition=`transform ${1+r/10}s`,l.transform="translateX(-100%)"),l}))]}},y=n=>{const o=r(null),i=r(null),[s,h]=t(0),[d,a]=t(0),p=e.useContext(c),[g,f]=t({}),[m,y]=t({}),[w,S]=t([]),E=e=>{if(!e)return"100%";let[t,r]=e.split(/(context|children)(\d)$/).filter(Boolean);if(["context","children"].includes(t)){let e=(e=>{let t=0;if(e.current)for(let r=0;r<e.current.children.length;r++)t+=e.current.children.item(r).clientHeight;return t})(o);return"context"===t?p.height?p.height*parseInt(r)+"px":"100%":o.current?e*parseInt(r)+"px":"100%"}return e};return l((()=>{if(i.current&&i.current&&p.scroll>=i.current.offsetTop-p.height&&p.scroll<=i.current.offsetTop+i.current.clientHeight&&void 0!==n.startScroll){let e=p.scroll-(i.current.offsetTop-p.height);"development"===process.env.NODE_ENV&&console.log(e,[(p.scroll-n.startScroll)/i.current.scrollHeight*100,p.height/i.current.scrollHeight*100],e/(i.current.clientHeight+p.height)*100,p.scroll,n.startScroll,i.current.scrollHeight),void 0!==n.startScroll?h((p.scroll-n.startScroll)/i.current.scrollHeight*100):h(0),a(p.height<=i.current.scrollHeight?p.height/i.current.scrollHeight*100:0)}}),[p.scroll,p.height]),l((()=>{let[e,t]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(u).includes(e))),r=u.empty();return t.length>0&&(r=t.map((t=>u[t](s,d,e[t]))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(n);e.height=e.height?E(e.height):"100%";let[r,l,o]=(e=>{let t=Object.keys(e).filter((e=>Object.keys(v).includes(e))),r=v.empty(),l=e.children&&Array.isArray(e.children)?e.children.length:1;return t.length>0&&(r=t.map((t=>v[t](s,d,Object.assign({numChildren:l},e[t])))),r=r.reduce(((e,t)=>[Object.assign(e[0],t[0]),Object.assign(e[1],t[1])]))),r})(n);r.height&&(r.height=E(r.height)),f(Object.assign(e,r)),y(Object.assign(t,l)),S(o)}),[s,d]),e.createElement("div",{ref:i,style:g},e.createElement("div",{ref:o,style:m},e.Children.map(n.children,((t,r)=>{let l=r<w.length?w[r]:{};return e.createElement("div",{style:l},void 0!==t?e.cloneElement(t):void 0)}))))};export{y as ConfigurableSlide,h as HelloWorld,s as Presentation,c as PresentationContext};
//# sourceMappingURL=index.js.map
