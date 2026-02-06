// Product Detail Page JavaScript
(function () {
    'use strict';

    let currentProduct = null;
    let currentLang = 'en';
    let currentImageIndex = 0;

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        loadProductDetail();
    });

    // Load product details
    async function loadProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            window.location.href = 'products.html';
            return;
        }

        try {
            // Try to get product from local data first
            if (typeof products !== 'undefined') {
                currentProduct = products.find(p => p.id === productId);
                if (currentProduct) {
                    renderProduct();
                    loadRelatedProducts();
                    return;
                }
            }

            // Fallback: fetch from API
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();

            if (data.success) {
                currentProduct = data.product;
                renderProduct();
                loadRelatedProducts();
            } else {
                window.location.href = 'products.html';
            }
        } catch (error) {
            console.error('Error loading product:', error);
            window.location.href = 'products.html';
        }
    }

    // Render product details
    function renderProduct() {
        if (!currentProduct) return;

        currentLang = window.languageManager?.currentLang || 'en';

        // Update page title
        const title = currentProduct.name[currentLang] || currentProduct.name.en;
        document.getElementById('page-title').textContent = `${title} - Kafedomi`;
        document.getElementById('breadcrumb-product').textContent = title;

        // Render gallery
        renderGallery();

        // Render product info
        renderProductInfo();
    }

    // Render image gallery
    function renderGallery() {
        const mainImage = document.getElementById('main-image');
        const thumbsContainer = document.getElementById('image-thumbs');

        // Main image
        const firstImage = currentProduct.images[0] || 'images/placeholder.jpg';
        mainImage.innerHTML = `<img src="${firstImage}" alt="${currentProduct.name[currentLang]}">`;

        // Thumbnails
        if (currentProduct.images.length > 1) {
            thumbsContainer.innerHTML = currentProduct.images.map((img, index) => `
                <div class="product-gallery__thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="Image ${index + 1}">
                </div>
            `).join('');

            // Add click handlers
            document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const index = parseInt(thumb.dataset.index);
                    currentImageIndex = index;

                    // Update main image
                    mainImage.innerHTML = `<img src="${currentProduct.images[index]}" alt="${currentProduct.name[currentLang]}">`;

                    // Update active thumb
                    document.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });
        } else {
            thumbsContainer.style.display = 'none';
        }
    }

    // Render product information
    function renderProductInfo() {
        const categoryLabels = {
            coffee: { en: 'Coffee Systems', gr: 'Συστήματα Καφέ' },
            snacks: { en: 'Vending Snacks', gr: 'Vending Σνακ' },
            drinks: { en: 'Drink Coolers', gr: 'Ψυγεία Ποτών' },
            combo: { en: 'Combo Units', gr: 'Μονάδες Combo' },
            water: { en: 'Water Solutions', gr: 'Λύσεις Νερού' }
        };

        const categoryLabel = categoryLabels[currentProduct.category]?.[currentLang] || currentProduct.category;
        const name = currentProduct.name[currentLang] || currentProduct.name.en;
        const description = currentProduct.description[currentLang] || currentProduct.description.en;
        const features = currentProduct.features[currentLang] || currentProduct.features.en;

        const featuresText = currentLang === 'en' ? 'Core Features' : 'Βασικά Χαρακτηριστικά';
        const specsText = currentLang === 'en' ? 'Technical Specifications' : 'Τεχνικές Προδιαγραφές';
        const requestQuoteText = currentLang === 'en' ? 'Request a Professional Quote' : 'Ζητήστε Επαγγελματική Προσφορά';

        const specsLabels = {
            capacity: { en: 'Capacity', gr: 'Χωρητικότητα' },
            dimensions: { en: 'Dimensions', gr: 'Διαστάσεις' },
            power: { en: 'Power', gr: 'Ισχύς' },
            temperature: { en: 'Temperature', gr: 'Θερμοκρασία' },
            cupsPerDay: { en: 'Cups per Day', gr: 'Φλιτζάνια ανά Ημέρα' },
            area: { en: 'Area Required', gr: 'Απαιτούμενος Χώρος' }
        };

        const productInfoHTML = `
            <span class="product-info__category reveal">${categoryLabel}</span>
            <h1 class="product-info__title reveal">${name}</h1>
            <p class="product-info__desc reveal">${description}</p>

            <div class="product-info__section reveal">
                <h3>${featuresText}</h3>
                <ul class="product-info__features">
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="product-info__section reveal">
                <h3>${specsText}</h3>
                <div class="product-info__specs">
                    <dl>
                        ${Object.entries(currentProduct.specifications).map(([key, value]) => {
            const label = specsLabels[key]?.[currentLang] || key;
            return `<dt>${label}:</dt><dd>${value}</dd>`;
        }).join('')}
                    </dl>
                </div>
            </div>

            <div class="product-info__cta reveal">
                <a href="index.html#cta" class="btn btn-large btn-primary">${requestQuoteText}</a>
            </div>
        `;

        document.getElementById('product-info').innerHTML = productInfoHTML;

        // Re-observe animations
        if (window.animationObserver) {
            document.querySelectorAll('#product-info .reveal').forEach(el => window.animationObserver.observer.observe(el));
        }
    }

    // Load related products
    async function loadRelatedProducts() {
        if (!currentProduct) return;

        try {
            let relatedProducts = [];

            // Get products from same category
            if (typeof products !== 'undefined') {
                relatedProducts = products
                    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
                    .slice(0, 3);
            }

            if (relatedProducts.length > 0) {
                renderRelatedProducts(relatedProducts);
            } else {
                document.getElementById('related-products').style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading related products:', error);
            document.getElementById('related-products').style.display = 'none';
        }
    }

    // Render related products
    function renderRelatedProducts(relatedProducts) {
        const grid = document.getElementById('related-grid');
        grid.className = 'products-grid'; // Use common grid class

        grid.innerHTML = relatedProducts.map(product => {
            const name = product.name[currentLang] || product.name.en;
            const description = product.description[currentLang] || product.description.en;
            const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';
            const imageUrl = product.images[0] || 'images/placeholder.jpg';

            return `
                <div class="product-item reveal" onclick="window.location.href='product-detail.html?id=${product.id}'">
                    <div class="product-item__image">
                        <img src="${imageUrl}" alt="${name}" loading="lazy">
                    </div>
                    <div class="product-item__content">
                        <h3 class="product-item__title">${name}</h3>
                        <p class="product-item__desc">${truncateText(description, 80)}</p>
                        <div class="product-item__cta">
                            ${viewDetailsText}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-observe animations
        if (window.animationObserver) {
            grid.querySelectorAll('.reveal').forEach(el => window.animationObserver.observer.observe(el));
        }
    }

    // Helper function
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    // Re-render when language changes
    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        if (currentProduct) {
            renderProduct();
            loadRelatedProducts();
        }
    });

    // Initial language check
    if (window.languageManager) {
        currentLang = window.languageManager.currentLang;
    }
})();
