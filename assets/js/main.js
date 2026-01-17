/**
 * Rezulie Ventures - Main JavaScript
 * Core functionality for navigation and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();

    // Smooth scrolling for anchor links
    initSmoothScroll();
});

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('header');

    if (!mobileMenuBtn || !header) return;

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        header.classList.toggle('mobile-menu-open');

        // Update aria-expanded for accessibility
        const isOpen = header.classList.contains('mobile-menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (header.classList.contains('mobile-menu-open') &&
            !event.target.closest('nav') &&
            !event.target.closest('.mobile-menu-btn')) {
            header.classList.remove('mobile-menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && header.classList.contains('mobile-menu-open')) {
            header.classList.remove('mobile-menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && header.classList.contains('mobile-menu-open')) {
            header.classList.remove('mobile-menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Account for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const header = document.querySelector('header');
                if (header.classList.contains('mobile-menu-open')) {
                    header.classList.remove('mobile-menu-open');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }

                // Set focus to target for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
}
