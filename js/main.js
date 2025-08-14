// Main JavaScript for MedNote AI Landing Page
(function () {
  "use strict";

  // DOM Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-list a");
  const contactForm = document.getElementById("contactForm");
  const videoContainer = document.querySelector(".video-container");
  const video = document.querySelector("video");
  const playBtn = document.querySelector(".play-btn");
  const videoOverlay = document.querySelector(".video-overlay");
  const loginButtons = document.querySelectorAll(".btn-primary");
  const businessCards = document.querySelectorAll(".business-card");

  // Mobile Navigation
  let mobileNavOpen = false;

  function createMobileNav() {
    // Create mobile navigation if it doesn't exist
    let mobileNav = document.querySelector(".mobile-nav");
    if (!mobileNav) {
      mobileNav = document.createElement("div");
      mobileNav.className = "mobile-nav";

      const mobileNavList = document.createElement("ul");
      mobileNavList.className = "mobile-nav-list";

      // Copy navigation items
      const navItems = [
        { href: "#features", text: "Features" },
        { href: "#demo", text: "Demo" },
        { href: "#business", text: "Business" },
        { href: "#contact", text: "Contact" },
      ];

      navItems.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.text;
        a.addEventListener("click", closeMobileNav);
        li.appendChild(a);
        mobileNavList.appendChild(li);
      });

      mobileNav.appendChild(mobileNavList);
      document.body.appendChild(mobileNav);
    }
    return mobileNav;
  }

  function toggleMobileNav() {
    const mobileNav = createMobileNav();
    mobileNavOpen = !mobileNavOpen;

    if (mobileNavOpen) {
      mobileNav.classList.add("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      document.body.style.overflow = "hidden";
    } else {
      mobileNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = "";
    }
  }

  function closeMobileNav() {
    const mobileNav = document.querySelector(".mobile-nav");
    if (mobileNav && mobileNavOpen) {
      mobileNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = "";
      mobileNavOpen = false;
    }
  }

  // Smooth Scrolling
  function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const elementPosition = element.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }

  // Active Navigation Highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        document
          .querySelectorAll(".nav-list a, .mobile-nav-list a")
          .forEach((link) => {
            link.classList.remove("active");
          });

        // Add active class to current section link
        document.querySelectorAll(`a[href="#${sectionId}"]`).forEach((link) => {
          link.classList.add("active");
        });
      }
    });
  }

  // Contact Form Handling
  function handleContactForm(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      // Here you would typically send the data to your backend
      // Example: fetch('/api/contact', { method: 'POST', body: formData })

      // Show success message
      showNotification(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

      // Reset form
      contactForm.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  // Business Card Modals
  function createBusinessModal(type) {
    const modal = document.createElement("div");
    modal.className = "business-modal";
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${getModalTitle(type)}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${getModalContent(type)}
                    </div>
                </div>
            </div>
        `;

    // Add modal styles
    if (!document.querySelector("#modal-styles")) {
      const styles = document.createElement("style");
      styles.id = "modal-styles";
      styles.textContent = `
                .business-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .business-modal.active {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(4px);
                }
                .modal-content {
                    position: relative;
                    background: white;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }
                .business-modal.active .modal-content {
                    transform: scale(1);
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px 24px 0;
                    border-bottom: 1px solid #e0e0e0;
                    margin-bottom: 24px;
                }
                .modal-header h3 {
                    margin: 0;
                    color: var(--primary-color);
                }
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-body {
                    padding: 0 24px 24px;
                }
                .modal-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .modal-form input,
                .modal-form textarea {
                    padding: 12px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-family: inherit;
                }
                .modal-form input:focus,
                .modal-form textarea:focus {
                    outline: none;
                    border-color: var(--secondary-color);
                }
            `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => modal.classList.add("active"), 10);

    // Close modal handlers
    const closeBtn = modal.querySelector(".modal-close");
    const overlay = modal.querySelector(".modal-overlay");

    function closeModal() {
      modal.classList.remove("active");
      setTimeout(() => modal.remove(), 300);
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Handle form submission
    const form = modal.querySelector(".modal-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleBusinessForm(form, type);
        closeModal();
      });
    }

    document.body.style.overflow = "hidden";
  }

  function getModalTitle(type) {
    switch (type) {
      case "enterprise":
        return "Enterprise Partnership";
      case "investor":
        return "Investment Opportunity";
      default:
        return "Contact Us";
    }
  }

  function getModalContent(type) {
    if (type === "pitch") {
      return `
                <div style="text-align: center;">
                    <p>Our comprehensive pitch deck showcases MedNote AI's technology, market opportunity, and growth strategy.</p>
                    <a href="assets/pitch-deck.pdf" class="btn btn-primary" target="_blank" download>
                        <i class="fas fa-download"></i> Download Pitch Deck
                    </a>
                </div>
            `;
    }

    return `
            <form class="modal-form">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="text" name="company" placeholder="Company/Organization" required>
                <input type="text" name="title" placeholder="Job Title" required>
                <textarea name="message" placeholder="Tell us about your ${
                  type === "enterprise"
                    ? "partnership needs"
                    : "investment interest"
                }" rows="4" required></textarea>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i>
                    Send ${
                      type === "enterprise" ? "Partnership" : "Investment"
                    } Request
                </button>
            </form>
        `;
  }

  function handleBusinessForm(form, type) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Here you would send this to your backend
    console.log(`${type} form submitted:`, data);

    showNotification(
      `${
        type === "enterprise" ? "Partnership" : "Investment"
      } request sent successfully!`,
      "success"
    );
  }

  // Video Player
  function initVideoPlayer() {
    if (!video || !playBtn) return;

    playBtn.addEventListener("click", () => {
      video.play();
      videoOverlay.style.display = "none";
    });

    video.addEventListener("play", () => {
      videoOverlay.style.display = "none";
    });

    video.addEventListener("pause", () => {
      videoOverlay.style.display = "flex";
    });

    video.addEventListener("ended", () => {
      videoOverlay.style.display = "flex";
    });
  }

  // Google Login Simulation
  function handleGoogleLogin() {
    // Simulate Google OAuth redirect
    showNotification("Redirecting to Google Sign-in...", "info");

    // In a real application, this would redirect to your OAuth endpoint
    // window.location.href = '/auth/google';

    // For demo purposes, simulate a delay
    setTimeout(() => {
      showNotification("Login feature coming soon!", "info");
    }, 1500);
  }

  // Notification System
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add notification styles if not already added
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10001;
                    min-width: 300px;
                    max-width: 400px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                }
                .notification-success { border-left: 4px solid #4caf50; }
                .notification-error { border-left: 4px solid #f44336; }
                .notification-info { border-left: 4px solid #2196f3; }
                .notification-close {
                    background: none;
                    border: none;
                    margin-left: auto;
                    cursor: pointer;
                    font-size: 18px;
                    color: #666;
                }
            `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add("show"), 10);

    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);

    // Close button handler
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        removeNotification(notification);
      });
  }

  function removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }

  function getNotificationIcon(type) {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "exclamation-triangle";
      case "info":
        return "info-circle";
      default:
        return "info-circle";
    }
  }

  // Scroll Animations
  function initScrollAnimations() {
    const elements = document.querySelectorAll(".fade-in, .scale-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Initialize everything when DOM is loaded
  function init() {
    // Mobile navigation
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", toggleMobileNav);
    }

    // Smooth scrolling for navigation links
    document.addEventListener("click", (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        if (target !== "#") {
          smoothScroll(target);
          closeMobileNav();
        }
      }
    });

    // Contact form
    if (contactForm) {
      contactForm.addEventListener("submit", handleContactForm);
    }

    // Business cards
    businessCards.forEach((card) => {
      const button = card.querySelector(".btn");
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const cardTitle = card.querySelector("h3").textContent.toLowerCase();

          if (cardTitle.includes("enterprise")) {
            createBusinessModal("enterprise");
          } else if (cardTitle.includes("investor")) {
            createBusinessModal("investor");
          } else if (cardTitle.includes("pitch")) {
            createBusinessModal("pitch");
          }
        });
      }
    });

    // Google login buttons
    loginButtons.forEach((button) => {
      if (button.textContent.includes("Google")) {
        button.addEventListener("click", handleGoogleLogin);
      }
    });

    // Video player
    initVideoPlayer();

    // Scroll animations
    initScrollAnimations();

    // Scroll events
    window.addEventListener("scroll", updateActiveNav);

    // Close mobile nav on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991 && mobileNavOpen) {
        closeMobileNav();
      }
    });

    // Add animation classes to elements
    document
      .querySelectorAll(".step, .feature-card, .business-card")
      .forEach((element) => {
        element.classList.add("fade-in");
      });
  }

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
