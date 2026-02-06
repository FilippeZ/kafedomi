// ===== HERO SLIDESHOW =====
class HeroSlideshow {
    constructor() {
        this.container = document.getElementById('hero-slideshow');
        if (!this.container) {
            console.log('Hero slideshow container not found');
            return;
        }
        this.images = [];
        this.currentIndex = 0;
        this.totalImages = 80;
        this.interval = null;
        this.init();
    }

    init() {
        for (let i = 0; i < this.totalImages; i++) {
            const img = document.createElement('img');
            const num = String(i).padStart(3, '0');
            img.src = `new_pictures/A_smooth_cinematic_202602061459_9wj0b_${num}.jpg`;
            img.alt = 'Kafedomi Vending Machine';
            if (i === 0) {
                img.classList.add('active');
            }
            this.container.appendChild(img);
            this.images.push(img);
        }
        this.startSlideshow();
    }

    startSlideshow() {
        let loadedCount = 0;
        this.images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === this.totalImages) {
                        this.playAnimation();
                    }
                };
            }
        });
        if (loadedCount === this.totalImages) {
            this.playAnimation();
        } else {
            setTimeout(() => this.playAnimation(), 500);
        }
    }

    playAnimation() {
        // 42ms = ~24fps like a movie
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 42);
    }

    nextSlide() {
        this.images[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.images[this.currentIndex].classList.add('active');
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlideshow();
});

// ===== LANGUAGE SWITCHING =====
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Get language buttons
        this.langButtons = document.querySelectorAll('.lang-btn');

        // Add event listeners
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchLanguage(btn.dataset.lang));
        });

        // Set initial language
        this.updateContent();
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;

        // Update active button
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all content
        this.updateContent();
    }

    updateContent() {
        // Update all elements with data-en and data-gr attributes
        const elements = document.querySelectorAll('[data-en][data-gr]');

        elements.forEach(element => {
            const content = this.currentLang === 'en'
                ? element.dataset.en
                : element.dataset.gr;

            // Update text content or placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = content;
            } else if (element.tagName === 'OPTION') {
                element.textContent = content;
            } else {
                element.textContent = content;
            }
        });
    }
}

// ===== STICKY HEADER =====
class HeaderManager {
    constructor() {
        this.header = document.getElementById('header');
        this.scrollThreshold = 100;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // Initial check
    }

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;

        if (scrolled) {
            this.header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip empty anchors
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== FORM HANDLING =====
class FormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = null;
        this.init();
    }

    init() {
        if (!this.form) return;

        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Get current language
        const lang = window.languageManager?.currentLang || 'en';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            sector: document.getElementById('sector').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone')?.value || '',
            message: document.getElementById('message').value,
            language: lang
        };

        // Validate
        if (!this.validateForm(formData, lang)) {
            return;
        }

        // Disable submit button
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = lang === 'en' ? 'Sending...' : 'Αποστολή...';
        }

        try {
            // Send to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                this.showSuccessMessage(data.message || (lang === 'en'
                    ? 'Thank you! We will contact you soon.'
                    : 'Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας.'));
                this.form.reset();
            } else {
                this.showErrorMessage(data.message || (lang === 'en'
                    ? 'An error occurred. Please try again.'
                    : 'Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.'));
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showErrorMessage(lang === 'en'
                ? 'Unable to send message. Please check your connection and try again.'
                : 'Αδυναμία αποστολής μηνύματος. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.');
        } finally {
            // Re-enable submit button
            if (this.submitButton) {
                this.submitButton.disabled = false;
                const lang = window.languageManager?.currentLang || 'en';
                this.submitButton.textContent = lang === 'en' ? 'Request Quote' : 'Ζητήστε Προσφορά';
            }
        }
    }

    validateForm(data, lang) {
        // Basic validation
        if (!data.name || !data.company || !data.sector || !data.email) {
            alert(lang === 'en'
                ? 'Please fill in all required fields.'
                : 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert(lang === 'en'
                ? 'Please enter a valid email address.'
                : 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.');
            return false;
        }

        return true;
    }

    showSuccessMessage(message) {
        alert(message);
    }

    showErrorMessage(message) {
        alert(message);
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.sector-card, .product-card, .advantage__feature');

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ===== MOBILE MENU TOGGLE =====
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('nav-toggle');
        this.menu = document.getElementById('nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu when clicking on a link
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }

    openMenu() {
        this.menu.style.display = 'block';
        this.menu.style.position = 'absolute';
        this.menu.style.top = '80px';
        this.menu.style.left = '0';
        this.menu.style.right = '0';
        this.menu.style.backgroundColor = 'white';
        this.menu.style.padding = '1rem';
        this.menu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';

        this.menu.querySelector('.nav__list').style.display = 'flex';
        this.menu.querySelector('.nav__list').style.flexDirection = 'column';
        this.menu.querySelector('.nav__list').style.gap = '1rem';

        // Animate toggle button
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.style.display = 'none';

        // Reset toggle button
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ===== CTA BUTTON SCROLL TO FORM =====
class CTAButtonManager {
    constructor() {
        this.init();
    }

    init() {
        // Get all CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-hero');

        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Only handle if it's not a form submit button
                if (btn.type !== 'submit') {
                    e.preventDefault();
                    const ctaSection = document.querySelector('.cta');
                    if (ctaSection) {
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = ctaSection.offsetTop - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ===== PARALLAX EFFECT FOR HERO =====
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero__img');
        this.init();
    }

    init() {
        if (!this.hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// ===== INITIALIZE ALL MODULES =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    window.languageManager = new LanguageManager();
    new HeaderManager();
    new SmoothScroll();
    new FormManager();
    new AnimationObserver();
    new MobileMenu();
    new CTAButtonManager();
    new ParallaxEffect();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
