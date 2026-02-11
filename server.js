const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { sendContactFormEmails } = require('./config/email');

const app = express();
const PORT = process.env.PORT || 3000;

// Server will use exact category names from products.js
// No aliases needed - this prevents confusion and bugs

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// API Routes

// Contact form submission
app.post('/api/contact', async (req, res) => {
    const language = req.body.language || 'en';

    try {
        console.log('📥 Incoming contact request:', req.body);

        const { name, email, company, sector, phone, message } = req.body;

        // Validation
        if (!name || !email || !company || !sector || !phone) {
            console.log('❌ Validation failed: missing fields');
            return res.status(400).json({
                success: false,
                message: language === 'gr'
                    ? 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία (συμπεριλαμβανομένου του τηλεφώνου).'
                    : 'Please fill in all required fields (including phone number).'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Validation failed: invalid email', email);
            return res.status(400).json({
                success: false,
                message: language === 'gr'
                    ? 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.'
                    : 'Please enter a valid email address.'
            });
        }

        // Prepare form data
        const formData = {
            name,
            email,
            company,
            sector,
            phone,
            message: message || '',
            submittedAt: new Date().toISOString()
        };

        // Log submission
        console.log('📩 Processed form data:', formData);

        // Try to send emails
        const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

        if (smtpConfigured) {
            try {
                console.log(`📤 Attempting to send emails to ${process.env.RECIPIENT_EMAIL || 'wwefilip57@gmail.com'}...`);
                await sendContactFormEmails(formData, language);
                console.log('✅ Emails sent successfully');
            } catch (emailError) {
                console.error('❌ Email transmission failed:', emailError);
            }
        } else {
            console.log('⚠️ Email skipped: SMTP_USER or SMTP_PASS not set in .env');
        }

        res.json({
            success: true,
            message: language === 'gr'
                ? 'Ευχαριστούμε! Το αίτημα σας καταχωρήθηκε επιτυχώς.'
                : 'Thank you! Your request has been submitted successfully.'
        });

    } catch (error) {
        console.error('💥 Server Error:', error);
        res.status(500).json({
            success: false,
            message: language === 'gr'
                ? 'Παρουσιάστηκε σφάλμα στο διακομιστή. Παρακαλώ δοκιμάστε ξανά.'
                : 'Server error occurred. Please try again later.'
        });
    }
});

// Get all products with filtering
app.get('/api/products', (req, res) => {
    try {
        const products = require('./products.js');
        const { category, brand, type } = req.query;

        let filteredProducts = [...products];

        // Filter by category
        if (category) {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        // Filter by brand
        if (brand) {
            filteredProducts = filteredProducts.filter(p => p.brand === brand);
        }

        // Filter by type (floor-standing, tabletop, countertop)
        if (type) {
            filteredProducts = filteredProducts.filter(p => p.type === type);
        }

        // Verify image paths exist, fallback to placeholder
        filteredProducts = filteredProducts.map(product => {
            const validImages = product.images.filter(imgPath => {
                const fullPath = path.join(__dirname, imgPath);
                return fs.existsSync(fullPath);
            });

            return {
                ...product,
                images: validImages.length > 0 ? validImages : ['images/placeholder.jpg']
            };
        });

        res.json({
            success: true,
            products: filteredProducts,
            count: filteredProducts.length,
            filters: { category, brand, type }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    try {
        const products = require('./products.js');
        const product = products.find(p => p.id === req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Verify image paths exist
        const validImages = product.images.filter(imgPath => {
            const fullPath = path.join(__dirname, imgPath);
            return fs.existsSync(fullPath);
        });

        res.json({
            success: true,
            product: {
                ...product,
                images: validImages.length > 0 ? validImages : ['images/placeholder.jpg']
            }
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
});

// Get products by category (legacy endpoint for backward compatibility)
app.get('/api/products/category/:category', (req, res) => {
    try {
        const products = require('./products.js');
        const categoryProducts = products.filter(p => p.category === req.params.category);
        res.json({ success: true, products: categoryProducts });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
});

// Get available brands
app.get('/api/brands', (req, res) => {
    try {
        const products = require('./products.js');
        const brands = [...new Set(products.filter(p => p.brand).map(p => p.brand))];
        res.json({ success: true, brands });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ success: false, message: 'Error fetching brands' });
    }
});

// Get available categories
app.get('/api/categories', (req, res) => {
    try {
        const products = require('./products.js');
        const categories = [...new Set(products.map(p => p.category))];
        res.json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Kafedomi API is running',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'product-detail.html'));
});

app.get('/brands', (req, res) => {
    res.sendFile(path.join(__dirname, 'brands.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              KAFEDOMI SERVER RUNNING                      ║
║                                                           ║
║  🚀 Server:    http://localhost:${PORT}                     ║
║  📧 API:       http://localhost:${PORT}/api                 ║
║  ✅ Status:    http://localhost:${PORT}/api/health          ║
║                                                           ║
║  New Endpoints:                                           ║
║  📦 Products:  /api/products?category=X&brand=Y           ║
║  🏷️  Brands:   /api/brands                                 ║
║  📂 Categories: /api/categories                           ║
║                                                           ║
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
// Export for Vercel
module.exports = app;
