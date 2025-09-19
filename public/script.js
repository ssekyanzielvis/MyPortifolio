// Combined mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  // Ensure we only run this once
  if (window.mobileNavInitialized) return;
  window.mobileNavInitialized = true;
  
  // Create overlay if it doesn't exist
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }
  
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    navOverlay.classList.toggle('active');
  }
  
  // Close menu function
  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    navOverlay.classList.remove('active');
  }
  
  // Hamburger click
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    toggleMenu();
  });
  
  // Overlay click
  navOverlay.addEventListener('click', closeMenu);
  
  // Navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        closeMenu();
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Small delay for smoother experience
      }
    });
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    const isMenuOpen = navMenu.classList.contains('active');
    const clickedInside = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (isMenuOpen && !clickedInside) {
      closeMenu();
    }
  });
});

// Contact form submission code will start below this line

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      document.getElementById('formStatus').textContent = 'Please fill all fields.';
      return;
    }
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (data.status === 'success') {
        document.getElementById('formStatus').textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
      } else {
        document.getElementById('formStatus').textContent = 'Submission failed. Try again.';
      }
    } catch (err) {
      document.getElementById('formStatus').textContent = 'Error submitting form.';
    }
  });
}
