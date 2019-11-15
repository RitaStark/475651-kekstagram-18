'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector(".big-picture__img img");
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var bigPictureLikes = bigPicture.querySelector('.likes-count');


  var bigPictureDescript = bigPicture.querySelector('.social__caption');
  var bigPictureCommentLoad = bigPicture.querySelector('.comments-loader');

  var commentsCount = bigPicture.querySelector('.comments-count');

  var socialComCont = document.querySelector('.social__comments');
  var socialCom = socialComCont.querySelector('.social__comment').cloneNode(true);


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
    userComments.textContent = object.comments.length;


    return element;
  };

  var randomNumberCulculation = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.round(randomNumber);
  };

  var renderItemComment = function (elem) {
    var comment = socialCom.cloneNode(true);
    var socialPic = comment.querySelector('.social__picture');
    var socialText = comment.querySelector('.social__text');

    socialPic.src = 'img/avatar-' + randomNumberCulculation(1, 5) + '.svg';
    socialPic.alt = elem.name;

    socialText.textContent = elem.message;

    return comment;
  };


  window.renderPhoto = function (object) {
    bigPicture.classList.remove('hidden');

    bigPictureImage.src = object.url;
    bigPictureLikes.textContent = object.likes;
    bigPictureDescript.textContent = object.description;

    socialComCont.innerHTML = '';
    commentsCount.textContent = object.comments.length;

    if (object.comments.length > 5) {
      bigPictureCommentLoad.classList.remove('visually-hidden');
    }

    var fragment = document.createDocumentFragment();
    object.comments.slice(0, 5).forEach(function (comment) {
      fragment.appendChild(renderItemComment(comment));
    });

    socialComCont.appendChild(fragment);

    bigPictureCommentLoad.addEventListener('click', function (evt) {
      evt.preventDefault();
      bigPictureCommentLoad.classList.add('visually-hidden');


      object.comments.slice(5).forEach(function (comment) {
        fragment.appendChild(renderItemComment(comment));
      });
      socialComCont.appendChild(fragment);
    });
    renderItemComment(window.data.myData[0].comments[0]);
  };


  // функция, которая перебирает массив данных, рендерит каждый элемент массива с помощью функции renderItem, получившиеся элементы добавляет в DOM элемент, который представляет собой контейнер с фото.
  var pictureInfo = document.querySelector('.pictures');

  var renderData = function (myData) {
    var fragment = document.createDocumentFragment();
    var pics = document.querySelectorAll('.picture');
    pics.forEach(function (pic) {
      pic.remove();
    });

    myData.forEach(function (elem, index) {
      var item = renderItem(elem);
      fragment.appendChild(item);

      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.renderPhoto(myData[index]);

      });
      item.addEventListener("keydown", function (evt) {
        evt.preventDefault();
        if (evt.keyCode === 13) {
          window.renderPhoto(myData[index]);
        }
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          evt.preventDefault();
          bigPicture.parentNode.removeChild(bigPicture);
        }
      });
      pictureInfo.appendChild(fragment);
    });
  };

  bigPictureCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  });


  var errorMessage = document.querySelector('#error').content.querySelector('section');

  var onError = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    pictureInfo.appendChild(fragment);
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      errorMessage.parentNode.removeChild(errorMessage);
    }
  });


  var db = window.debounce(renderData);
  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  var popular = document.querySelector('#filter-popular');
  popular.addEventListener('click', function (evt) {
    evt.preventDefault();
    activeClass(popular);
    var myArr = window.data.myData;
    db(myArr);
  });


  var random = document.querySelector('#filter-random');
  random.addEventListener('click', function (evt) {
    evt.preventDefault();
    activeClass(random);
    var myArr = window.data.myData;
    var myArrCopy = myArr.slice(1, 11);

    var compareRandom = function () {
      return Math.random() - 0.5;
    };
    myArrCopy.sort(compareRandom);

    db(myArrCopy);
  });


  var discussed = document.querySelector('#filter-discussed');
  discussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    activeClass(discussed);
    var myArr = window.data.myData;
    var myArrCopy = myArr.slice();
    myArrCopy.sort(function (a, b) {
      if (a.comments < b.comments) {
        return 1;
      } else if (a.comments > b.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    db(myArrCopy);
  });

  var activeClass = function (elem) {
    var formButton = document.querySelectorAll('button.img-filters__button');
    for (var i = 0; i < formButton.length; i++) {
      formButton[i].classList.remove('img-filters__button--active');
      elem.classList.add('img-filters__button--active');
    }
  };


  var func = function (myData) {
    window.data.myData = myData;
    renderData(myData);
  };


  window.load(func, onError);

  window.data = {
    pictureInfo: pictureInfo
  };
})();


