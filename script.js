// ===== HERO SEQUENCE ANIMATION =====
class HeroSequence {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) {
            console.error('Hero canvas not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.images = [];
        this.totalFrames = 80;
        this.currentFrame = 0;
        this.loadedCount = 0;
        this.errorCount = 0;
        this.hasStarted = false;

        // Settings
        this.fps = 18;
        this.frameInterval = 1000 / this.fps;
        this.startThreshold = 10; // Start after 10 frames are loaded
        this.lastDrawTime = 0;

        // Handle resize
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Start loading
        this.preloadImages();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Redraw current frame immediately on resize
        if (this.images[this.currentFrame] && this.images[this.currentFrame].complete) {
            this.drawFrame(this.currentFrame);
        }
    }

    preloadImages() {
        const baseUrl = 'new_pictures/A_smooth_cinematic_202602061459_9wj0b_';

        for (let i = 0; i < this.totalFrames; i++) {
            const img = new Image();
            const num = String(i).padStart(3, '0');
            img.src = `${baseUrl}${num}.jpg`;

            img.onload = () => {
                this.loadedCount++;
                this.checkStart();
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${i}`);
                this.errorCount++;
                img.isBroken = true; // Mark as broken
                this.checkStart();
            };

            this.images[i] = img;
        }
    }

    checkStart() {
        // Start if we have enough images OR we are done (even if some failed)
        const totalProcessed = this.loadedCount + this.errorCount;

        if (!this.hasStarted && (this.loadedCount >= this.startThreshold || totalProcessed === this.totalFrames)) {
            console.log('Starting animation...');
            this.hasStarted = true;
            this.startAnimation();
        }

        // Always draw first available frame ASAP to avoid loose black screen
        if (this.loadedCount === 1 && !this.hasStarted) {
            const firstReadyIndex = this.images.findIndex(img => img.complete && !img.isBroken);
            if (firstReadyIndex !== -1) this.drawFrame(firstReadyIndex);
        }
    }

    startAnimation() {
        this.animate();
    }

    animate(timestamp) {
        requestAnimationFrame(t => this.animate(t));

        if (!timestamp) timestamp = 0;
        const elapsed = timestamp - this.lastDrawTime;

        if (elapsed > this.frameInterval) {
            this.lastDrawTime = timestamp - (elapsed % this.frameInterval);

            // Advance frame
            let nextFrame = (this.currentFrame + 1) % this.totalFrames;

            // Skip broken/unloaded frames if necessary, but don't loop forever
            let attempts = 0;
            while (attempts < this.totalFrames) {
                const img = this.images[nextFrame];
                if (img && img.complete && !img.isBroken) {
                    this.currentFrame = nextFrame;
                    break;
                }
                nextFrame = (nextFrame + 1) % this.totalFrames;
                attempts++;
            }

            // Only draw if we found a valid frame
            if (this.images[this.currentFrame]?.complete && !this.images[this.currentFrame]?.isBroken) {
                this.drawFrame(this.currentFrame);
            }
        }
    }

    drawFrame(frameIndex) {
        const img = this.images[frameIndex];
        if (!img || !img.complete || img.isBroken) return;

        const canvasRatio = this.canvas.width / this.canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = this.canvas.width;
            drawHeight = this.canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (this.canvas.height - drawHeight) / 2;
        } else {
            drawWidth = this.canvas.height * imgRatio;
            drawHeight = this.canvas.height;
            offsetX = (this.canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSequence();
});

// ===== LANGUAGE SWITCHING =====
// Note: If common.js is loaded, it handles language switching.
// This is a fallback for pages that don't use common.js

class LanguageManager {
    constructor() {
        // Check if common.js has already initialized language
        if (window.updateLanguageContent) {
            this.currentLang = localStorage.getItem('kafedomi_lang') || 'en';
            return; // Let common.js handle it
        }

        this.currentLang = localStorage.getItem('kafedomi_lang') || 'en';
        this.init();
    }

    init() {
        // Get language buttons
        this.langButtons = document.querySelectorAll('.lang-btn');

        // Add event listeners
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchLanguage(btn.dataset.lang));
        });

        // Set initial active state for buttons
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });

        // Set initial language
        this.updateContent();
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;

        this.currentLang = lang;
        localStorage.setItem('kafedomi_lang', lang);

        // Update active button state
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });

        this.updateContent();

        // Dispatch custom event for other components
        const event = new CustomEvent('languageChanged', { detail: { lang } });
        window.dispatchEvent(event);
    }

    updateContent() {
        // Update all elements with data-en/data-gr attributes
        const elements = document.querySelectorAll('[data-en], [data-gr]');
        elements.forEach(el => {
            const content = el.dataset[this.currentLang];
            if (content) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder')) {
                        el.placeholder = content;
                    }
                } else {
                    const hasChildElements = el.children.length > 0;
                    if (!hasChildElements) {
                        el.textContent = content;
                    } else {
                        const textNode = Array.from(el.childNodes).find(
                            node => node.nodeType === 3 && node.textContent.trim().length > 0
                        );
                        if (textNode) {
                            textNode.textContent = content;
                        }
                    }
                }
            }
        });

        document.documentElement.lang = this.currentLang;
        window.currentLang = this.currentLang;
    }
}

// Initialize language manager only if common.js hasn't done it
setTimeout(() => {
    if (!window.updateLanguageContent) {
        window.languageManager = new LanguageManager();
    }
}, 100);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-menu');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                nav.classList.remove('show');
                toggle.classList.remove('active');
            }
        });
    });
});

// Handle contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Safe language detection
        const getLang = () => window.currentLang || (window.languageManager && window.languageManager.currentLang) || localStorage.getItem('kafedomi_lang') || 'en';
        const currentLang = getLang();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'en' ? 'Sending...' : 'Αποστολή...';
        btn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        data.language = currentLang;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                contactForm.reset();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert(error.message || (currentLang === 'en'
                ? 'Error sending message. Please try again.'
                : 'Σφάλμα κατά την αποστολή. Παρακαλώ προσπαθήστε ξανά.'));
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}
