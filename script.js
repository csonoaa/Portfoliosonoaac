// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollEffects();
    initFadeInAnimation();
    initMobileMenu();
    initContactForm();
    initScrollProgress();
    initScrollToTop();
    initCounters();
    initLightbox();
    initThemeToggle();
    initFloatingLabels();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navList = document.querySelector('.nav-list');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Header scroll effects
 */
function initScrollEffects() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Fade-in animation using Intersection Observer
 */
function initFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Contact form handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldValidation(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // Clear all validation states
                inputs.forEach(input => {
                    clearFieldValidation(input);
                });
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/**
 * Validate individual field
 */
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous validation state
    clearFieldValidation(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
        setFieldValidation(field, 'error', '✕', errorMessage);
        isValid = false;
    } else if (field.type === 'email' && value) {
        // Validate email format
        if (!isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            setFieldValidation(field, 'error', '✕', errorMessage);
            isValid = false;
        } else {
            setFieldValidation(field, 'success', '✓');
        }
    } else if (value) {
        // Field has valid content
        setFieldValidation(field, 'success', '✓');
    }
    
    return isValid;
}

/**
 * Set field validation state
 */
function setFieldValidation(field, state, icon, message = '') {
    const formGroup = field.closest('.form-group');
    const validationIcon = formGroup.querySelector('.validation-icon');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('success', 'error');
    formGroup.classList.add(state);
    
    if (validationIcon) {
        validationIcon.textContent = icon;
    }
    
    if (errorElement) {
        if (state === 'error' && message) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        } else {
            errorElement.classList.remove('visible');
        }
    }
}

/**
 * Clear field validation state
 */
function clearFieldValidation(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('success', 'error');
    
    if (errorElement) {
        errorElement.classList.remove('visible');
    }
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form messages
 */
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.25rem;
        font-weight: 500;
        ${type === 'success' 
            ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add performance optimizations
 */
// Debounce scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-heavy operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

/**
 * Initialize service worker for better performance (optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //   .then(function(registration) {
        //     console.log('SW registered: ', registration);
        //   })
        //   .catch(function(registrationError) {
        //     console.log('SW registration failed: ', registrationError);
        //   });
    });
}

/**
 * Add loading animations for images
 */
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

/**
 * Add touch gesture support for mobile
 */
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const navList = document.querySelector('.nav-list');
    
    // Right swipe to open menu, left swipe to close
    if (touchEndX - touchStartX > swipeThreshold && !navList.classList.contains('active')) {
        // Right swipe - could open menu if needed
    } else if (touchStartX - touchEndX > swipeThreshold && navList.classList.contains('active')) {
        // Left swipe - close menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        navList.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}

/**
 * Analytics and performance tracking (optional)
 */
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

/**
 * Scroll to top button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Animate counter to target value
 */
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    if (lightbox && lightboxImage && lightboxClose) {
        // Add click handlers to all lightbox triggers
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    // Use higher resolution image for lightbox
                    const highResUrl = img.src.replace('w=400&h=300', 'w=1200&h=800');
                    lightboxImage.src = highResUrl;
                    lightboxImage.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });
        
        // Close lightbox when clicking close button
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add a small animation to the button
            this.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
        });
    }
}

/**
 * Floating labels functionality
 */
function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if field has value on load
            checkFieldValue(group, input);
            
            // Handle focus events
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                group.classList.remove('focused');
                checkFieldValue(group, input);
            });
            
            // Handle input events
            input.addEventListener('input', function() {
                checkFieldValue(group, input);
            });
        }
    });
}

/**
 * Check if field has value and update label position
 */
function checkFieldValue(group, input) {
    if (input.value.trim() || input.type === 'select-one' && input.selectedIndex > 0) {
        group.classList.add('filled');
    } else {
        group.classList.remove('filled');
    }
}

// Uncomment to enable performance tracking
// trackPerformance();
