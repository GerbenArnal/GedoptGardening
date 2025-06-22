// Slideshow functionality for projects page
let slideIndices = [0, 0, 0, 0, 0,0];

function nextSlide(projectIndex) {
    const project = document.querySelectorAll(".project")[projectIndex];
    const slides = project.querySelectorAll(".slide");
    
    if (slides.length === 0) return;
    
    slideIndices[projectIndex] = (slideIndices[projectIndex] + 1) % slides.length;
    showSlide(projectIndex, slideIndices[projectIndex]);
}

function prevSlide(projectIndex) {
    const project = document.querySelectorAll(".project")[projectIndex];
    const slides = project.querySelectorAll(".slide");
    
    if (slides.length === 0) return;
    
    slideIndices[projectIndex] = (slideIndices[projectIndex] - 1 + slides.length) % slides.length;
    showSlide(projectIndex, slideIndices[projectIndex]);
}

function showSlide(projectIndex, slideIndex) {
    const project = document.querySelectorAll(".project")[projectIndex];
    const slides = project.querySelectorAll(".slide");
    
    if (slides.length === 0) return;
    
    // Verberg alle slides
    slides.forEach(slide => slide.classList.add("hidden"));
    
    // Toon de huidige slide
    slides[slideIndex].classList.remove("hidden");
    
    // Update de index
    slideIndices[projectIndex] = slideIndex;
}

function initializeSlides() {
    // Zorg ervoor dat de eerste slide van elk project zichtbaar is
    const projects = document.querySelectorAll(".project");
    projects.forEach((project, index) => {
        const slides = project.querySelectorAll(".slide");
        if (slides.length > 0) {
            slides.forEach(slide => slide.classList.add("hidden"));
            slides[0].classList.remove("hidden");
            slideIndices[index] = 0;
        }
    });
}

// Initialize slides when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize slides if we're on the projects page
    if (document.querySelector('.projecten')) {
        initializeSlides();
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
});

// LIGHTBOX FUNCTIONALITEIT VOOR PROJECTFOTO'S

document.addEventListener('DOMContentLoaded', function() {
  // Verzamel alle project slideshows
  const projectSlideshows = document.querySelectorAll('.project');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentProjectIndex = null;
  let currentSlideIndex = null;

  // Klik op een projectfoto opent de lightbox
  projectSlideshows.forEach((project, projectIndex) => {
    const slides = project.querySelectorAll('.slide');
    slides.forEach((slide, slideIndex) => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', function() {
        openLightbox(projectIndex, slideIndex);
      });
    });
  });

  function openLightbox(projectIndex, slideIndex) {
    currentProjectIndex = projectIndex;
    currentSlideIndex = slideIndex;
    updateLightboxImage();
    lightboxOverlay.classList.add('active');
    lightboxOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const project = document.querySelectorAll('.project')[currentProjectIndex];
    const slides = project.querySelectorAll('.slide');
    if (slides.length === 0) return;
    lightboxImg.src = slides[currentSlideIndex].src;
    lightboxImg.alt = slides[currentSlideIndex].alt || '';
  }

  function showNextLightboxSlide() {
    const project = document.querySelectorAll('.project')[currentProjectIndex];
    const slides = project.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateLightboxImage();
  }

  function showPrevLightboxSlide() {
    const project = document.querySelectorAll('.project')[currentProjectIndex];
    const slides = project.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateLightboxImage();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextLightboxSlide();
  });
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevLightboxSlide();
  });

  // Sluiten met Escape
  document.addEventListener('keydown', function(e) {
    if (lightboxOverlay.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeLightbox();
    }
    if (lightboxOverlay.classList.contains('active') && (e.key === 'ArrowRight')) {
      showNextLightboxSlide();
    }
    if (lightboxOverlay.classList.contains('active') && (e.key === 'ArrowLeft')) {
      showPrevLightboxSlide();
    }
  });
}); 