'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();

    var onError = function (message) {
      console.log("error");
    };

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + 'xht.statusText')
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения')
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
