var s=Object.defineProperty;var r=i=>s(i,"__esModule",{value:!0});var l=(i,t)=>{r(i);for(var o in t)s(i,o,{get:t[o],enumerable:!0})};l(exports,{ScrollAnimation:()=>n});var n=class{startPositionX=0;startPositionY=0;endPositionX=0;endPositionY=0;startTime=0;duration=1e3;animationId;constructor({duration:t}){this.duration=t}easeOutQuart(t){return 1-Math.pow(1-t,4)}animation(){let t=Math.min(1,(Date.now()-this.startTime)/this.duration),o=this.startPositionX+(this.endPositionX-this.startPositionX)*this.easeOutQuart(t),a=this.startPositionY+(this.endPositionY-this.startPositionY)*this.easeOutQuart(t);window.scrollTo(o,a),t<1&&(this.animationId=requestAnimationFrame(()=>{this.animation()}))}cancelScroll(){window.cancelAnimationFrame(this.animationId)}exeScroll({target:t}){this.startPositionX=window.scrollX,this.startPositionY=window.scrollY,this.endPositionX=t.x!=null?t.x:window.scrollX,this.endPositionY=t.y!=null?t.y:window.scrollY,this.startTime=Date.now(),this.animation()}};0&&(module.exports={ScrollAnimation});
