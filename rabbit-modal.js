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
      size: "default",
      position: "center"
    };

    static #templateCache = new Map();

    #options;
    #element;
    #isVisible = false;
    #eventListeners = {};
    #zIndex = 0;
    #documentFragment;

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
      const handleModalEvents = (e) => {
        if (e.type === 'keydown' && e.key === 'Escape' && this.#options.closeOnEscape) {
          this.hide();
          return;
        }

        if (e.type === 'click') {
          if (e.target === this.#element && this.#options.closeOnBackdrop) {
            this.hide();
            return;
          }

          const button = e.target.closest('.rabbit-modal-footer button');
          if (button) {
            const buttonKey = button.dataset.key;
            this.#emit("button", { button: buttonKey });
            if (this.#options?.stackable !== true) {
              this.hide();
            }
          }
        }
      };

      document.addEventListener("keydown", handleModalEvents);
      this.#element.addEventListener("click", handleModalEvents);

      this._handleModalEvents = handleModalEvents;
    }

    #createModal() {
      this.#documentFragment = document.createDocumentFragment();
      
      this.#element = document.createElement("div");
      this.#element.className = "rabbit-modal";

      const cacheKey = `${this.#options.size}-${this.#options.position}`;
      let dialog;

      if (RabbitModal.#templateCache.has(cacheKey)) {
        dialog = RabbitModal.#templateCache.get(cacheKey).cloneNode(true);
      } else {
        dialog = this.#createDialogTemplate();
        RabbitModal.#templateCache.set(cacheKey, dialog.cloneNode(true));
      }

      const content = dialog.querySelector('.rabbit-modal-content');
      
      if (this.#options.title) {
        const header = document.createElement("div");
        header.className = "rabbit-modal-header";
        header.innerHTML = `<h5 class="rabbit-modal-title">${this.#options.title}</h5>`;
        content.appendChild(header);
      }

      const body = document.createElement("div");
      body.className = "rabbit-modal-body";
      body.innerHTML = this.#options.content;
      content.appendChild(body);

      if (Object.keys(this.#options.buttons).length > 0) {
        const footer = document.createElement("div");
        footer.className = "rabbit-modal-footer";
        
        Object.entries(this.#options.buttons).forEach(([key, button]) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `btn btn-${button.type || "secondary"}`;
          btn.textContent = button.text;
          btn.dataset.key = key; 
          footer.appendChild(btn);
        });
        
        content.appendChild(footer);
      }

      this.#element.appendChild(dialog);
      this.#documentFragment.appendChild(this.#element);
      document.body.appendChild(this.#documentFragment);
    }

    #createDialogTemplate() {
      const dialog = document.createElement("div");
      dialog.className = `rabbit-modal-dialog ${this.#options.size}`;

      if (this.#options.position === 'left-sidebar' || this.#options.position === 'right-sidebar') {
        dialog.classList.add(this.#options.position);
      } else if (!['cover-page'].includes(this.#options.size)) {
        dialog.classList.add(this.#options.position);
      }

      const content = document.createElement("div");
      content.className = "rabbit-modal-content";
      dialog.appendChild(content);

      return dialog;
    }

    show() {
      if (this.#isVisible) return;

      if (this.#options.overlay) {
        const overlay = RabbitOverlay.getInstance();
        overlay.setColor(this.#options.overlayColor);
        overlay.incrementCounter();
      }

      this.#element.classList.add("show");
      this.#element.setAttribute("aria-hidden", "false");
      this.#isVisible = true;

      RabbitModal.#updateModalStack();

      this.#emit("show");
    }

    hide() {
      if (!this.#isVisible) return;

      const focusedElement = document.activeElement;
      if (focusedElement && this.#element.contains(focusedElement)) {
        focusedElement.blur();
      }

      this.#element.classList.remove("show");
      this.#element.setAttribute("aria-hidden", "true");
      this.#isVisible = false;
      
      if (this.#options.overlay) {
        RabbitOverlay.getInstance().decrementCounter();
      }

      RabbitModal.#updateModalStack();

      this.#emit("hide");

      this.destroy();
    }

    destroy() {
      RabbitModal.#instances.delete(this);

      if (this._handleModalEvents) {
        document.removeEventListener("keydown", this._handleModalEvents);
        this.#element?.removeEventListener("click", this._handleModalEvents);
        this._handleModalEvents = null;
      }

      if (this.#element?.parentNode) {
        this.#element.parentNode.removeChild(this.#element);
      }

      this.#eventListeners = {};
      this.#element = null;
      this.#options = null;
      this.#documentFragment = null;
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

  if (typeof module !== "undefined" && module.exports) {
    module.exports = RabbitModal;
  } else {
    window.RabbitModal = RabbitModal;
  }
})();
