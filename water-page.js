// Water Solutions Page JavaScript
(function () {
    'use strict';

    let currentLang = 'en';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        currentLang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';
        renderWaterProducts();
        initRevealObserver();
    });

    function renderWaterProducts() {
        const coolersGrid = document.getElementById('coolers-grid');
        const bottlesContainer = document.getElementById('vikos-bottles-container');

        if (!coolersGrid || !bottlesContainer) return;

        // Filter products
        const equipment = products.filter(p =>
            (p.category === 'water-dispensers') ||
            (p.id === 'water-vikos-10lt')
        );
        const brandBottle = products.find(p => p.id === 'water-vikos-500ml');

        // Render Equipment Grid (Coolers + 10lt Bottle)
        coolersGrid.innerHTML = equipment.map((product, index) => createWaterCard(product, index)).join('');

        // Apply staggering effect
        coolersGrid.querySelectorAll('.water-card-premium').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + (i * 0.1)}s`;

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });

        // Show empty if no bottle found
        bottlesContainer.innerHTML = '';
        if (brandBottle) {
            bottlesContainer.innerHTML = `
                <div style="position: relative; width: 100%; display: flex; align-items: center; justify-content: center;">
                    <img src="${brandBottle.images[0]}" alt="Vikos 500ml" 
                         class="water-float-premium"
                         style="width: 100%; max-width: 400px; filter: drop-shadow(0 30px 60px rgba(0,95,115,0.25));">
                </div>
            `;
        }

        // Add click handlers for all grid items
        coolersGrid.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    }

    function createWaterCard(product, index) {
        const brandName = product.brand || 'Premium';
        const name = product.name[currentLang] || product.name.en;
        const description = product.description[currentLang] || product.description.en;
        const features = product.features[currentLang] || product.features.en;
        const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';

        const categoryLabels = {
            'water-dispensers': { en: 'Water Solution', gr: 'Λύση Νερού' }
        };
        const categoryLabel = categoryLabels[product.category]?.[currentLang] || product.category;

        // Use first image with fallback
        const imageUrl = product.images?.[0] || 'images/placeholder.jpg';

        // Animation delay
        const delay = (index % 3) * 0.15;

        return `
        <article class="product-item machine-card-premium water-card-premium reveal" data-product-id="${product.id}" style="transition-delay: ${delay}s">
            <div class="machine-card-premium__image">
                <img src="${imageUrl}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="machine-card-premium__content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                    <div class="product-card__brand" style="background: linear-gradient(135deg, #005f73 0%, #0a9396 100%); color: white; padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; width: fit-content;">
                        ${brandName.toUpperCase()}
                    </div>
                    <span class="water-badge">
                        ${categoryLabel}
                    </span>
                </div>
                
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #005f73; margin-bottom: 1rem;">${name}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem; flex-grow: 1;">${description.length > 120 ? description.substring(0, 120) + '...' : description}</p>
                
                <div style="margin-top: auto;">
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
                        ${features.slice(0, 3).map(f => `
                            <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; margin-bottom: 0.5rem; color: #444;">
                                <span style="color: #0a9396; font-weight: bold;">✓</span> ${f}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="view-details-btn" style="width: 100%; padding: 1rem; background: #005f73; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.3s ease;">
                        ${viewDetailsText}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </article>
    `;
    }

    function initRevealObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        } else {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }
    }

    // Re-render when language changes
    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        renderWaterProducts();
    });

})();
