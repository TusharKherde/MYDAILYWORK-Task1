// Smooth Scroll Navigation
const navLinks = document.querySelectorAll(".nav-link")
const menuToggle = document.getElementById("menuToggle")
const navLinksContainer = document.getElementById("navLinks")

// Update active nav link on scroll
window.addEventListener("scroll", () => {
  updateActiveNavLink()
})

function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`)
      if (activeLink) {
        activeLink.classList.add("active")
      }
    }
  })
}

// Smooth scroll for nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      navLinksContainer.classList.remove("active")
      targetSection.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active")
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll(".skill-card, .project-card")
fadeElements.forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// Contact Form Validation
const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")
const formFeedback = document.getElementById("formFeedback")

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  let isValid = true

  // Clear previous errors
  document.getElementById("nameError").textContent = ""
  document.getElementById("emailError").textContent = ""
  document.getElementById("messageError").textContent = ""

  // Validate name
  if (!nameInput.value.trim()) {
    document.getElementById("nameError").textContent = "Name is required"
    isValid = false
  } else if (nameInput.value.trim().length < 2) {
    document.getElementById("nameError").textContent = "Name must be at least 2 characters"
    isValid = false
  }

  // Validate email
  if (!emailInput.value.trim()) {
    document.getElementById("emailError").textContent = "Email is required"
    isValid = false
  } else if (!validateEmail(emailInput.value.trim())) {
    document.getElementById("emailError").textContent = "Please enter a valid email"
    isValid = false
  }

  // Validate message
  if (!messageInput.value.trim()) {
    document.getElementById("messageError").textContent = "Message is required"
    isValid = false
  } else if (messageInput.value.trim().length < 10) {
    document.getElementById("messageError").textContent = "Message must be at least 10 characters"
    isValid = false
  }

  return isValid
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if (validateForm()) {
    // Show success message
    formFeedback.textContent = "Message sent successfully!"
    formFeedback.classList.add("success")
    formFeedback.classList.remove("error")

    // Reset form
    contactForm.reset()

    // Clear feedback after 5 seconds
    setTimeout(() => {
      formFeedback.textContent = ""
      formFeedback.classList.remove("success", "error")
    }, 5000)
  } else {
    formFeedback.textContent = "Please fix the errors above"
    formFeedback.classList.add("error")
    formFeedback.classList.remove("success")
  }
})

// Real-time validation
nameInput.addEventListener("blur", () => {
  if (nameInput.value.trim() && nameInput.value.trim().length >= 2) {
    document.getElementById("nameError").textContent = ""
  }
})

emailInput.addEventListener("blur", () => {
  if (emailInput.value.trim() && validateEmail(emailInput.value.trim())) {
    document.getElementById("emailError").textContent = ""
  }
})

messageInput.addEventListener("blur", () => {
  if (messageInput.value.trim() && messageInput.value.trim().length >= 10) {
    document.getElementById("messageError").textContent = ""
  }
})

// Smooth scroll on page load if URL has hash
window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }
  updateActiveNavLink()
})
