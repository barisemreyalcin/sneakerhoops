"use strict";

// VARIABLES
const btnMobileOpen = document.querySelector(".btn-mobile--open");
const btnMobileClose = document.querySelector(".btn-mobile--close");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");

// FUNCTIONS
// Mobile Navbar
const toggleNav = function() {
    if(btnMobileOpen.classList.contains("btn-mobile--active")) {
        btnMobileOpen.classList.remove("btn-mobile--active");
        btnMobileClose.classList.add("btn-mobile--active");
        btnMobileClose.style.position = "fixed";
        navLinks.classList.add(("nav__links--mobile"));
    } else {
        btnMobileOpen.classList.add("btn-mobile--active");
        btnMobileClose.classList.remove("btn-mobile--active");
        navLinks.classList.remove(("nav__links--mobile"));
    }
}

navLink.forEach(link => {
    link.addEventListener("click", function () {
        toggleNav();
    });
});

btnMobileOpen.addEventListener("click", toggleNav);
btnMobileClose.addEventListener("click", toggleNav);