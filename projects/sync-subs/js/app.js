!function(a){"use strict";function b(a,b){var c=new FileReader;c.onload=function(a){b(a.target.result)},c.readAsText(a)}function c(a,b){var c=new Blob([a],{type:"text/plain"});d(c,b||"subtitle.srt")}var d=window.saveAs||(window.navigator.msSaveBlob?function(a,b){return window.navigator.msSaveBlob(a,b)}:!1)||window.webkitSaveAs||window.mozSaveAs||window.msSaveAs||function(){return window.URL=window.URL||window.webkitURL,window.URL?function(a,b){var c=URL.createObjectURL(a);if("download"in document.createElement("a")){var d=document.createElement("a");d.setAttribute("href",c),d.setAttribute("download",b);var e=document.createEvent("MouseEvent");e.initMouseEvent("click",!0,!0,window,0,event.screenX,event.screenY,event.clientX,event.clientY,event.ctrlKey,event.altKey,event.shiftKey,event.metaKey,0,null),d.dispatchEvent(e)}else window.open(c,"_blank","")}:!1}();a.File={read:b,save:c}}(window.SyncSubs=window.SyncSubs||{}),function(a){function b(a,b){var c={};return c[a]=b,c}function c(a){var b=a.split(":");try{var c=b[2].split(",");return 1===c.length&&(c=b[2].split(".")),3600*parseFloat(b[0],10)+60*parseFloat(b[1],10)+parseFloat(c[0],10)+parseFloat(c[1],10)/1e3}catch(d){return 0}}function d(a){for(var b=a.length-1;b>=0&&!a[b];)b--;return b}var e=function(a){var e,f,g,h,i,j={title:"",remote:"",data:[]},k=[],l=0,m=0;for(e=a.text.split(/(?:\r\n|\r|\n)/gm),h=d(e)+1,l=0;h>l;l++){for(i={},g=[],i.id=parseInt(e[l++],10),f=e[l++].split(/[\t ]*-->[\t ]*/),i.start=c(f[0]),m=f[1].indexOf(" "),-1!==m&&(f[1]=f[1].substr(0,m)),i.end=c(f[1]);h>l&&e[l];)g.push(e[l++]);i.text=g.join("\\N").replace(/\{(\\[\w]+\(?([\w\d]+,?)+\)?)+\}/gi,""),i.text=i.text.replace(/</g,"&lt;").replace(/>/g,"&gt;"),i.text=i.text.replace(/&lt;(\/?(font|b|u|i|s))((\s+(\w|\w[\w\-]*\w)(\s*=\s*(?:\".*?\"|'.*?'|[^'\">\s]+))?)+\s*|\s*)(\/?)&gt;/gi,"<$1$3$7>"),i.text=i.text.replace(/\\N/gi,"<br />"),k.push(b("subtitle",i))}return j.data=k,j};a.Parser=a.Parser||{},a.Parser.SRT=e}(window.SyncSubs=window.SyncSubs||{}),function(a){"use strict";function b(a){var b=a+"";return 1===b.length?"0"+b:b}function c(a){var c=0,d=0,e=0,f=0,g=a>=0,h=Math.abs(a);return c=Math.round(1e3*(h%1)),h-=c/1e3,d=Math.round(h%60),h-=d,e=Math.round(h/60%60),h-=60*e,f=Math.round(h/3600),(g?"":"-")+b(f)+":"+b(e)+":"+b(d)+","+c}a.Utils={formatTime:c}}(window.SyncSubs=window.SyncSubs||{}),function(a){"use strict";function b(a,b){return{id:a.id,start:a.start+b,end:a.end+b,text:a.text}}function c(b){return[b.id,a.Utils.formatTime(b.start)+"-->"+a.Utils.formatTime(b.end),b.text].join("<br/>")}function d(b){var c="";return c+=b.id+"\n",c+=a.Utils.formatTime(b.start)+" --> "+a.Utils.formatTime(b.end)+"\n",c+=b.text.replace(/<br \/>/gi,"\n")+"\n\n"}a.Transform={applyTimeShift:b,toHTML:c,toFileContents:d}}(window.SyncSubs=window.SyncSubs||{}),function(){"use strict";function a(){k.addEventListener("change",c,!1);var a=new XMLHttpRequest;a.upload?(j.addEventListener("dragover",b,!1),j.addEventListener("dragleave",b,!1),j.addEventListener("drop",c,!1),j.style.display="block"):j.style.display="none",h.addEventListener("change",function(){d()},!1),i.addEventListener("click",function(){if(null!==m){var a=m,b="",c=+h.value;a.forEach(function(a){var d=e.Transform.applyTimeShift(a.subtitle,c);b+=e.Transform.toFileContents(d)}),e.File.save(b,l||"subtitle.srt")}},!1)}function b(a){a.stopPropagation(),a.preventDefault(),a.target.className="dragover"===a.type?"hover":""}function c(a){b(a);var c=a.target.files||a.dataTransfer.files,f=c[0];l=f.name,e.File.read(f,function(a){var b={text:a};m=e.Parser.SRT(b).data,document.querySelector(".preview-section").style.display="block",d()})}function d(){if(null===m)f.innerHTML="Please, select a SRT file";else{f.innerHTML=e.Transform.toHTML(m[0].subtitle)+e.Transform.toHTML(m[1].subtitle);var a=+h.value;g.innerHTML=e.Transform.toHTML(e.Transform.applyTimeShift(m[0].subtitle,a))+e.Transform.toHTML(e.Transform.applyTimeShift(m[1].subtitle,a))}}var e=window.SyncSubs,f=document.getElementById("preview-orig"),g=document.getElementById("preview-after"),h=document.getElementById("time-shift"),i=document.getElementById("download"),j=document.getElementById("filedrag"),k=document.getElementById("fileselect"),l=null;document.getElementById("select-file").addEventListener("click",function(){k.click()});var m=null;window.File&&window.FileList&&window.FileReader?a():alert("Your browser does not support File")}();