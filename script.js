/* ==========================================
   MANTR - LUXURY EVENT PLANNING
   JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // NAVIGATION SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const btnNav = document.getElementById('btnNav');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            logo.src = 'images/logo.png';
        } else {
            navbar.classList.remove('scrolled');
            logo.src = 'images/logo_old.png';
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on page load

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    const parallaxBg = document.getElementById('parallaxBg');

    function handleParallax() {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.4;
        parallaxBg.style.transform = `translateY(${rate}px)`;
    }

    window.addEventListener('scroll', handleParallax);

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 50}ms`;
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe stats
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(stat);
    });

    // ==========================================
    // LIGHTBOX
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const src = this.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show loading state
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            contactForm.style.display = 'none';
            successMessage.classList.add('show');

            // Reset after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successMessage.classList.remove('show');
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });

    // ==========================================
    // FOOTER YEAR
    // ==========================================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================
    // BUTTON HOVER EFFECT (Shine animation)
    // ==========================================
    const buttons = document.querySelectorAll('.btn-luxury, .btn-gold');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // PRELOADER (Optional - Uncomment if needed)
    // ==========================================
    // window.addEventListener('load', function() {
    //     const preloader = document.querySelector('.preloader');
    //     if (preloader) {
    //         preloader.style.opacity = '0';
    //         setTimeout(() => {
    //             preloader.style.display = 'none';
    //         }, 500);
    //     }
    // });

});

// ==========================================
// CSS FOR SPINNER AND RIPPLE (Add to CSS file)
// ==========================================
// Add these styles to your CSS if needed:
/*
.spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
*/
