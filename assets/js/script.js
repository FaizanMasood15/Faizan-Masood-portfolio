'use strict';

// --- Profile Modal Variables and Logic (from the top of your original script) ---
// RENAMED variables to avoid conflict with 'testimonials' modal
const profileOpenBtn = document.getElementById("openModal");
const profileModal = document.getElementById("profileModal");
const profileModalImage = document.getElementById("modalImg"); // Renamed modalImg to profileModalImage
const profileCloseBtn = document.getElementById("closeModal");

// Ensure elements exist before adding listeners to prevent errors if IDs are missing
if (profileOpenBtn && profileModal && profileModalImage) {
    profileOpenBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Keep this if 'openBtn' has a default action you want to stop
        profileModal.style.display = "block";
        // Safely access src, in case querySelector returns null
        profileModalImage.src = profileOpenBtn.querySelector("img") ? profileOpenBtn.querySelector("img").src : '';
    });
}

if (profileCloseBtn && profileModal) {
    profileCloseBtn.addEventListener("click", function () {
        profileModal.style.display = "none";
    });
}

if (profileModal && profileModalImage) {
    // Tap anywhere outside the image to close the profile modal
    profileModal.addEventListener("click", function (e) {
        if (e.target === profileModal || e.target === profileModalImage) {
            profileModal.style.display = "none";
        }
    });
}
// --- End Profile Modal ---


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// --- Testimonials Modal Variables and Logic (existing from your original script) ---
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable (this modalImg is for testimonials)
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (for testimonials modal)
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
    });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);
// --- End Testimonials Modal ---


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

/// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        const target = this.dataset.target;

        pages.forEach(page => {
            page.classList.remove("active");
            if (page.dataset.page === target) {
                page.classList.add("active");
            }
        });

        navigationLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");

        window.scrollTo(0, 0);
    });
});

  let slideIndex = 1; // Current slide index
  let slideTimer; // Variable to hold the automatic slideshow timer

  // showSlides function: Controls which slide is displayed
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides"); // Get all slides
    let dots = document.getElementsByClassName("dot"); // Get all dots

    // Wrap around logic: If n is greater than total slides, go to first slide.
    // If n is less than 1, go to last slide.
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Remove 'active-dot' class from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    // Display the current slide and mark the corresponding dot as active
    if (slides[slideIndex - 1]) { // Ensure the slide element exists
      slides[slideIndex - 1].style.display = "block";
      if (dots[slideIndex - 1]) { // Ensure the dot element exists
        dots[slideIndex - 1].className += " active-dot";
      }
    }
  }

  // plusSlides function: Changes the slide by a given number (e.g., +1 for next, -1 for previous)
  function plusSlides(n) {
    clearTimeout(slideTimer); // Clear any existing automatic timer
    showSlides(slideIndex += n); // Update slide index and show the new slide
    startSlideTimer(); // Restart the automatic timer
  }

  // currentSlide function: Displays a specific slide when a dot is clicked
  function currentSlide(n) {
    clearTimeout(slideTimer); // Clear any existing automatic timer
    showSlides(slideIndex = n); // Set slide index to n and show that slide
    startSlideTimer(); // Restart the automatic timer
  }

  // startSlideTimer function: Sets up the automatic slideshow
  function startSlideTimer() {
      // Clear any previous timer to prevent multiple timers running
      clearTimeout(slideTimer);
      slideTimer = setTimeout(() => {
          plusSlides(1); // Move to the next slide automatically
      }, 5000); // Change image every 5 seconds (5000 milliseconds)
  }


  // Initialize the slideshow when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
      // Get references to the slideshow elements within the portfolio section
      const portfolioSection = document.querySelector('.portfolio');
      if (portfolioSection) { // Check if the portfolio section exists on the page
          // Attach event listeners to the navigation buttons
          const prevButton = portfolioSection.querySelector('.slideshow-container .prev');
          const nextButton = portfolioSection.querySelector('.slideshow-container .next');
          // Attach event listener to the dots container (using event delegation for efficiency)
          const dotsContainer = portfolioSection.querySelector('div[style="text-align:center"]');

          if (prevButton) {
              // Use the global plusSlides function
              prevButton.addEventListener('click', () => plusSlides(-1));
          }
          if (nextButton) {
              // Use the global plusSlides function
              nextButton.addEventListener('click', () => plusSlides(1));
          }
          if (dotsContainer) {
              // Use event delegation to handle clicks on any dot
              dotsContainer.addEventListener('click', (event) => {
                  if (event.target.classList.contains('dot')) {
                      // Get the slide index from the data-slide-index attribute (if added, or use currentSlide(index))
                      // For this setup, we use the onclick directly in HTML, so this block might be redundant
                      // if you remove onclick from HTML, you'd use parseInt(event.target.dataset.slideIndex)
                      currentSlide(Array.from(dots).indexOf(event.target) + 1); // Get index of clicked dot
                  }
              });
          }

          // Initial display: Show the first slide and start the automatic timer
          showSlides(slideIndex);
          startSlideTimer();
      }
  });

  // Make showSlides, plusSlides, currentSlide globally accessible
  // This is important because your HTML uses inline onclick attributes
  window.showSlides = showSlides;
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;

