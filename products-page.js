// Products Page JavaScript
(function () {
    'use strict';

    let allProducts = [];
    let currentCategory = 'all';
    let currentBrand = null;
    let currentLang = 'en';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure common.js has loaded
        setTimeout(() => {
            loadProducts();
            setupCategoryFilters();
            syncFiltersFromURL();
        }, 50);
    });

    // Sync filter buttons with URL parameters
    function syncFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const brandParam = urlParams.get('brand');
        let shouldRender = false;

        if (categoryParam) {
            currentCategory = categoryParam;
            updateActiveFilterButton(categoryParam);
            updatePageTitle(categoryParam);
            shouldRender = true;
        }

        if (brandParam) {
            currentBrand = brandParam;
            // When filtering by brand, show all products (brand filter takes precedence)
            currentCategory = 'all';
            updateActiveFilterButton('all');
            updatePageTitleForBrand(brandParam);
            shouldRender = true;
        }

        // Trigger re-render if filters were applied from URL
        if (shouldRender) {
            renderProducts();
        }
    }

    // Update page title based on category
    function updatePageTitle(category) {
        const titles = {
            'vending-coffee': { en: 'Coffee Vending Machines', gr: 'Μηχανές Vending Καφέ' },
            'coffee-capsule': { en: 'Capsule Coffee Machines', gr: 'Μηχανές Καφέ Κάψουλας' },
            'vending-snacks': { en: 'Snack Vending Machines', gr: 'Μηχανές Vending Σνακ' },
            'vending-drinks': { en: 'Cold Drinks Vending', gr: 'Vending Κρύων Ποτών' },
            'water-dispensers': { en: 'Water Dispensers', gr: 'Συσκευές Νερού' },
            'vending-combo': { en: 'Combination Vending Machines', gr: 'Μηχανές Vending Συνδυασμού' },
            'all': { en: 'Our Vending Solutions', gr: 'Οι Λύσεις Vending μας' }
        };

        const heroTitle = document.querySelector('.products-hero h1');
        if (heroTitle && titles[category]) {
            const lang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';
            heroTitle.textContent = titles[category][lang] || titles[category]['en'];
            heroTitle.dataset.en = titles[category]['en'];
            heroTitle.dataset.gr = titles[category]['gr'];
        }
    }

    // Update page title for brand filter
    function updatePageTitleForBrand(brand) {
        const brandNames = {
            'lavazza': 'Lavazza',
            'nespresso': 'Nespresso',
            'nescafe': 'Nescafé',
            'dolce-gusto': 'Dolce Gusto',
            'pelican-rouge': 'Pelican Rouge',
            'segafredo': 'Segafredo',
            'dixie-narco': 'Dixie Narco',
            'sanden-vendo': 'Sanden Vendo',
            'gaggia': 'Gaggia',
            'bianchi': 'Bianchi'
        };

        const heroTitle = document.querySelector('.products-hero h1');
        if (heroTitle && brandNames[brand]) {
            const lang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';
            const title = lang === 'en'
                ? `${brandNames[brand]} Coffee Machines`
                : `Μηχανές Καφέ ${brandNames[brand]}`;
            heroTitle.textContent = title;
        }
    }

    // Update active filter button
    function updateActiveFilterButton(category) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            const btnCategory = btn.dataset.category;
            if (btnCategory === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Load products from local data
    async function loadProducts() {
        // Use local products.js data
        if (typeof products !== 'undefined') {
            allProducts = products;
            renderProducts();
        } else {
            // Try to fetch from API
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success) {
                    allProducts = data.products;
                    renderProducts();
                    return;
                }
            } catch (error) {
                console.log('API not available, waiting for products.js');
            }
            showNoProducts();
        }
    }

    // Setup category filter buttons
    function setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                currentCategory = category;
                currentBrand = null; // Reset brand when changing category

                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter and render products
                renderProducts();

                // Update page title
                updatePageTitle(category);

                // Update URL without page reload
                const url = new URL(window.location);
                url.searchParams.delete('brand');
                if (category === 'all') {
                    url.searchParams.delete('category');
                } else {
                    url.searchParams.set('category', category);
                }
                window.history.pushState({}, '', url);
            });
        });
    }

    // Intersection Observer for scroll animations
    function initRevealObserver() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.product-item').forEach(item => {
                observer.observe(item);
            });
        }
    }

    function renderProducts() {
        const grid = document.getElementById('products-grid');
        const noProducts = document.getElementById('no-products');

        // Get current language
        currentLang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';

        // Filter products
        let filteredProducts = allProducts;

        if (currentCategory === 'all') {
            // Show only vending solutions, exclude office coffee and water
            filteredProducts = allProducts.filter(p =>
                p.category !== 'coffee-capsule' &&
                p.category !== 'water-dispensers'
            );
        } else {
            filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
        }

        if (currentBrand) {
            filteredProducts = filteredProducts.filter(p => p.brand === currentBrand);
        }

        if (filteredProducts.length === 0) {
            grid.style.display = 'none';
            noProducts.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noProducts.style.display = 'none';

        // Render product cards
        grid.innerHTML = filteredProducts.map((product, index) => createProductCard(product, index)).join('');

        // Initialize observer for new cards
        initRevealObserver();

        // Add click handlers
        document.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    }

    function createProductCard(product, index) {
        const brandName = product.brand || 'Premium';
        const name = product.name[currentLang] || product.name.en;
        const description = product.description[currentLang] || product.description.en;
        const features = product.features[currentLang] || product.features.en;
        const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';

        // Use first image with fallback
        const imageUrl = product.images?.[0] || 'images/placeholder.jpg';

        // Animation delay
        const delay = (index % 3) * 0.15;

        return `
        <article class="product-item machine-card-premium reveal" data-product-id="${product.id}" style="transition-delay: ${delay}s">
            <div class="machine-card-premium__image">
                <img src="${imageUrl}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="machine-card-premium__content">
                <div class="product-card__brand" style="background: var(--premium-gradient); color: white; padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; width: fit-content; margin-bottom: 1.5rem;">
                    ${brandName.toUpperCase()}
                </div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-dark-chocolate); margin-bottom: 1rem;">${name}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem; flex-grow: 1;">${truncateText(description, 150)}</p>
                
                <div style="margin-top: auto;">
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
                        ${features.slice(0, 3).map(f => `
                            <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; margin-bottom: 0.5rem; color: #444;">
                                <span style="color: var(--accent-gold); font-weight: bold;">✓</span> ${f}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <div style="width: 100%; padding: 1rem; background: var(--color-dark-chocolate); color: white; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.3s ease;">
                        ${viewDetailsText}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                </div>
            </div>
        </article>
    `;
    }

    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength).trim() + '...';
    }

    // Show no products message
    function showNoProducts() {
        const grid = document.getElementById('products-grid');
        const noProducts = document.getElementById('no-products');
        grid.style.display = 'none';
        noProducts.style.display = 'block';
    }

    // Re-render when language changes
    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        renderProducts();
        // Re-sync title
        if (currentBrand) {
            updatePageTitleForBrand(currentBrand);
        } else {
            updatePageTitle(currentCategory);
        }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        syncFiltersFromURL();
        renderProducts();
    });
})();
