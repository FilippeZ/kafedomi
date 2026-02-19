# Kafedomi Premium Vending Solutions Website

## 🚀 Full-Stack B2B Website with Backend

A premium, fully functional bilingual (EN/GR) website for Kafedomi vending solutions, featuring a complete product catalog, working contact form with email notifications, and modern responsive design.

---

## ✨ Features

### Frontend
- ✅ **Bilingual Support** - Instant EN/GR language switching
- ✅ **Product Catalog** - 8 vending machines across 4 categories
- ✅ **Category Filtering** - Filter products by Coffee, Snacks, Drinks, Combo
- ✅ **Product Detail Pages** - Individual pages with image galleries and specifications
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Premium Aesthetics** - Editorial B2B layout with cinematic imagery
- ✅ **Smooth Animations** - Parallax, fade-ins, hover effects

### Backend
- ✅ **Node.js/Express Server** - RESTful API
- ✅ **Contact Form API** - `/api/contact` endpoint
- ✅ **Email Notifications** - Automatic emails to company and customer
- ✅ **Bilingual Emails** - HTML email templates in EN/GR
- ✅ **Form Validation** - Server-side validation
- ✅ **Product APIs** - Get all products, by ID, or by category

---

## 📁 Project Structure

```
kafedomi/
├── index.html              # Homepage
├── products.html           # Product catalog page
├── product-detail.html     # Individual product page
├── styles.css              # Complete design system
├── script.js               # Main JavaScript (language, form, animations)
├── products.js             # Product data (8 vending machines)
├── products-page.js        # Product catalog functionality
├── product-detail.js       # Product detail page functionality
├── server.js               # Express backend server
├── package.json            # Node.js dependencies
├── .env                    # Environment variables (SMTP config)
├── .env.example            # Environment template
├── config/
│   └── email.js            # Email configuration and templates
└── images/                 # Product images (31 files)
```

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **SMTP Email Account** (Gmail, SendGrid, etc.)

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server framework
- `nodemailer` - Email sending
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `body-parser` - Request body parsing

### 3. Configure Email (IMPORTANT!)

Edit the `.env` file and add your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=kafedomi@gmail.com
```

**For Gmail:**
1. Go to Google Account > Security > 2-Step Verification
2. Scroll to "App passwords" and generate one
3. Use that password in `SMTP_PASS` (not your regular password)

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

---

## 🌐 Usage

### Accessing the Website

1. **Homepage**: `http://localhost:3000`
2. **Products Catalog**: `http://localhost:3000/products.html`
3. **Product Detail**: `http://localhost:3000/product-detail.html?id=coffee-premium-bean`

### Testing the Contact Form

1. Navigate to the homepage
2. Scroll to the "Ready to transform your space?" section
3. Fill in all required fields:
   - Full Name
   - Company Name
   - Sector (dropdown)
   - Email Address
   - Message (optional)
4. Click "Request Quote"
5. You should receive:
   - Success message on the website
   - Email notification to `RECIPIENT_EMAIL` (kafedomi@gmail.com)
   - Auto-reply email to the customer

### Language Switching

- Click the **EN | GR** toggle in the header
- All content updates instantly
- Form labels, buttons, and messages change language
- Email notifications sent in the selected language

---

## 📦 Product Catalog

### 8 Vending Machines Across 4 Categories:

#### ☕ Coffee Machines
1. **Premium Bean-to-Cup Coffee Machine** - Professional barista-quality espresso
2. **Compact Espresso Station** - Space-saving design for small offices

#### 🥐 Snack Vending
3. **Deluxe Snack & Food Vending Machine** - Large capacity with temperature control
4. **Healthy Choice Snack Machine** - Organic and nutritious options

#### 🥤 Drink Coolers
5. **Professional Drink Cooler** - High-capacity refrigerated beverages
6. **Energy & Sports Drink Station** - Specialized for active workplaces

#### 🔄 Combo Units
7. **Ultimate Combo Vending Solution** - All-in-one coffee, snacks, and drinks
8. **Micro Market Solution** - Complete self-service convenience store

---

## 🔌 API Endpoints

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "sector": "Hotel",
  "phone": "+30 123456789",
  "message": "Interested in coffee machines",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We will contact you soon."
}
```

### Get All Products
```http
GET /api/products
```

### Get Product by ID
```http
GET /api/products/coffee-premium-bean
```

### Get Products by Category
```http
GET /api/products/category/coffee
```

### Health Check
```http
GET /api/health
```

---

## 🎨 Design System

### Color Palette
- **Primary**: `#1A1A1B` (Slate Charcoal)
- **Secondary**: `#FFFFFF` (Crisp White)
- **Accent**: `#8B0000` (Deep Espresso Red)
- **Text Dark**: `#2C2C2C`
- **Text Light**: `#F5F5F5`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold to Black (700-900)
- **Body**: Regular to Medium (400-500)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

---

## 📍 Location Information

**Kafedomi** is based in:
- **City**: Lamia
- **Region**: Fthiotida, Greece
- **Coverage**: Serving all of Fthiotida region (Εξυπηρετούμε όλο το νομό Φθιώτιδας)
- **Phone**: +30 22310 12345
- **Email**: kafedomi@gmail.com

---

## 🚀 Deployment

### Option 1: Traditional Hosting (cPanel, etc.)
1. Upload all files to your web server
2. Install Node.js on the server
3. Run `npm install`
4. Configure `.env` with production settings
5. Use PM2 or similar to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name kafedomi
   pm2 save
   pm2 startup
   ```

### Option 2: Cloud Platforms

**Heroku:**
```bash
heroku create kafedomi
git push heroku master
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASS=your-password
```

**Vercel/Netlify:**
- Deploy frontend as static files
- Deploy backend as serverless functions

**DigitalOcean/AWS:**
- Use a Node.js droplet/EC2 instance
- Configure nginx as reverse proxy
- Set up SSL with Let's Encrypt

---

## 🔒 Security Notes

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use App Passwords** - Don't use your main email password
3. **Enable CORS properly** - Update `CORS_ORIGIN` in production
4. **Use HTTPS** - Always use SSL in production
5. **Rate Limiting** - Consider adding rate limiting to prevent spam

---

## 🐛 Troubleshooting

### Email Not Sending
- Check SMTP credentials in `.env`
- For Gmail, ensure "Less secure app access" is enabled OR use App Password
- Check firewall/antivirus isn't blocking port 587
- Look at server console for error messages

### Products Not Loading
- Ensure `products.js` is loaded before `products-page.js`
- Check browser console for JavaScript errors
- Verify image paths are correct

### Form Submission Fails
- Check that server is running (`npm start`)
- Verify API endpoint is `/api/contact`
- Check browser console for network errors
- Ensure all required fields are filled

---

## 📝 Customization

### Adding New Products
Edit `products.js` and add a new product object:

```javascript
{
    id: 'your-product-id',
    category: 'coffee', // coffee, snacks, drinks, combo
    name: {
        en: 'Product Name',
        gr: 'Όνομα Προϊόντος'
    },
    description: { en: '...', gr: '...' },
    features: { en: [...], gr: [...] },
    specifications: { ... },
    images: ['images/your-image.jpg']
}
```

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent-red: #8B0000; /* Change this */
}
```

### Adding More Languages
1. Add `data-xx` attributes to HTML elements
2. Update `LanguageManager` in `script.js`
3. Add language button to header
4. Update email templates in `config/email.js`

---

## 📊 Features Summary

| Feature | Status |
|---------|--------|
| Bilingual EN/GR | ✅ |
| Product Catalog | ✅ |
| Product Detail Pages | ✅ |
| Category Filtering | ✅ |
| Image Galleries | ✅ |
| Contact Form | ✅ |
| Email Notifications | ✅ |
| Backend API | ✅ |
| Responsive Design | ✅ |
| SEO Optimized | ✅ |
| Performance Optimized | ✅ |

---

## 📞 Support

For questions or issues:
- **Email**: kafedomi@gmail.com
- **Phone**: +30 22310 12345
- **Location**: Lamia, Fthiotida, Greece

---

## 📄 License

© 2026 Kafedomi. All rights reserved.

---

**Built with ❤️ for premium vending solutions in Fthiotida, Greece**
