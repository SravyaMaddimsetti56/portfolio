document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // 2. Sticky Navbar Background & Active Link Update on Scroll
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (nameInput.value.trim() === '') {
      nameInput.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('invalid');
    }

    // Email Validation
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('invalid');
    }

    // Message Validation
    if (messageInput.value.trim() === '') {
      messageInput.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      messageInput.parentElement.classList.remove('invalid');
    }

    // Success Handling
    if (isValid) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thank you! Your message has been prepared to send.';
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = '';
      }, 5000);
    }
  });

  // Clear validation styling on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.parentElement.classList.remove('invalid');
    });
  });
});
