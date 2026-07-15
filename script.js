// Header navigation toggle elements
const toggleMenu = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

// Project filter controls and project cards
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

if (toggleMenu && nav) {
  toggleMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
    nav.classList.toggle('collapsed');
    const isExpanded = !nav.classList.contains('collapsed');
    toggleMenu.setAttribute('aria-expanded', isExpanded);
  });
}

// Update button appearance for the currently selected filter
function setActiveFilter(category) {
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === category);
  });
}

// Show or hide project cards based on selected category
function filterProjects(category) {
  projectCards.forEach((card) => {
    const matches = category === 'all' || card.dataset.category === category;
    card.style.display = matches ? '' : 'none';
  });
  setActiveFilter(category);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterProjects(button.dataset.filter);
  });
});

// Lightbox controls for the About image preview
const aboutImageButton = document.querySelector('.about-image-button');
const aboutImage = document.querySelector('.about-image');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

// Open the lightbox overlay and display the About image at full size
function openLightbox() {
  if (!aboutImage || !lightboxImage || !lightboxOverlay) return;
  lightboxImage.src = aboutImage.src;
  lightboxImage.alt = aboutImage.alt;
  lightboxOverlay.classList.add('open');
  lightboxOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

// Close the lightbox overlay and restore page scroll
function closeLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.classList.remove('open');
  lightboxOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

if (aboutImageButton) {
  aboutImageButton.addEventListener('click', openLightbox);
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', (event) => {
    if (event.target === lightboxOverlay) {
      closeLightbox();
    }
  });
}

// Close lightbox when pressing Escape for accessibility
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('open')) {
    closeLightbox();
  }
});

// Initialize project filter state on page load
filterProjects('all');
