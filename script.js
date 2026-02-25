/* ===========================================================
   BLUEMESH LANDING PAGE — JAVASCRIPT (script.js)
   ===========================================================
   This file adds interactivity to the website.
   
   FEATURES:
   1. Navbar scroll effect — adds frosted glass look when scrolling
   2. Mobile menu toggle — hamburger menu for small screens  
   3. Scroll reveal — fades in elements as you scroll down
   4. Smooth scrolling — smooth jump to sections on link click
=========================================================== */


/* ===========================================================
   1. NAVBAR SCROLL EFFECT
   - When the user scrolls down, we add a "scrolled" class
     to the navbar, which triggers the frosted glass CSS
=========================================================== */
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');

  // If scrolled more than 40px from the top, add the class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ===========================================================
   2. MOBILE MENU TOGGLE
   - When the hamburger button is clicked, show/hide the nav links
   - Also closes the menu when any link is clicked
=========================================================== */
var toggleButton = document.getElementById('nav-toggle');
var navLinks = document.getElementById('nav-links');

// Toggle menu open/close when hamburger is clicked
toggleButton.addEventListener('click', function () {
  navLinks.classList.toggle('active');
});

// Close the menu when a link inside it is clicked
var links = navLinks.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {
    navLinks.classList.remove('active');
  });
}


/* ===========================================================
   3. SCROLL REVEAL ANIMATION
   - Uses IntersectionObserver to detect when elements
     scroll into the viewport (become visible on screen)
   - Adds a "visible" class to trigger the CSS fade-in effect
=========================================================== */

// Select all elements we want to animate
var animatedElements = document.querySelectorAll(
  '.feature-card, .step, .about-content, .about-visual, .download-card, .team-member'
);

// Create an observer that watches for elements entering the viewport
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // When element becomes visible, add the "visible" class
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once animated (only animate once)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15  // Trigger when 15% of the element is visible
});

// Start observing each element
for (var i = 0; i < animatedElements.length; i++) {
  observer.observe(animatedElements[i]);
}


/* ===========================================================
   4. SMOOTH SCROLLING FOR ANCHOR LINKS
   - When clicking a link like "#features", the page
     smoothly scrolls to that section instead of jumping
   - Only applies to internal links (href starts with "#")
   - Skips external links like download URLs
=========================================================== */
var anchorLinks = document.querySelectorAll('a[href^="#"]');

for (var i = 0; i < anchorLinks.length; i++) {
  anchorLinks[i].addEventListener('click', function (event) {
    var targetId = this.getAttribute('href');

    // Skip if it's just "#" (let browser handle it)
    if (targetId === '#') return;

    // Skip if this link also has a full URL (external links)
    var fullHref = this.href;
    if (fullHref.indexOf('github.com') !== -1) return;

    var targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Prevent the default jump behavior
    event.preventDefault();

    // Calculate position, accounting for the fixed navbar height
    var navbarHeight = document.getElementById('navbar').offsetHeight;
    var targetPosition = targetElement.offsetTop - navbarHeight - 20;

    // Smoothly scroll to the target section
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}
