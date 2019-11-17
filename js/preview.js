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
    changeImage.classList.remove('hidden');
    evt.preventDefault();
    window.form.effectLevel.classList.add('hidden');
  });

  var closePopUp = function () {
    upload.value = null;
    changeImage.classList.add('hidden');
  };

  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopUp();
  });


  var closeFunc = function (evt) {
    if (evt.keyCode === 27 && !(isFocused(window.userTagInput) || isFocused(window.userCommentInput))) {
      evt.preventDefault();
      closePopUp();
    }
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
    previewPhoto.style.removeProperty('transform');
  };

})();
