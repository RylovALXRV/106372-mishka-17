"use strict";
var navigationElement = document.querySelector(".navigation");
var navigationBtnElement = navigationElement.querySelector(".navigation__btn");
var jsOrderElements = document.querySelectorAll(".js-order");
var modalWrapperElement = document.querySelector(".modal-wrapper");
var jsAddElement = document.querySelector(".js-add");

function addOrderButtonClickHandler (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    var currentTarget = event.currentTarget;
    if (!currentTarget.classList.contains("js-order")) {
      return;
    }
    modalWrapperElement.classList.remove("modal-wrapper--close");
  });
}

navigationElement.classList.remove("navigation--nojs");

navigationBtnElement.addEventListener("click", function () {
  if (navigationElement.classList.contains("navigation--closed")) {
    navigationElement.classList.remove("navigation--closed");
    navigationElement.classList.add("navigation--open");
  } else {
    navigationElement.classList.remove("navigation--open");
    navigationElement.classList.add("navigation--closed");
  }
});

for (var i = 0; i < jsOrderElements.length; i++) {
  addOrderButtonClickHandler(jsOrderElements[i]);
}

jsAddElement.addEventListener("click", function (event) {
  event.preventDefault();
  modalWrapperElement.classList.add("modal-wrapper--close");
});
