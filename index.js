"use strict";

// VARIABLES
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const btnMobileOpen = document.querySelector(".btn-mobile--open");
const btnMobileClose = document.querySelector(".btn-mobile--close");
const btnLeft = document.querySelector(".slider-btn--left");
const btnRight = document.querySelector(".slider-btn--right");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
let isMobileWidth = window.matchMedia("(max-width: 768px)").matches;

let curSlideIndex = 0;
const lastSlideIndex = slides.length - 1;

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

// Slider
const slider = function() {
    // Create Slider Dots
    const createDots = function() {
        dotContainer.innerHTML = '';
        const dotCount = isMobileWidth ? slides.length : slides.length - 2;
        slides.forEach((_, i) => {
            if(i < dotCount) dotContainer.insertAdjacentHTML("beforeend", `<button class="btn--dot" data-slide="${i}"></button>`);
        })
    }

    // Display Slider
    const showSlide = function(slide) {
        slides.forEach((s, i) => {
            s.classList.add("slide-displayed");
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });
    }
    
    // Next Slide
    const nextSlide = function() {
        curSlideIndex >= (isMobileWidth ? lastSlideIndex : lastSlideIndex - 2) 
            ? curSlideIndex = 0 
            : curSlideIndex++;

        activateDot(curSlideIndex);
        showSlide(curSlideIndex);
    }
    
    // Previous Slide
    const prevSlide = function() {
        curSlideIndex === 0 
            ? curSlideIndex = (isMobileWidth ? lastSlideIndex : lastSlideIndex - 2) 
            : curSlideIndex--;

        activateDot(curSlideIndex);
        showSlide(curSlideIndex);
    }
    
    // Three slides are displayed side by side on big devices at the same time. Therefore, I accept first one as curSlideIndex, and (lastSlideIndex - 2) is to control returning to first slide or last slide properly. 
    
    btnLeft.addEventListener("click", prevSlide);
    btnRight.addEventListener("click", nextSlide);

    // Keyboard Slide Contorol
    document.addEventListener("keydown", function(e) {
        if(e.key === "ArrowRight") nextSlide();
        if(e.key === "ArrowLeft") prevSlide();
    })
    
    // Activate Dots
    const activateDot = function(slide) {
        document.querySelectorAll(".btn--dot").forEach(dot => {
            dot.classList.remove("active");
        })
        
        document.querySelector(`.btn--dot[data-slide = "${slide}"]`)?.classList.add("active");
        showSlide(slide);
    }

    // Set Active Dot
    dotContainer.addEventListener("click", function(e) {
        if(e.target.classList.contains("btn--dot")) {
            curSlideIndex = e.target.dataset.slide;
            showSlide(curSlideIndex);
            activateDot(curSlideIndex);
        }
    })

    const init = function() {
        showSlide(0);
        createDots();
        activateDot(0);
    }
    init();

    // Check Media Query Change
    window.addEventListener("resize", function () {
        const newIsMobileWidth = window.matchMedia("(max-width: 768px)").matches;
        if (newIsMobileWidth !== isMobileWidth) {
            isMobileWidth = newIsMobileWidth;
            createDots();
            activateDot(curSlideIndex);
        }   
    });
}
slider();