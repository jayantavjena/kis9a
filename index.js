var ne=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var N=ne((Ie,Z)=>{"use strict";function C(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}function W(n,e){for(var t="",r=0,i=-1,a=0,s,o=0;o<=n.length;++o){if(o<n.length)s=n.charCodeAt(o);else{if(s===47)break;s=47}if(s===47){if(!(i===o-1||a===1))if(i!==o-1&&a===2){if(t.length<2||r!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){var l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",r=0):(t=t.slice(0,l),r=t.length-1-t.lastIndexOf("/")),i=o,a=0;continue}}else if(t.length===2||t.length===1){t="",r=0,i=o,a=0;continue}}e&&(t.length>0?t+="/..":t="..",r=2)}else t.length>0?t+="/"+n.slice(i+1,o):t=n.slice(i+1,o),r=o-i-1;i=o,a=0}else s===46&&a!==-1?++a:a=-1}return t}function ve(n,e){var t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||"");return t?t===e.root?t+r:t+n+r:r}var b={resolve:function(){for(var e="",t=!1,r,i=arguments.length-1;i>=-1&&!t;i--){var a;i>=0?a=arguments[i]:(r===void 0&&(r=process.cwd()),a=r),C(a),a.length!==0&&(e=a+"/"+e,t=a.charCodeAt(0)===47)}return e=W(e,!t),t?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(C(e),e.length===0)return".";var t=e.charCodeAt(0)===47,r=e.charCodeAt(e.length-1)===47;return e=W(e,!t),e.length===0&&!t&&(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return C(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,t=0;t<arguments.length;++t){var r=arguments[t];C(r),r.length>0&&(e===void 0?e=r:e+="/"+r)}return e===void 0?".":b.normalize(e)},relative:function(e,t){if(C(e),C(t),e===t||(e=b.resolve(e),t=b.resolve(t),e===t))return"";for(var r=1;r<e.length&&e.charCodeAt(r)===47;++r);for(var i=e.length,a=i-r,s=1;s<t.length&&t.charCodeAt(s)===47;++s);for(var o=t.length,l=o-s,h=a<l?a:l,m=-1,u=0;u<=h;++u){if(u===h){if(l>h){if(t.charCodeAt(s+u)===47)return t.slice(s+u+1);if(u===0)return t.slice(s+u)}else a>h&&(e.charCodeAt(r+u)===47?m=u:u===0&&(m=0));break}var f=e.charCodeAt(r+u),p=t.charCodeAt(s+u);if(f!==p)break;f===47&&(m=u)}var c="";for(u=r+m+1;u<=i;++u)(u===i||e.charCodeAt(u)===47)&&(c.length===0?c+="..":c+="/..");return c.length>0?c+t.slice(s+m):(s+=m,t.charCodeAt(s)===47&&++s,t.slice(s))},_makeLong:function(e){return e},dirname:function(e){if(C(e),e.length===0)return".";for(var t=e.charCodeAt(0),r=t===47,i=-1,a=!0,s=e.length-1;s>=1;--s)if(t=e.charCodeAt(s),t===47){if(!a){i=s;break}}else a=!1;return i===-1?r?"/":".":r&&i===1?"//":e.slice(0,i)},basename:function(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');C(e);var r=0,i=-1,a=!0,s;if(t!==void 0&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var o=t.length-1,l=-1;for(s=e.length-1;s>=0;--s){var h=e.charCodeAt(s);if(h===47){if(!a){r=s+1;break}}else l===-1&&(a=!1,l=s+1),o>=0&&(h===t.charCodeAt(o)?--o==-1&&(i=s):(o=-1,i=l))}return r===i?i=l:i===-1&&(i=e.length),e.slice(r,i)}else{for(s=e.length-1;s>=0;--s)if(e.charCodeAt(s)===47){if(!a){r=s+1;break}}else i===-1&&(a=!1,i=s+1);return i===-1?"":e.slice(r,i)}},extname:function(e){C(e);for(var t=-1,r=0,i=-1,a=!0,s=0,o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(l===47){if(!a){r=o+1;break}continue}i===-1&&(a=!1,i=o+1),l===46?t===-1?t=o:s!==1&&(s=1):t!==-1&&(s=-1)}return t===-1||i===-1||s===0||s===1&&t===i-1&&t===r+1?"":e.slice(t,i)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return ve("/",e)},parse:function(e){C(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;var r=e.charCodeAt(0),i=r===47,a;i?(t.root="/",a=1):a=0;for(var s=-1,o=0,l=-1,h=!0,m=e.length-1,u=0;m>=a;--m){if(r=e.charCodeAt(m),r===47){if(!h){o=m+1;break}continue}l===-1&&(h=!1,l=m+1),r===46?s===-1?s=m:u!==1&&(u=1):s!==-1&&(u=-1)}return s===-1||l===-1||u===0||u===1&&s===l-1&&s===o+1?l!==-1&&(o===0&&i?t.base=t.name=e.slice(1,l):t.base=t.name=e.slice(o,l)):(o===0&&i?(t.name=e.slice(1,s),t.base=e.slice(1,l)):(t.name=e.slice(o,s),t.base=e.slice(o,l)),t.ext=e.slice(s,l)),o>0?t.dir=e.slice(0,o-1):i&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};b.posix=b;Z.exports=b});var P=1,_=3,U={},S=[],ie="http://www.w3.org/2000/svg",q=n=>n,se=S.map,M=Array.isArray,ae=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:setTimeout,B=n=>{var e="";if(typeof n=="string")return n;if(M(n))for(var t=0,r;t<n.length;t++)(r=B(n[t]))&&(e+=(e&&" ")+r);else for(var t in n)n[t]&&(e+=(e&&" ")+t);return e},oe=(n,e)=>{for(var t in{...n,...e})if(typeof(M(n[t])?n[t][0]:n[t])=="function")e[t]=n[t];else if(n[t]!==e[t])return!0},le=(n,e=S,t)=>{for(var r=[],i=0,a,s;i<n.length||i<e.length;i++)a=n[i],s=e[i],r.push(s&&s!==!0?!a||s[0]!==a[0]||oe(s[1],a[1])?[s[0],s[1],(a&&a[2](),s[0](t,s[1]))]:a:a&&a[2]());return r},A=n=>n==null?n:n.key,Q=(n,e,t,r,i,a)=>{if(e!=="key")if(e==="style")for(var s in{...t,...r})t=r==null||r[s]==null?"":r[s],s[0]==="-"?n[e].setProperty(s,t):n[e][s]=t;else e[0]==="o"&&e[1]==="n"?((n.events||(n.events={}))[e=e.slice(2)]=r)?t||n.addEventListener(e,i):n.removeEventListener(e,i):!a&&e!=="list"&&e!=="form"&&e in n?n[e]=r??"":r==null||r===!1||e==="class"&&!(r=B(r))?n.removeAttribute(e):n.setAttribute(e,r)},j=(n,e,t)=>{var r=n.props,i=n.type===_?document.createTextNode(n.tag):(t=t||n.tag==="svg")?document.createElementNS(ie,n.tag,{is:r.is}):document.createElement(n.tag,{is:r.is});for(var a in r)Q(i,a,null,r[a],e,t);for(var s=0;s<n.children.length;s++)i.appendChild(j(n.children[s]=T(n.children[s]),e,t));return n.node=i},L=(n,e,t,r,i,a)=>{if(t!==r)if(t!=null&&t.type===_&&r.type===_)t.tag!==r.tag&&(e.nodeValue=r.tag);else if(t==null||t.tag!==r.tag)e=n.insertBefore(j(r=T(r),i,a),e),t!=null&&n.removeChild(t.node);else{var s,o,l,h,m=t.props,u=r.props,f=t.children,p=r.children,c=0,v=0,d=f.length-1,x=p.length-1;a=a||r.tag==="svg";for(var g in{...m,...u})(g==="value"||g==="selected"||g==="checked"?e[g]:m[g])!==u[g]&&Q(e,g,m[g],u[g],i,a);for(;v<=x&&c<=d&&!((l=A(f[c]))==null||l!==A(p[v]));)L(e,f[c].node,f[c],p[v]=T(p[v++],f[c++]),i,a);for(;v<=x&&c<=d&&!((l=A(f[d]))==null||l!==A(p[x]));)L(e,f[d].node,f[d],p[x]=T(p[x--],f[d--]),i,a);if(c>d)for(;v<=x;)e.insertBefore(j(p[v]=T(p[v++]),i,a),(o=f[c])&&o.node);else if(v>x)for(;c<=d;)e.removeChild(f[c++].node);else{for(var z={},D={},g=c;g<=d;g++)(l=f[g].key)!=null&&(z[l]=f[g]);for(;v<=x;){if(l=A(o=f[c]),h=A(p[v]=T(p[v],o)),D[l]||h!=null&&h===A(f[c+1])){l==null&&e.removeChild(o.node),c++;continue}h==null||t.type===P?(l==null&&(L(e,o&&o.node,o,p[v],i,a),v++),c++):(l===h?(L(e,o.node,o,p[v],i,a),D[h]=!0,c++):(s=z[h])!=null?(L(e,e.insertBefore(s.node,o&&o.node),s,p[v],i,a),D[h]=!0):L(e,o&&o.node,null,p[v],i,a),v++)}for(;c<=d;)A(o=f[c++])==null&&e.removeChild(o.node);for(var g in z)D[g]==null&&e.removeChild(z[g].node)}}return r.node=e},fe=(n,e)=>{for(var t in n)if(n[t]!==e[t])return!0;for(var t in e)if(n[t]!==e[t])return!0},T=(n,e)=>n!==!0&&n!==!1&&n?typeof n.tag=="function"?((!e||e.memo==null||fe(e.memo,n.memo))&&((e=n.tag(n.memo)).memo=n.memo),e):n:E(""),I=n=>n.nodeType===_?E(n.nodeValue,n):R(n.nodeName.toLowerCase(),U,se.call(n.childNodes,I),P,n),R=(n,e,t,r,i)=>({tag:n,props:e,key:e.key,children:t,type:r,node:i});var E=(n,e)=>R(n,U,S,_,e),y=(n,e,t=S)=>R(n,e,M(t)?t:[t]),O=({node:n,view:e,subscriptions:t,dispatch:r=q,init:i=U})=>{var a=n&&I(n),s=[],o,l,h=f=>{o!==f&&((o=f)==null&&(r=t=m=q),t&&(s=le(s,t(o),r)),e&&!l&&ae(m,l=!0))},m=()=>n=L(n.parentNode,n,a,a=e(o),u,l=!1),u=function(f){r(this.events[f.type],f)};return(r=r((f,p)=>typeof f=="function"?r(f(o,p)):M(f)?typeof f[0]=="function"?r(f[0],f[1]):f.slice(1).map(c=>c&&c!==!0&&c[0](r,c[1]),h(f[0])):h(f)))(i),r};var X=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
</svg>
`;var $=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
</svg>
`;var G=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
</svg>
`;var Y=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
</svg>
`;var k=[{name:"home",href:"/",icon:X},{name:"memos",href:"/memos/",icon:Y},{name:"images",href:"/images/",icon:$},{name:"waka",href:"/waka/",icon:G}];var J=(n,e={as:"",active:!0})=>{let t=k.find(r=>r.name==n);return t||(t={name:n,href:"#",icon:""}),y("a",{class:`link-icon ${e.active?"":"disable"}`,href:t.href,innerHTML:t.icon},[y("span",{},[E(e.as||t.name.toUpperCase())])])};var w="data:image/png;base64,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";var ge=N(),H=()=>{let e=(window.location.pathname+window.location.search).split("/"),t="/";e&&e.forEach(a=>{if(a!==""){t=a;return}});let r=a=>(a=ge.normalize(a),a.replaceAll("/","")),i=k.find(a=>r(t)===r(a.href));return i||(i={name:""}),y("div",{class:"header-wrapper"},[y("header",{},[y("nav",{},[y("h1",{class:"logo-text",onclick:K},E("KIS9A")),y("div",{class:"logo-image"},[y("img",{src:w,alt:"kis9a.png",onclick:K,width:"100px",height:"100px"})]),y("div",{class:"links"},k.map(a=>J(a.name,{active:a.name!==i.name})))])])])},K=n=>(window.open("https://nav.kis9a.com","_blank"),{...n});var F=(n,e)=>{n.style.opacity=0;let t=+new Date;var r=function(){n.style.opacity=+n.style.opacity+(new Date-t)/e,t=+new Date,+n.style.opacity<1&&(window.requestAnimationFrame&&requestAnimationFrame(r)||setTimeout(r,10))};r()},V=(n,e)=>{n.style.opacity=1;let t=+new Date;var r=function(){n.style.opacity=+n.style.opacity-(new Date-t)/e,t=+new Date,+n.style.opacity>0&&(window.requestAnimationFrame&&requestAnimationFrame(r)||setTimeout(r,10))};r()};var ee=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
</svg>
`;onscroll=()=>{let n=document.getElementById("top");var e=document.documentElement.scrollTop||document.body.scrollTop;e>600?(n.classList.contains("hide")&&F(n,500),n.classList.remove("hide")):e<500&&(n.classList.contains("hide")||(V(n,200),setTimeout(()=>{n.classList.add("hide")},200)))};var te=()=>y("div",{id:"top",class:"svg-top hide",innerHTML:ee,onclick:de}),de=n=>(window.scrollTo({top:0,left:0,behavior:"smooth"}),n);var re=function(){"use strict";let n=["doctype","html","head","title","base","link","meta","style","script","noscript","body","article","nav","aside","section","header","footer","h1-h6","hgroup","address","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","figure","figcaption","div","table","caption","thead","tbody","tfoot","tr","th","td","col","colgroup","form","fieldset","legend","label","input","button","select","datalist","optgroup","option","textarea","keygen","output","progress","meter","details","summary","command","menu","del","ins","img","iframe","embed","object","param","video","audio","source","canvas","track","map","area","a","em","strong","i","b","u","s","small","abbr","q","cite","dfn","sub","sup","time","code","kbd","samp","var","mark","bdi","bdo","ruby","rt","rp","span","br","wbr"];class e{constructor(){this.topics={},this.hop=this.topics.hasOwnProperty}on(i,a){this.hop.call(this.topics,i)||(this.topics[i]=[]);let s=this.topics[i].push(a)-1;return{remove:()=>{this.topics[i].splice(s,1)}}}emit(i,a={}){return this.hop.call(this.topics,i)?this.topics[i].forEach(s=>s(a)):this}}function t(r){let i=document.createElement("template");return i.innerHTML=r.trim(),i.content.firstElementChild}return class{constructor(r,i,a={}){this.version="1.3.0",this.target=r,this.urls=[].concat(i),this.html=[],this.options={ssl:!0,host:"www.feedrapp.info",support:!0,limit:null,key:null,layoutTemplate:"{entries}",entryTemplate:'<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',tokens:{},outputMode:"json",dateFormat:"dddd MMM Do",dateLocale:"en",offsetStart:!1,offsetEnd:!1,fetchFeed:null,encoding:null,...a},this.events=new e}on(r,i){return this.events.on(`vanilla-rss/${r}`,i),this}render(){return new Promise(async(r,i)=>{try{let s=await this._load();this.feed=s.responseData.feed,this.entries=s.responseData.feed.entries}catch(s){return this.entries=[],this.feed=null,i(s)}let a=this._generateHTMLForEntries();if(this.target&&this.target.append(a.layout),a.entries.length!==0){this.events.emit("vanilla-rss/data",{rss:this,feed:this.feed,entries:this.entries});let s=function(o,l){return o.tagName.toLowerCase()===l.toLowerCase()}(a.layout,"entries")?a.layout:a.layout.querySelector("entries");this._appendEntries(s,a.entries)}r()})}_appendEntries(r,i){i.forEach((a,s)=>{var o=this._wrapContent(a);r.insertAdjacentHTML("beforebegin",o.outerHTML)}),r.remove()}_wrapContent(r){return r.trim().indexOf("<")!==0?t(`<div>${r}</div>`):t(r)}_load(){let r=`${`http${this.options.ssl?"s":""}`}://${this.options.host}`,i={support:this.options.support,version:this.version,q:this.urls.map(s=>encodeURIComponent(s)).join(",")};this.options.offsetStart&&this.options.offsetEnd&&(this.options.limit=this.options.offsetEnd),this.options.limit!==null&&(i.num=this.options.limit),this.options.key!==null&&(i.key=this.options.key),this.options.encoding!==null&&(i.encoding=this.options.encoding),this.options.order&&(i.order=this.options.order);let a=`${r}?${Object.keys(i).map(s=>`${s}=${i[s]}`).join("&")}`;return this._fetchFeed(a)}async _fetchFeed(r){return this.options.fetchFeed?await this.options.fetchFeed(r):await(await fetch(r,{headers:{"Content-Type":"application/json"}})).json()}_generateHTMLForEntries(){let r={entries:[],layout:null};return this.entries.forEach((i,a)=>{let s=this.options.offsetStart,o=this.options.offsetEnd,l;s&&o?a>=s&&a<=o&&this._isRelevant(i,r.entries)&&(l=this._evaluateStringForEntry(this.options.entryTemplate,i),r.entries.push(l)):this._isRelevant(i,r.entries)&&(l=this._evaluateStringForEntry(this.options.entryTemplate,i),r.entries.push(l))}),this.options.entryTemplate?r.layout=this._wrapContent(this.options.layoutTemplate.replace("{entries}","<entries></entries>")):r.layout=this._wrapContent("<div><entries></entries></div>"),r}_isRelevant(r,i){let a=this._getTokenMap(r);return!this.options.filter||(!this.options.filterLimit||this.options.filterLimit!==i.length)&&this.options.filter(r,a)}_evaluateStringForEntry(r,i){var a=r;return(r.match(/(\{.*?\})/g)||[]).forEach(s=>{a=a.replace(s,this._getValueForToken(s,i))}),a}_getFormattedDate(r){if(this.options.dateFormatFunction)return this.options.dateFormatFunction(r);if(typeof moment!="undefined"){var i=moment(new Date(r));return(i=i.locale?i.locale(this.options.dateLocale):i.lang(this.options.dateLocale)).format(this.options.dateFormat)}return r}_getTokenMap(r){if(!this.feedTokens){var i=JSON.parse(JSON.stringify(this.feed));delete i.entries,this.feedTokens=i}return{feed:this.feedTokens,url:r.link,author:r.author,date:this._getFormattedDate(r.publishedDate),title:r.title,body:r.content,shortBody:r.contentSnippet,enclosureUrl:r.enclosure.url,bodyPlain:function(a){for(var s=a.content.replace(/<script[\\r\\\s\S]*<\/script>/gim,"").replace(/<\/?[^>]+>/gi,""),o=0;o<n.length;o++)s=s.replace(new RegExp("<"+n[o],"gi"),"");return s}(r),shortBodyPlain:r.contentSnippet.replace(/<\/?[^>]+>/gi,""),index:this.entries.indexOf(r),totalEntries:this.entries.length,teaserImage:function(a){try{return a.content.match(/(<img.*?>)/gi)[0]}catch(s){return""}}(r),teaserImageUrl:function(a){try{return a.content.match(/(<img.*?>)/gi)[0].match(/src=["'](.*?)["']/)[1]}catch(s){return""}}(r),...this.options.tokens}}_getValueForToken(r,i){var a=this._getTokenMap(i),s=a[r.replace(/[\{\}]/g,"")];if(s!==void 0)return typeof s=="function"?s(i,a):s;throw new Error("Unknown token: "+r+", url:"+this.url)}}}();var Ce=()=>y("main",{id:"loading",style:{width:"100%",textAlign:"left",padding:"20px 40px",fontSize:"16px",fontWeight:"600",opacity:0}},E("Loading ..."));O({view:()=>y("div",{class:"home-container"},[H(),Ce(),te()]),subscriptions:()=>{},node:document.getElementById("app")});window.addEventListener("DOMContentLoaded",function(){let n=document.getElementById("rss-feeds");return new re(n,"https://zenn.dev/kis9a/feed",{limit:20,entryTemplate:'<a class="feed" style="opacity: 0" href="{url}" target="_blank"><img class="feed-thumbnail" src="{enclosureUrl}" alt="{author} {title}" width="280px" height="auto"/></a>'}).render().then(()=>{let t=document.getElementsByClassName("feed");if(t)for(var r of t)F(r,400);document.getElementById("loading").style.display="none"})});window.onload=function(){let n=document.getElementById("loading");n&&F(n,100)};
