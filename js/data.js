'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var bigPictureLikes = bigPicture.querySelector('.likes-count');


  var bigPictureDescript = bigPicture.querySelector('.social__caption');
  var bigPictureCommentLoad = bigPicture.querySelector('.comments-loader');

  var commentsCount = bigPicture.querySelector('.comments-count');

  var socialComCont = document.querySelector('.social__comments');
  var socialCom = socialComCont.querySelector('.social__comment').cloneNode(true);


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


  var renderItemComment = function (elem) {
    var comment = socialCom.cloneNode(true);
    var socialPic = comment.querySelector('.social__picture');
    var socialText = comment.querySelector('.social__text');

    socialPic.src = elem.avatar;
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

    var commentsLength = object.comments.length;
    var COMMENTS_LENGTH_STEP = 5;

    if (commentsLength > COMMENTS_LENGTH_STEP) {
      bigPictureCommentLoad.classList.remove('visually-hidden');
    }

    var renderComments = function () {
      var fragment = document.createDocumentFragment();
      var commentLengthElem = bigPicture.querySelector('.social__comment-count');
      var countComments = socialComCont.childElementCount;
      var nextCountComments = countComments + COMMENTS_LENGTH_STEP;

      if (nextCountComments >= commentsLength) {
        bigPictureCommentLoad.classList.add('visually-hidden');
      }

      object.comments.slice(countComments, nextCountComments).forEach(function (comment) {
        fragment.appendChild(renderItemComment(comment));
      });
      socialComCont.appendChild(fragment);
      commentLengthElem.firstChild.textContent = socialComCont.childElementCount + ' из ';
    };

    renderComments();

    var commentLoadFunc = function (evt) {
      evt.preventDefault();
      renderComments();
    };
    bigPictureCommentLoad.addEventListener('click', commentLoadFunc);

  };

  var pictureInfo = document.querySelector('.pictures');
  var bodyClass = document.querySelector('body');
  var renderData = function (myData) {
    var fragment = document.createDocumentFragment();
    var pics = document.querySelectorAll('.picture');
    pics.forEach(function (pic) {
      pic.remove();
    });

    myData.forEach(function (elem, index) {
      var item = renderItem(elem);
      fragment.appendChild(item);

      var clickHandler = function (evt) {
        evt.preventDefault();
        bigPicture.classList.remove('hidden');
        window.renderPhoto(myData[index]);
        bodyClass.classList.add('modal-open');
      };
      item.addEventListener('click', clickHandler);

      var keydownHandler = function (evt) {
        if (evt.keyCode === 27) {
          evt.preventDefault();
          bigPicture.classList.add('hidden');
        }
        item.removeEventListener('click', keydownHandler);
      };
      item.addEventListener('click', keydownHandler);

      pictureInfo.appendChild(fragment);
    });
  };

  bigPictureCloseButton.addEventListener('click', function (evt) {
    bodyClass.classList.remove('modal-open');
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    bodyClass.classList.remove('modal-open');
    if (evt.keyCode === 27) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });

  var removeDebounce = window.debounce(renderData);
  var filters = document.querySelector('.img-filters');

  var popular = document.querySelector('#filter-popular');

  popular.addEventListener('click', function (evt) {
    evt.preventDefault();
    makeFilterActive(popular);
    var photoCards = window.data.myData;
    removeDebounce(photoCards);
  });


  var random = document.querySelector('#filter-random');
  random.addEventListener('click', function (evt) {
    evt.preventDefault();
    makeFilterActive(random);
    var photoCards = window.data.myData;
    var photoCardsCopy = photoCards.slice(1, 11);

    var compareRandom = function () {
      return Math.random() - 0.5;
    };
    photoCardsCopy.sort(compareRandom);

    removeDebounce(photoCardsCopy);
  });


  var discussed = document.querySelector('#filter-discussed');
  discussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    makeFilterActive(discussed);
    var photoCards = window.data.myData;
    var photoCardsCopy = photoCards.slice();
    photoCardsCopy.sort(function (a, b) {
      if (a.comments < b.comments) {
        return 1;
      } else if (a.comments > b.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    removeDebounce(photoCardsCopy);
  });

  var makeFilterActive = function (elem) {
    var filterButtons = document.querySelectorAll('button.img-filters__button');
    filterButtons.forEach(function (button) {
      button.classList.toggle('img-filters__button--active', button === elem);
    });
  };


  var renderFunction = function (myData) {
    filters.classList.remove('img-filters--inactive');
    window.data.myData = myData;
    renderData(myData);
  };


  window.load(renderFunction, window.onError);

  window.data = {
    pictureInfo: pictureInfo
  };
})();


