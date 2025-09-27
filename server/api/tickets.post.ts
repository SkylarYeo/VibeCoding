export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { ticketType, price } = body
  
  // In a real application, you would process the ticket purchase
  console.log('Ticket selection:', { ticketType, price })
  
  return {
    success: true,
    message: `Selected: ${ticketType} - ${price}. Redirecting to checkout...`,
    redirectUrl: '/checkout' // This would be a real checkout page
  }
})