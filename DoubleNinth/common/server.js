var server = {};
//exports.server = server;
var basePath = location.host;
var transId = '';
var baseUrl = "http://activity.camera360.com";

//这是开发环境
if (basePath.indexOf("-test") > -1 || basePath.indexOf("-ktv") > -1 || location.host == "localhost" || location.host.indexOf("192.168") > -1) {
    baseUrl = "http://activity-test.camera360.com";
}
function request(url, param, callback) {
  $.ajax({
    url: baseUrl + url,
    type: 'GET',
    dataType: 'json',
    data: param || {}
  })
    .done(function (res) {
      console.log("success");
      if (callback) {
        callback(res);
      }

    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}

requestJSONP = function (url, param, callback) {
  $.ajax({
    url:  url,
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsonpCallback',
    data: param || {}
  })
    .done(function (res) {
      console.log("success");
      if (callback) {
        callback(res);
      }
      ;
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });

};
server.download = function (data, url, callback) {
    $.ajax({
        //url: baseUrl+'/movieShow/download/show',
        url: baseUrl + url,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
        data: data ? data : {}
    })
        .done(function (res) {
            if (callback) callback(res);
        })
        .fail(function () {
//            console.log("error");
        })
        .always(function () {
//            console.log("complete");
        });
};

//if (module){
//  module.exports = server;
//} else {
//  window.server = server;
//}
