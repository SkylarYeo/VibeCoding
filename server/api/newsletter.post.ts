import { supabaseHelpers } from '../../lib/supabase.js'

export default defineEventHandler(async (event: any) => {
  try {
    const body = await readBody(event)
    
    const { email } = body
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }
    
    // Save to Supabase
    const { data, error } = await supabaseHelpers.subscribeNewsletter(email)
    
    if (error) {
      console.error('Supabase newsletter subscription error:', error)
      return {
        success: false,
        message: 'Error subscribing. Please try again later.'
      }
    }
    
    console.log('Newsletter subscription saved to Supabase:', data)
    
    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Error subscribing. Please try again later.'
    }
  }
})