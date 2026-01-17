/**
 * Rezulie Ventures - Animation System
 * Scroll reveal and interaction effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();

    // Initialize card hover effects
    initCardEffects();

    // Initialize typing animation for slogan (optional - only on home page)
    initTypingAnimation();
});

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .section-animate');

    if (revealElements.length === 0) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If reduced motion is preferred, show all elements immediately
        revealElements.forEach(element => {
            element.classList.add('active', 'in-view');
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'in-view');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Card 3D tilt effect on hover
 */
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .contact-method');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle tilt effect
            const angleX = (y - centerY) / 25;
            const angleY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Typing animation for slogan (first instance only)
 */
function initTypingAnimation() {
    // Only run on home page
    if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
        return;
    }

    const slogan = document.querySelector('.hero .slogan');
    if (!slogan) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const text = slogan.textContent;
    slogan.textContent = '';
    slogan.classList.add('typing-animation');

    let i = 0;
    const typeSpeed = 80; // ms per character

    function typeWriter() {
        if (i < text.length) {
            slogan.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            slogan.classList.add('typing-done');
            slogan.classList.remove('typing-animation');
        }
    }

    // Start typing after initial animations complete
    setTimeout(typeWriter, 600);
}

/**
 * Parallax scrolling effect for hero sections
 */
window.addEventListener('scroll', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const scrollPosition = window.pageYOffset;

    // Subtle parallax for decorative orbs
    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});
