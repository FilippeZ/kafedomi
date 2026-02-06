// Products Page JavaScript
(function () {
    'use strict';

    let allProducts = [];
    let currentCategory = 'all';
    let currentLang = 'en';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        loadProducts();
        setupCategoryFilters();

        // Get category from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            currentCategory = categoryParam;
            updateActiveFilter();
        }
    });

    // Load products from data
    async function loadProducts() {
        try {
            // Products are already loaded from products.js
            if (typeof products !== 'undefined') {
                allProducts = products;
                renderProducts();
            } else {
                // Fallback: try to fetch from API
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success) {
                    allProducts = data.products;
                    renderProducts();
                }
            }
        } catch (error) {
            console.error('Error loading products:', error);
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

                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter and render products
                renderProducts();

                // Update URL
                const url = new URL(window.location);
                if (category === 'all') {
                    url.searchParams.delete('category');
                } else {
                    url.searchParams.set('category', category);
                }
                window.history.pushState({}, '', url);
            });
        });
    }

    // Update active filter button based on current category
    function updateActiveFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.dataset.category === currentCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Render products
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        const noProducts = document.getElementById('no-products');

        // Get current language from language manager
        currentLang = window.languageManager?.currentLang || 'en';

        // Filter products
        const filteredProducts = currentCategory === 'all'
            ? allProducts
            : allProducts.filter(p => p.category === currentCategory);

        if (filteredProducts.length === 0) {
            grid.style.display = 'none';
            noProducts.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noProducts.style.display = 'none';

        // Render product cards
        grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');

        // Add click handlers
        document.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    }

    // Create product card HTML
    function createProductCard(product) {
        const categoryLabels = {
            coffee: { en: 'Coffee', gr: 'Καφές' },
            snacks: { en: 'Snacks', gr: 'Σνακ' },
            drinks: { en: 'Drinks', gr: 'Ποτά' },
            combo: { en: 'Combo', gr: 'Combo' }
        };

        const categoryLabel = categoryLabels[product.category]?.[currentLang] || product.category;
        const name = product.name[currentLang] || product.name.en;
        const description = product.description[currentLang] || product.description.en;
        const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';

        // Use first image
        const imageUrl = product.images[0] || 'images/placeholder.jpg';

        return `
            <div class="product-item" data-product-id="${product.id}">
                <div class="product-item__image">
                    <img src="${imageUrl}" alt="${name}" loading="lazy">
                </div>
                <div class="product-item__content">
                    <span class="product-item__category">${categoryLabel}</span>
                    <h3 class="product-item__title">${name}</h3>
                    <p class="product-item__desc">${truncateText(description, 100)}</p>
                    <div class="product-item__cta">
                        ${viewDetailsText}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    // Show no products message
    function showNoProducts() {
        const grid = document.getElementById('products-grid');
        const noProducts = document.getElementById('no-products');
        grid.style.display = 'none';
        noProducts.style.display = 'block';
    }

    // Re-render when language changes
    if (window.languageManager) {
        const originalSwitchLanguage = window.languageManager.switchLanguage.bind(window.languageManager);
        window.languageManager.switchLanguage = function (lang) {
            originalSwitchLanguage(lang);
            currentLang = lang;
            renderProducts();
        };
    }
})();
