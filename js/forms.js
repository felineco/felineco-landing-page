// Forms and modals functionality
const Forms = {
  init() {
    emailjs.init("U_Th0NBtgIpfKATax");
    this.bindEvents();
    this.addModalStyles();
  },

  bindEvents() {
    // Contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleContactForm(e));
    }

    // Business cards
    const businessCards = document.querySelectorAll(".business-card");
    businessCards.forEach((card) => {
      const button = card.querySelector(".btn");
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const cardTitle = card.querySelector("h3").textContent.toLowerCase();

          if (cardTitle.includes("enterprise")) {
            this.createBusinessModal("enterprise");
          } else if (cardTitle.includes("investor")) {
            this.createBusinessModal("investor");
          } else if (cardTitle.includes("pitch")) {
            this.createBusinessModal("pitch");
          }
        });
      }
    });
  },

  handleContactForm(event) {
    event.preventDefault();
    const contactForm = document.getElementById("contactForm");
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs
      .sendForm("service_3utddsq", "template_o3wkces", contactForm)
      .then(() => {
        UI.showNotification(
          "Message sent successfully! We'll get back to you soon.",
          "success"
        );
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        UI.showNotification(
          "Sorry, there was an error sending your message. Please try again.",
          "error"
        );
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  },

  createBusinessModal(type) {
    const modal = document.createElement("div");
    modal.className = "business-modal";
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${this.getModalTitle(type)}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${this.getModalContent(type)}
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => modal.classList.add("active"), 10);

    // Close modal handlers
    const closeBtn = modal.querySelector(".modal-close");
    const foreground = modal.querySelector(".modal-content");

    const closeModal = () => {
      modal.classList.remove("active");
      setTimeout(() => modal.remove(), 300);
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closeModal);
    // Prevent modal from closing when clicking inside the content
    foreground.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    modal.addEventListener("click", closeModal);

    // Handle form submission
    const form = modal.querySelector(".modal-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleBusinessForm(form, type);
        closeModal();
      });
    }

    document.body.style.overflow = "hidden";
  },

  getModalTitle(type) {
    switch (type) {
      case "enterprise":
        return "Enterprise Partnership";
      case "investor":
        return "Investment Opportunity";
      default:
        return "Contact Us";
    }
  },

  getModalContent(type) {
    if (type === "pitch") {
      return `
                <div style="text-align: center;">
                    <p>Our comprehensive pitch deck showcases MedNote AI's technology, market opportunity, and growth strategy.</p>
                    <a href="assets/pdfs/pitch-deck-v2.pdf" class="btn btn-primary" target="_blank" download>
                        <i class="fas fa-download"></i> Download Pitch Deck
                    </a>
                </div>
            `;
    }

    return `
            <form class="modal-form">
                <input type="hidden" name="inquiry_type" value="${type}">
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
  },

  handleBusinessForm(form, type) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS with business template
    emailjs
      .sendForm("service_3utddsq", "template_o3wkces", form) // Use different template
      .then(() => {
        UI.showNotification(
          `${
            type === "enterprise" ? "Partnership" : "Investment"
          } request sent successfully!`,
          "success"
        );
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        UI.showNotification(
          "Sorry, there was an error sending your request. Please try again.",
          "error"
        );
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  },

  addModalStyles() {
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
                    background: rgba(0, 0, 0, 0.8);
                }
                .business-modal.active {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-overlay {
                    width: 80%;
                    min-width: 320px;
                    max-width: 640px;
                    position: relative;
                    backdrop-filter: blur(4px);
                }
                .modal-content {
                    position: relative;
                    background: white;
                    border-radius: 16px;
                    width: 100%;
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
  },
};
