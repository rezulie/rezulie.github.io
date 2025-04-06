// Animation and scroll effects for Rezulie Ventures Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll reveal animations
  initScrollReveal();
  
  // Add particle background to hero sections
  initParticles();
  
  // Add typing animation to slogan
  initTypingAnimation();
  
  // Add hover effects to service cards
  initCardEffects();
});

// Scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  // Check on initial load
  checkReveal();
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
}

// Particle background effect
function initParticles() {
  const heroSections = document.querySelectorAll('.hero');
  
  heroSections.forEach(section => {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    section.appendChild(particleContainer);
    
    // Add particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Smaller particles
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position, slower animation and random delay
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      const duration = Math.random() * 10 + 15;
      particle.style.animationDuration = `${duration}s`;
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;
      
      particleContainer.appendChild(particle);
    }
  });
}

// Typing animation for slogan
function initTypingAnimation() {
  const slogans = document.querySelectorAll('.slogan');
  
  slogans.forEach(slogan => {
    // Only apply to first slogan on page
    if (slogan === document.querySelector('.slogan')) {
      const text = slogan.textContent;
      slogan.textContent = '';
      slogan.classList.add('typing-animation');
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          slogan.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          slogan.classList.add('typing-done');
        }
      }, 100);
    }
  });
}

// Card hover effects
function initCardEffects() {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Parallax scrolling effect
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  
  // Parallax for hero sections
  document.querySelectorAll('.hero').forEach(hero => {
    const speed = 0.5;
    hero.style.backgroundPositionY = `${scrollPosition * speed}px`;
  });
  
  // Animate elements based on scroll position
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight * 0.8) {
      element.classList.add('animated');
    }
  });
});
