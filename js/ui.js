// UI functionality - video player, notifications, animations
const UI = {
  init() {
    this.initScrollAnimations();
    this.addNotificationStyles();
  },

  initScrollAnimations() {
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
      // Add this: Check if element is already in view
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("visible");
      }
    });
  },

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add("show"), 10);

    // Auto remove after 5 seconds
    setTimeout(() => this.removeNotification(notification), 5000);

    // Close button handler
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        this.removeNotification(notification);
      });
  },

  removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  },

  getNotificationIcon(type) {
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
  },

  addNotificationStyles() {
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
  },
};
