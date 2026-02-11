// ===== SHARED NAVIGATION COMPONENT =====
// This file provides a unified navigation system across all pages

(function () {
    'use strict';

    // Navigation HTML template - Updated with Vending Machines subcategories
    const navbarHTML = `
        <header class="header" id="header">
            <nav class="nav container">
                <a href="index.html" class="nav__logo">
                    <img src="logo.png" alt="Kafedomi Logo">
                    <span class="logo-text">KAFEDOMI</span>
                </a>

                <div class="nav__menu" id="nav-menu">
                    <ul class="nav__list">
                        <!-- Vending Solutions Dropdown -->
                        <li class="nav__item has-dropdown" data-category-group="vending">
                            <a href="#" class="nav__link" data-en="Vending Solutions" data-gr="Λύσεις Vending">Vending Solutions</a>
                            <div class="dropdown-menu">
                                <a href="products.html?category=vending-coffee" data-category="vending-coffee" data-en="Coffee Vending" data-gr="Vending Καφέ">Coffee Vending</a>
                                <a href="products.html?category=vending-snacks" data-category="vending-snacks" data-en="Snack Vending" data-gr="Vending Σνακ">Snack Vending</a>
                                <a href="products.html?category=vending-drinks" data-category="vending-drinks" data-en="Cold Drinks Vending" data-gr="Vending Κρύων Ποτών">Cold Drinks Vending</a>
                                <div class="dropdown-menu__divider"></div>
                                <a href="products.html" data-en="View All Vending" data-gr="Δείτε Όλες τις Λύσεις">View All Vending</a>
                            </div>
                        </li>

                        <!-- Office Coffee -->
                        <li class="nav__item" data-category-group="office-coffee">
                            <a href="brands.html" class="nav__link" data-en="Office Coffee" data-gr="Καφές Γραφείου">Office Coffee</a>
                        </li>

                        <!-- Water Solutions -->
                        <li class="nav__item" data-category-group="water">
                            <a href="water.html" class="nav__link" data-en="Water Solutions" data-gr="Λύσεις Νερού">Water Solutions</a>
                        </li>

                        <!-- About Us -->
                        <li class="nav__item">
                            <a href="about.html" class="nav__link" data-en="About Us" data-gr="Σχετικά με εμάς">About Us</a>
                        </li>

                        <!-- Language Toggle (Mobile) -->
                        <li class="nav__item nav__item--mobile-only">
                            <div class="language-toggle">
                                <button class="lang-btn" data-lang="en">EN</button>
                                <span class="lang-divider">|</span>
                                <button class="lang-btn" data-lang="gr">GR</button>
                            </div>
                        </li>

                        <!-- Request Quote (Mobile) -->
                        <li class="nav__item nav__item--mobile-only">
                            <a href="index.html#quote-section" class="btn btn-primary btn-cta" data-en="Request a Quote" data-gr="Ζητήστε Προσφορά">Request a Quote</a>
                        </li>
                    </ul>
                </div>

                <div class="nav__actions nav__actions--desktop-only">
                    <div class="language-toggle">
                        <button class="lang-btn" data-lang="en">EN</button>
                        <span class="lang-divider">|</span>
                        <button class="lang-btn" data-lang="gr">GR</button>
                    </div>
                    <a href="index.html#quote-section" class="btn btn-primary btn-cta" data-en="Request a Quote" data-gr="Ζητήστε Προσφορά">Request a Quote</a>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    `;

    // Category to parent group mapping
    const categoryGroups = {
        'vending-coffee': 'vending',
        'vending-snacks': 'vending',
        'vending-drinks': 'vending',
        'vending-combo': 'vending',
        'coffee-capsule': 'office-coffee'
    };

    // Load navbar into target element
    function loadNavbar() {
        const container = document.getElementById('navbar-container');
        if (container) {
            container.innerHTML = navbarHTML;
        } else {
            // If no container, insert at start of body
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        }

        // Initialize after insertion
        initNavbar();

        // Re-initialize language manager for navbar elements
        reinitializeLanguage();
    }

    // Initialize navbar functionality
    function initNavbar() {
        setupActiveState();
        setupMobileMenu();
        setupDropdowns();
        setupHeaderScroll();
    }

    // Re-initialize language buttons after navbar is loaded
    function reinitializeLanguage() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = localStorage.getItem('kafedomi_lang') || 'en';

        // Set initial active state
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);

            // Add click event listener
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;

                // Update localStorage
                localStorage.setItem('kafedomi_lang', lang);

                // Update active button state
                langButtons.forEach(b => {
                    b.classList.toggle('active', b.dataset.lang === lang);
                });

                // Update all content
                updateLanguageContent(lang);

                // Dispatch custom event for other components
                const event = new CustomEvent('languageChanged', { detail: { lang } });
                window.dispatchEvent(event);
            });
        });

        // Apply current language
        updateLanguageContent(currentLang);
    }

    // Update all elements with data-en/data-gr attributes
    function updateLanguageContent(lang) {
        const elements = document.querySelectorAll('[data-en], [data-gr]');
        elements.forEach(el => {
            const content = el.dataset[lang];
            if (content) {
                // If it's an input/textarea with placeholder, update placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder')) {
                        el.placeholder = content;
                    }
                } else {
                    // Check if element has child elements (like SVGs)
                    const hasChildElements = el.children.length > 0;
                    if (!hasChildElements) {
                        el.textContent = content;
                    } else {
                        // Find and update text node without destroying child elements
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

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Store globally for other scripts
        window.currentLang = lang;
    }

    // Set active state based on URL
    function setupActiveState() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const brand = urlParams.get('brand');

        // If we have a category or brand parameter
        if (category || brand) {
            // Find and highlight the active category link
            if (category) {
                const activeLinks = document.querySelectorAll(`[data-category="${category}"]`);
                activeLinks.forEach(link => link.classList.add('active'));

                // Highlight parent dropdown
                const parentGroup = categoryGroups[category];
                if (parentGroup) {
                    const parentItem = document.querySelector(`[data-category-group="${parentGroup}"]`);
                    if (parentItem) {
                        parentItem.classList.add('active');
                    }
                }
            }

            // Handle brand active state
            if (brand) {
                const brandLink = document.querySelector(`[data-brand="${brand}"]`);
                if (brandLink) {
                    brandLink.classList.add('active');
                }
                // Brands are under coffee-brands group
                const coffeeGroup = document.querySelector('[data-category-group="coffee-brands"]');
                if (coffeeGroup) {
                    coffeeGroup.classList.add('active');
                }
            }
        }

        // Check if we're on the water page
        const isWaterPage = window.location.pathname.includes('water');
        if (isWaterPage) {
            const waterItem = document.querySelector('[data-category-group="water"]');
            if (waterItem) {
                waterItem.classList.add('active');
            }
        }

        // Check if we're on the about page
        const isAboutPage = window.location.pathname.includes('about');
        if (isAboutPage) {
            const aboutLink = document.querySelector('a[href="about.html"]');
            if (aboutLink) {
                aboutLink.parentElement.classList.add('active');
            }
        }
    }

    // Setup mobile hamburger menu
    function setupMobileMenu() {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('nav-menu');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                toggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove('show');
                    toggle.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('show');
                    toggle.classList.remove('active');
                });
            });
        }
    }

    // Setup dropdown hover/click behavior
    function setupDropdowns() {
        const dropdownItems = document.querySelectorAll('.has-dropdown');

        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav__link');
            const dropdown = item.querySelector('.dropdown-menu');

            // Prevent default on parent link click
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // On mobile, toggle dropdown
                if (window.innerWidth <= 1023) {
                    // Close other dropdowns first
                    dropdownItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('dropdown-open');
                        }
                    });
                    item.classList.toggle('dropdown-open');
                }
            });

            // Desktop: show on hover (handled by CSS, but we can add JS for reliability)
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1023) {
                    dropdown.classList.add('show');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1023) {
                    dropdown.classList.remove('show');
                }
            });
        });
    }

    // Setup header scroll effect
    function setupHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Check initial scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    // Export for external use
    window.loadNavbar = loadNavbar;
    window.updateLanguageContent = updateLanguageContent;

    // Auto-load if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavbar);
    } else {
        loadNavbar();
    }
})();
