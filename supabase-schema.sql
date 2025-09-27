-- Supabase Database Schema for Classic Car Show Website
-- Run these commands in your Supabase SQL Editor

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new'
);

-- Create newsletter_subscribers table for newsletter signups
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    unsubscribed_at TIMESTAMP WITH TIME ZONE NULL
);

-- Create ticket_purchases table for ticket selections
CREATE TABLE IF NOT EXISTS ticket_purchases (
    id BIGSERIAL PRIMARY KEY,
    ticket_type VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    customer_email VARCHAR(255) NULL,
    customer_name VARCHAR(255) NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_tickets_purchased_at ON ticket_purchases(purchased_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON ticket_purchases(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (insert only)
-- Contacts table - allow public to insert only
CREATE POLICY "Allow public insert on contacts" ON contacts
    FOR INSERT TO anon WITH CHECK (true);

-- Newsletter table - allow public to insert only, prevent duplicates
CREATE POLICY "Allow public insert on newsletter" ON newsletter_subscribers
    FOR INSERT TO anon WITH CHECK (true);

-- Tickets table - allow public to insert only
CREATE POLICY "Allow public insert on tickets" ON ticket_purchases
    FOR INSERT TO anon WITH CHECK (true);

-- Admin policies (you'll need to set up proper authentication for admin access)
-- For now, these are commented out - uncomment when you set up admin authentication
/*
CREATE POLICY "Allow admin read on contacts" ON contacts
    FOR SELECT TO authenticated USING (auth.role() = 'admin');

CREATE POLICY "Allow admin read on newsletter" ON newsletter_subscribers
    FOR SELECT TO authenticated USING (auth.role() = 'admin');

CREATE POLICY "Allow admin read on tickets" ON ticket_purchases
    FOR SELECT TO authenticated USING (auth.role() = 'admin');
*/

-- Create a function to get table statistics (useful for admin dashboard)
CREATE OR REPLACE FUNCTION get_table_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'contacts_total', (SELECT COUNT(*) FROM contacts),
        'contacts_today', (SELECT COUNT(*) FROM contacts WHERE DATE(created_at) = CURRENT_DATE),
        'newsletter_total', (SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active'),
        'tickets_total', (SELECT COUNT(*) FROM ticket_purchases),
        'tickets_pending', (SELECT COUNT(*) FROM ticket_purchases WHERE status = 'pending')
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function to anon users (for public stats)
GRANT EXECUTE ON FUNCTION get_table_stats() TO anon;