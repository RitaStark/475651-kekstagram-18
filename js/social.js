'use strict';

(function () {
  var userPhotoTag = document.querySelector('.text__hashtags');
  var userPhotoComment = document.querySelector('.text__description');

  var userTagInput = document.querySelector('input.text__hashtags');
  var userCommentInput = document.querySelector('textarea.text__description');


  var arrContains = function (elem, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (elem.toLowerCase() === arr[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  userPhotoTag.addEventListener('input', function () {
    var tagsList = userTagInput.value;
    var tagsArr = tagsList.split(' ');


    for (var i = 0; i < tagsArr.length; i++) {
      var tag = tagsArr[i];
      var validationError = '';
      if (tag.length < 2) {
        validationError = 'Хэш-тег должен состоять минимум из 2-х символов';
      } else if (tag.length > 20) {
        validationError = 'Хэш-тег должен состоять максимум из 20-ти символов';
      } else if (!tag.startsWith('#')) {
        validationError = 'Хэш-тег должен начинаться с \#';
      } else if (tag.startsWith('##')) {
        validationError = 'Хэш-тег не может состоять только из \#';
      } else if (arrContains(tag, tagsArr.slice(0, i))) {
        validationError = 'Хэш-теги не должны повторяться';
      } else if (i > 4) {
        validationError = 'Количество хэш-тегов не должно быть больше пяти';
      }
      userTagInput.setCustomValidity(validationError);
      if (validationError !== '') {
        break;
      }
    }
  });

  userPhotoComment.addEventListener('input', function () {
    if (userCommentInput.value.length > 140) {
      userCommentInput.setCustomValidity('Комментарий не должен быть больше 140 символов');
    }
  });

  var form = document.querySelector('.img-upload__form');
  var formWindow = form.querySelector('.img-upload__overlay');
  var success = document.querySelector('#success').content.querySelector('section');
  var errorMessage = document.querySelector('#error').content.querySelector('section');

  success.addEventListener('click', function (evt) {
    evt.preventDefault();
    success.parentNode.removeChild(success);
  });

  var EscAfterSuccess = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      success.parentNode.removeChild(success);
    }
    document.removeEventListener('keydown', EscAfterSuccess);
  };
  document.addEventListener('keydown', EscAfterSuccess);

  var onSuccess = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(success);
    window.data.pictureInfo.appendChild(fragment);

    window.renderPhoto(window.data.myData[0]);
  };


  var onError = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    window.data.pictureInfo.appendChild(fragment);
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onError);
    formWindow.classList.add('hidden');
    evt.preventDefault();
    form.reset();
    window.removeElementProperty();
  });

  window.userTagInput = userTagInput;
  window.userCommentInput = userCommentInput;
})();
