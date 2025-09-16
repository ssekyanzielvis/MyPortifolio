// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

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
