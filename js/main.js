'use strict';

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


// --------------------------------------------------------------------------------


var upload = document.querySelector('#upload-file');
var changeImage = document.querySelector('.img-upload__overlay');
var closeButton = changeImage.querySelector('.img-upload__cancel');

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  changeImage.classList.remove('hidden');
});

closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeImage.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    changeImage.classList.add('hidden');
  }
});



var scaleControl = document.querySelector(".scale");
var scaleSmaller = scaleControl.querySelector(".scale__control--smaller");
var scaleBigger = scaleControl.querySelector(".scale__control--bigger");
var scaleValue = scaleControl.querySelector(".scale__control--value");
scaleValue.value = 100 + "%";
var numberScaleValue = parseInt(scaleValue.value);

var scaleSmallerClickHandler = function () {
  if (numberScaleValue > 25 && numberScaleValue <= 100) {
    numberScaleValue -= 25;
    var percentScaleValue = numberScaleValue + "%";
    scaleValue.value = percentScaleValue;
    var imagePreview = document.querySelector(".img-upload__preview").style.transform = "scale(" + numberScaleValue / 100 + ")";
  }
};
scaleSmaller.addEventListener("click", scaleSmallerClickHandler);


var scaleBiggerClickHandler = function () {
  if (numberScaleValue >= 25 && numberScaleValue < 100) {
    numberScaleValue += 25;
    var percentScaleValue = numberScaleValue + "%";
    scaleValue.value = percentScaleValue;
    var imagePreview = document.querySelector(".img-upload__preview").style.transform = "scale(" + numberScaleValue / 100 + ")";
  }
};
scaleBigger.addEventListener("click", scaleBiggerClickHandler);



var effects = document.querySelector(".effects");
var effectsRadio = effects.querySelector(".effects__radio");
var imgPreview = document.querySelector(".img-upload__preview img");
var currentEffect = "none";

var applyEffect = function (name, strength) {
  if (name == "chrome") {
    imgPreview.style.filter = "grayscale(" + strength + ")";
  } else if (name == "sepia") {
    imgPreview.style.filter = "sepia(" + strength + ")";
  } else if (name == "marvin") {
    imgPreview.style.filter = "invert(" + (strength * 100) + "%)";
  } else if (name == "phobos") {
    imgPreview.style.filter = "blur(" + (strength * 3) + "px)";
  } else if (name == "heat") {
    imgPreview.style.filter = "brightness(" + (strength * 2 + 1) + ")";
  } else {
    imgPreview.style.filter = "";
  }

};



imgPreview.classList.add("effects__preview--none");

var addEffectHandler = function (event) {
  // imgPreview.className = "";

  var target = event.target;
  // if (target.value == "chrome") {
  //   imgPreview.classList.add("effects__preview--chrome");
  // } else if (target.value == "sepia") {
  //   imgPreview.classList.add("effects__preview--sepia");
  // } else if (target.value == "marvin") {
  //   imgPreview.classList.add("effects__preview--marvin");
  // } else if (target.value == "phobos") {
  //   imgPreview.classList.add("effects__preview--phobos");
  // } else if (target.value == "heat") {
  //   imgPreview.classList.add("effects__preview--heat");
  // } else {
  //   imgPreview.classList.add("effects__preview--none");
  //   effectLevel.classList.add('hidden');
  // }
  currentEffect = target.value;
  applyEffect(currentEffect, 1);
};
effects.addEventListener("change", addEffectHandler);


var pinHandle = document.querySelector(".effect-level__pin");
var pinValue = document.querySelector(".effect-level__value");
var pinLine = document.querySelector(".effect-level__line");


pinHandle.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var newLeft = pinHandle.offsetLeft - shift.x;
    // if (newLeft >= pinLine.clientWidth) {
    //   newLeft = pinLine.clientWidth - 1;
    // };
    newLeft = Math.min(newLeft, pinLine.clientWidth - 1);
    // if (newLeft < 0) {
    //   newLeft = 0;
    // };
    newLeft = Math.max(newLeft, 0);

    // newLeft = Math.max(Math.min(newLeft, pinLine.clientWidth), 0);

    pinHandle.style.left = newLeft + "px";
    console.log("clientX", moveEvt.clientX, "offsetleft", pinHandle.offsetLeft, "width", pinLine.clientWidth);

    // filters

    var effectStrength = newLeft / (pinLine.clientWidth - 1);
    console.log("Сила эффекта", effectStrength);
    applyEffect(currentEffect, effectStrength);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});



// function showLineCoords(event) {
//   var x = event.clientX;
//   return x;
// };
// console.log(pinLine);
