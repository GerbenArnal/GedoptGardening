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