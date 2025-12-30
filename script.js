// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize the navbar state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for elements with data-speed attribute
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    function updateParallax() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yPos = -(scrollPosition * speed);
            
            // Only apply transform if the element is in the viewport
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isInViewport = elementTop < window.innerHeight && elementBottom > 0;
            
            if (isInViewport) {
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
        
        requestAnimationFrame(updateParallax);
    }
    
    // Start the parallax animation
    if (parallaxElements.length > 0) {
        requestAnimationFrame(updateParallax);
    }

    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .gallery-item, [data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // For elements with data-aos attribute
                    if (element.hasAttribute('data-aos')) {
                        const animationType = element.getAttribute('data-aos');
                        const delay = element.getAttribute('data-aos-delay') || 0;
                        
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        }, parseInt(delay));
                        
                        // Stop observing after animation
                        observer.unobserve(element);
                    } 
                    // For service cards and gallery items
                    else if (element.classList.contains('service-card') || element.classList.contains('gallery-item')) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        // Stop observing after animation
                        observer.unobserve(element);
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all elements
        elements.forEach(element => {
            // Set initial styles for animation
            if (element.hasAttribute('data-aos')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            } else if (element.classList.contains('service-card') || element.classList.contains('gallery-item')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
            }
            
            observer.observe(element);
        });
    };
    
    // Initialize scroll animations
    if (document.querySelector('.service-card, .gallery-item, [data-aos]')) {
        animateOnScroll();
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 1500);
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            const lazyLoad = function() {
                lazyImages.forEach(img => {
                    if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.removeAttribute('loading');
                    }
                });
                
                // Remove event listener if all images are loaded
                if (lazyImages.length === 0) {
                    window.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            };
            
            // Initial check
            lazyLoad();
            
            // Add event listeners
            window.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationchange', lazyLoad);
        }
    }
    
    // Add a class to the body when the page has loaded
    // This can be used for page load animations
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
    
    // Add a class to the body when the user starts interacting with the page
    // This can be used for hover effects that shouldn't trigger on page load
    document.addEventListener('mousemove', function init() {
        document.body.classList.add('user-is-interacting');
        document.removeEventListener('mousemove', init);
    });
});
