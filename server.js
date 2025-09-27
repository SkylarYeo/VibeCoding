const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for external resources like fonts and images
}));

// CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes for form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // In a real application, you would save this to a database
    // For now, we'll just log it and send a success response
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
});

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    // In a real application, you would add this to a newsletter service
    console.log('Newsletter subscription:', email);
    
    res.json({ 
        success: true, 
        message: 'Successfully subscribed to our newsletter!' 
    });
});

app.post('/api/tickets', (req, res) => {
    const { ticketType, price } = req.body;
    
    // In a real application, you would process the ticket purchase
    console.log('Ticket selection:', { ticketType, price });
    
    res.json({ 
        success: true, 
        message: `Selected: ${ticketType} - ${price}. Redirecting to checkout...`,
        redirectUrl: '/checkout' // This would be a real checkout page
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Page not found' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚗 Classic Car Show server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
});

module.exports = app;