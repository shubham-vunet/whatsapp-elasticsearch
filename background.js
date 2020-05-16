var sendPushNotification = function (data) {
  var content = JSON.stringify(data);
  $.ajax({
    url: "http://localhost:9200/whatsapp/update/" + data.id,
    method: "PUT",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: content,
    cache: false,
  });
};
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "elastic") {
    port.onMessage.addListener(function (data) {
      if (data && data.data) {
        sendPushNotification({
          ...data.data,
          "@timestamp": new Date(),
        });
      }
    });
  }
});
