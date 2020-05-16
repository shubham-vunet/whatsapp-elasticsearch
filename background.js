var sendPushNotification = function (data) {
  var content = JSON.stringify(data);
  $.ajax({
    url: "http://localhost:9200/whatsapp/update/" + newGuid(),
    method: "PUT",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: content,
    cache: false,
  });
};
function newGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "elastic") {
    port.onMessage.addListener(function (data) {
      if (data && data.data) {
        sendPushNotification(data.data);
      }
    });
  }
});
