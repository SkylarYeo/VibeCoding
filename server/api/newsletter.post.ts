export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { email } = body
  
  // In a real application, you would add this to a newsletter service
  console.log('Newsletter subscription:', email)
  
  return {
    success: true,
    message: 'Successfully subscribed to our newsletter!'
  }
})