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
  
  // Add touch feedback ripple effect for mobile
  function createRipple(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.classList.add("ripple");
    
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  }
  
  // Toggle menu function with haptic feedback if available
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    navOverlay.classList.toggle('active');
    
    // Try to provide haptic feedback if supported
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    
    // Announce menu state for accessibility
    const menuState = navMenu.classList.contains('active') ? 'opened' : 'closed';
    hamburger.setAttribute('aria-expanded', menuState === 'opened');
    
    // Focus first menu item when opening for keyboard navigation
    if (menuState === 'opened') {
      setTimeout(() => {
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 300);
    }
  }
  
  // Close menu function
  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  // Hamburger click with ripple effect
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    createRipple(e);     // Create ripple effect
    toggleMenu();
  });
  
  // Add touch start for more responsive feel on mobile
  hamburger.addEventListener('touchstart', function(e) {
    e.stopPropagation();
    // Add pressed visual state
    this.classList.add('pressed');
  });
  
  // Remove pressed state on touch end
  hamburger.addEventListener('touchend', function() {
    this.classList.remove('pressed');
  });
  
  // Overlay click
  navOverlay.addEventListener('click', closeMenu);
  
  // Navigation links with visual feedback
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    // Add ripple effect to links
    link.addEventListener('click', function(e) {
      createRipple(e);
      e.preventDefault();
      
      // Add active class temporarily
      this.classList.add('nav-link-active');
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        closeMenu();
        setTimeout(() => {
          // Remove active class after delay
          this.classList.remove('nav-link-active');
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
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
  
  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
      hamburger.focus(); // Return focus to hamburger button
    }
  });
  
  // Set ARIA attributes for accessibility
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'nav-menu');
  navMenu.id = 'nav-menu';
  navMenu.setAttribute('aria-labelledby', 'menu-button');
});

// Project card auto-scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
  const projectScroll = document.getElementById('projectScroll');
  
  if (projectScroll) {
    // Only apply auto-scroll on larger screens where horizontal scrolling is active
    function setupProjectScroll() {
      if (window.innerWidth > 600) {
        let isScrolling = false;
        let scrollDirection = 1; // 1 for right, -1 for left
        let scrollSpeed = 0.5; // Pixels per frame
        let scrollInterval;
        let lastScrollPosition = 0;
        
        // Start auto-scrolling after a delay
        setTimeout(() => {
          scrollInterval = setInterval(() => {
            if (!isScrolling) {
              // Check if we've reached the end or beginning
              if (projectScroll.scrollLeft >= (projectScroll.scrollWidth - projectScroll.clientWidth) && scrollDirection === 1) {
                // Reached the end, reverse direction
                scrollDirection = -1;
              } else if (projectScroll.scrollLeft <= 0 && scrollDirection === -1) {
                // Reached the beginning, reverse direction
                scrollDirection = 1;
              }
              
              projectScroll.scrollLeft += scrollDirection * scrollSpeed;
            }
          }, 20);
        }, 2000);
        
        // Pause scrolling when user interacts
        projectScroll.addEventListener('mouseenter', () => {
          isScrolling = true;
        });
        
        projectScroll.addEventListener('mouseleave', () => {
          isScrolling = false;
          lastScrollPosition = projectScroll.scrollLeft;
        });
        
        projectScroll.addEventListener('touchstart', () => {
          isScrolling = true;
        });
        
        projectScroll.addEventListener('touchend', () => {
          setTimeout(() => {
            isScrolling = false;
            lastScrollPosition = projectScroll.scrollLeft;
          }, 1000);
        });
      } else {
        // On mobile, ensure project cards are visible and nicely spaced
        const projectCards = projectScroll.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          card.style.opacity = 1;
        });
      }
    }
    
    // Run initially
    setupProjectScroll();
    
    // Re-run when window is resized
    window.addEventListener('resize', setupProjectScroll);
  }
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
