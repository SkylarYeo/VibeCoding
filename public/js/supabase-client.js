// Supabase client configuration for browser use (using CDN)
// This will work both locally and on deployment

// Load Supabase from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
script.onload = function() {
  // Initialize Supabase client
  const { createClient } = window.supabase;
  
  const supabaseUrl = 'https://owdftaoirbxuvztzawij.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZGZ0YW9pcmJ4dXZ6dHphd2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Njg0NDUsImV4cCI6MjA3NDQ0NDQ0NX0.ON22OwyWmVUbIvh1nxwGqrs4Mzu95D0Ibg9UFlY4tY0';
  
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  // Database table names
  const TABLES = {
    CONTACTS: 'contacts',
    NEWSLETTER: 'newsletter_subscribers',
    TICKETS: 'ticket_purchases'
  };

  // Supabase helper functions
  const supabaseHelpers = {
    // Contact form submission
    async submitContact(contactData) {
      try {
        const { data, error } = await supabaseClient
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
          .select();

        return { data, error };
      } catch (err) {
        return { data: null, error: err };
      }
    },

    // Newsletter subscription
    async subscribeNewsletter(email) {
      try {
        const { data, error } = await supabaseClient
          .from(TABLES.NEWSLETTER)
          .insert([
            {
              email: email,
              subscribed_at: new Date().toISOString(),
              status: 'active'
            }
          ])
          .select();

        return { data, error };
      } catch (err) {
        return { data: null, error: err };
      }
    },

    // Ticket purchase
    async purchaseTicket(ticketData) {
      try {
        const { data, error } = await supabaseClient
          .from(TABLES.TICKETS)
          .insert([
            {
              ticket_type: ticketData.ticketType,
              price: ticketData.price,
              purchased_at: new Date().toISOString(),
              status: 'pending'
            }
          ])
          .select();

        return { data, error };
      } catch (err) {
        return { data: null, error: err };
      }
    },

    // Test connection
    async testConnection() {
      try {
        const { data, error } = await supabaseClient
          .from(TABLES.CONTACTS)
          .select('count', { count: 'exact', head: true });

        if (error) {
          console.error('Supabase connection test failed:', error);
          return false;
        }

        console.log('Supabase connection successful');
        return true;
      } catch (err) {
        console.error('Supabase connection error:', err);
        return false;
      }
    }
  };

  // Make helpers available globally
  window.supabaseHelpers = supabaseHelpers;
  window.supabaseClient = supabaseClient;

  // Initialize and test connection when script loads
  supabaseHelpers.testConnection().then(success => {
    if (success) {
      console.log('✅ Supabase connected successfully!');
    } else {
      console.warn('⚠️ Supabase connection failed - check your configuration');
    }
  });
};

document.head.appendChild(script);