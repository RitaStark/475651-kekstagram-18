'use strict';

var COUNT = 25;

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

for (var i = 1; i <= COUNT; i++) {
  var urlList = 'photos/' + i + '.jpg';
  var avatarList = 'img/avatar-' + i + '.svg';
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
};

// конец выполнения первого пункта задания ---------------------------------------------------


// var fragment = document.createDocumentFragment();

var pictureInfo = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('a');
for (var i = 0; i < COUNT; i++) {
  var element = template.cloneNode(true);
  element.children[0].textContent = i;
  pictureInfo.appendChild(element);
  // fragment.appendChild(element);
  console.log(pictureInfo);
};


var fillFunction = function () {
  for (var i = 1; i < COUNT; i++) {
    var userImage = document.querySelectorAll('.picture__img');
    var userLikes = document.querySelectorAll('.picture__likes');
    var userComments = document.querySelectorAll('.picture__comments');
    userImage[i].src = 'photos/' + i + '.jpg';
    userLikes[i].textContent = objectItem.likes;
    userComments[i].textContent = objectItem.comments.message;
  };
};
fillFunction();

console.log(pictureInfo);


// pictureInfo.appendChild(fragment);
