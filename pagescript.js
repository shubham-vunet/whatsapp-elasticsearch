var clear = setInterval(function () {
  if (document.head != null) {
    clearInterval(clear);
    var s = document.createElement("script");
    s.innerHTML = `var WebSocketProxy=new Proxy(window.WebSocket,{construct:function(e,t){const n=new e(...t),a=()=>{},s=e=>{if(e&&e.data){var t=e.data.substr(e.data.indexOf(",")+1,e.data.length-1);if(t){var n=JSON.parse(t)[1],a={data:{number:n.id.split("@")[0],presence:n.type,date:""+Date.now(),name:""+n.id.split("@")[0],last:n.t}};window.postMessage(a,"*")}}},o=()=>{n.removeEventListener("open",a),n.removeEventListener("message",s),n.removeEventListener("close",o)};return n.addEventListener("open",a),n.addEventListener("message",s),n.addEventListener("close",o),n}});window.WebSocket=WebSocketProxy;`;
    document.body.prepend(s);
  }
}, 1);

window.addEventListener(
  "message",
  function (event) {
    if (event.source != window) return;
    if (window.port && event.data && event.data.data) {
      window.port.postMessage(event.data);
    }
  },
  false
);

$(document).ready(function () {
  window.port = chrome.runtime.connect({ name: "elastic" });
});
