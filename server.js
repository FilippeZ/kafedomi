const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { sendContactFormEmails } = require('./config/email');

const app = express();
const PORT = process.env.PORT || 3000;

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
    try {
        const { name, email, company, sector, phone, message, language } = req.body;

        // Validation
        if (!name || !email || !company || !sector) {
            return res.status(400).json({
                success: false,
                message: language === 'gr'
                    ? 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.'
                    : 'Please fill in all required fields.'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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
            phone: phone || '',
            message: message || '',
            submittedAt: new Date().toISOString()
        };

        // Send emails
        await sendContactFormEmails(formData, language || 'en');

        // Log submission (in production, save to database)
        console.log('Contact form submission:', formData);

        // Success response
        res.json({
            success: true,
            message: language === 'gr'
                ? 'Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας.'
                : 'Thank you! We will contact you soon.'
        });

    } catch (error) {
        console.error('Error processing contact form:', error);

        res.status(500).json({
            success: false,
            message: req.body.language === 'gr'
                ? 'Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά αργότερα.'
                : 'An error occurred. Please try again later.'
        });
    }
});

// Get all products
app.get('/api/products', (req, res) => {
    try {
        const products = require('./products.js');
        res.json({ success: true, products });
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

        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
});

// Get products by category
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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Kafedomi API is running',
        timestamp: new Date().toISOString()
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
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
