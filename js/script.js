document.addEventListener('DOMContentLoaded', () => {
  // Current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Back-to-top visibility
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => backToTop.classList.toggle('show', window.scrollY > 450);
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Close the mobile menu after selecting a section
  const menu = document.getElementById('mainMenu');
  document.querySelectorAll('#mainMenu .nav-link, #mainMenu .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Update active navigation item while scrolling
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));

  // Front-end demo form validation. Connect this form to your backend/email service for real submissions.
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  form.addEventListener('submit', event => {
    event.preventDefault();
    formMessage.className = 'form-message';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      formMessage.textContent = 'Please complete your name, email address and project details.';
      formMessage.classList.add('error');
      return;
    }
    if (!validEmail) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.classList.add('error');
      return;
    }
    formMessage.textContent = 'Thanks! Your details are validated. Connect this form to your email or backend service to receive enquiries.';
    formMessage.classList.add('success');
    form.reset();
  });
});



  // Gallery category filters
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryColumns = document.querySelectorAll('.gallery-column');
  galleryFilters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      galleryFilters.forEach(item => item.classList.toggle('active', item === button));
      galleryColumns.forEach(column => {
        const visible = filter === 'all' || column.dataset.category === filter;
        column.classList.toggle('is-hidden', !visible);
      });
    });
  });

  // Bootstrap image preview modal
  const galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    galleryModal.addEventListener('show.bs.modal', event => {
      const trigger = event.relatedTarget;
      const image = document.getElementById('galleryModalImage');
      const title = document.getElementById('galleryModalLabel');
      image.src = trigger.dataset.image;
      image.alt = trigger.querySelector('img').alt;
      title.textContent = trigger.dataset.caption || 'Project preview';
    });
    galleryModal.addEventListener('hidden.bs.modal', () => {
      document.getElementById('galleryModalImage').src = '';
    });
  }
