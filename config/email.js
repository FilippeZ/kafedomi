const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false // Fixes "self-signed certificate in certificate chain" errors
        }
    });
};

// Email templates
const emailTemplates = {
    // Email to company (notification of new lead)
    companyNotification: (data, lang = 'en') => {
        const subject = lang === 'en'
            ? `New Quote Request from ${data.company}`
            : `Νέο Αίτημα Προσφοράς από ${data.company}`;

        const html = lang === 'en' ? `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #1A1A1B; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 30px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #8B0000; }
                    .value { margin-top: 5px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>KAFEDOMI</h1>
                        <p>New Quote Request</p>
                    </div>
                    <div class="content">
                        <h2>New Lead Information</h2>
                        
                        <div class="field">
                            <div class="label">Full Name:</div>
                            <div class="value">${data.name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Company:</div>
                            <div class="value">${data.company}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Sector:</div>
                            <div class="value">${data.sector}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                        </div>
                        
                        ${data.phone ? `
                        <div class="field">
                            <div class="label">Phone:</div>
                            <div class="value">${data.phone}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${data.message || 'No message provided'}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Submitted:</div>
                            <div class="value">${new Date().toLocaleString('en-GB')}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This is an automated message from your Kafedomi website contact form.</p>
                    </div>
                </div>
            </body>
            </html>
        ` : `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #1A1A1B; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 30px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #8B0000; }
                    .value { margin-top: 5px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>KAFEDOMI</h1>
                        <p>Νέο Αίτημα Προσφοράς</p>
                    </div>
                    <div class="content">
                        <h2>Πληροφορίες Νέου Lead</h2>
                        
                        <div class="field">
                            <div class="label">Ονοματεπώνυμο:</div>
                            <div class="value">${data.name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Εταιρεία:</div>
                            <div class="value">${data.company}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Τομέας:</div>
                            <div class="value">${data.sector}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                        </div>
                        
                        ${data.phone ? `
                        <div class="field">
                            <div class="label">Τηλέφωνο:</div>
                            <div class="value">${data.phone}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Μήνυμα:</div>
                            <div class="value">${data.message || 'Δεν παρασχέθηκε μήνυμα'}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Υποβλήθηκε:</div>
                            <div class="value">${new Date().toLocaleString('el-GR')}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>Αυτό είναι ένα αυτοματοποιημένο μήνυμα από τη φόρμα επικοινωνίας του ιστότοπου Kafedomi.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return { subject, html };
    },

    // Auto-reply to customer
    customerAutoReply: (data, lang = 'en') => {
        const subject = lang === 'en'
            ? 'Thank you for contacting Kafedomi'
            : 'Ευχαριστούμε που επικοινωνήσατε με την Kafedomi';

        const html = lang === 'en' ? `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #1A1A1B; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 30px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    .cta { background-color: #8B0000; color: white; padding: 12px 30px; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>KAFEDOMI</h1>
                        <p>The architecture of the perfect break</p>
                    </div>
                    <div class="content">
                        <h2>Thank you, ${data.name}!</h2>
                        <p>We have received your quote request and our team will review it shortly.</p>
                        <p>A member of our sales team will contact you within 24 hours to discuss your vending solution needs for <strong>${data.company}</strong>.</p>
                        
                        <h3>What happens next?</h3>
                        <ul>
                            <li>Our team reviews your requirements</li>
                            <li>We prepare a customized quote for your ${data.sector.toLowerCase()} sector</li>
                            <li>We contact you to schedule a consultation</li>
                            <li>We arrange a site visit if needed</li>
                        </ul>
                        
                        <p>In the meantime, feel free to explore our product range on our website.</p>
                        
                        <p><strong>Contact Information:</strong><br>
                        📍 Lamia, Fthiotida, Greece<br>
                        📞 +30 22310 51340<br>
                        ✉️ kafedomi@gmail.com</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Kafedomi. All rights reserved.<br>
                        Serving all of Fthiotida region with premium vending solutions.</p>
                    </div>
                </div>
            </body>
            </html>
        ` : `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #1A1A1B; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 30px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    .cta { background-color: #8B0000; color: white; padding: 12px 30px; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>KAFEDOMI</h1>
                        <p>Η αρχιτεκτονική του τέλειου διαλείμματος</p>
                    </div>
                    <div class="content">
                        <h2>Ευχαριστούμε, ${data.name}!</h2>
                        <p>Λάβαμε το αίτημά σας για προσφορά και η ομάδα μας θα το εξετάσει σύντομα.</p>
                        <p>Ένα μέλος της ομάδας πωλήσεών μας θα επικοινωνήσει μαζί σας εντός 24 ωρών για να συζητήσουμε τις ανάγκες σας για λύσεις vending στην <strong>${data.company}</strong>.</p>
                        
                        <h3>Τι ακολουθεί;</h3>
                        <ul>
                            <li>Η ομάδα μας εξετάζει τις απαιτήσεις σας</li>
                            <li>Προετοιμάζουμε μια εξατομικευμένη προσφορά για τον τομέα ${data.sector.toLowerCase()}</li>
                            <li>Επικοινωνούμε μαζί σας για να προγραμματίσουμε μια συμβουλευτική συνάντηση</li>
                            <li>Κανονίζουμε επίσκεψη στο χώρο σας εάν χρειάζεται</li>
                        </ul>
                        
                        <p>Στο μεταξύ, μη διστάσετε να εξερευνήσετε τη γκάμα προϊόντων μας στον ιστότοπό μας.</p>
                        
                        <p><strong>Στοιχεία Επικοινωνίας:</strong><br>
                        📍 Λαμία, Φθιώτιδα, Ελλάδα<br>
                        📞 +30 22310 51340<br>
                        ✉️ kafedomi@gmail.com</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Kafedomi. Με επιφύλαξη παντός δικαιώματος.<br>
                        Εξυπηρετούμε όλο το νομό Φθιώτιδας με premium λύσεις vending.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return { subject, html };
    }
};

// Send email function
const sendEmail = async (to, subject, html) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Kafedomi" <${process.env.SMTP_USER}>`,
        to: to,
        subject: subject,
        html: html
    };

    try {
        console.log(`📧 Sending email to: ${to} (Subject: ${subject})`);
        const info = await transporter.sendMail(mailOptions);
        console.log('✨ Email delivered:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('🔥 Nodemailer Error:', error.message);
        throw error;
    }
};

// Send contact form emails
const sendContactFormEmails = async (formData, language = 'en') => {
    try {
        // Send notification to company
        const companyEmail = emailTemplates.companyNotification(formData, language);
        await sendEmail(
            process.env.RECIPIENT_EMAIL || 'wwefilip57@gmail.com',
            companyEmail.subject,
            companyEmail.html
        );

        // Send auto-reply to customer
        const customerEmail = emailTemplates.customerAutoReply(formData, language);
        await sendEmail(
            formData.email,
            customerEmail.subject,
            customerEmail.html
        );

        return { success: true };
    } catch (error) {
        console.error('Error in sendContactFormEmails:', error);
        throw error;
    }
};

module.exports = {
    sendContactFormEmails,
    sendEmail,
    emailTemplates
};
