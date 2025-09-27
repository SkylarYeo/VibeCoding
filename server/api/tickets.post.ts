import { supabaseHelpers } from '../../lib/supabase.js'

export default defineEventHandler(async (event: any) => {
  try {
    const body = await readBody(event)
    
    const { ticketType, price } = body
    
    if (!ticketType || !price) {
      return {
        success: false,
        message: 'Ticket type and price are required'
      }
    }
    
    // Save to Supabase
    const { data, error } = await supabaseHelpers.purchaseTicket({
      ticketType,
      price
    })
    
    if (error) {
      console.error('Supabase ticket purchase error:', error)
      return {
        success: false,
        message: 'Error processing ticket selection. Please try again later.'
      }
    }
    
    console.log('Ticket purchase saved to Supabase:', data)
    
    return {
      success: true,
      message: `Selected: ${ticketType} - ${price}. Redirecting to checkout...`,
      redirectUrl: '/checkout'
    }
  } catch (error) {
    console.error('Ticket selection error:', error)
    return {
      success: false,
      message: 'Error processing ticket selection. Please try again later.'
    }
  }
})