import{app,h,text}from"/js/lib/hyperapp.js";import snarkdown from"/js/lib/snarkdown.js";import{Header}from"/js/components/header.js";import{Http}from"/js/lib/hyperapp-fx/fx/Http.js";import{svg_top,svg_close,svg_clear,svg_share,svg_raw,svg_memo,}from"/js/components/icons.js";const getIndexesJson=Http({url:"../data/memos-indexes.json",response:"json",action:(b,a)=>(initialState[0].indexes=a,{...b,indexes:a||[]})}),getContent=a=>Http({url:`../memos/${a}`,response:"text",action:(b,c)=>({...b,content:{...b.content,name:a,content:c},contents:[...b.contents,{name:a,content:c}]})}),setContent=(a,c)=>{const b=c.target.innerHTML,d=!a.contents.every(a=>a.name!==b);if(d){const c=a.contents.find(a=>a.name===b);return{...a,content:c}}return[a,getContent(b)]},setInputValue=(a,c)=>{const b=c.target.value,d=onSearchIndex(a,b);return{...a,inputValue:b,indexes:d,showIndexes:!0}},setInputContent=(a,c)=>{const b=c.target.value,d=a.contents.map(a=>(a.name=="memo"&&(a.content=b),a));return{...a,content:{...a.content,content:b},contents:d}},removeContent=(a,b)=>{if(a.content.name==b){let c=0;a.contents.forEach((a,d)=>{a.name==b&&(c=d)}),a.content=a.contents[c-1]}return a.contents=a.contents.filter(a=>a.name!==b),{...a}},onSelect=(a,b)=>{if(a.content.name==b)return{...a};const c=a.contents.find(a=>a.name===b);return c?{...a,content:c}:{...a}},onSearchIndex=(b,a)=>{a||(b.indexes=initialState[0].indexes);const c=initialState[0].indexes.filter(b=>!!~b.name.indexOf(a));return c},toggleShowIndex=a=>({...a,showIndexes:!a.showIndexes}),clearTabs=b=>{const a=b.contents.find(a=>a.name==="memo");a.content="";const c=[{...a}];return{...b,content:a,contents:c}},copyUrl=b=>{const a=document.createElement("input");return a.value=location.href,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),alert("copied url to share link"),{...b}},toggleRaw=a=>({...a,rawMode:!a.rawMode}),Top=a=>(document.body.scrollTop=0,document.documentElement.scrollTop=0,a),pureState={indexes:"",content:{name:"memo",content:""},contents:[{name:"memo",content:""}],inputValue:"",showIndexes:!1,rawMode:!1},baseName=a=>new String(a).substring(a.lastIndexOf("/")+1),initIndexes=getIndexesJson,initContent=[c=>{const d=initialUrl,b=baseName(d);let a=pureState.content;if(b&&b!=="memo"){const d=c=>(a=c.contents.find(a=>a.name===b),!a)?(a=getContent(b),[c,a]):{...c,content:a};c(d)}}],getUrl=()=>window.location.href,initialUrl=getUrl(),storageState=JSON.parse(window.localStorage.getItem("app")),state=storageState||pureState,initialState=[state,initIndexes,initContent];onscroll=function(){const a=document.getElementById("top");var b=document.documentElement.scrollTop||document.body.scrollTop;b>500?a.classList.remove("hide"):a.classList.add("hide")},app({init:initialState,view:({indexes:b,content:a,contents:c,inputValue:e,showIndexes:d,rawMode:f})=>h("main",{class:"main"},[Header(),h("div",{class:"container"},[h("div",{class:"inputs"},[h("input",{type:"text",value:e,oninput:setInputValue,class:"index-search"}),h("input",{type:"date",placeholder:"Date",class:"input"}),h("input",{type:"date",placeholder:"Date",class:"input"}),h("div",{class:"index-toggle-button",onclick:toggleShowIndex,innerHTML:`${d?"&#9660":"&#9650"}`})]),h("div",{class:`indexes  ${d?"showIndexes":"hide"}`},b&&b.map(a=>h("span",{class:"index",onclick:setContent},text(a.name)))),h("div",{class:"tabs"},[h("div",{class:"tab svg-clear tab-clear",onclick:clearTabs,innerHTML:svg_clear}),h("div",{class:"tab svg-share tab-share",onclick:()=>copyUrl,innerHTML:svg_share}),h("div",{class:"tab svg-share tab-share",onclick:()=>toggleRaw,innerHTML:svg_raw}),...c&&c.map(b=>h("div",{class:`tab ${a.name===b.name?"selected":""}`},[h("span",{onclick:()=>[onSelect,b.name],class:"tab-label memo-tab-label",innerHTML:b.name==="memo"?svg_memo:""},b.name!=="memo"?text(b.name):text("")),b.name!=="memo"&&h("div",{onclick:()=>[removeContent,b.name],innerHTML:svg_close,class:"svg-close tab-close"})]))]),a.name==="memo"&&h("div",{class:"tab-memo"},[h("textarea",{rows:20,value:a.content||" ",oninput:setInputContent,class:"content tab-memo-input"}),h("div",{class:"content tab-memo-view",innerHTML:snarkdown(a.content)})]),a.name!=="memo"&&h("div",{class:`content ${a.content?"":"no-content"}`,innerHTML:f?a.content:snarkdown(a.content)}),h("div",{id:"top",class:"svg-top hide",innerHTML:svg_top,onclick:Top})])]),subscriptions:b=>{const a=b.content&&b.content.name;a&&a!=="memo"?window.location.href=`#/${a}`:a=="memo"&&(window.location.href="#/"),window.localStorage.setItem("app",JSON.stringify(b))},node:document.getElementById("app")})