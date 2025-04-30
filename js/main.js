document.addEventListener('DOMContentLoaded', function() {
    /**
     * Theme Toggle
     */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    /**
     * Mobile Menu
     */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
    
    /**
     * Cursor Glow Effect
     */
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow && window.innerWidth > 992) {
        cursorGlow.style.display = 'block';
        
        document.addEventListener('mousemove', function(e) {
            requestAnimationFrame(function() {
                cursorGlow.style.top = e.clientY + 'px';
                cursorGlow.style.left = e.clientX + 'px';
            });
        });
    }
    
    /**
     * Workflow Animation
     */
    const workflowDots = document.querySelectorAll('.workflow-dot');
    const workflowLine = document.querySelector('.workflow-line');
    const workflowScreens = document.querySelectorAll('.workflow-screen');
    
    if (workflowDots.length > 0 && workflowScreens.length > 0) {
        workflowDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Update dots
                workflowDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                // Update line
                if (workflowLine) {
                    const percentage = (index + 1) * 25;
                    workflowLine.style.background = `linear-gradient(to right, var(--primary) ${percentage}%, var(--gray-light) ${percentage}%)`;
                }
                
                // Update screens
                workflowScreens.forEach(screen => screen.classList.remove('active'));
                workflowScreens[index].classList.add('active');
            });
        });
        
        // Auto-advance the workflow every 3 seconds
        let currentWorkflowIndex = 0;
        setInterval(() => {
            currentWorkflowIndex = (currentWorkflowIndex + 1) % workflowDots.length;
            workflowDots[currentWorkflowIndex].click();
        }, 3000);
    }
    
    /**
     * Testimonial Slider
     */
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-btn.prev');
    const testimonialNext = document.querySelector('.testimonial-btn.next');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialCards.length > 0 && testimonialTrack) {
        let currentSlide = 0;
        const slideWidth = 350 + 16; // Card width + gap
        
        // Function to update the slider
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Event listeners for prev/next buttons
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                currentSlide = Math.max(0, currentSlide - 1);
                updateSlider();
            });
        }
        
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                currentSlide = Math.min(testimonialCards.length - 1, currentSlide + 1);
                updateSlider();
            });
        }
        
        // Event listeners for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Auto-advance the testimonials every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            updateSlider();
        }, 5000);
    }
    
    /**
     * Scroll Animation
     */
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                // Get animation type from data attribute
                const animationType = element.dataset.aos || 'fade-up';
                const delay = element.dataset.aosDelay || 0;
                
                // Add animation classes
                setTimeout(() => {
                    element.classList.add('animate', animationType);
                }, delay);
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    /**
     * Smooth Scrolling for Anchor Links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    /**
     * Add active class to current nav link
     */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && linkPage === '/') {
            link.classList.add('active');
        }
    });
    
    /**
     * Disable iOS App Store link
     */
    const appStoreBtn = document.querySelector('.app-store');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('iOS version coming soon!');
        });
    }
    
    /**
     * Form Validation for Contact Form (if exists)
     */
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const formElements = contactForm.elements;
            
            // Basic validation for required fields
            for (let i = 0; i < formElements.length; i++) {
                const field = formElements[i];
                
                if (field.hasAttribute('required') && !field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            }
            
            // Show success message if form is valid
            if (valid) {
                contactForm.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your message!</h3>
                    <p>We'll get back to you as soon as possible.</p>
                `;
                
                contactForm.parentNode.appendChild(successMessage);
            }
        });
    }
    
    /**
     * Privacy Consent Toggle (if exists)
     */
    const consentToggles = document.querySelectorAll('.consent-toggle input');
    
    consentToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // In a real app, this would update the user's consent preferences
            console.log(`Consent for ${this.id} set to: ${this.checked}`);
            
            // Show visual feedback
            const toggleLabel = this.closest('.consent-item').querySelector('.consent-label');
            if (toggleLabel) {
                if (this.checked) {
                    toggleLabel.querySelector('h4').style.color = 'var(--primary)';
                } else {
                    toggleLabel.querySelector('h4').style.color = '';
                }
            }
        });
    });
    
    /**
     * Intersection Observer for lazy loading and animations
     */
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        
        // Apply to feature cards, steps, and testimonials
        document.querySelectorAll('.feature-card, .step, .testimonial-card').forEach(element => {
            appearOnScroll.observe(element);
        });
    }
    
    /**
     * Initialize AOS (Animate on Scroll) manually
     */
    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        aosElements.forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            
            // Add transition properties
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Set transform based on animation type
            const animationType = element.getAttribute('data-aos');
            if (animationType === 'fade-up') {
                element.style.transform = 'translateY(20px)';
            } else if (animationType === 'fade-right') {
                element.style.transform = 'translateX(-20px)';
            } else if (animationType === 'fade-left') {
                element.style.transform = 'translateX(20px)';
            }
            
            // Calculate delay
            const delay = element.getAttribute('data-aos-delay');
            if (delay) {
                element.style.transitionDelay = `${delay}ms`;
            } else if (index > 0) {
                // Add progressive delay for elements without specified delay
                element.style.transitionDelay = `${index * 100}ms`;
            }
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset styles to trigger animation
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all AOS elements
        aosElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize AOS
    initAOS();
});