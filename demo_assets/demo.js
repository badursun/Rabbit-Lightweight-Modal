function showSizeModal(size) {
    const modal = new RabbitModal({
      title: size.charAt(0).toUpperCase() + size.slice(1) + " Size Modal",
      content: `This is a ${size} size modal example`,
      size: size,
      buttons: [
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="size-options"]');
    select.value = size;
    updateCodeExample(select, 'size-options');
    updateSizeExample(select);
  }

  function showOverlayModal(color) {
    const modal = new RabbitModal({
      title: "Custom Overlay Modal",
      content: "This modal has a custom overlay color",
      overlay: true,
      overlayColor: color,
      buttons: [
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();
    
    // Update code example
    const select = document.querySelector('select[data-type="overlay-options"]');
    let selectedValue = "default";
    
    if (color === "rgba(0, 0, 0, 0.8)") {
      selectedValue = "dark";
    } else if (color === "rgba(255, 255, 255, 0.8)") {
      selectedValue = "light";
    } else if (color === "rgba(0, 0, 255, 0.3)") {
      selectedValue = "blue";
    }
    
    select.value = selectedValue;
    updateCodeExample(select, 'overlay-options');
  }

  function showNoOverlayModal() {
    const modal = new RabbitModal({
      title: "No Overlay Modal",
      content: "This modal has no overlay background",
      overlay: false,
      buttons: [
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();
    
    // Update code example
    const select = document.querySelector('select[data-type="overlay-options"]');
    select.value = "none";
    updateCodeExample(select, 'overlay-options');
  }

  function showStackedModals() {
    const modal1 = new RabbitModal({
      title: "First Modal",
      content: "This is the first modal in the stack",
      stackable: true,
      buttons: [
        {
          key: "next",
          text: "Open Second Modal",
          type: "primary",
          onClick: () => {
            const modal2 = new RabbitModal({
              title: "Second Modal",
              content: "This is the second modal in the stack",
              stackable: true,
              buttons: [
                {
                  key: "next",
                  text: "Open Third Modal",
                  type: "primary",
                  onClick: () => {
                    const modal3 = new RabbitModal({
                      title: "Third Modal",
                      content: "This is the third modal in the stack",
                      stackable: true,
                      buttons: [
                        {
                          key: "close",
                          text: "Close All",
                          type: "primary",
                          onClick: () => {
                            modal1.close();
                            modal2.close();
                            modal3.close();
                          }
                        }
                      ]
                    });
                    modal3.show();
                  }
                },
                {
                  key: "close",
                  text: "Close",
                  type: "secondary"
                }
              ]
            });
            modal2.show();
          }
        },
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal1.show();
  }

  function showMultipleButtons() {
    const modal = new RabbitModal({
      title: "Multiple Buttons Modal",
      content: "This modal has multiple buttons with different styles",
      buttons: [
        {
          key: "save",
          text: "Save Changes",
          type: "primary"
        },
        {
          key: "delete",
          text: "Delete",
          type: "danger"
        },
        {
          key: "cancel",
          text: "Cancel",
          type: "secondary"
        }
      ]
    });
    modal.show();
  }

  function showButtonStates() {
    const modal = new RabbitModal({
      title: "Button States Modal",
      content: "This modal demonstrates different button states",
      buttons: [
        {
          key: "loading",
          text: "Loading",
          type: "primary",
          loading: true
        },
        {
          key: "disabled",
          text: "Disabled",
          type: "secondary",
          disabled: true
        },
        {
          key: "normal",
          text: "Normal",
          type: "secondary"
        }
      ]
    });
    modal.show();
  }

  function showButtonGroups() {
    const modal = new RabbitModal({
      title: "Button Groups Modal",
      content: "This modal shows how to group buttons",
      buttons: [
        {
          key: "group1",
          group: "left",
          text: "Left",
          type: "secondary"
        },
        {
          key: "group2",
          group: "left",
          text: "Middle",
          type: "secondary"
        },
        {
          key: "group3",
          group: "left",
          text: "Right",
          type: "primary"
        }
      ]
    });
    modal.show();
  }

  function showDynamicButtons() {
    let count = 0;
    const modal = new RabbitModal({
      title: "Dynamic Buttons Modal",
      content: "This modal has a button that updates its text dynamically",
      buttons: [
        {
          key: "counter",
          text: "Click me (0)",
          type: "primary",
          onClick: (button) => {
            count++;
            button.text = `Click me (${count})`;
            if (count >= 5) {
              button.disabled = true;
              button.text = "Maximum clicks reached!";
            }
          }
        },
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();
  }

  function showMultipleButtonsDemo() {
    const modal = new RabbitModal({
      title: "Multiple Buttons Demo",
      content: `
        <div style="text-align: center;">
          <h3>Choose an Action</h3>
          <p>This demo shows different button configurations and behaviors</p>
        </div>
      `,
      buttons: [
        {
          key: "save",
          text: "Save Changes",
          type: "primary",
          onClick: () => {
            modal.close();
            setTimeout(() => {
              new RabbitModal({
                title: "Success",
                content: "Changes saved successfully!",
                type: "success",
                timer: {
                  enabled: true,
                  duration: 2000,
                  progress: true,
                  closeOnTimeup: true
                }
              }).show();
            }, 500);
          }
        },
        {
          key: "delete",
          text: "Delete",
          type: "danger",
          onClick: () => {
            new RabbitModal({
              title: "Confirm Delete",
              content: "Are you sure you want to delete this item?",
              type: "warning",
              buttons: [
                {
                  key: "confirm",
                  text: "Yes, Delete",
                  type: "danger",
                  onClick: () => {
                    modal.close();
                    setTimeout(() => {
                      new RabbitModal({
                        title: "Deleted",
                        content: "Item has been deleted",
                        type: "success",
                        timer: {
                          enabled: true,
                          duration: 2000,
                          progress: true,
                          closeOnTimeup: true
                        }
                      }).show();
                    }, 500);
                  }
                },
                {
                  key: "cancel",
                  text: "Cancel",
                  type: "secondary"
                }
              ]
            }).show();
          }
        },
        {
          key: "cancel",
          text: "Cancel",
          type: "secondary"
        }
      ]
    });
    modal.show();
  }

  function showDefaultHeaderDemo() {
    const modal = new RabbitModal({
      title: "Default Header Modal",
      content: "This modal has a header close button (default behavior)",
      showHeaderClose: true,
      buttons: [
        {
          key: "toggle",
          text: "Toggle Header Close",
          type: "primary",
          onClick: () => {
            modal.options.showHeaderClose = !modal.options.showHeaderClose;
            modal.update();
          }
        },
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="header-options"]');
    select.value = 'default';
    updateCodeExample(select, 'header-options');
  }

  function showNoHeaderCloseDemo() {
    const modal = new RabbitModal({
      title: "No Header Close Button Modal",
      content: "This modal has no header close button",
      showHeaderClose: false,
      buttons: [
        {
          key: "toggle",
          text: "Toggle Header Close",
          type: "primary",
          callback: () => {
            modal.options.showHeaderClose = !modal.options.showHeaderClose;
            modal.update();
          }
        },
        {
          key: "close",
          text: "Close",
          type: "secondary"
        }
      ]
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="header-options"]');
    select.value = 'no-close';
    updateCodeExample(select, 'header-options');
  }

  function showSuccessAlert() {
    const modal = new RabbitModal({
      title: "Success Alert",
      content: "Operation completed successfully!",
      type: "success",
      timer: {
        enabled: true,
        duration: 3000,
        progress: true,
        closeOnTimeup: true
      }
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="alert-types"]');
    select.value = 'success';
    updateCodeExample(select, 'alert-types');
  }

  function showErrorAlert() {
    const modal = new RabbitModal({
      title: "Error Alert",
      content: "An error occurred while processing your request.",
      type: "error",
      timer: {
        enabled: true,
        duration: 3000,
        progress: true,
        closeOnTimeup: true
      }
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="alert-types"]');
    select.value = 'error';
    updateCodeExample(select, 'alert-types');
  }

  function showWarningAlert() {
    const modal = new RabbitModal({
      title: "Warning Alert",
      content: "Please review your input before proceeding.",
      type: "warning",
      timer: {
        enabled: true,
        duration: 3000,
        progress: true,
        closeOnTimeup: true
      }
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="alert-types"]');
    select.value = 'warning';
    updateCodeExample(select, 'alert-types');
  }

  function showInfoAlert() {
    const modal = new RabbitModal({
      title: "Information Alert",
      content: "Here's some important information for you.",
      type: "info",
      timer: {
        enabled: true,
        duration: 3000,
        progress: true,
        closeOnTimeup: true
      }
    });
    modal.show();

    // Update code example
    const select = document.querySelector('select[data-type="alert-types"]');
    select.value = 'info';
    updateCodeExample(select, 'alert-types');
  }

  function updateCodeExample(select, type) {
    const examples = {
      'alert-types': {
        'success': `// Create a new modal with success alert
const modal = new RabbitModal({
title: "Success Alert",
content: "Operation completed successfully!",
type: "success",
timer: {
enabled: true,
duration: 3000,
progress: true,
closeOnTimeup: true
}
});
modal.show();`,
        'error': `// Create a new modal with error alert
const modal = new RabbitModal({
title: "Error Alert",
content: "An error occurred while processing your request.",
type: "error",
timer: {
enabled: true,
duration: 3000,
progress: true,
closeOnTimeup: true
}
});
modal.show();`,
        'warning': `// Create a new modal with warning alert
const modal = new RabbitModal({
title: "Warning Alert",
content: "Please review your input before proceeding.",
type: "warning",
timer: {
enabled: true,
duration: 3000,
progress: true,
closeOnTimeup: true
}
});
modal.show();`,
        'info': `// Create a new modal with info alert
const modal = new RabbitModal({
title: "Information Alert",
content: "Here's some important information for you.",
type: "info",
timer: {
enabled: true,
duration: 3000,
progress: true,
closeOnTimeup: true
}
});
modal.show();`
      },
      'header-options': {
        'default': `// Create a new modal with header close button (default)
const modal = new RabbitModal({
title: "Default Header Modal",
content: "This modal has a header close button (default behavior)",
showHeaderClose: true,
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`,
        'no-close': `// Create a new modal without header close button
const modal = new RabbitModal({
title: "No Header Close Button Modal",
content: "This modal has no header close button",
showHeaderClose: false,
buttons: [
{
  key: "toggle",
  text: "Toggle Header Close",
  type: "primary",
  callback: () => {
    modal.options.showHeaderClose = !modal.options.showHeaderClose;
    modal.update();
  }
},
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`
      },
      'size-options': {
        'small': `// Create a new modal with small size
const modal = new RabbitModal({
title: "Small Size Modal",
content: "This is a small size modal example",
size: "small",
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`,
        'default': `// Create a new modal with default size
const modal = new RabbitModal({
title: "Default Size Modal",
content: "This is a default size modal example",
size: "default",
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`,
        'large': `// Create a new modal with large size
const modal = new RabbitModal({
title: "Large Size Modal",
content: "This is a large size modal example",
size: "large",
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`,
        'xlarge': `// Create a new modal with extra large size
const modal = new RabbitModal({
title: "Extra Large Size Modal",
content: "This is an extra large size modal example",
size: "xlarge",
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`,
        'cover-page': `// Create a new modal with cover page size
const modal = new RabbitModal({
title: "Cover Page Modal",
content: "This is a cover page modal example",
size: "cover-page",
buttons: [
{
  key: "close",
  text: "Close",
  type: "secondary"
}
]
});
modal.show();`
      }
    };
    
    const codeBlock = document.querySelector(`.${type}-example code`);
    codeBlock.textContent = examples[type][select.value];
  }

  async function updateSizeExample(select) {
    const sampleName = `size-options-${select.value}`;
    const codeElement = document.getElementById('size-options-code');
    
    try {
        const response = await fetch(`demo_assets/samples/${sampleName}.js`);
        const code = await response.text();
        // Format the code for display
        const formattedCode = `// Create a new modal with ${select.value} size
${code}
modal.show();`;
        codeElement.textContent = formattedCode;
    } catch (error) {
        console.error(`Error loading code example for ${sampleName}:`, error);
        codeElement.textContent = '// Error loading example';
    }
  }

  // Load modal config from file
  async function loadModalConfig(sampleName) {
    try {
      const response = await fetch(`demo_assets/samples/${sampleName}.js`);
      const configText = await response.text();
      // Safely evaluate the config object
      return eval(configText);
    } catch (error) {
      console.error(`Error loading modal config for ${sampleName}:`, error);
      return null;
    }
  }

  // Generic show modal function
  async function showDemo(sampleName) {
    const config = await loadModalConfig(sampleName);
    if (config) {
      const modal = new RabbitModal(config);
      modal.show();
      
      // Update code example if needed
      const type = sampleName.split('-')[0] + '-' + sampleName.split('-')[1];
      const select = document.querySelector(`select[data-type="${type}"]`);
      if (select) {
        select.value = sampleName.split('-')[2];
        updateCodeExample(select, type);
      }
    }
  }

  function showSizeModal(size) {
    showDemo(`size-options-${size}`);
  }

  // Copy code function
  function copyCode(button) {
    // First, try to find the code block
    let codeBlock;
    let code = '';

    // Case 1: Installation inputs
    const input = button.previousElementSibling;
    if (input && input.tagName === 'INPUT') {
      navigator.clipboard.writeText(input.value).then(() => {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        setTimeout(() => {
          button.innerHTML = originalIcon;
        }, 2000);
      });
      return;
    }

    // Case 2: Example code blocks
    // First try to find code by ID based on the section
    const section = button.closest('.demo-section');
    if (section) {
      const sectionId = section.querySelector('pre code')?.id;
      if (sectionId) {
        codeBlock = document.getElementById(sectionId);
      }
    }

    // If not found, try the general approach
    if (!codeBlock) {
      const pre = button.parentElement.parentElement.querySelector('pre');
      if (pre) {
        codeBlock = pre.querySelector('code');
      }
    }

    // Get the code content
    if (codeBlock) {
      code = codeBlock.textContent || '';
    }

    // Copy the code
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        button.style.background = "#10b981";
        button.style.borderColor = "#10b981";
        button.style.color = "white";
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = "";
          button.style.borderColor = "";
          button.style.color = "";
        }, 2000);
      });
    }
  }

  // Run modal from sample file
  async function runModal(samplePath) {
    try {
      const response = await fetch(`demo_assets/samples/${samplePath}`);
      const configText = await response.text();
      const config = eval(configText);
      
      const modal = new RabbitModal(config);
      modal.show();
      
      // Update code example
      const [category, type, ...rest] = samplePath.replace('.js', '').split('-');
      const select = document.querySelector(`select[data-type="${category}-${type}"]`);
      if (select) {
        select.value = rest.join('-');
        await updateExample(select, samplePath);
      }
    } catch (error) {
      console.error(`Error running modal for ${samplePath}:`, error);
    }
  }

  // Update code example
  async function updateExample(select, samplePath) {
    const codeElement = document.querySelector(`#${select.getAttribute('data-type')}-code`);
    if (!codeElement) return;
    
    try {
      const response = await fetch(`demo_assets/samples/${samplePath}`);
      const code = await response.text();
      codeElement.textContent = `// Modal configuration
const modal = new RabbitModal${code};
// Show the modal
modal.show();`;
    } catch (error) {
      console.error(`Error loading example for ${samplePath}:`, error);
      codeElement.textContent = '// Error loading example';
    }
  }

  // Form submit handler for dynamic content example
  window.handleFormSubmit = (event) => {
    event.preventDefault();
    const input = document.getElementById('userName');
    const result = document.getElementById('formResult');
    
    if (input.value.trim()) {
      result.innerHTML = `
        <div style="margin-top: 1rem;">
          <h3>Welcome, ${input.value}!</h3>
          <p>Your form has been submitted successfully.</p>
        </div>
      `;
      input.value = '';
    }
  };

  // Content loading simulation for dynamic content example
  window.simulateLoading = () => {
    const contentArea = document.getElementById('loadingContent');
    contentArea.innerHTML = '<div style="padding: 2rem;">Loading...</div>';
    
    setTimeout(() => {
      contentArea.innerHTML = `
        <div style="padding: 1rem;">
          <h3>Content Loaded!</h3>
          <p>This content was loaded asynchronously.</p>
          <button onclick="simulateLoading()" class="rabbit-btn rabbit-btn-primary">
            Reload
          </button>
        </div>
      `;
    }, 1000);
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Find all example selects and update their code
    document.querySelectorAll('select[data-type]').forEach(select => {
      const type = select.getAttribute('data-type');
      const value = select.value;
      updateExample(select, `${type}-${value}.js`);
    });
  });