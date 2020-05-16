var interval = setInterval(function () {
  if (document.head != null) {
    clearInterval(interval);
    var element = document.createElement("script");
    element.innerHTML = `var WebSocketProxy=new Proxy(window.WebSocket,{construct:function(e,t){const n=new e(...t),a=e=>{},s=e=>{if(e&&e.data&&e.data.indexOf&&-1!==e.data.indexOf("Presence")){var t=e.data.substr(e.data.indexOf(",")+1,e.data.length-1);if(t){var n=JSON.parse(t)[1],a={data:{number:n.id.split("@")[0],presence:n.type,date:""+Date.now()}};n.t&&(a.data.last=n.t),window.postMessage(a,"*")}}},r=e=>{n.removeEventListener("open",a),n.removeEventListener("message",s),n.removeEventListener("close",r)};return n.addEventListener("open",a),n.addEventListener("message",s),n.addEventListener("close",r),n}});window.WebSocket=WebSocketProxy;`;
    document.body.prepend(element);
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
