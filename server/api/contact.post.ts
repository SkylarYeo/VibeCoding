import { supabaseHelpers } from '../../lib/supabase.js'

export default defineEventHandler(async (event: any) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return {
        success: false,
        message: 'All fields are required'
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }
    
    // Save to Supabase
    const { data, error } = await supabaseHelpers.submitContact({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message
    })
    
    if (error) {
      console.error('Supabase contact submission error:', error)
      return {
        success: false,
        message: 'Error processing your request. Please try again later.'
      }
    }
    
    console.log('Contact form saved to Supabase:', data)
    
    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.'
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Error processing your request. Please try again later.'
    }
  }
})