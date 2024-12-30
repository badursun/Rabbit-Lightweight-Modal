/**
 * Rabbit Lightweight Modal
 * Ultra-lightweight, dependency-free modal dialog library
 * @author Rabbit Modal Team
 * @license MIT
 */

(() => {
  class RabbitOverlay {
    static #instance = null;
    #element;
    #activeCount = 0;

    constructor() {
      this.#element = document.createElement("div");
      this.#element.className = "rabbit-overlay";
      document.body.appendChild(this.#element);
    }

    static getInstance() {
      if (!RabbitOverlay.#instance) {
        RabbitOverlay.#instance = new RabbitOverlay();
      }
      return RabbitOverlay.#instance;
    }

    setColor(color) {
      this.#element.style.backgroundColor = color;
    }

    incrementCounter() {
      this.#activeCount++;
      if (this.#activeCount === 1) {
        this.#element.classList.add("show");
      }
    }

    decrementCounter() {
      this.#activeCount--;
      if (this.#activeCount === 0) {
        this.#element.classList.remove("show");
      }
    }
  }

  class RabbitModal {
    static #instances = new Set();
    static #zIndexBase = 9000;
    static #defaultOptions = {
      title: "",
      content: "",
      buttons: {},
      stackable: false,
      closeOnBackdrop: true,
      closeOnEscape: true,
      overlay: true,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      size: "default", // small, default, large, xlarge, cover-page
      position: "center" // center, top, top-right, top-left, bottom-right, bottom-left, bottom, right, left, left-sidebar, right-sidebar
    };

    #options;
    #element;
    #isVisible = false;
    #eventListeners = {};
    #zIndex = 0;
    #handleEscape = null;
    #handleBackdropClick = null;

    constructor(options = {}) {
      this.#options = { ...RabbitModal.#defaultOptions, ...options };
      this.#createModal();
      this.#setupEventHandlers();
      RabbitModal.#instances.add(this);
    }

    static #getVisibleModals() {
      return Array.from(RabbitModal.#instances).filter(modal => modal.isVisible);
    }

    static #updateModalStack() {
      const visibleModals = RabbitModal.#getVisibleModals();
      visibleModals.forEach((modal, index) => {
        modal.#zIndex = RabbitModal.#zIndexBase + ((index + 1) * 10);
        modal.#element.style.zIndex = modal.#zIndex;
      });
    }

    get options() {
      return this.#options;
    }

    get element() {
      return this.#element;
    }

    get isVisible() {
      return this.#isVisible;
    }

    #setupEventHandlers() {
      this.#handleEscape = (e) => {
        if (e.key === "Escape" && this.#options.closeOnEscape) {
          this.hide();
        }
      };

      this.#handleBackdropClick = (e) => {
        if (e.target === this.#element && this.#options.closeOnBackdrop) {
          this.hide();
        }
      };
    }

    #createModal() {
      // Create modal container
      this.#element = document.createElement("div");
      this.#element.className = "rabbit-modal";

      // Create modal dialog
      const dialog = document.createElement("div");
      dialog.className = `rabbit-modal-dialog ${this.#options.size}`;

      // Add position class if it's a sidebar
      if (this.#options.position === 'left-sidebar' || this.#options.position === 'right-sidebar') {
        dialog.classList.add(this.#options.position);
      }
      // Add position class if not a special size and not a sidebar
      else if (!['cover-page'].includes(this.#options.size)) {
        dialog.classList.add(this.#options.position);
      }

      // Create modal content
      const content = document.createElement("div");
      content.className = "rabbit-modal-content";

      // Create header if title exists
      if (this.#options.title) {
        const header = document.createElement("div");
        header.className = "rabbit-modal-header";
        header.innerHTML = `<h5 class="rabbit-modal-title">${this.#options.title}</h5>`;
        content.appendChild(header);
      }

      // Create body
      const body = document.createElement("div");
      body.className = "rabbit-modal-body";
      body.innerHTML = this.#options.content;
      content.appendChild(body);

      // Create footer if buttons exist
      if (Object.keys(this.#options.buttons).length > 0) {
        const footer = document.createElement("div");
        footer.className = "rabbit-modal-footer";
        
        for (const [key, button] of Object.entries(this.#options.buttons)) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `btn btn-${button.type || "secondary"}`;
          btn.textContent = button.text;
          btn.onclick = () => {
            this.#emit("button", { button: key });
            // Eğer stackable true değilse veya tanımlı değilse modalı kapat
            if (this.#options?.stackable !== true) {
              this.hide();
            }
          };
          footer.appendChild(btn);
        }
        
        content.appendChild(footer);
      }

      dialog.appendChild(content);
      this.#element.appendChild(dialog);
      document.body.appendChild(this.#element);
    }

    show() {
      if (this.#isVisible) return;

      // Show overlay
      if (this.#options.overlay) {
        const overlay = RabbitOverlay.getInstance();
        overlay.setColor(this.#options.overlayColor);
        overlay.incrementCounter();
      }

      // Show modal
      this.#element.classList.add("show");
      this.#element.setAttribute("aria-hidden", "false");
      this.#isVisible = true;

      // Update z-index stack
      RabbitModal.#updateModalStack();

      // Add event listeners
      document.addEventListener("keydown", this.#handleEscape);
      this.#element.addEventListener("click", this.#handleBackdropClick);

      // Emit event
      this.#emit("show");
    }

    hide() {
      if (!this.#isVisible) return;

      // Remove focus from any focused element inside the modal
      const focusedElement = document.activeElement;
      if (focusedElement && this.#element.contains(focusedElement)) {
        focusedElement.blur();
      }

      // Hide modal
      this.#element.classList.remove("show");
      this.#element.setAttribute("aria-hidden", "true");
      this.#isVisible = false;
      
      // Hide overlay if this is the last modal
      if (this.#options.overlay) {
        RabbitOverlay.getInstance().decrementCounter();
      }

      // Update z-index stack
      RabbitModal.#updateModalStack();

      // Remove event listeners
      document.removeEventListener("keydown", this.#handleEscape);
      this.#element.removeEventListener("click", this.#handleBackdropClick);

      // Emit event
      this.#emit("hide");

      // Clean up
      this.destroy();
    }

    destroy() {
      // Remove from instances
      RabbitModal.#instances.delete(this);

      // Remove element from DOM
      if (this.#element && this.#element.parentNode) {
        this.#element.parentNode.removeChild(this.#element);
      }

      // Clear event listeners
      this.#eventListeners = {};
      this.#handleEscape = null;
      this.#handleBackdropClick = null;

      // Clear references
      this.#element = null;
      this.#options = null;
    }

    on(event, callback) {
      if (!this.#eventListeners[event]) {
        this.#eventListeners[event] = [];
      }
      this.#eventListeners[event].push(callback);
    }

    #emit(event, data) {
      if (this.#eventListeners[event]) {
        this.#eventListeners[event].forEach(callback => callback(data));
      }
    }
  }

  // Export for browser and Node.js
  if (typeof module !== "undefined" && module.exports) {
    module.exports = RabbitModal;
  } else {
    window.RabbitModal = RabbitModal;
  }
})();
