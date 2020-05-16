var WebSocketProxy = new Proxy(window.WebSocket, {
  construct: function (target, args) {
    const instance = new target(...args);
    const openHandler = () => {};

    const messageHandler = (event) => {
      if (event && event.data) {
        var json = event.data.substr(
          event.data.indexOf(",") + 1,
          event.data.length - 1
        );
        if (json) {
          var obj = JSON.parse(json)[1];
          var msg = {
            data: {
              number: obj.id.split("@")[0],
              presence: obj.type,
              "@timestamp": new Date(),
              name: "" + obj.id.split("@")[0],
              last: obj.t,
            },
          };
          window.postMessage(msg, "*");
        }
      }
    };

    const closeHandler = () => {
      instance.removeEventListener("open", openHandler);
      instance.removeEventListener("message", messageHandler);
      instance.removeEventListener("close", closeHandler);
    };

    instance.addEventListener("open", openHandler);
    instance.addEventListener("message", messageHandler);
    instance.addEventListener("close", closeHandler);

    return instance;
  },
});

window.WebSocket = WebSocketProxy;
