// Navigation functionality
const Navigation = {
  mobileNavOpen: false,

  init() {
    this.bindEvents();
    this.updateActiveNav();
  },

  bindEvents() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => this.toggleMobileNav());
    }

    // Smooth scrolling for navigation links
    document.addEventListener("click", (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        if (target !== "#") {
          this.smoothScroll(target);
          this.closeMobileNav();
        }
      }
    });

    // Scroll events
    window.addEventListener("scroll", () => this.updateActiveNav());

    // Close mobile nav on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991 && this.mobileNavOpen) {
        this.closeMobileNav();
      }
    });
  },

  createMobileNav() {
    let mobileNav = document.querySelector(".mobile-nav");
    if (!mobileNav) {
      mobileNav = document.createElement("div");
      mobileNav.className = "mobile-nav";

      const mobileNavList = document.createElement("ul");
      mobileNavList.className = "mobile-nav-list";

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
        a.addEventListener("click", () => this.closeMobileNav());
        li.appendChild(a);
        mobileNavList.appendChild(li);
      });

      mobileNav.appendChild(mobileNavList);
      document.body.appendChild(mobileNav);
    }
    return mobileNav;
  },

  toggleMobileNav() {
    const mobileNav = this.createMobileNav();
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.mobileNavOpen = !this.mobileNavOpen;

    if (this.mobileNavOpen) {
      mobileNav.classList.add("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  },

  closeMobileNav() {
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (mobileNav && this.mobileNavOpen) {
      mobileNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = "";
      this.mobileNavOpen = false;
    }
  },

  smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const elementPosition = element.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  },

  updateActiveNav() {
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
  },
};
