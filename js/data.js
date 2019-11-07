'use strict';

(function () {
  // var COUNT = 24;

  // var randomNumberCulculation = function (min, max) {
  //   var randomNumber = min + Math.random() * (max + 1 - min);
  //   return Math.round(randomNumber);
  // };

  // var randomItemCulculation = function (arr) {
  //   var randomItem = Math.floor(Math.random() * arr.length);
  //   return arr[randomItem];
  // }

  // var commentList = [
  //   'Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  // ];

  // var namesList = ['Вася', 'Петя', 'Артем', 'Иван', 'Маша', 'Саша', 'Даша', 'Коля'];


  // var objectArray = [];
  // for (var i = 0; i < COUNT; i++) {
  //   var urlList = 'photos/' + (i + 1) + '.jpg';
  //   var avatarList = 'img/avatar-' + (i + 1) + '.svg';
  //   var objectItem = {
  //     url: urlList,
  //     description: 'Описание фото',
  //     likes: randomNumberCulculation(15, 200),
  //     comments: {
  //       avatar: avatarList,
  //       message: randomItemCulculation(commentList),
  //       name: randomItemCulculation(namesList),
  //     }
  //   }
  //   objectArray[i] = objectItem;
  // };


  // функция, которая принимает объект с данными, описывающими фото-пост (url, likes, comments..).
  // Возвращает новый HTML-элемент, который является визуальным представлением поста(картинка с комментариями, кол-вом сердечек).
  var renderItem = function (object) {
    var template = document.querySelector('#picture').content.querySelector('a');
    var element = template.cloneNode(true);
    var userImage = element.querySelector('.picture__img');
    var userLikes = element.querySelector('.picture__likes');
    var userComments = element.querySelector('.picture__comments');
    userImage.src = object.url;
    userLikes.textContent = object.likes;
    userComments.textContent = 1;
    return element;
  };


  // функция, которая перебирает массив данных, рендерит каждый элемент массива с помощью функции renderItem, получившиеся элетменты добавляет в DOM элемент, который представляет собой контейнер с фото.
  var pictureInfo = document.querySelector('.pictures');
  var renderData = function (myData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < myData.length; i++) {
      var elem = renderItem(myData[i]);
      fragment.appendChild(elem);
      window.myData = myData;
    };
    pictureInfo.appendChild(fragment);
  };


  var errorMessage = document.querySelector("#error").content.querySelector("section");

  var onError = function (message) {
    var elem = errorMessage.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    pictureInfo.appendChild(fragment);
  };

  // var onSuccess = function (data) {
  //   renderData(data);
  // };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      errorMessage.parentNode.removeChild(errorMessage);
    }
  });


  // window.load(onSuccess, onError);


  window.load(renderData, onError);
  window.pictureInfo = pictureInfo;


  var filters = document.querySelector(".img-filters");
  filters.classList.remove("img-filters--inactive");

  var popular = document.querySelector("#filter-popular");
  popular.addEventListener("click", function (evt) {
    evt.preventDefault();
    var myArr = window.myData;
    console.log(myArr);
  });

  var random = document.querySelector("#filter-random");
  random.addEventListener("click", function (evt) {
    evt.preventDefault();
    var myArr = window.myData;
    var myArrCopy = myArr.slice();
    for (var i = 0; i < 10; i++) {
      var myArrItem = myArrCopy[Math.floor(Math.random() * myArrCopy.length)];
      console.log(myArrItem);
    };
  });

  var discussed = document.querySelector("#filter-discussed");
  discussed.addEventListener("click", function (evt) {
    evt.preventDefault();
    var myArr = window.myData;
    var myArrCopy = myArr.slice();
    myArrCopy.sort(function (a, b) {
      // return a.comments - b.comments;
      if (a.comments < b.comments) {
        return 1;
      } else if (a.comments > b.comments) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(myArrCopy);
  });

  // var someFn = function (myData) {
  // window.data.myData = myData;
  // renderData(myData);
  // };

  // window.load(someFn, onError);

})();


