# 🐰 Rabbit Lightweight Modal

A lightweight, customizable modal library for modern web applications. No dependencies, just pure JavaScript.

[View Demo](https://badursun.github.io/Rabbit-Lightweight-Modal/)

## Features

- 📦 Lightweight (3.9KB gzipped) and dependency-free
- 🎨 Multiple size variants (small, default, large, xlarge, cover-page)
- 📍 Flexible positioning (center, top, right, bottom, left, corners)
- 🎯 Sidebar support (left and right sliding panels)
- 🎭 Customizable overlays
- 📚 Stackable modals
- 🚀 Smooth animations
- 📱 Responsive design
- 🔘 Multiple buttons support with groups and alignment
- ⚡ Async operation support with loading states
- 🎛️ Dynamic button management
- ❌ Optional header close button
- 🔄 AJAX support with progress and retry
- 🐛 Debug mode with detailed logging

## Installation

Just include the CSS and JS files in your HTML:

```html
<link rel="stylesheet" href="rabbit-modal.css" />
<script src="rabbit-modal.js"></script>
```

## Basic Usage

```javascript
const modal = new RabbitModal({
  title: "Hello World",
  content: "This is a basic modal example",
  size: "default",
  position: "center",
  buttons: [
    {
      key: "close",
      text: "Close",
      type: "secondary"
    }
  ]
});

modal.show();
```

## Size Options

- `small`: Compact size for simple messages
- `default`: Standard size for most use cases
- `large`: Larger size for more content
- `xlarge`: Extra large size for complex content
- `cover-page`: Full page coverage

## Position Options

- `center`: Center of the screen (default)
- `top`: Top of the screen
- `right`: Right side
- `bottom`: Bottom of the screen
- `left`: Left side
- `top-left`: Top left corner
- `top-right`: Top right corner
- `bottom-left`: Bottom left corner
- `bottom-right`: Bottom right corner

## Button Configuration

Buttons can be configured in two ways:

1. Simple Close Button:
```javascript
buttons: [
    {
        key: "close",
        text: "Close",
        type: "secondary"
    }
]
```

2. Custom Action Button:
```javascript
buttons: [
    {
        key: "save",
        text: "Save",
        type: "primary",
        callback: (modal) => {
            // Custom action
        }
    }
]
```

Button Properties:
- `key`: Unique identifier for the button (required)
- `text`: Button text to display (required)
- `type`: Button style type (primary, secondary, etc.)
- `callback`: Custom function to execute (optional)

## Event Handling

The modal supports various events and actions:

1. Button Actions:
   - Default close action with `key: "close"`
   - Custom actions with `callback` function
   - Automatic modal closing for undefined actions

2. Global Events:
   - Click outside modal to close
   - ESC key to close
   - Stacked modal management

## Sidebar Options

For creating sliding panels:

```javascript
const sidebar = new RabbitModal({
  position: "right-sidebar", // or "left-sidebar"
  title: "Sidebar Panel",
  content: "Your sidebar content here"
});
```

## Overlay Options

Customize the modal backdrop:

```javascript
const modal = new RabbitModal({
    overlayColor: "rgba(0, 0, 0, 0.5)", // Custom overlay color rgb and rgba
    closeOnClick: true,
    overlayBlur: true
});
```

## Stacked Modals

Open multiple modals on top of each other:

```javascript
const modal1 = new RabbitModal({
  title: "First Modal",
  content: "Content of first modal",
  buttons: [
    {
      key: "openSecond",
      text: "Open Second Modal",
      type: "primary",
      callback: () => {
        const modal2 = new RabbitModal({
          title: "Second Modal",
          content: "Content of second modal"
        });
        modal2.show();
      }
    }
  ]
});
```

## AJAX Support

Load dynamic content with built-in AJAX support. The modal provides a comprehensive AJAX system with progress tracking, retry mechanism, and error handling:

```javascript
const modal = new RabbitModal({
  title: "Dynamic Content",
  ajax: {
    url: 'https://api.example.com/data',   // Required: URL to fetch
    method: 'POST',                        // Optional: HTTP method (default: GET)
    headers: {                             // Optional: Custom headers
      'Authorization': 'Bearer token'
    },
    data: { id: 123 },                     // Optional: Data to send (for POST/PUT)
    contentType: 'json',                   // Optional: Response type (json, html, text)
    delay: 1000,                          // Optional: Delay before request (ms)
    timeout: 30000,                       // Optional: Request timeout (ms)
    retry: {                              // Optional: Retry configuration
      enabled: true,                      // Enable retry on error
      limit: 3,                          // Max retry attempts
      delay: 1000                        // Delay between retries (ms)
    },
    credentials: 'same-origin',           // Optional: CORS credentials
    
    // Callbacks with content element access
    onStart: (modal, content) => {
      console.log('Request starting...');
    },
    onSuccess: (modal, data, content) => {
      content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    },
    onError: (modal, error, content) => {
      content.innerHTML = `<div class="error">${error.message}</div>`;
    },
    onComplete: (modal, content) => {
      console.log('Request completed');
    }
  }
});

// Manual control methods
modal.abortAjax();    // Abort current request
modal.reloadAjax();   // Reload content
```

### AJAX Features

- **Automatic Content Loading**
  - Content is loaded when modal is created
  - Support for JSON, HTML, and Text responses
  - Configurable delay and timeout
  - CORS support with credentials option

- **Progress Tracking**
  - Built-in progress bar during loading
  - Customizable loading state
  - Visual feedback for long requests

- **Error Handling**
  - Comprehensive retry mechanism
  - Configurable retry attempts and delays
  - Timeout handling
  - Error state visualization

- **Event System**
  - `ajax-start`: Fired when request starts
  - `ajax-success`: Fired on successful response
  - `ajax-error`: Fired on request error
  - `ajax-complete`: Fired when request ends (success or error)
  - `ajax-abort`: Fired when request is aborted

- **Content Management**
  - Direct access to content element in callbacks
  - Easy content manipulation
  - Support for HTML injection
  - Clean error state handling

### Best Practices

1. **Error Handling**
   ```javascript
   onError: (modal, error, content) => {
     content.innerHTML = `
       <div class="error-state">
         <h3>Error Loading Content</h3>
         <p>${error.message}</p>
         <button onclick="modal.reloadAjax()">Retry</button>
       </div>
     `;
   }
   ```

2. **Loading States**
   ```javascript
   onStart: (modal, content) => {
     content.innerHTML = `
       <div class="loading-state">
         <div class="spinner"></div>
         <p>Loading content...</p>
       </div>
     `;
   }
   ```

3. **Dynamic Content**
   ```javascript
   onSuccess: (modal, data, content) => {
     // Handle different content types
     switch (modal.options.ajax.contentType) {
       case 'json':
         content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
         break;
       case 'html':
         content.innerHTML = data;
         break;
       default:
         content.textContent = data;
     }
   }
   ```

## Debug Mode

Enable detailed logging for development and troubleshooting:

```javascript
const modal = new RabbitModal({
  debug: true,  // Enable debug mode
  title: "Debug Example",
  // ... other options
});
```

Debug logs include:

- **Constructor and Initialization**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] ℹ️ Modal instance created {
    options: { title: "Debug Example", ... }
  }
  ```

- **Events**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔔 Event emitted: show
  ```

- **AJAX Operations**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔄 Starting AJAX request {
    url: "https://api.example.com/data",
    method: "GET",
    contentType: "json"
  }
  ```

- **Retry Mechanism**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] ⚠️ AJAX request failed, initiating retry {
    error: "Network error",
    currentAttempt: 1,
    maxAttempts: 3,
    retryDelay: 1000,
    nextAttemptIn: "1000ms"
  }
  ```

- **Timer Operations**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] ℹ️ Timer started {
    duration: 5000,
    closeOnTimeup: true
  }
  ```

- **Button Actions**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔔 Button clicked {
    button: { key: "submit", text: "Submit" }
  }
  ```

- **Error States**
  ```
  [RabbitModal Debug 2025-01-01T20:12:31.000Z] ❌ AJAX request failed {
    error: { message: "Failed to fetch" }
  }
  ```

Each log entry includes:
- Timestamp in ISO format
- Log type indicator emoji
- Descriptive message
- Relevant data object (when applicable)

Log Types:
- ℹ️ `info`: General information
- ❌ `error`: Error states
- ⚠️ `warn`: Warnings
- ✅ `success`: Successful operations
- 🔔 `event`: Event emissions
- 🔄 `ajax`: AJAX operations

## Default Options

### Basic Options

| Option | Type | Default | Description | Possible Values |
|--------|------|---------|-------------|-----------------|
| title | string | "" | Modal title | Any string |
| content | string | "" | Modal content (supports HTML) | Any string |
| debug | boolean | false | Enable debug mode | true, false |
| size | string | "default" | Modal size | "small", "default", "large", "xlarge", "cover-page" |
| position | string | "center" | Modal position (Note: On mobile devices, all modals are centered regardless of this setting) | "center", "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "right" |
| type | string | null | Modal type for styling | null, "success", "error", "warning", "info" |

### UI Options

| Option | Type | Default | Description | Possible Values |
|--------|------|---------|-------------|-----------------|
| showHeaderClose | boolean | true | Show close button in header | true, false |
| stackable | boolean | false | Allow multiple modals | true, false |
| overlay | boolean | true | Show overlay | true, false |
| overlayColor | string | "rgba(15, 23, 42, 0.6)" | Overlay color | Any valid CSS color |
| overlayBlur | boolean | false | Enable overlay blur effect | true, false |
| closeOnEscape | boolean | true | Close on ESC key | true, false |
| closeOnBackdrop | boolean | true | Close on backdrop click | true, false |

### Button Options

| Option | Type | Default | Description | Possible Values |
|--------|------|---------|-------------|-----------------|
| buttons | array | [] | Array of button objects | See Button Object below |

**Button Object:**
```js
{
  key: string,      // Required. Button identifier
  text: string,     // Required. Button text
  type: string,     // Optional. "primary", "secondary", "success", "danger", "warning", "info"
  onClick: function // Optional. (modal) => void
}
```

### Timer Options

| Option | Type | Default | Description | Possible Values |
|--------|------|---------|-------------|-----------------|
| timer | object | {} | Timer configuration object | See Timer Object below |

**Timer Object:**
```js
{
  enabled: boolean,     // Optional. Enable timer
  duration: number,     // Optional. Timer duration in ms (default: 3000)
  progress: boolean,    // Optional. Show progress bar
  closeOnTimeup: boolean, // Optional. Auto close on timer end
  onTimeup: function,   // Optional. async (modal) => void
  onTick: function,     // Optional. (remainingSeconds, modal) => void
  tickInterval: number  // Optional. Tick interval in ms (default: 1000)
}
```

### AJAX Options

| Option | Type | Default | Description | Possible Values |
|--------|------|---------|-------------|-----------------|
| ajax | object | {} | AJAX configuration object | See AJAX Object below |

**AJAX Object:**
```js
{
  url: string,          // Required. Request URL
  method: string,       // Optional. "GET", "POST", "PUT", "DELETE" (default: "GET")
  headers: object,      // Optional. Request headers
  data: any,           // Optional. Request data
  contentType: string,  // Optional. "json", "html", "text" (default: "json")
  loadingText: string,  // Optional. Loading message (default: "Loading...")
  delay: number,        // Optional. Request delay in ms
  timeout: number,      // Optional. Request timeout in ms (default: 30000)
  credentials: string,  // Optional. "same-origin", "include", "omit"
  retry: {             // Optional. Retry configuration
    enabled: boolean,   // Enable retry
    limit: number,      // Max retry attempts (default: 3)
    delay: number      // Delay between retries in ms (default: 1000)
  },
  onStart: function,    // Optional. (modal) => void
  onSuccess: function,  // Optional. (response, modal) => void
  onError: function,    // Optional. (error, modal) => void
  onComplete: function  // Optional. (modal) => void
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Change History

### v1.2.0 (2025-01-01)

#### 🚀 Features
- **Debug System**
  - Added comprehensive debug mode
  - Added detailed logging for all operations
  - Added visual indicators for different log types
  - Added timestamp and data objects in logs
- **AJAX System**
  - Added built-in AJAX support for dynamic content loading
  - Added progress bar integration with AJAX requests
  - Added retry mechanism with configurable limits and delays
  - Added request timeout and abort capabilities
  - Added support for multiple content types (JSON, HTML, Text)
  - Added comprehensive event system (ajax-start, ajax-success, ajax-error, ajax-complete)

#### 🔧 Improvements
- **Error Handling**
  - Added robust error handling for AJAX requests
  - Added timeout management for requests
  - Added retry logic for failed requests
- **Improved mobile experience**
  - All position modals are centered on mobile for better UX
  - Sidebar modals (left-sidebar, right-sidebar) now go full-screen on mobile
  - Added mobile-specific note for position option in documentation
- **Performance Optimization**
  - Reduced bundle size to 3.9KB gzipped
  - Added minified version (rabbit-modal.min.js)
  - Improved code optimization and compression

### v1.1.0 (2024-12-31)

#### 🚀 Features
- **Button System**
  - Added support for multiple buttons of the same type
  - Added callback support for button actions
  - Added loading and disabled states for buttons
  - Added button groups and alignment options
  - Added dynamic button management capabilities

- **Timer System**
  - Added progress bar support for timers
  - Added timer event system (timer-start, timer-end)
  - Added onTimeup callback for timer completion
  - Added customizable timer duration and auto-close options

#### 🔧 Improvements
- **Event Handling**
  - Implemented single event handler for all modal interactions
  - Optimized button click handling with event delegation
  - Improved overlay and keyboard event handling

- **DOM Performance**
  - Added DocumentFragment support for better DOM manipulation
  - Implemented template caching system
  - Optimized DOM element creation and management

- **Memory Management**
  - Enhanced event listener cleanup
  - Improved reference management
  - Added circular reference prevention
  - Better resource cleanup on modal destroy

#### 🐛 Bug Fixes
- Fixed stacked modals issue where modals were not properly closed
- Fixed button events not working correctly in stacked modals

## License

MIT License - feel free to use in your projects.
