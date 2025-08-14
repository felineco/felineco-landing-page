// Main JavaScript entry point
(function () {
  "use strict";

  // Initialize all modules when DOM is ready
  function init() {
    Navigation.init();
    Forms.init();
    UI.init();
  }

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
