'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data1';
  window.load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

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

    // console.log(xhr.readyState);
    xhr.open('GET', URL);
    // console.log(xhr.readyState);
    xhr.send();
    // console.log(xhr.readyState);

  }

})();
