<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar" ref="navbar">
      <div class="nav-container">
        <div class="nav-logo" @click="scrollTo('home')">
          <i class="fas fa-car"></i>
          <span>AutoShow 2025</span>
        </div>
        <div class="nav-menu" :class="{ active: mobileMenuOpen }" ref="navMenu">
          <a href="#home" class="nav-link" @click="scrollTo('home')">Home</a>
          <a href="#about" class="nav-link" @click="scrollTo('about')">About</a>
          <a href="#cars" class="nav-link" @click="scrollTo('cars')">Featured Cars</a>
          <a href="#schedule" class="nav-link" @click="scrollTo('schedule')">Schedule</a>
          <a href="#tickets" class="nav-link" @click="scrollTo('tickets')">Tickets</a>
          <a href="#contact" class="nav-link" @click="scrollTo('contact')">Contact</a>
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu" ref="navToggle">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Annual Classic Car Show 2025</h1>
        <p class="hero-subtitle">Experience the finest collection of vintage and classic automobiles</p>
        <div class="hero-info">
          <div class="info-item">
            <i class="fas fa-calendar-alt"></i>
            <span>October 15-17, 2025</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Convention Center Downtown</span>
          </div>
        </div>
        <div class="hero-buttons">
          <a href="#tickets" class="btn btn-primary" @click="scrollTo('tickets')">Get Tickets</a>
          <a href="#about" class="btn btn-secondary" @click="scrollTo('about')">Learn More</a>
        </div>
      </div>
      <div class="scroll-indicator">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <div class="section-header">
          <h2>About the Show</h2>
          <p>Celebrating automotive excellence and craftsmanship</p>
        </div>
        <div class="about-content">
          <div class="about-text">
            <h3>A Legacy of Excellence</h3>
            <p>For over 25 years, our annual car show has been the premier destination for automotive enthusiasts, collectors, and families alike. Experience the finest collection of classic, vintage, and exotic automobiles from around the world.</p>
            <ul class="features-list">
              <li><i class="fas fa-check"></i>Over 200 classic and vintage cars</li>
              <li><i class="fas fa-check"></i>Expert judging and awards ceremony</li>
              <li><i class="fas fa-check"></i>Meet the owners and restoration experts</li>
              <li><i class="fas fa-check"></i>Food trucks and family activities</li>
            </ul>
          </div>
          <div class="about-stats">
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">Classic Cars</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">25</div>
              <div class="stat-label">Years Running</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5000+</div>
              <div class="stat-label">Visitors</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cars Section -->
    <section id="cars" class="featured-cars">
      <div class="container">
        <div class="section-header">
          <h2>Featured Cars</h2>
          <p>Spotlight on this year's most remarkable vehicles</p>
        </div>
        <div class="cars-grid">
          <div v-for="car in featuredCars" :key="car.id" class="car-card">
            <div class="car-image">
              <img :src="car.image" :alt="car.name">
              <div class="car-overlay">
                <button class="view-details" @click="showCarModal(car)">View Details</button>
              </div>
            </div>
            <div class="car-info">
              <h3>{{ car.name }}</h3>
              <p>{{ car.description }}</p>
              <div class="car-specs">
                <span v-for="spec in car.specs" :key="spec" class="spec">{{ spec }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Schedule Section -->
    <section id="schedule" class="schedule">
      <div class="container">
        <div class="section-header">
          <h2>Event Schedule</h2>
          <p>Three days of automotive excitement</p>
        </div>
        <div class="schedule-tabs">
          <button
            v-for="day in scheduleDays"
            :key="day.key"
            class="tab-button"
            :class="{ active: activeScheduleDay === day.key }"
            @click="activeScheduleDay = day.key"
          >
            {{ day.name }}
          </button>
        </div>
        <div class="schedule-content">
          <div
            v-for="day in scheduleDays"
            :key="day.key"
            class="schedule-day"
            :class="{ active: activeScheduleDay === day.key }"
          >
            <div v-for="event in day.events" :key="event.time" class="schedule-item">
              <div class="time">{{ event.time }}</div>
              <div class="event">
                <h4>{{ event.title }}</h4>
                <p>{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tickets Section -->
    <section id="tickets" class="tickets">
      <div class="container">
        <div class="section-header">
          <h2>Get Your Tickets</h2>
          <p>Choose your perfect car show experience</p>
        </div>
        <div class="tickets-grid">
          <div v-for="ticket in ticketTypes" :key="ticket.id" class="ticket-card" :class="{ featured: ticket.featured }">
            <div v-if="ticket.badge" class="ticket-badge">{{ ticket.badge }}</div>
            <div class="ticket-header">
              <h3>{{ ticket.name }}</h3>
              <div class="price">${{ ticket.price }}</div>
            </div>
            <ul class="ticket-features">
              <li v-for="feature in ticket.features" :key="feature">
                <i class="fas fa-check"></i>{{ feature }}
              </li>
            </ul>
            <button class="btn btn-primary ticket-btn" @click="selectTicket(ticket)">Select Ticket</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
          <h2>Contact Us</h2>
          <p>Get in touch for more information</p>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>Convention Center Downtown<br>123 Main Street<br>City, State 12345</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>info@autoshow2025.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <div>
                <h4>Hours</h4>
                <p>Friday: 2PM - 8PM<br>Saturday: 8AM - 6PM<br>Sunday: 9AM - 4PM</p>
              </div>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="submitContactForm">
            <div class="form-group">
              <input type="text" v-model="contactForm.name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input type="email" v-model="contactForm.email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <input type="text" v-model="contactForm.subject" placeholder="Subject" required>
            </div>
            <div class="form-group">
              <textarea v-model="contactForm.message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <i class="fas fa-car"></i>
              <span>AutoShow 2025</span>
            </div>
            <p>The premier destination for classic car enthusiasts.</p>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" @click="scrollTo('home')">Home</a></li>
              <li><a href="#about" @click="scrollTo('about')">About</a></li>
              <li><a href="#cars" @click="scrollTo('cars')">Featured Cars</a></li>
              <li><a href="#schedule" @click="scrollTo('schedule')">Schedule</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Information</h4>
            <ul>
              <li><a href="#tickets" @click="scrollTo('tickets')">Tickets</a></li>
              <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Newsletter</h4>
            <p>Stay updated with the latest news</p>
            <div class="newsletter">
              <input type="email" v-model="newsletterEmail" placeholder="Enter your email">
              <button type="submit" @click="subscribeNewsletter"><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 AutoShow. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Car Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedCar?.name }}</h2>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <img :src="selectedCar?.image" :alt="selectedCar?.name">
          <div class="modal-info">
            <p>{{ selectedCar?.description }}</p>
            <div class="car-details">
              <h4>Specifications:</h4>
              <ul>
                <li>Engine: High-performance V8</li>
                <li>Transmission: Manual</li>
                <li>Year: Classic vintage</li>
                <li>Condition: Restored</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div v-if="notification.show" class="notification" :class="`notification-${notification.type}`">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
// Reactive data
const mobileMenuOpen = ref(false)
const activeScheduleDay = ref('friday')
const showModal = ref(false)
const selectedCar = ref(null)
const isSubmitting = ref(false)
const newsletterEmail = ref('')

// Contact form data
const contactForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Notification system
const notification = reactive({
  show: false,
  message: '',
  type: 'info'
})

// Featured cars data
const featuredCars = ref([
  {
    id: 1,
    name: '1967 Ford Mustang',
    description: 'Classic American muscle car with original V8 engine',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['V8 Engine', 'Manual']
  },
  {
    id: 2,
    name: '1963 Chevrolet Corvette',
    description: 'Iconic sports car with split-window design',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['327 V8', '4-Speed']
  },
  {
    id: 3,
    name: '1970 Dodge Challenger',
    description: 'Powerful muscle car with HEMI engine',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['HEMI V8', 'Manual']
  },
  {
    id: 4,
    name: '1955 Porsche 356',
    description: 'Elegant European sports car with timeless design',
    image: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['4-Cylinder', 'Manual']
  }
])

// Schedule data
const scheduleDays = ref([
  {
    key: 'friday',
    name: 'Friday',
    events: [
      { time: '9:00 AM', title: 'Setup & Early Registration', description: 'Exhibitors setup and early bird registration opens' },
      { time: '2:00 PM', title: 'VIP Preview', description: 'Exclusive preview for VIP ticket holders' },
      { time: '6:00 PM', title: 'Welcome Reception', description: 'Meet fellow enthusiasts and enjoy refreshments' }
    ]
  },
  {
    key: 'saturday',
    name: 'Saturday',
    events: [
      { time: '8:00 AM', title: 'Doors Open', description: 'General admission begins' },
      { time: '10:00 AM', title: 'Judging Begins', description: 'Expert judges evaluate vehicles' },
      { time: '2:00 PM', title: 'Awards Ceremony', description: 'Recognition of outstanding vehicles' },
      { time: '4:00 PM', title: 'Cruise Event', description: 'Scenic drive through the city' }
    ]
  },
  {
    key: 'sunday',
    name: 'Sunday',
    events: [
      { time: '9:00 AM', title: 'Family Day', description: 'Special activities for families and children' },
      { time: '12:00 PM', title: 'Swap Meet', description: 'Buy, sell, and trade automotive parts' },
      { time: '3:00 PM', title: 'Closing Ceremony', description: 'Final awards and farewell' }
    ]
  }
])

// Ticket types data
const ticketTypes = ref([
  {
    id: 1,
    name: 'General Admission',
    price: 25,
    features: ['Access to all exhibits', 'Food court access', 'Event parking', 'Event program']
  },
  {
    id: 2,
    name: 'VIP Experience',
    price: 75,
    featured: true,
    badge: 'Most Popular',
    features: ['All General Admission benefits', 'VIP preview access', 'Meet & greet with owners', 'Exclusive VIP lounge', 'Premium parking']
  },
  {
    id: 3,
    name: 'Weekend Pass',
    price: 60,
    features: ['3-day access', 'All exhibits', 'Cruise event participation', 'Swap meet access']
  }
])

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollTo = (elementId) => {
  mobileMenuOpen.value = false
  nextTick(() => {
    const element = document.getElementById(elementId)
    if (element) {
      const navHeight = 80
      const targetPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  })
}

const showCarModal = (car) => {
  selectedCar.value = car
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCar.value = null
}

const showNotification = (message, type = 'info') => {
  notification.message = message
  notification.type = type
  notification.show = true
  
  setTimeout(() => {
    notification.show = false
  }, 4000)
}

const submitContactForm = async () => {
  isSubmitting.value = true
  
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: contactForm
    })
    
    if (response.success) {
      showNotification(response.message, 'success')
      // Reset form
      contactForm.name = ''
      contactForm.email = ''
      contactForm.subject = ''
      contactForm.message = ''
    } else {
      showNotification('Error sending message. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    showNotification('Error sending message. Please try again.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const selectTicket = async (ticket) => {
  try {
    const response = await $fetch('/api/tickets', {
      method: 'POST',
      body: {
        ticketType: ticket.name,
        price: `$${ticket.price}`
      }
    })
    
    if (response.success) {
      showNotification(response.message, 'info')
    } else {
      showNotification('Error processing ticket selection. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Error selecting ticket:', error)
    showNotification('Error processing ticket selection. Please try again.', 'error')
  }
}

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  try {
    const response = await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: newsletterEmail.value }
    })
    
    if (response.success) {
      showNotification(response.message, 'success')
      newsletterEmail.value = ''
    } else {
      showNotification('Error subscribing. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    showNotification('Error subscribing. Please try again.', 'error')
  }
}

// Lifecycle
onMounted(() => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar')
  let lastScrollTop = 0
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    if (scrollTop > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)'
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.9)'
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)'
    } else {
      navbar.style.transform = 'translateY(0)'
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)
  
  // Observe elements for animation
  nextTick(() => {
    const animateElements = document.querySelectorAll('.car-card, .stat-item, .schedule-item, .ticket-card')
    animateElements.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })
  })
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    observer.disconnect()
  })
})
</script>

<style scoped>
/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

/* Notification styles */
.notification {
  position: fixed;
  top: 100px;
  right: 20px;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  z-index: 10001;
  max-width: 300px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease;
}

.notification-success {
  background: #28a745;
}

.notification-error {
  background: #dc3545;
}

.notification-info {
  background: #17a2b8;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>