"use strict";

// VARIABLES
const header = document.querySelector(".header");
const banner = document.querySelector(".section--banner");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const navLogo = document.querySelector(".nav__logo");
const navTitle = document.querySelector(".header__title");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".modal__btn--close");
const btnMobileOpen = document.querySelector(".btn-mobile--open");
const btnMobileClose = document.querySelector(".btn-mobile--close");
const btnLeft = document.querySelector(".slider-btn--left");
const btnRight = document.querySelector(".slider-btn--right");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const modalContainer = document.querySelector(".container--modal");
const brandsTabs = document.querySelectorAll(".brands__tab");
const brandsTabsContainer = document.querySelector(".brands__tabs");
const brandsContents = document.querySelectorAll(".brands__content");
const modalOverlay = document.querySelector(".overlay");
const headerHeight = header.getBoundingClientRect().height;
let isMobileWidth = window.matchMedia("(max-width: 768px)").matches;

let curSlideIndex = 0;
const lastSlideIndex = slides.length - 1;

// FUNCTIONS
// Mobile Navbar
const navController = function() {
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
        link.addEventListener("click", function () { toggleNav(); });
    });
    
    btnMobileOpen.addEventListener("click", toggleNav);
    btnMobileClose.addEventListener("click", toggleNav);
}
navController();

// Hover Navbar
const hoverController = function() {
    const handleHover = function(e) {
        if(e.target.classList.contains("fade")) {
            const navLink = e.target;
            const siblingNavLinks = navLink.closest(".nav__links").querySelectorAll(".fade");
            
            siblingNavLinks.forEach(sibling => {
                sibling !== navLink && (sibling.style.opacity = this);
            })
    
            navLogo.style.opacity = this;
            navTitle.style.opacity = this;
        }
    }
    
    navLinks.addEventListener("mouseover", handleHover.bind(.4));
    navLinks.addEventListener("mouseout", handleHover.bind(1));
}
hoverController();

// Sticky Nav
const stickyController = function() {
    const handleSticky = function(entries) {
        const [entry] = entries;
    
        if(!entry.isIntersecting) {
            header.classList.add("header--sticky");
            document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
        }
        else {
            header.classList.remove("header--sticky");
            document.documentElement.style.setProperty("--header-height", "0");
        }
    }
    
    const bannerObserber = new IntersectionObserver(handleSticky, {
        root: null,
        threshold: 0,
        rootMargin: `${-headerHeight}px`
    })
    
    bannerObserber.observe(banner);
}
stickyController();

// Slider
const sliderController = function() {
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
sliderController();

// Modal
const modalController = function() {
    // Open Modal
    const openModal = function() {
        modalContainer.classList.remove("hidden");
        modalOverlay.classList.remove("hidden");
    }

    // Close Modal
    const closeModal = function() {
        modalContainer.classList.add("hidden");
        modalOverlay.classList.add("hidden"); 
    }

    btnOpenModal.forEach(btn => btn.addEventListener("click", openModal));
    btnCloseModal.addEventListener("click", closeModal);

    // Close modal by clicking overlay
    modalOverlay.addEventListener("click", closeModal);

    // Close modal by pressing ESC
    document.addEventListener("keydown", function(e) {
        if(e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
            closeModal();
        }
    })
}
modalController();

// Switch Brand Tabs
const tabController = function() {
    brandsTabsContainer.addEventListener("click", function(e) {
        const clickedTab = e.target.closest(".brands__tab"); // to avoid clicking child elements of brands__tab
    
        if(!clickedTab) return; // Guard clause
    
        // Remove active tab and content
        brandsTabs.forEach(tab => tab.classList.remove("brands__tab--active"));
        brandsContents.forEach(content => content.classList.remove("brands__content--active"));
    
        // Set active tab
        clickedTab.classList.add("brands__tab--active");
    
        // Set active content
        const dataNum = clickedTab.dataset.tab;
        console.log(dataNum);
        document.querySelector(`.brands__content--${dataNum}`).classList.add("brands__content--active");
    })
}
tabController();