'use strict';

(function () {
  var userPhotoTag = document.querySelector(".text__hashtags");
  var userPhotoComment = document.querySelector(".text__description");

  var userTagInput = document.querySelector("input.text__hashtags");
  var userCommentInput = document.querySelector("textarea.text__description");


  var arrContains = function (elem, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (elem.toLowerCase() == arr[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  userPhotoTag.addEventListener("input", function () {
    var tagsList = userTagInput.value;
    var tagsArr = tagsList.split(" ");
    // console.log("tagsArr", tagsArr);

    for (var i = 0; i < tagsArr.length; i++) {
      var tag = tagsArr[i];
      var validationError = "";
      if (tag.length < 2) {
        // userTagInput.setCustomValidity("Хэш-тег должен состоять минимум из 2-х символов");
        validationError = "Хэш-тег должен состоять минимум из 2-х символов";
      } else if (tag.length > 20) {
        validationError = "Хэш-тег должен состоять максимум из 20-ти символов";
      } else if (!tag.startsWith("#")) {
        validationError = "Хэш-тег должен начинаться с \#";
      } else if (arrContains(tag, tagsArr.slice(0, i))) {
        validationError = "Хэш-теги не должны повторяться";
      } else if (i > 4) {
        validationError = "Количество хэш-тегов не должно быть больше пяти";
      }
      userTagInput.setCustomValidity(validationError);
      // console.log("validating tag '" + tag + "' result: " + validationError);
      if (validationError !== "") {
        break;
      }
    };
  });


  // var isFocused = function (elem) {
  //   return elem === document.activeElement;
  // };

  userPhotoComment.addEventListener("input", function () {
    if (userCommentInput.value.length > 140) {
      userCommentInput.setCustomValidity("Комментарий не должен быть больше 140 символов");
    }
  });

  var form = document.querySelector(".img-upload__form");
  var formWindow = form.querySelector(".img-upload__overlay");
  var success = document.querySelector("#success").content.querySelector("section");
  var successButton = success.querySelector(".success__button");
  var errorMessage = document.querySelector("#error").content.querySelector("section");

  success.addEventListener("click", function (evt) {
    evt.preventDefault();
    success.parentNode.removeChild(success);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      success.parentNode.removeChild(success);
    }
  });

  var onSuccess = function (data) {
    var elem = success.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(success);
    window.data.pictureInfo.appendChild(fragment);
  };

  var onError = function (message) {
    var elem = errorMessage.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    window.data.pictureInfo.appendChild(fragment);
  };

  form.addEventListener('submit', function (evt) {

    window.upload(new FormData(form), onSuccess, onError)
    formWindow.classList.add("hidden");
    evt.preventDefault();

  });

  window.userTagInput = userTagInput;
  window.userCommentInput = userCommentInput;
})();
