document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById("navbar");
  const themeToggle = document.getElementById("themeToggle");
  const form = document.querySelector('.contact-form');
  const formMessage = document.getElementById("formMessage");
  let prevScrollpos = window.pageYOffset;

  // Apply saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'light-theme' ? '🌙' : '☀️';
  }

  // Hamburger Menu Toggle
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the document
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
    animateLinks();
  });

  // Close hamburger menu when touching anywhere outside the menu
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navbar.contains(e.target)) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });

  // Hide/Show Navbar on Scroll
  window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-100px"; // Adjust this value based on your header height
    }
    prevScrollpos = currentScrollPos;
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // Animate Links
  function animateLinks() {
    const links = navLinks.querySelectorAll('li');
    links.forEach((link, index) => {
      link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    themeToggle.textContent = currentTheme === 'light-theme' ? '🌙' : '☀️';
    localStorage.setItem('theme', currentTheme);
  });

  // Form Validation and Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      formMessage.textContent = "Thank you for your message!";
      formMessage.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      formMessage.textContent = "Oops! There was a problem.";
      formMessage.style.color = "red";
    });
  });
});
