const { sendContactFormEmails } = require('../config/email');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const language = req.body.language || 'en';

    try {
        console.log('📥 Incoming Vercel contact request:', req.body);

        const { name, email, company, sector, phone, message } = req.body;

        // Validation
        if (!name || !email || !company || !sector || !phone) {
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

        // Try to send emails
        const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

        if (smtpConfigured) {
            try {
                await sendContactFormEmails(formData, language);
                console.log('✅ Emails sent successfully via Vercel Function');
            } catch (emailError) {
                console.error('❌ Email transmission failed:', emailError);
                // We typically don't fail the request if email fails, but we could
            }
        } else {
            console.log('⚠️ Email skipped: SMTP_USER or SMTP_PASS not set in .env');
        }

        return res.status(200).json({
            success: true,
            message: language === 'gr'
                ? 'Ευχαριστούμε! Το αίτημα σας καταχωρήθηκε επιτυχώς.'
                : 'Thank you! Your request has been submitted successfully.'
        });

    } catch (error) {
        console.error('💥 Serverless Function Error:', error);
        return res.status(500).json({
            success: false,
            message: language === 'gr'
                ? 'Σφάλμα διακομιστή. Παρακαλώ προσπαθήστε ξανά αργότερα.'
                : 'Server error. Please try again later.',
            error: error.message
        });
    }
};
