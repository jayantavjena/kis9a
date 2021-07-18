(()=>{var kr=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var fr=kr((Wr,vr)=>{"use strict";function _(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function or(t,r){for(var e="",n=0,s=-1,i=0,a,l=0;l<=t.length;++l){if(l<t.length)a=t.charCodeAt(l);else{if(a===47)break;a=47}if(a===47){if(!(s===l-1||i===1))if(s!==l-1&&i===2){if(e.length<2||n!==2||e.charCodeAt(e.length-1)!==46||e.charCodeAt(e.length-2)!==46){if(e.length>2){var o=e.lastIndexOf("/");if(o!==e.length-1){o===-1?(e="",n=0):(e=e.slice(0,o),n=e.length-1-e.lastIndexOf("/")),s=l,i=0;continue}}else if(e.length===2||e.length===1){e="",n=0,s=l,i=0;continue}}r&&(e.length>0?e+="/..":e="..",n=2)}else e.length>0?e+="/"+t.slice(s+1,l):e=t.slice(s+1,l),n=l-s-1;s=l,i=0}else a===46&&i!==-1?++i:i=-1}return e}function zr(t,r){var e=r.dir||r.root,n=r.base||(r.name||"")+(r.ext||"");return e?e===r.root?e+n:e+t+n:n}var L={resolve:function(){for(var r="",e=!1,n,s=arguments.length-1;s>=-1&&!e;s--){var i;s>=0?i=arguments[s]:(n===void 0&&(n=process.cwd()),i=n),_(i),i.length!==0&&(r=i+"/"+r,e=i.charCodeAt(0)===47)}return r=or(r,!e),e?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(r){if(_(r),r.length===0)return".";var e=r.charCodeAt(0)===47,n=r.charCodeAt(r.length-1)===47;return r=or(r,!e),r.length===0&&!e&&(r="."),r.length>0&&n&&(r+="/"),e?"/"+r:r},isAbsolute:function(r){return _(r),r.length>0&&r.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var r,e=0;e<arguments.length;++e){var n=arguments[e];_(n),n.length>0&&(r===void 0?r=n:r+="/"+n)}return r===void 0?".":L.normalize(r)},relative:function(r,e){if(_(r),_(e),r===e||(r=L.resolve(r),e=L.resolve(e),r===e))return"";for(var n=1;n<r.length&&r.charCodeAt(n)===47;++n);for(var s=r.length,i=s-n,a=1;a<e.length&&e.charCodeAt(a)===47;++a);for(var l=e.length,o=l-a,u=i<o?i:o,g=-1,f=0;f<=u;++f){if(f===u){if(o>u){if(e.charCodeAt(a+f)===47)return e.slice(a+f+1);if(f===0)return e.slice(a+f)}else i>u&&(r.charCodeAt(n+f)===47?g=f:f===0&&(g=0));break}var v=r.charCodeAt(n+f),m=e.charCodeAt(a+f);if(v!==m)break;v===47&&(g=f)}var c="";for(f=n+g+1;f<=s;++f)(f===s||r.charCodeAt(f)===47)&&(c.length===0?c+="..":c+="/..");return c.length>0?c+e.slice(a+g):(a+=g,e.charCodeAt(a)===47&&++a,e.slice(a))},_makeLong:function(r){return r},dirname:function(r){if(_(r),r.length===0)return".";for(var e=r.charCodeAt(0),n=e===47,s=-1,i=!0,a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!i){s=a;break}}else i=!1;return s===-1?n?"/":".":n&&s===1?"//":r.slice(0,s)},basename:function(r,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');_(r);var n=0,s=-1,i=!0,a;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";var l=e.length-1,o=-1;for(a=r.length-1;a>=0;--a){var u=r.charCodeAt(a);if(u===47){if(!i){n=a+1;break}}else o===-1&&(i=!1,o=a+1),l>=0&&(u===e.charCodeAt(l)?--l==-1&&(s=a):(l=-1,s=o))}return n===s?s=o:s===-1&&(s=r.length),r.slice(n,s)}else{for(a=r.length-1;a>=0;--a)if(r.charCodeAt(a)===47){if(!i){n=a+1;break}}else s===-1&&(i=!1,s=a+1);return s===-1?"":r.slice(n,s)}},extname:function(r){_(r);for(var e=-1,n=0,s=-1,i=!0,a=0,l=r.length-1;l>=0;--l){var o=r.charCodeAt(l);if(o===47){if(!i){n=l+1;break}continue}s===-1&&(i=!1,s=l+1),o===46?e===-1?e=l:a!==1&&(a=1):e!==-1&&(a=-1)}return e===-1||s===-1||a===0||a===1&&e===s-1&&e===n+1?"":r.slice(e,s)},format:function(r){if(r===null||typeof r!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof r);return zr("/",r)},parse:function(r){_(r);var e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;var n=r.charCodeAt(0),s=n===47,i;s?(e.root="/",i=1):i=0;for(var a=-1,l=0,o=-1,u=!0,g=r.length-1,f=0;g>=i;--g){if(n=r.charCodeAt(g),n===47){if(!u){l=g+1;break}continue}o===-1&&(u=!1,o=g+1),n===46?a===-1?a=g:f!==1&&(f=1):a!==-1&&(f=-1)}return a===-1||o===-1||f===0||f===1&&a===o-1&&a===l+1?o!==-1&&(l===0&&s?e.base=e.name=r.slice(1,o):e.base=e.name=r.slice(l,o)):(l===0&&s?(e.name=r.slice(1,a),e.base=r.slice(1,o)):(e.name=r.slice(l,a),e.base=r.slice(l,o)),e.ext=r.slice(a,o)),l>0?e.dir=r.slice(0,l-1):s&&(e.dir="/"),e},sep:"/",delimiter:":",win32:null,posix:null};L.posix=L;vr.exports=L});var W=1,B=3,J={},E=[],wr="http://www.w3.org/2000/svg",X=t=>t,xr=E.map,b=Array.isArray,_r=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:setTimeout,O=t=>{var r="";if(typeof t=="string")return t;if(b(t))for(var e=0,n;e<t.length;e++)(n=O(t[e]))&&(r+=(r&&" ")+n);else for(var e in t)t[e]&&(r+=(r&&" ")+e);return r},Cr=(t,r)=>{for(var e in{...t,...r})if(typeof(b(t[e])?t[e][0]:t[e])=="function")r[e]=t[e];else if(t[e]!==r[e])return!0},Ar=(t,r=E,e)=>{for(var n=[],s=0,i,a;s<t.length||s<r.length;s++)i=t[s],a=r[s],n.push(a&&a!==!0?!i||a[0]!==i[0]||Cr(a[1],i[1])?[a[0],a[1],(i&&i[2](),a[0](e,a[1]))]:i:i&&i[2]());return n},A=t=>t==null?t:t.key,Q=(t,r,e,n,s,i)=>{if(r!=="key")if(r==="style")for(var a in{...e,...n})e=n==null||n[a]==null?"":n[a],a[0]==="-"?t[r].setProperty(a,e):t[r][a]=e;else r[0]==="o"&&r[1]==="n"?((t.events||(t.events={}))[r=r.slice(2)]=n)?e||t.addEventListener(r,s):t.removeEventListener(r,s):!i&&r!=="list"&&r!=="form"&&r in t?t[r]=n??"":n==null||n===!1||r==="class"&&!(n=O(n))?t.removeAttribute(r):t.setAttribute(r,n)},U=(t,r,e)=>{var n=t.props,s=t.type===B?document.createTextNode(t.tag):(e=e||t.tag==="svg")?document.createElementNS(wr,t.tag,{is:n.is}):document.createElement(t.tag,{is:n.is});for(var i in n)Q(s,i,null,n[i],r,e);for(var a=0;a<t.children.length;a++)s.appendChild(U(t.children[a]=z(t.children[a]),r,e));return t.node=s},d=(t,r,e,n,s,i)=>{if(e!==n)if(e!=null&&e.type===B&&n.type===B)e.tag!==n.tag&&(r.nodeValue=n.tag);else if(e==null||e.tag!==n.tag)r=t.insertBefore(U(n=z(n),s,i),r),e!=null&&t.removeChild(e.node);else{var a,l,o,u,g=e.props,f=n.props,v=e.children,m=n.children,c=0,p=0,x=v.length-1,C=m.length-1;i=i||n.tag==="svg";for(var k in{...g,...f})(k==="value"||k==="selected"||k==="checked"?r[k]:g[k])!==f[k]&&Q(r,k,g[k],f[k],s,i);for(;p<=C&&c<=x&&!((o=A(v[c]))==null||o!==A(m[p]));)d(r,v[c].node,v[c],m[p]=z(m[p++],v[c++]),s,i);for(;p<=C&&c<=x&&!((o=A(v[x]))==null||o!==A(m[C]));)d(r,v[x].node,v[x],m[C]=z(m[C--],v[x--]),s,i);if(c>x)for(;p<=C;)r.insertBefore(U(m[p]=z(m[p++]),s,i),(l=v[c])&&l.node);else if(p>C)for(;c<=x;)r.removeChild(v[c++].node);else{for(var j={},y={},k=c;k<=x;k++)(o=v[k].key)!=null&&(j[o]=v[k]);for(;p<=C;){if(o=A(l=v[c]),u=A(m[p]=z(m[p],l)),y[o]||u!=null&&u===A(v[c+1])){o==null&&r.removeChild(l.node),c++;continue}u==null||e.type===W?(o==null&&(d(r,l&&l.node,l,m[p],s,i),p++),c++):(o===u?(d(r,l.node,l,m[p],s,i),y[u]=!0,c++):(a=j[u])!=null?(d(r,r.insertBefore(a.node,l&&l.node),a,m[p],s,i),y[u]=!0):d(r,l&&l.node,null,m[p],s,i),p++)}for(;c<=x;)A(l=v[c++])==null&&r.removeChild(l.node);for(var k in j)y[k]==null&&r.removeChild(j[k].node)}}return n.node=r},dr=(t,r)=>{for(var e in t)if(t[e]!==r[e])return!0;for(var e in r)if(t[e]!==r[e])return!0},z=(t,r)=>t!==!0&&t!==!1&&t?typeof t.tag=="function"?((!r||r.memo==null||dr(r.memo,t.memo))&&((r=t.tag(t.memo)).memo=t.memo),r):t:w(""),Z=t=>t.nodeType===B?w(t.nodeValue,t):Y(t.nodeName.toLowerCase(),J,xr.call(t.childNodes,Z),W,t),Y=(t,r,e,n,s)=>({tag:t,props:r,key:r.key,children:e,type:n,node:s});var w=(t,r)=>Y(t,J,E,B,r),h=(t,r,e=E)=>Y(t,r,b(e)?e:[e]),T=({node:t,view:r,subscriptions:e,dispatch:n=X,init:s=J})=>{var i=t&&Z(t),a=[],l,o,u=v=>{l!==v&&((l=v)==null&&(n=e=g=X),e&&(a=Ar(a,e(l),n)),r&&!o&&_r(g,o=!0))},g=()=>t=d(t.parentNode,t,i,i=r(l),f,o=!1),f=function(v){n(this.events[v.type],v)};return(n=n((v,m)=>typeof v=="function"?n(v(l,m)):b(v)?typeof v[0]=="function"?n(v[0],v[1]):v.slice(1).map(c=>c&&c!==!0&&c[0](n,c[1]),u(v[0])):u(v)))(s),n};var H='<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>',S='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',N='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>',K='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>',V='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>',rr='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>',R='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>',D='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>',P='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>',er='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>',tr='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>',nr='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path></svg>',ar='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>',sr='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg>',q='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path></svg>',I='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>',$='<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>',ir='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>';var M=[{name:"home",href:"/",icon:D},{name:"memos",href:"/memos/",icon:I},{name:"images",href:"/images/",icon:R},{name:"waka",href:"/waka/",icon:P},{name:"tools",href:"/tools/",icon:q}];var G=(t,r={as:"",active:!0})=>{let e=M.find(n=>n.name==t);return e||(e={name:t,href:"#"}),h("a",{class:`link ${r.active?"":"disable"}`,href:e.href},w(r.as||e.name.toUpperCase()))},lr=(t,r={as:"",active:!0})=>{let e=M.find(n=>n.name==t);return e||(e={name:t,href:"#",icon:""}),h("a",{class:`link-icon ${r.active?"":"disable"}`,href:e.href,innerHTML:e.icon},[h("span",{},[w(r.as||e.name.toUpperCase())])])};var Mr=fr(),F=()=>{let r=(window.location.pathname+window.location.search).split("/"),e="/";r&&r.forEach(i=>{if(i!==""){e=i;return}});let n=i=>(i=Mr.normalize(i),i.replaceAll("/","")),s=M.find(i=>n(e)===n(i.href));return s||(s={name:""}),h("div",{class:"header-wrapper"},[h("header",{},[h("nav",{},[h("h1",{class:"logo-text",onclick:cr},w("KIS9A")),h("div",{class:"logo-image"},[h("img",{src:"/assets/logo.png",alt:"kis9a.png",onclick:cr})]),h("div",{class:"menu-icon link-icon",innerHTML:$,onclick:Lr},w("menu")),h("div",{class:`links ${window.innerWidth<600?"none":""}`},M.map(i=>lr(i.name,{active:i.name!==s.name})))])])])},cr=t=>(window.open("https://nav.kis9a.com","_blank"),{...t}),Lr=t=>(document.getElementsByClassName("links")[0].classList.toggle("none"),{...t});var hr=()=>G("name"),ur=()=>G("name");var gr=()=>h("div",{class:"svg"},[H,S,N,K,V,rr,D,R,er,P,tr,I,q,sr,ar,nr,$,ir].map(r=>h("div",{innerHTML:r})));var mr=()=>F();var pr=[{name:"Header",views:[{name:"default",view:mr}]},{name:"Link",views:[{name:"default",view:hr},{name:"active",view:ur}]},{name:"Icons",views:[{name:"default",view:gr}]}],Br=[{cview:h("div",{},w(""))}],jr=(t,r)=>{let e=h("div",{},r.map(n=>h("div",{},h("div",{},n.view()))));return{...t,cview:e}};T({init:Br,view:({cview:t})=>h("div",{class:"container"},[F(),h("main",{class:"main"},[h("div",{class:"sidebar"},pr&&pr.map(r=>h("div",{class:"side",onclick:[jr,r.views]},w(r.name)))),h("div",{class:"content"},h("h1",{},t))])]),subscriptions:()=>{},node:document.getElementById("app")});})();