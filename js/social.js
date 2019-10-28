'use strict';

(function () {
  var userPhotoTag = document.querySelector(".text__hashtags");
  var userPhotoComment = document.querySelector(".text__description");

  var userTagInput = document.querySelector("input.text__hashtags");
  var userCommentInput = document.querySelector("textarea.text__description");
  window.userTagInput = userTagInput;
  window.userCommentInput = userCommentInput;

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
    console.log("tagsArr", tagsArr);

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
      console.log("validating tag '" + tag + "' result: " + validationError);
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
})();
