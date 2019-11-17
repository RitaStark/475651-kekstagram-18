'use strict';

(function () {
  var upload = document.querySelector('#upload-file');
  var changeImage = document.querySelector('.img-upload__overlay');
  var closeButton = changeImage.querySelector('.img-upload__cancel');

  var scaleControl = document.querySelector('.scale');
  var scaleSmaller = scaleControl.querySelector('.scale__control--smaller');
  var scaleBigger = scaleControl.querySelector('.scale__control--bigger');
  var scaleValue = scaleControl.querySelector('.scale__control--value');
  scaleValue.value = 100 + '%';
  var numberScaleValue = parseInt(scaleValue.value, 10);

  var isFocused = function (elem) {
    return elem === document.activeElement;
  };

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    changeImage.classList.remove('hidden');
    var hop = document.querySelector(".effect-level");
    hop.classList.add("hidden");
  });


  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeImage.classList.add('hidden');
  });


  window.closeFunc = function (evt) {
    if (evt.keyCode === 27 && !(isFocused(window.userTagInput) || isFocused(window.userCommentInput))) {
      evt.preventDefault();
      changeImage.classList.add('hidden');
    }
    document.removeEventListener('keydown', closeFunc);
  };
  document.addEventListener('keydown', closeFunc);


  var scaleSmallerClickHandler = function () {
    if (numberScaleValue > 25 && numberScaleValue <= 100) {
      numberScaleValue -= 25;
      var percentScaleValue = numberScaleValue + '%';
      scaleValue.value = percentScaleValue;
      percentScaleValue = document.querySelector('.img-upload__preview').style.transform = 'scale(' + numberScaleValue / 100 + ')';
    }
  };
  scaleSmaller.addEventListener('click', scaleSmallerClickHandler);

  var scaleBiggerClickHandler = function () {

    if (numberScaleValue >= 25 && numberScaleValue < 100) {
      numberScaleValue += 25;
      var percentScaleValue = numberScaleValue + '%';
      scaleValue.value = percentScaleValue;
      percentScaleValue = document.querySelector('.img-upload__preview').style.transform = 'scale(' + numberScaleValue / 100 + ')';
    }
  };
  scaleBigger.addEventListener('click', scaleBiggerClickHandler);

  window.removeElementProperty = function () {
    var previewPhoto = document.querySelector('.img-upload__preview');
    previewPhoto.style.removeProperty("transform");
  };

})();
