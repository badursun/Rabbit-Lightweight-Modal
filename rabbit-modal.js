(function (global) {
  "use strict";

  class RabbitModal {
    static #instances = new Set();
    static #defaultOptions = {
      title: "",
      content: "",
      size: "default",
      position: "center",
      buttons: [],
      overlay: true,
      overlayColor: "rgba(15, 23, 42, 0.6)",
      overlayBlur: false,
      closeOnEscape: true,
      closeOnBackdrop: true,
      showHeaderClose: true,
      stackable: false,
      type: null,         // success, error, warning, info
      timer: {
        enabled: false,   // timer'ı aktif etmek için bayrak
        duration: 3000,   // default 3000ms
        progress: false,  // default false
        closeOnTimeup: true, // default true
        onTimeup: null    // async callback function when timer ends
      }
    };

    #element = null;
    #options = {};
    #buttonCallbacks = new Map();
    #timeoutId = null;
    #progressBar = null;
    #startTime = null;
    #duration = 0;
    #eventListeners = {};
    #isVisible = false;

    constructor(options = {}) {
      this.#options = { ...RabbitModal.#defaultOptions, ...options };
      RabbitModal.#instances.add(this);
      this.#createModal();
    }

    #createModal() {
      const modal = document.createElement('div');
      modal.className = 'rabbit-modal';
      if (this.#options.class) {
        modal.classList.add(this.#options.class);
      }
      if (this.#options.type) {
        modal.classList.add(`rabbit-modal-${this.#options.type}`);
      }

      const overlay = document.createElement('div');
      overlay.className = 'rabbit-overlay';
      if (this.#options.overlay) {
        if (this.#options.overlayColor) {
          overlay.style.backgroundColor = this.#options.overlayColor;
        }
        if (this.#options.overlayBlur) {
          overlay.classList.add('rabbit-overlay-blur');
        }
      } else {
        overlay.style.display = 'none';
      }
      modal.appendChild(overlay);

      const dialog = document.createElement('div');
      dialog.className = 'rabbit-modal-dialog';

      // Add progress bar if timer progress is enabled
      if (this.#options.timer?.enabled && this.#options.timer?.progress) {
        const progressBar = document.createElement('div');
        progressBar.className = 'rabbit-modal-progress';
        progressBar.style.width = '100%';
        dialog.appendChild(progressBar);
        this.#progressBar = progressBar;
      }

      modal.appendChild(dialog);

      // Create header only if it's not an alert type and has title or showHeaderClose
      if (!this.#options.type && (this.#options.title || this.#options.showHeaderClose)) {
        const header = document.createElement('div');
        header.className = 'rabbit-modal-header';

        if (this.#options.title) {
          const title = document.createElement('h3');
          title.className = 'rabbit-modal-title';
          title.textContent = this.#options.title;
          header.appendChild(title);
        }

        if (this.#options.showHeaderClose) {
          const closeButton = document.createElement('button');
          closeButton.className = 'rabbit-modal-close';
          closeButton.setAttribute('data-action', 'close');
          closeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          `;
          header.appendChild(closeButton);
        }

        dialog.appendChild(header);
      }

      // Create body
      const body = document.createElement('div');
      body.className = 'rabbit-modal-body';

      // Add alert icon if it's an alert type
      if (this.#options.type) {
        const alertIcon = document.createElement('div');
        alertIcon.className = 'rabbit-alert-icon';
        
        // Alert type icons
        const icons = {
          success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`,
          error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`,
          warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>`,
          info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`
        };
        
        alertIcon.innerHTML = icons[this.#options.type] || '';
        body.appendChild(alertIcon);

        // Add title in body for alert types
        if (this.#options.title) {
          const alertTitle = document.createElement('h3');
          alertTitle.className = 'rabbit-alert-title';
          alertTitle.textContent = this.#options.title;
          body.appendChild(alertTitle);
        }
      }

      if (typeof this.#options.content === 'string') {
        const content = document.createElement('div');
        content.className = 'rabbit-modal-content';
        content.innerHTML = this.#options.content;
        body.appendChild(content);
      } else if (this.#options.content instanceof HTMLElement) {
        const content = document.createElement('div');
        content.className = 'rabbit-modal-content';
        content.appendChild(this.#options.content);
        body.appendChild(content);
      }
      
      dialog.appendChild(body);

      // Create footer if buttons exist
      if (this.#options.buttons && this.#options.buttons.length > 0) {
        const footer = document.createElement('div');
        footer.className = 'rabbit-modal-footer';
        dialog.appendChild(footer);

        // Create buttons after footer is appended
        this.#options.buttons.forEach(button => {
          const btn = document.createElement('button');
          btn.className = `rabbit-btn ${button.type ? `rabbit-btn-${button.type}` : ''} ${button.class || ''}`;
          btn.textContent = button.text;
          
          // Set data attribute for action
          if (button.key) {
            btn.setAttribute('data-rabbit-action', button.key);
          }

          footer.appendChild(btn);
        });

        // Add global button event listener to footer
        footer.addEventListener('click', (e) => {
          const button = e.target.closest('button');
          if (!button) return;

          const action = button.getAttribute('data-rabbit-action');
          if (!action) {
            // Varsayılan olarak modalı kapat
            this.hide();
            return;
          }

          // Buton konfigürasyonunu bul
          const buttonConfig = this.#options.buttons.find(btn => btn.key === action);
          if (!buttonConfig) {
            // Konfigürasyon bulunamadıysa ve action "close" ise kapat
            if (action === 'close') {
              this.hide();
            }
            return;
          }

          // Callback varsa çalıştır
          if (typeof buttonConfig.callback === 'function') {
            buttonConfig.callback(this);
          } else if (action === 'close') {
            // Callback yoksa ve action "close" ise kapat
            this.hide();
          }
        });
      }

      document.body.appendChild(modal);
      this.#element = modal;

      this.#setupEventHandlers();
      this.#updatePosition();
      this.#updateSize();

      return modal;
    }

    #setupEventHandlers() {
      // Overlay click handler
      const overlay = this.#element.querySelector('.rabbit-overlay');
      if (this.#options.closeOnBackdrop && overlay) {
        const overlayHandler = (e) => {
          if (e.target === overlay) {
            this.hide();
          }
        };
        overlay.addEventListener('click', overlayHandler);
        this.#eventListeners['overlay'] = overlayHandler;
      }

      // Close button handlers for both header and footer
      const closeButtons = this.#element.querySelectorAll('[data-action="close"]');
      closeButtons.forEach(button => {
        const closeHandler = () => this.hide();
        button.addEventListener('click', closeHandler);
        if (!this.#eventListeners['closeButtons']) {
          this.#eventListeners['closeButtons'] = [];
        }
        this.#eventListeners['closeButtons'].push({ element: button, handler: closeHandler });
      });

      // ESC key handler
      if (this.#options.closeOnEscape) {
        const escHandler = (e) => {
          if (e.key === 'Escape' && this.#isVisible) {
            this.hide();
          }
        };
        document.addEventListener('keydown', escHandler);
        this.#eventListeners['escKey'] = escHandler;
      }
    }

    #updatePosition() {
      const dialog = this.#element.querySelector('.rabbit-modal-dialog');
      if (!dialog) return;

      // Reset all position classes
      dialog.classList.remove(
        'center',
        'left', 'left-sidebar',
        'right', 'right-sidebar',
        'top', 'top-left', 'top-right',
        'bottom', 'bottom-left', 'bottom-right',
        'fullwidth-top', 'fullwidth-bottom'
      );

      // Skip positioning for cover-page size
      if (this.#options.size === 'cover-page') return;

      // Map position names
      const positionMap = {
        'center': 'center',
        'left': 'left',
        'left-sidebar': 'left-sidebar',
        'right': 'right',
        'right-sidebar': 'right-sidebar',
        'top': 'top',
        'top-left': 'top-left',
        'top-right': 'top-right',
        'bottom': 'bottom',
        'bottom-left': 'bottom-left',
        'bottom-right': 'bottom-right',
        'fullwidth-top': 'fullwidth-top',
        'fullwidth-bottom': 'fullwidth-bottom'
      };

      // Add the mapped position class
      const positionClass = positionMap[this.#options.position];
      if (positionClass) {
        dialog.classList.add(positionClass);
      }
    }

    #updateSize() {
      const dialog = this.#element.querySelector('.rabbit-modal-dialog');
      if (!dialog) return;

      // Reset all size classes
      dialog.classList.remove('small', 'default', 'large', 'xlarge', 'cover-page');

      // Add the size class
      const validSizes = ['small', 'default', 'large', 'xlarge', 'cover-page'];
      const size = validSizes.includes(this.#options.size) ? this.#options.size : 'default';
      dialog.classList.add(size);

      // Special handling for cover-page
      if (size === 'cover-page') {
        dialog.style.maxWidth = '100%';
        dialog.style.maxHeight = '100vh';
      } else {
        dialog.style.maxWidth = '';
        dialog.style.maxHeight = '';
      }
    }

    #emit(eventName) {
      const event = new CustomEvent(`rabbit-modal-${eventName}`, {
        detail: { modal: this }
      });
      this.#element.dispatchEvent(event);
      document.dispatchEvent(event);
    }

    #getAlertIcon(type) {
      const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`
      };
      return icons[type] || '';
    }

    #updateProgress() {
      if (!this.#progressBar || !this.#startTime) return;

      const elapsed = Date.now() - this.#startTime;
      const remaining = Math.max(0, this.#duration - elapsed);
      const progress = (remaining / this.#duration) * 100;

      this.#progressBar.style.width = `${progress}%`;

      if (progress > 0) {
        requestAnimationFrame(() => this.#updateProgress());
      }
    }

    show() {
      // Force reflow
      this.#element.offsetHeight;
      this.#element.classList.add("show");
      this.#isVisible = true;

      if (this.#options.overlayBlur) {
        document.body.classList.add('rabbit-modal-blur');
      }

      // Start timer if enabled and duration is set
      if (this.#options.timer?.enabled && this.#options.timer?.duration > 0) {
        this.#startTime = Date.now();
        this.#duration = this.#options.timer.duration;
        
        // Timer başladı eventi
        this.#emit('timer-start');
        
        if (this.#options.timer.progress && this.#progressBar) {
          this.#updateProgress();
        }
        
        this.#timeoutId = setTimeout(async () => {
          // Timer bitti eventi
          this.#emit('timer-end');
          
          // Callback varsa çalıştır
          if (this.#options.timer.onTimeup) {
            await this.#options.timer.onTimeup(this);
          }
          
          // Otomatik kapanma ayarı
          if (this.#options.timer.closeOnTimeup) {
            this.hide();
          }
        }, this.#options.timer.duration);
      }

      this.#emit("show");
      return this;
    }

    hide() {
      if (this.#timeoutId) {
        clearTimeout(this.#timeoutId);
        this.#timeoutId = null;
      }

      this.#isVisible = false;
      this.#element.classList.remove("show");
      
      if (this.#options.overlayBlur) {
        document.body.classList.remove('rabbit-modal-blur');
      }

      setTimeout(() => {
        if (this.#element && this.#element.parentNode) {
          this.#element.parentNode.removeChild(this.#element);
        }
        this.#emit("hide");
      }, 200);

      return this;
    }

    destroy() {
      RabbitModal.#instances.delete(this);

      // Remove all event listeners
      if (this.#eventListeners) {
        // Remove overlay handler
        if (this.#eventListeners['overlay']) {
          const overlay = this.#element?.querySelector('.rabbit-overlay');
          if (overlay) {
            overlay.removeEventListener('click', this.#eventListeners['overlay']);
          }
        }

        // Remove close button handlers
        if (this.#eventListeners['closeButtons']) {
          this.#eventListeners['closeButtons'].forEach(({ element, handler }) => {
            element.removeEventListener('click', handler);
          });
        }

        // Remove ESC handler
        if (this.#eventListeners['escKey']) {
          document.removeEventListener('keydown', this.#eventListeners['escKey']);
        }
      }

      // Remove blur effect if active
      if (this.#options.overlayBlur) {
        document.body.classList.remove('rabbit-modal-blur');
      }

      // Remove element if exists
      if (this.#element && this.#element.parentNode) {
        this.#element.parentNode.removeChild(this.#element);
      }

      // Clear all references
      this.#element = null;
      this.#options = {};
      this.#buttonCallbacks.clear();
      this.#eventListeners = {};
      this.#isVisible = false;
    }

    addEventListener(event, callback) {
      this.#element.addEventListener(`rabbit-modal-${event}`, callback);
    }

    removeEventListener(event, callback) {
      this.#element.removeEventListener(`rabbit-modal-${event}`, callback);
    }

    static #getVisibleModals() {
      return Array.from(RabbitModal.#instances).filter(modal => modal.#isVisible);
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = RabbitModal;
  } else {
    global.RabbitModal = RabbitModal;
  }
})(typeof window !== "undefined" ? window : this);
