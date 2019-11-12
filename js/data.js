'use strict';

(function () {
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


  var renderItemComment = function (elem) {
    var socialComCont = document.querySelector(".social__comments");
    var socialCom = socialComCont.querySelector(".social__comment");
    var socialPic = socialComCont.querySelector(".social__picture");
    var socialText = socialComCont.querySelector(".social__text");
    var item = socialComCont.cloneNode(true);

    socialPic.src = elem.avatar;
    socialPic.alt = elem.name;

    socialText.textContent = elem.message;

    return item;
  };

  var bigPictureViewerComment = document.querySelector(".social__comments");

  var renderDataComment = function (commentArr) {
    var fragment = document.createDocumentFragment();
    var commentsObj = window.data.myData[0];
    console.log(commentsObj);
    window.commentArr = commentsObj.comments;
    console.log(window.commentArr);
    for (var i = 0; i < commentArr.length; i++) {
      var elem = commentArr[i];
      renderItemComment(elem);
      console.log(elem);
      fragment.appendChild(elem);
    }
    window.data.bigPictureViewerComment.appendChild(fragment);
  };

  var bigPicture = document.querySelector(".big-picture");
  var bigPictureCloseButton = bigPicture.querySelector(".big-picture__cancel");
  var bigPicSocial = document.querySelector(".big-picture__social");

  window.renderPhoto = function (object) {
    var bigPicSocial = document.querySelector(".big-picture__social");
    var bigPictureImage = bigPicture.querySelector(".social__picture");
    var bigPictureLikes = bigPicture.querySelector(".likes-count");
    var item = bigPicSocial.cloneNode(true);

    var bigPictureDescript = bigPicture.querySelector(".social__caption");
    var bigPictureComment = bigPicture.querySelector(".social__comment-count");
    var bigPictureCommentLoad = bigPicture.querySelector(".comments-loader");

    bigPicture.classList.remove("hidden");
    bigPictureComment.classList.add("visually-hidden");
    bigPictureCommentLoad.classList.add("visually-hidden");

    bigPictureImage.src = object.url;
    bigPictureLikes.textContent = object.likes;
    bigPictureDescript.textContent = object.description;

    return item;

    // var commentsObj = window.data.myData[0];
    // console.log(commentsObj);
    // window.commentArr = commentsObj.comments;
    // console.log(window.comArr);

    renderDataComment(window.data.myData[0].comments);
  };

  bigPictureCloseButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    bigPicture.classList.add("hidden");
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      bigPicture.parentNode.removeChild(bigPicture);
    }
  });



  // функция, которая перебирает массив данных, рендерит каждый элемент массива с помощью функции renderItem, получившиеся элементы добавляет в DOM элемент, который представляет собой контейнер с фото.
  var pictureInfo = document.querySelector('.pictures');

  var renderData = function (myData) {
    var fragment = document.createDocumentFragment();
    var pics = document.querySelectorAll('.picture');
    pics.forEach(function (pic) {
      pic.remove();
    });
    for (var i = 0; i < myData.length; i++) {
      var elem = renderItem(myData[i]);
      fragment.appendChild(elem);
    }
    pictureInfo.appendChild(fragment);
  };



  var errorMessage = document.querySelector("#error").content.querySelector("section");

  var onError = function (message) {
    var elem = errorMessage.cloneNode(true);
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
  var filters = document.querySelector(".img-filters");
  filters.classList.remove("img-filters--inactive");

  var popular = document.querySelector("#filter-popular");
  popular.addEventListener("click", function (evt) {
    evt.preventDefault();
    activeClass(popular);
    var myArr = window.data.myData;
    db(myArr);
  });


  var random = document.querySelector("#filter-random");
  random.addEventListener("click", function (evt) {
    evt.preventDefault();
    activeClass(random);
    var myArr = window.data.myData;
    var myArrCopy = myArr.slice(1, 11);

    var compareRandom = function (a, b) {
      return Math.random() - 0.5;
    };
    myArrCopy.sort(compareRandom);

    db(myArrCopy);
  });


  var discussed = document.querySelector("#filter-discussed");
  discussed.addEventListener("click", function (evt) {
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
    var formButton = document.querySelectorAll("button.img-filters__button");
    for (var i = 0; i < formButton.length; i++) {
      var item = formButton[i];
      formButton[i].classList.remove("img-filters__button--active");
      elem.classList.add("img-filters__button--active");
    }
  };

  var func = function (myData) {
    window.data.myData = myData;
    renderData(myData);

  };


  window.load(func, onError);


  window.data = {
    pictureInfo: pictureInfo,
    bigPictureViewerComment: bigPictureViewerComment,
    bigPicSocial: bigPicSocial

  };
})();


