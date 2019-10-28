'use strict';

(function () {
  var COUNT = 24;

  var randomNumberCulculation = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.round(randomNumber);
  };

  var randomItemCulculation = function (arr) {
    var randomItem = Math.floor(Math.random() * arr.length);
    return arr[randomItem];
  }

  var commentList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  var namesList = ['Вася', 'Петя', 'Артем', 'Иван', 'Маша', 'Саша', 'Даша', 'Коля'];


  var objectArray = [];
  for (var i = 0; i < COUNT; i++) {
    var urlList = 'photos/' + (i + 1) + '.jpg';
    var avatarList = 'img/avatar-' + (i + 1) + '.svg';
    var objectItem = {
      url: urlList,
      description: 'Описание фото',
      likes: randomNumberCulculation(15, 200),
      comments: {
        avatar: avatarList,
        message: randomItemCulculation(commentList),
        name: randomItemCulculation(namesList),
      }
    }
    objectArray[i] = objectItem;
  };

  var render = function (object) {
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

  var pictureInfo = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();


  var fillBlock = function () {
    for (var i = 0; i < COUNT; i++) {
      var picture = render(objectArray[i]);
      fragment.appendChild(picture);
    };
  };
  fillBlock(picture);


  pictureInfo.appendChild(fragment);

})();
