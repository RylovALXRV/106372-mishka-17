"use strict";
var navigationElement = document.querySelector(".navigation");
var navigationBtnElement = navigationElement.querySelector(".navigation__btn");

function switchMenu (toggle) {
  var navigationMenuListElements = document.querySelectorAll(".navigation__menu-list");

  for (var i = 0; i < navigationMenuListElements.length; i++) {
    navigationMenuListElements[i].style.display = toggle;
  }
}

navigationElement.classList.remove("navigation--nojs");

navigationBtnElement.addEventListener("click", function () {
  if (navigationElement.classList.contains("navigation--closed")) {
    navigationElement.classList.remove("navigation--closed");
    navigationElement.classList.add("navigation--open");
    switchMenu("");
  } else {
    navigationElement.classList.remove("navigation--open");
    navigationElement.classList.add("navigation--closed");
    switchMenu("");
  }
});
