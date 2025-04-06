// Rezulie Ventures - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const header = document.querySelector('header');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up
      header.classList.toggle('mobile-menu-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (header.classList.contains('mobile-menu-open') && 
        !event.target.closest('nav')) {
      header.classList.remove('mobile-menu-open');
    }
  });
  
  // Close mobile menu when window is resized to desktop size
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && header.classList.contains('mobile-menu-open')) {
      header.classList.remove('mobile-menu-open');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (header.classList.contains('mobile-menu-open')) {
          header.classList.remove('mobile-menu-open');
        }
      }
    });
  });
});
