/**
 * RisottoRaj Restaurant Website JavaScript
 * Handles all interactive elements including:
 * - Header scroll effect
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Menu tabs
 * - Testimonial slider
 * - Scroll reveal animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize all components
  initHeaderScroll();
  initMobileMenu();
  initSmoothScrolling();
  initMenuTabs();
  initTestimonialSlider();
  initScrollReveal();
});

/**
 * Header scroll effect - Changes header style on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Trigger initially in case page is refreshed while scrolled
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.close-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileBtn = document.querySelector('.mobile-btn');
  
  // Open mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });
  
  // Close mobile menu
  closeBtn.addEventListener('click', closeMenu);
  
  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking the button
  if (mobileBtn) {
    mobileBtn.addEventListener('click', closeMenu);
  }
  
  // Close menu function
  function closeMenu() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileNav.classList.contains('open') && 
        !mobileNav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
      closeMenu();
    }
  });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only proceed if the href is not just "#"
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * Menu tabs functionality
 */
function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all tab contents
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Show the corresponding tab content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let interval;
  
  // Function to show testimonial at index
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show testimonial at index
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
  }
  
  // Set up dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
      resetInterval();
    });
  });
  
  // Auto-advance testimonials
  function startInterval() {
    interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }, 5000);
  }
  
  // Reset interval on user interaction
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  // Start the initial interval
  startInterval();
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.section-header, .dish-card, .menu-item, .gallery-item, .about-img, .about-content, .contact-card');
  
  // Add reveal class to all elements
  elements.forEach(element => {
    element.classList.add('reveal');
  });
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }
  
  // Function to handle scroll
  function handleScroll() {
    elements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger once on load
  handleScroll();
}

/**
 * Helper functions
 */

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Update debounced scroll handlers
window.addEventListener('scroll', debounce(function() {
  // Any scroll handlers that need debouncing
}, 10));