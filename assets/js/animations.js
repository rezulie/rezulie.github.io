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
  const heroSections = document.querySelectorAll('.particles-container');
  
  heroSections.forEach(container => {
    // Clear existing particles
    container.innerHTML = '';
    
    // Create particles
    const particles = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size (smaller particles)
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random velocity
      const vx = (Math.random() - 0.5) * 0.2;
      const vy = (Math.random() - 0.5) * 0.2;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.2;
      particle.style.opacity = opacity;
      
      // Store particle properties
      particles.push({
        element: particle,
        x: posX,
        y: posY,
        vx: vx,
        vy: vy,
        size: size
      });
      
      // Set initial position
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      container.appendChild(particle);
    }
    
    // Animate particles
    function animateParticles() {
      const containerRect = container.getBoundingClientRect();
      
      particles.forEach((p, index) => {
        // Update position based on velocity
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary collision detection
        if (p.x < 0 || p.x > 100) {
          p.vx = -p.vx;
          p.x = Math.max(0, Math.min(100, p.x));
        }
        
        if (p.y < 0 || p.y > 100) {
          p.vy = -p.vy;
          p.y = Math.max(0, Math.min(100, p.y));
        }
        
        // Particle collision detection
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          // Calculate distance between particles
          const dx = (p.x - p2.x) / 100 * containerRect.width;
          const dy = (p.y - p2.y) / 100 * containerRect.height;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check for collision
          if (distance < (p.size + p2.size) / 2) {
            // Simple elastic collision
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            
            // Rotate velocities
            const vx1 = p.vx * cos + p.vy * sin;
            const vy1 = p.vy * cos - p.vx * sin;
            const vx2 = p2.vx * cos + p2.vy * sin;
            const vy2 = p2.vy * cos - p2.vx * sin;
            
            // Swap velocities
            p.vx = vx2 * cos - vy1 * sin;
            p.vy = vy1 * cos + vx2 * sin;
            p2.vx = vx1 * cos - vy2 * sin;
            p2.vy = vy2 * cos + vx1 * sin;
            
            // Move particles apart to prevent sticking
            const overlap = (p.size + p2.size) / 2 - distance;
            const moveX = overlap * cos / 200; // Divide by 200 to convert to percentage
            const moveY = overlap * sin / 200;
            
            p.x -= moveX;
            p.y -= moveY;
            p2.x += moveX;
            p2.y += moveY;
          }
        }
        
        // Update DOM
        p.element.style.left = `${p.x}%`;
        p.element.style.top = `${p.y}%`;
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
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
