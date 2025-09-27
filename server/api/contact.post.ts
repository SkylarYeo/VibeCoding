export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { name, email, subject, message } = body
  
  // In a real application, you would save this to a database
  // For now, we'll just log it and send a success response
  console.log('Contact form submission:', { name, email, subject, message })
  
  return {
    success: true,
    message: 'Thank you for your message! We\'ll get back to you soon.'
  }
})