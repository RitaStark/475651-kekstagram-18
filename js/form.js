'use strict';

(function () {
  var effects = document.querySelector(".effects");
  var effectsRadio = effects.querySelector(".effects__radio");
  var imgPreview = document.querySelector(".img-upload__preview img");
  var effectLevel = document.querySelector(".effect-level");

  var pinLine = document.querySelector(".effect-level__line");
  var pinHandle = document.querySelector(".effect-level__pin");
  var pinValue = document.querySelector(".effect-level__value");

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

  var updateSliderPosition = function (position) {
    pinHandle.style.left = position * (pinLine.clientWidth - 1) + "px";
  };

  var hideSlider = function () {
    effectLevel.classList.add('hidden');
  };

  var showSlider = function () {
    effectLevel.classList.remove('hidden');
  };

  imgPreview.classList.add("effects__preview--none");

  var addEffectHandler = function (event) {

    var target = event.target;
    currentEffect = target.value;
    applyEffect(currentEffect, 1);

    if (currentEffect == "none") {
      hideSlider();
    } else {
      showSlider();
      updateSliderPosition(1);
    };
  };

  effects.addEventListener("change", addEffectHandler);

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
      newLeft = Math.min(newLeft, pinLine.clientWidth - 1);
      newLeft = Math.max(newLeft, 0);
      pinHandle.style.left = newLeft + "px";
      var effectStrength = newLeft / (pinLine.clientWidth - 1);
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
})();
