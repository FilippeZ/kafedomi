// Brand logos and capsule machines display on brands page
(function () {
    'use strict';

    let currentLang = 'en';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        currentLang = window.currentLang || localStorage.getItem('kafedomi_lang') || 'en';
        loadOfficeMachines();
    });

    // Load and display office-specific machines
    function loadOfficeMachines() {
        const machineGrid = document.getElementById('office-machines-grid');
        if (!machineGrid) return;

        // Filter products for office use
        const officeMachines = products.filter(p =>
            p.category === 'coffee-capsule' ||
            (p.category === 'vending-coffee' && p.type === 'tabletop')
        );

        if (officeMachines.length === 0) {
            machineGrid.innerHTML = '<p class="no-products-message">No office coffee machines available</p>';
            return;
        }

        // Create product cards
        machineGrid.innerHTML = officeMachines.map((product, index) => createOfficeProductCard(product, index)).join('');

        // Add reveal class for animation
        machineGrid.querySelectorAll('.office-product-card').forEach(card => {
            card.classList.add('reveal');
            // Observer will pick it up
            if (window.innerWidth > 768) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(card);
            } else {
                card.classList.add('active');
            }
        });
    }

    // Create office product card HTML
    function createOfficeProductCard(product, index) {
        const categoryLabels = {
            'vending-coffee': { en: 'Coffee Vending', gr: 'Vending Καφέ' },
            'coffee-capsule': { en: 'Capsule Machine', gr: 'Μηχανή Κάψουλας' },
            'coffee-machines': { en: 'Coffee Machine', gr: 'Μηχανή Καφέ' }
        };

        const categoryLabel = categoryLabels[product.category]?.[currentLang] || product.category;
        const name = product.name[currentLang] || product.name.en;
        const desc = product.description[currentLang] || product.description.en;
        const features = product.features[currentLang] || product.features.en;
        const brandName = product.brand || 'Premium';
        const viewDetailsText = currentLang === 'en' ? 'View Details' : 'Δείτε Λεπτομέρειες';

        // Use first image with fallback
        const imageUrl = product.images?.[0] || 'images/placeholder.jpg';

        // Animation delay
        const delay = (index % 3) * 0.15;

        return `
        <div class="office-product-card machine-card-premium reveal" data-product-id="${product.id}" style="transition-delay: ${delay}s">
            <div class="machine-card-premium__image">
                <img src="${imageUrl}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="machine-card-premium__content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                    <div class="product-card__brand" style="background: var(--premium-gradient); color: white; padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; width: fit-content;">
                        ${brandName.toUpperCase()}
                    </div>
                    <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--color-mocha); letter-spacing: 0.5px; margin-top: 0.4rem;">
                        ${categoryLabel}
                    </span>
                </div>
                
                <h3 style="font-family: var(--font-heading); font-size: 1.75rem; color: var(--color-dark-chocolate); margin-bottom: 1rem;">${name}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 2rem; font-size: 1rem;">${desc}</p>
                
                <div style="margin-top: auto;">
                    <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                        ${features.slice(0, 3).map(f => `
                            <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; margin-bottom: 0.75rem; color: #444;">
                                <span style="color: var(--accent-gold); font-weight: bold;">✓</span> ${f}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="view-details-btn" style="width: 100%; padding: 1.25rem; background: var(--color-dark-chocolate); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                        ${viewDetailsText}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    }

    // Handle click events on machine cards
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.office-product-card');
        if (card) {
            const productId = card.dataset.productId;
            if (productId) {
                window.location.href = `product-detail.html?id=${productId}`;
            }
        }
    });

    // Listen for language changes
    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        loadOfficeMachines();
    });
})();
