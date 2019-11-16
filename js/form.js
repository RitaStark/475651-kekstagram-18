'use strict';

(function () {
  var effects = document.querySelector('.effects');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var pinLine = document.querySelector('.effect-level__line');
  var pinHandle = document.querySelector('.effect-level__pin');

  var currentEffect = 'none';

  var applyEffect = function (name, strength) {
    imgPreview.className = '';
    if (name === 'chrome') {
      effectLevelValue.style.filter = 'grayscale(' + strength + ')';
      imgPreview.classList.add("effects__preview--chrome");
    } else if (name === 'sepia') {
      effectLevelValue.style.filter = 'sepia(' + strength + ')';
      imgPreview.classList.add("effects__preview--sepia");
    } else if (name === 'marvin') {
      effectLevelValue.style.filter = 'invert(' + (strength * 100) + '%)';
      imgPreview.classList.add("effects__preview--marvin");
    } else if (name === 'phobos') {
      effectLevelValue.style.filter = 'blur(' + (strength * 3) + 'px)';
      imgPreview.classList.add("effects__preview--phobos");
    } else if (name === 'heat') {
      effectLevelValue.style.filter = 'brightness(' + (strength * 2 + 1) + ')';
      imgPreview.classList.add("effects__preview--heat");
    } else {
      effectLevelValue.style.filter = '';
      imgPreview.classList.add("effects__preview--none");
    }
  };

  var updateSliderPosition = function (position) {
    pinHandle.style.left = position * (pinLine.clientWidth - 1) + 'px';
  };

  var hideSlider = function () {
    effectLevel.classList.add('hidden');
  };

  var showSlider = function () {
    effectLevel.classList.remove('hidden');
  };

  effectLevelValue.classList.add('effects__preview--none');

  var addEffectHandler = function (event) {

    var target = event.target;
    currentEffect = target.value;
    applyEffect(currentEffect, 1);

    if (currentEffect === 'none') {
      hideSlider();
    } else {
      showSlider();
      updateSliderPosition(1);
    }
  };

  effects.addEventListener('change', addEffectHandler);

  pinHandle.addEventListener('mousedown', function (evt) {
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
      newLeft = Math.min(newLeft, pinLine.clientWidth - 1);
      newLeft = Math.max(newLeft, 0);
      pinHandle.style.left = newLeft + 'px';
      var effectStrength = newLeft / (pinLine.clientWidth - 1);

      effectLevelDepth.style.width = pinHandle.style.left;

      applyEffect(currentEffect, effectStrength);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
