var WebSocketProxy = new Proxy(window.WebSocket, {
    construct: function (target, args) {
      const instance = new target(...args);
      const openHandler = (event) => {};
  
      const messageHandler = (event) => {
        if (
          event &&
          event.data &&
          event.data.indexOf &&
          event.data.indexOf("Presence") !== -1
        ) {
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
                date: "" + Date.now(),
              },
            };
            if (obj.t) {
              msg.data["last"] = obj.t;
            }
  
            window.postMessage(msg, "*");
          }
        }
      };
  
      const closeHandler = (event) => {
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