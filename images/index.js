var ae=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var re=ae((ur,ee)=>{"use strict";function C(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function V(t,e){for(var r="",n=0,s=-1,a=0,i,o=0;o<=t.length;++o){if(o<t.length)i=t.charCodeAt(o);else{if(i===47)break;i=47}if(i===47){if(!(s===o-1||a===1))if(s!==o-1&&a===2){if(r.length<2||n!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var f=r.lastIndexOf("/");if(f!==r.length-1){f===-1?(r="",n=0):(r=r.slice(0,f),n=r.length-1-r.lastIndexOf("/")),s=o,a=0;continue}}else if(r.length===2||r.length===1){r="",n=0,s=o,a=0;continue}}e&&(r.length>0?r+="/..":r="..",n=2)}else r.length>0?r+="/"+t.slice(s+1,o):r=t.slice(s+1,o),n=o-s-1;s=o,a=0}else i===46&&a!==-1?++a:a=-1}return r}function Le(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+t+n:n}var F={resolve:function(){for(var e="",r=!1,n,s=arguments.length-1;s>=-1&&!r;s--){var a;s>=0?a=arguments[s]:(n===void 0&&(n=process.cwd()),a=n),C(a),a.length!==0&&(e=a+"/"+e,r=a.charCodeAt(0)===47)}return e=V(e,!r),r?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(C(e),e.length===0)return".";var r=e.charCodeAt(0)===47,n=e.charCodeAt(e.length-1)===47;return e=V(e,!r),e.length===0&&!r&&(e="."),e.length>0&&n&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return C(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,r=0;r<arguments.length;++r){var n=arguments[r];C(n),n.length>0&&(e===void 0?e=n:e+="/"+n)}return e===void 0?".":F.normalize(e)},relative:function(e,r){if(C(e),C(r),e===r||(e=F.resolve(e),r=F.resolve(r),e===r))return"";for(var n=1;n<e.length&&e.charCodeAt(n)===47;++n);for(var s=e.length,a=s-n,i=1;i<r.length&&r.charCodeAt(i)===47;++i);for(var o=r.length,f=o-i,m=a<f?a:f,g=-1,c=0;c<=m;++c){if(c===m){if(f>m){if(r.charCodeAt(i+c)===47)return r.slice(i+c+1);if(c===0)return r.slice(i+c)}else a>m&&(e.charCodeAt(n+c)===47?g=c:c===0&&(g=0));break}var l=e.charCodeAt(n+c),h=r.charCodeAt(i+c);if(l!==h)break;l===47&&(g=c)}var u="";for(c=n+g+1;c<=s;++c)(c===s||e.charCodeAt(c)===47)&&(u.length===0?u+="..":u+="/..");return u.length>0?u+r.slice(i+g):(i+=g,r.charCodeAt(i)===47&&++i,r.slice(i))},_makeLong:function(e){return e},dirname:function(e){if(C(e),e.length===0)return".";for(var r=e.charCodeAt(0),n=r===47,s=-1,a=!0,i=e.length-1;i>=1;--i)if(r=e.charCodeAt(i),r===47){if(!a){s=i;break}}else a=!1;return s===-1?n?"/":".":n&&s===1?"//":e.slice(0,s)},basename:function(e,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');C(e);var n=0,s=-1,a=!0,i;if(r!==void 0&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var o=r.length-1,f=-1;for(i=e.length-1;i>=0;--i){var m=e.charCodeAt(i);if(m===47){if(!a){n=i+1;break}}else f===-1&&(a=!1,f=i+1),o>=0&&(m===r.charCodeAt(o)?--o==-1&&(s=i):(o=-1,s=f))}return n===s?s=f:s===-1&&(s=e.length),e.slice(n,s)}else{for(i=e.length-1;i>=0;--i)if(e.charCodeAt(i)===47){if(!a){n=i+1;break}}else s===-1&&(a=!1,s=i+1);return s===-1?"":e.slice(n,s)}},extname:function(e){C(e);for(var r=-1,n=0,s=-1,a=!0,i=0,o=e.length-1;o>=0;--o){var f=e.charCodeAt(o);if(f===47){if(!a){n=o+1;break}continue}s===-1&&(a=!1,s=o+1),f===46?r===-1?r=o:i!==1&&(i=1):r!==-1&&(i=-1)}return r===-1||s===-1||i===0||i===1&&r===s-1&&r===n+1?"":e.slice(r,s)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return Le("/",e)},parse:function(e){C(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return r;var n=e.charCodeAt(0),s=n===47,a;s?(r.root="/",a=1):a=0;for(var i=-1,o=0,f=-1,m=!0,g=e.length-1,c=0;g>=a;--g){if(n=e.charCodeAt(g),n===47){if(!m){o=g+1;break}continue}f===-1&&(m=!1,f=g+1),n===46?i===-1?i=g:c!==1&&(c=1):i!==-1&&(c=-1)}return i===-1||f===-1||c===0||c===1&&i===f-1&&i===o+1?f!==-1&&(o===0&&s?r.base=r.name=e.slice(1,f):r.base=r.name=e.slice(o,f)):(o===0&&s?(r.name=e.slice(1,i),r.base=e.slice(1,f)):(r.name=e.slice(o,i),r.base=e.slice(o,f)),r.ext=e.slice(i,f)),o>0?r.dir=e.slice(0,o-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};F.posix=F;ee.exports=F});var q=1,T=3,j={},y=[],oe="http://www.w3.org/2000/svg",P=t=>t,fe=y.map,_=Array.isArray,le=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:setTimeout,R=t=>{var e="";if(typeof t=="string")return t;if(_(t))for(var r=0,n;r<t.length;r++)(n=R(t[r]))&&(e+=(e&&" ")+n);else for(var r in t)t[r]&&(e+=(e&&" ")+r);return e},ce=(t,e)=>{for(var r in{...t,...e})if(typeof(_(t[r])?t[r][0]:t[r])=="function")e[r]=t[r];else if(t[r]!==e[r])return!0},ue=(t,e=y,r)=>{for(var n=[],s=0,a,i;s<t.length||s<e.length;s++)a=t[s],i=e[s],n.push(i&&i!==!0?!a||i[0]!==a[0]||ce(i[1],a[1])?[i[0],i[1],(a&&a[2](),i[0](r,i[1]))]:a:a&&a[2]());return n},D=t=>t==null?t:t.key,B=(t,e,r,n,s,a)=>{if(e!=="key")if(e==="style")for(var i in{...r,...n})r=n==null||n[i]==null?"":n[i],i[0]==="-"?t[e].setProperty(i,r):t[e][i]=r;else e[0]==="o"&&e[1]==="n"?((t.events||(t.events={}))[e=e.slice(2)]=n)?r||t.addEventListener(e,s):t.removeEventListener(e,s):!a&&e!=="list"&&e!=="form"&&e in t?t[e]=n??"":n==null||n===!1||e==="class"&&!(n=R(n))?t.removeAttribute(e):t.setAttribute(e,n)},M=(t,e,r)=>{var n=t.props,s=t.type===T?document.createTextNode(t.tag):(r=r||t.tag==="svg")?document.createElementNS(oe,t.tag,{is:n.is}):document.createElement(t.tag,{is:n.is});for(var a in n)B(s,a,null,n[a],e,r);for(var i=0;i<t.children.length;i++)s.appendChild(M(t.children[i]=k(t.children[i]),e,r));return t.node=s},E=(t,e,r,n,s,a)=>{if(r!==n)if(r!=null&&r.type===T&&n.type===T)r.tag!==n.tag&&(e.nodeValue=n.tag);else if(r==null||r.tag!==n.tag)e=t.insertBefore(M(n=k(n),s,a),e),r!=null&&t.removeChild(r.node);else{var i,o,f,m,g=r.props,c=n.props,l=r.children,h=n.children,u=0,p=0,A=l.length-1,L=h.length-1;a=a||n.tag==="svg";for(var x in{...g,...c})(x==="value"||x==="selected"||x==="checked"?e[x]:g[x])!==c[x]&&B(e,x,g[x],c[x],s,a);for(;p<=L&&u<=A&&!((f=D(l[u]))==null||f!==D(h[p]));)E(e,l[u].node,l[u],h[p]=k(h[p++],l[u++]),s,a);for(;p<=L&&u<=A&&!((f=D(l[A]))==null||f!==D(h[L]));)E(e,l[A].node,l[A],h[L]=k(h[L--],l[A--]),s,a);if(u>A)for(;p<=L;)e.insertBefore(M(h[p]=k(h[p++]),s,a),(o=l[u])&&o.node);else if(p>L)for(;u<=A;)e.removeChild(l[u++].node);else{for(var Q={},S={},x=u;x<=A;x++)(f=l[x].key)!=null&&(Q[f]=l[x]);for(;p<=L;){if(f=D(o=l[u]),m=D(h[p]=k(h[p],o)),S[f]||m!=null&&m===D(l[u+1])){f==null&&e.removeChild(o.node),u++;continue}m==null||r.type===q?(f==null&&(E(e,o&&o.node,o,h[p],s,a),p++),u++):(f===m?(E(e,o.node,o,h[p],s,a),S[m]=!0,u++):(i=Q[m])!=null?(E(e,e.insertBefore(i.node,o&&o.node),i,h[p],s,a),S[m]=!0):E(e,o&&o.node,null,h[p],s,a),p++)}for(;u<=A;)D(o=l[u++])==null&&e.removeChild(o.node);for(var x in Q)S[x]==null&&e.removeChild(Q[x].node)}}return n.node=e},ve=(t,e)=>{for(var r in t)if(t[r]!==e[r])return!0;for(var r in e)if(t[r]!==e[r])return!0},k=(t,e)=>t!==!0&&t!==!1&&t?typeof t.tag=="function"?((!e||e.memo==null||ve(e.memo,t.memo))&&((e=t.tag(t.memo)).memo=t.memo),e):t:z(""),I=t=>t.nodeType===T?z(t.nodeValue,t):U(t.nodeName.toLowerCase(),j,fe.call(t.childNodes,I),q,t),U=(t,e,r,n,s)=>({tag:t,props:e,key:e.key,children:r,type:n,node:s});var z=(t,e)=>U(t,j,y,T,e),v=(t,e,r=y)=>U(t,e,_(r)?r:[r]),X=({node:t,view:e,subscriptions:r,dispatch:n=P,init:s=j})=>{var a=t&&I(t),i=[],o,f,m=l=>{o!==l&&((o=l)==null&&(n=r=g=P),r&&(i=ue(i,r(o),n)),e&&!f&&le(g,f=!0))},g=()=>t=E(t.parentNode,t,a,a=e(o),c,f=!1),c=function(l){n(this.events[l.type],l)};return(n=n((l,h)=>typeof l=="function"?n(l(o,h)):_(l)?typeof l[0]=="function"?n(l[0],l[1]):l.slice(1).map(u=>u&&u!==!0&&u[0](n,u[1]),m(l[0])):m(l)))(s),n};var G=(t,e)=>{t.style.opacity=0;let r=+new Date;var n=function(){t.style.opacity=+t.style.opacity+(new Date-r)/e,r=+new Date,+t.style.opacity<1&&(window.requestAnimationFrame&&requestAnimationFrame(n)||setTimeout(n,10))};n()},Y=(t,e)=>{t.style.opacity=1;let r=+new Date;var n=function(){t.style.opacity=+t.style.opacity-(new Date-r)/e,r=+new Date,+t.style.opacity>0&&(window.requestAnimationFrame&&requestAnimationFrame(n)||setTimeout(n,10))};n()};var $=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
</svg>
`;onscroll=()=>{let t=document.getElementById("top");var e=document.documentElement.scrollTop||document.body.scrollTop;e>600?(t.classList.contains("hide")&&G(t,500),t.classList.remove("hide")):e<500&&(t.classList.contains("hide")||(Y(t,200),setTimeout(()=>{t.classList.add("hide")},200)))};var O=()=>v("div",{id:"top",class:"svg-top hide",innerHTML:$,onclick:ge}),ge=t=>(window.scrollTo({top:0,left:0,behavior:"smooth"}),t);function J(t,e){var r={},n;for(n in t)r[n]=t[n];for(n in e)r[n]=e[n];return r}function he(t,e){fetch(e.url,e.options).then(function(r){if(!r.ok)throw r;return r}).then(function(r){return r[e.response]()}).then(function(r){t(e.action,r)}).catch(function(r){t(e.error,r)})}function W(t){return[he,J({options:{},response:"json",error:t.action},t)]}var Z=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
</svg>
`;var N=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
</svg>
`;var w=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
</svg>
`;var H=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
</svg>
`;var b=[{name:"home",href:"/",icon:Z},{name:"memos",href:"/memos/",icon:H},{name:"images",href:"/images/",icon:N},{name:"waka",href:"/waka/",icon:w}];var d=(t,e={as:"",active:!0})=>{let r=b.find(n=>n.name==t);return r||(r={name:t,href:"#",icon:""}),v("a",{class:`link-icon ${e.active?"":"disable"}`,href:r.href,innerHTML:r.icon},[v("span",{},[z(e.as||r.name.toUpperCase())])])};var K="data:image/png;base64,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";var De=re(),te=()=>{let e=(window.location.pathname+window.location.search).split("/"),r="/";e&&e.forEach(a=>{if(a!==""){r=a;return}});let n=a=>(a=De.normalize(a),a.replaceAll("/","")),s=b.find(a=>n(r)===n(a.href));return s||(s={name:""}),v("div",{class:"header-wrapper"},[v("header",{},[v("nav",{},[v("h1",{class:"logo-text",onclick:ne},z("KIS9A")),v("div",{class:"logo-image"},[v("img",{src:K,alt:"kis9a.png",onclick:ne,width:"100px",height:"100px"})]),v("div",{class:"links"},b.map(a=>d(a.name,{active:a.name!==s.name})))])])])},ne=t=>(window.open("https://nav.kis9a.com","_blank"),{...t});var Ee="webp",ke="mp4",Fe=W({url:"/data/images-indexes.json",response:"json",action:(t,e)=>(se.indexes=e,{...t,indexes:_e(e)||[]})}),Te=[t=>{t(r=>(console.log(r),{...r}))}],be=t=>Ee==ie(t),Qe=t=>ke==ie(t),ie=t=>t.split(".").pop(),se={indexes:[]},Se=Fe,ye=[se,Se,Te],_e=([...t])=>{for(let e=t.length-1;e>=0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},je=t=>{switch(!0){case be(t):return v("div",{class:"imgc",oncreate:e=>{console.log(e)}},[v("img",{alt:t,src:`/data/images/${t}`,loading:"lazy","data-src":`${t}`}),v("div",{class:"imgc-label"},z(t))]);case Qe(t):return v("div",{class:"imgc"},[v("video",{alt:t,src:`/data/images/${t}`,controls:!0}),v("div",{class:"imgc-label"},z(t))])}};X({init:ye,view:({indexes:t})=>v("div",{class:"container",oncreate:e=>(console.log("hello"),{...e})},[te(),v("main",{},[v("div",{class:"content indexes"},t&&t.map(e=>je(e.name)))]),O()]),subscriptions:()=>{},node:document.getElementById("app")});
