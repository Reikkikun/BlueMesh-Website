/* --- Navbar Scroll Effect --- */
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* --- Mobile Menu Toggle --- */
var toggleButton = document.getElementById('nav-toggle');
var navLinks = document.getElementById('nav-links');

// Toggle menu
toggleButton.addEventListener('click', function () {
  navLinks.classList.toggle('active');
});

// Close menu on link click
var links = navLinks.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {
    navLinks.classList.remove('active');
  });
}

/* --- Scroll Reveal --- */

var animatedElements = document.querySelectorAll(
  '.feature-card, .step, .about-content, .about-visual, .download-card, .team-member'
);

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

for (var i = 0; i < animatedElements.length; i++) {
  observer.observe(animatedElements[i]);
}

/* --- Smooth Scrolling --- */
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

    // Prevent default jump
    event.preventDefault();

    var navbarHeight = document.getElementById('navbar').offsetHeight;
    var targetPosition = targetElement.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

/* --- Disable Right-Click --- */
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);
