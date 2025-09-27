import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://owdftaoirbxuvztzawij.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZGZ0YW9pcmJ4dXZ6dHphd2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Njg0NDUsImV4cCI6MjA3NDQ0NDQ0NX0.ON22OwyWmVUbIvh1nxwGqrs4Mzu95D0Ibg9UFlY4tY0'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table names
export const TABLES = {
  CONTACTS: 'contacts',
  NEWSLETTER: 'newsletter_subscribers',
  TICKETS: 'ticket_purchases'
}

// Helper functions for common operations
export const supabaseHelpers = {
  // Contact form submission
  async submitContact(contactData) {
    const { data, error } = await supabase
      .from(TABLES.CONTACTS)
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    return { data, error }
  },

  // Newsletter subscription
  async subscribeNewsletter(email) {
    const { data, error } = await supabase
      .from(TABLES.NEWSLETTER)
      .insert([
        {
          email: email,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select()

    return { data, error }
  },

  // Ticket purchase
  async purchaseTicket(ticketData) {
    const { data, error } = await supabase
      .from(TABLES.TICKETS)
      .insert([
        {
          ticket_type: ticketData.ticketType,
          price: ticketData.price,
          purchased_at: new Date().toISOString(),
          status: 'pending'
        }
      ])
      .select()

    return { data, error }
  },

  // Get all contacts (admin function)
  async getContacts() {
    const { data, error } = await supabase
      .from(TABLES.CONTACTS)
      .select('*')
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Get newsletter subscribers (admin function)
  async getNewsletterSubscribers() {
    const { data, error } = await supabase
      .from(TABLES.NEWSLETTER)
      .select('*')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false })

    return { data, error }
  },

  // Get ticket purchases (admin function)
  async getTicketPurchases() {
    const { data, error } = await supabase
      .from(TABLES.TICKETS)
      .select('*')
      .order('purchased_at', { ascending: false })

    return { data, error }
  }
}