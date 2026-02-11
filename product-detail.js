// Product Detail Page JavaScript
(function () {
    'use strict';

    let currentProduct = null;
    let currentLang = 'en';
    let currentImageIndex = 0;
    let currentTab = 'features';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure common.js has loaded
        setTimeout(() => {
            loadProductDetail();
            setupTabs();
        }, 100);
    });

    // Setup tab functionality
    function setupTabs() {
        const tabs = document.querySelectorAll('.product-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update content
                currentTab = tab.dataset.tab;
                renderTabContent();
            });
        });
    }

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
            showProductNotFound();
        }
    }

    // Show product not found message
    function showProductNotFound() {
        const productInfo = document.getElementById('product-info');
        productInfo.innerHTML = `
            <div class="product-not-found">
                <h2 data-en="Product Not Found" data-gr="Το προϊόν δεν βρέθηκε">Product Not Found</h2>
                <p data-en="The product you're looking for doesn't exist or has been removed." 
                   data-gr="Το προϊόν που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.">
                    The product you're looking for doesn't exist or has been removed.
                </p>
                <a href="products.html" class="btn btn-primary" data-en="Browse Products" data-gr="Δείτε Προϊόντα">Browse Products</a>
            </div>
        `;
    }

    // Render product details
    function renderProduct() {
        if (!currentProduct) return;

        currentLang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';

        // Update page title
        const title = currentProduct.name[currentLang] || currentProduct.name.en;
        document.title = `${title} - Kafedomi`;
        document.getElementById('breadcrumb-product').textContent = title;

        // Render gallery
        renderGallery();

        // Render product info
        renderProductInfo();

        // Render tab content (features by default)
        renderTabContent();
    }

    // Render image gallery
    function renderGallery() {
        const mainImage = document.getElementById('main-image');
        const thumbsContainer = document.getElementById('image-thumbs');

        // Main image
        const firstImage = currentProduct.images[0] || 'images/placeholder.jpg';
        mainImage.innerHTML = `
            <img src="${firstImage}" alt="${currentProduct.name[currentLang]}" onerror="this.src='images/placeholder.jpg'">
        `;

        // Thumbnails
        if (currentProduct.images.length > 1) {
            thumbsContainer.innerHTML = currentProduct.images.map((img, index) => `
                <div class="product-gallery__thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="Image ${index + 1}" onerror="this.src='images/placeholder.jpg'">
                </div>
            `).join('');

            // Add click handlers
            document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const index = parseInt(thumb.dataset.index);
                    currentImageIndex = index;

                    // Update main image
                    mainImage.innerHTML = `<img src="${currentProduct.images[index]}" alt="${currentProduct.name[currentLang]}" onerror="this.src='images/placeholder.jpg'">`;

                    // Update active thumb
                    document.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });
        } else {
            thumbsContainer.style.display = 'none';
        }
    }

    // Render product information panel (top section)
    function renderProductInfo() {
        const categoryLabels = {
            coffee: { en: 'Coffee Vending Machine', gr: 'Μηχανή Vending Καφέ' },
            snacks: { en: 'Snack Vending Machine', gr: 'Μηχανή Vending Σνακ' },
            drinks: { en: 'Cold Drinks Vending Machine', gr: 'Μηχανή Vending Κρύων Ποτών' },
            combo: { en: 'Combo Vending Machine', gr: 'Μηχανή Vending Combo' },
            water: { en: 'Water Solution', gr: 'Λύση Νερού' },
            'water-dispensers': { en: 'Water Solution', gr: 'Λύση Νερού' }
        };

        const typeLabels = {
            'floor-standing': { en: 'Floor Standing', gr: 'Δαπέδου' },
            'tabletop': { en: 'Tabletop', gr: 'Επιτραπέζιο' },
            'countertop': { en: 'Countertop', gr: 'Πάγκου' }
        };

        const categoryLabel = categoryLabels[currentProduct.category]?.[currentLang] || currentProduct.category;
        const name = currentProduct.name[currentLang] || currentProduct.name.en;
        const description = currentProduct.description[currentLang] || currentProduct.description.en;
        const type = currentProduct.type || 'floor-standing';
        const typeLabel = typeLabels[type]?.[currentLang] || type;

        // Get key features for quick display (first 3)
        const features = currentProduct.features[currentLang] || currentProduct.features.en;
        const quickFeatures = features.slice(0, 3);

        const productInfoHTML = `
            <span class="product-info__label">${categoryLabel}</span>
            <h1 class="product-info__title">${name}</h1>
            <p class="product-info__description">${description}</p>
            
            <div class="product-info__highlights">
                ${quickFeatures.map(feature => `
                    <div class="product-highlight">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="product-highlight__icon">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="product-info__meta">
                <div class="product-meta-item">
                    <span class="product-meta-item__label" data-en="Type" data-gr="Τύπος">Type</span>
                    <span class="product-meta-item__value">${typeLabel}</span>
                </div>
                ${currentProduct.brand ? `
                    <div class="product-meta-item">
                        <span class="product-meta-item__label" data-en="Brand" data-gr="Μάρκα">Brand</span>
                        <span class="product-meta-item__value">${formatBrandName(currentProduct.brand)}</span>
                    </div>
                ` : ''}
            </div>
        `;

        document.getElementById('product-info').innerHTML = productInfoHTML;
    }

    // Render tab content
    function renderTabContent() {
        if (!currentProduct) return;

        const tabContent = document.getElementById('tab-content');
        const features = currentProduct.features[currentLang] || currentProduct.features.en;
        const description = currentProduct.description[currentLang] || currentProduct.description.en;

        if (currentTab === 'features') {
            tabContent.innerHTML = `
                <div class="tab-panel tab-panel--features">
                    <div class="features-grid">
                        ${features.map((feature, index) => `
                            <div class="feature-card" style="animation-delay: ${index * 0.1}s">
                                <div class="feature-card__icon">
                                    ${getFeatureIcon(index)}
                                </div>
                                <span class="feature-card__text">${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (currentTab === 'specs') {
            const specsLabels = {
                capacity: { en: 'Capacity', gr: 'Χωρητικότητα' },
                dimensions: { en: 'Dimensions', gr: 'Διαστάσεις' },
                power: { en: 'Power', gr: 'Ισχύς' },
                temperature: { en: 'Temperature', gr: 'Θερμοκρασία' },
                cupsPerDay: { en: 'Cups per Day', gr: 'Φλιτζάνια ανά Ημέρα' },
                area: { en: 'Area Required', gr: 'Απαιτούμενος Χώρος' }
            };

            tabContent.innerHTML = `
                <div class="tab-panel tab-panel--specs">
                    <table class="specs-table">
                        <tbody>
                            ${Object.entries(currentProduct.specifications).map(([key, value]) => {
                const label = specsLabels[key]?.[currentLang] || key;
                return `
                                    <tr>
                                        <th>${label}</th>
                                        <td>${value}</td>
                                    </tr>
                                `;
            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } else if (currentTab === 'overview') {
            const name = currentProduct.name[currentLang] || currentProduct.name.en;
            const overviewTitle = currentLang === 'en' ? 'About this machine' : 'Σχετικά με αυτή τη μηχανή';

            tabContent.innerHTML = `
                <div class="tab-panel tab-panel--overview">
                    <h3>${overviewTitle}</h3>
                    <p class="overview-text">${description}</p>
                    <div class="overview-highlights">
                        <h4 data-en="Why Choose ${name}?" data-gr="Γιατί να επιλέξετε ${name};">Why Choose ${name}?</h4>
                        <ul>
                            ${features.slice(0, 5).map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    // Get feature icon based on index
    function getFeatureIcon(index) {
        const icons = [
            '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',  // Clock
            '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', // Check circle
            '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', // Zap/Energy
            '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', // Monitor
            '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>' // Sun
        ];

        const iconPath = icons[index % icons.length];
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>`;
    }

    // Format brand name for display
    function formatBrandName(brand) {
        const brandNames = {
            'pelican-rouge': 'Pelican Rouge',
            'lavazza': 'Lavazza',
            'segafredo': 'Segafredo',
            'nescafe': 'Nescafé',
            'Dixie Narco': 'Dixie Narco',
            'Sanden Vendo': 'Sanden Vendo',
            'Gaggia': 'Gaggia',
            'Bianchi': 'Bianchi'
        };
        return brandNames[brand] || brand;
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

        grid.innerHTML = relatedProducts.map((product, index) => {
            const name = product.name[currentLang] || product.name.en;
            const description = product.description[currentLang] || product.description.en;
            const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';
            const imageUrl = product.images[0] || 'images/placeholder.jpg';
            const features = product.features[currentLang] || product.features.en;

            return `
                <article class="product-item" data-product-id="${product.id}" style="animation-delay: ${index * 0.1}s">
                    <div class="product-item__image">
                        <img src="${imageUrl}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                        <div class="product-item__overlay">
                            <span class="product-item__quick-view">${viewDetailsText}</span>
                        </div>
                    </div>
                    <div class="product-item__content">
                        <h3 class="product-item__title">${name}</h3>
                        <p class="product-item__desc">${truncateText(description, 80)}</p>
                        <div class="product-item__features">
                            ${features.slice(0, 2).map(f => `
                                <span class="product-feature">
                                    <span class="product-feature__icon">✓</span>
                                    ${f}
                                </span>
                            `).join('')}
                        </div>
                        <div class="product-item__cta">
                            <span>${viewDetailsText}</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Add click handlers
        document.querySelectorAll('#related-grid .product-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
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

        // Update tab labels
        const tabLabels = {
            features: { en: 'Key Features', gr: 'Βασικά Χαρακτηριστικά' },
            specs: { en: 'Technical Specifications', gr: 'Τεχνικές Προδιαγραφές' },
            overview: { en: 'Overview', gr: 'Επισκόπηση' }
        };

        document.querySelectorAll('.product-tab').forEach(tab => {
            const tabName = tab.dataset.tab;
            tab.textContent = tabLabels[tabName]?.[currentLang] || tab.textContent;
        });
    });
})();
