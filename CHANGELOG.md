## v1.3.0 (2025-01-03)

### 🔧 Improvements

-   **Improved mobile experience**
    -   All position modals are fixed on mobile for better UX

## v1.2.0 (2025-01-01)

### 🚀 Features

-   **Debug System**
    -   Added comprehensive debug mode
    -   Added detailed logging for all operations
    -   Added visual indicators for different log types
    -   Added timestamp and data objects in logs
-   **AJAX System**
    -   Added built-in AJAX support for dynamic content loading
    -   Added progress bar integration with AJAX requests
    -   Added retry mechanism with configurable limits and delays
    -   Added request timeout and abort capabilities
    -   Added support for multiple content types (JSON, HTML, Text)
    -   Added comprehensive event system (ajax-start, ajax-success, ajax-error, ajax-complete)

### 🔧 Improvements

-   **Error Handling**
    -   Added robust error handling for AJAX requests
    -   Added timeout management for requests
    -   Added retry logic for failed requests
-   **Improved mobile experience**
    -   All position modals are centered on mobile for better UX
    -   Sidebar modals (left-sidebar, right-sidebar) now go full-screen on mobile
    -   Added mobile-specific note for position option in documentation
-   **Performance Optimization**
    -   Reduced bundle size to 3.9KB gzipped
    -   Added minified version (rabbit-modal.min.js)
    -   Improved code optimization and compression

## v1.1.0 (2024-12-31)

### 🚀 Features

-   **Button System**
    -   Added support for multiple buttons of the same type
    -   Added callback support for button actions
    -   Added loading and disabled states for buttons
    -   Added button groups and alignment options
    -   Added dynamic button management capabilities
-   **Timer System**
    -   Added progress bar support for timers
    -   Added timer event system (timer-start, timer-end)
    -   Added onTimeup callback for timer completion
    -   Added customizable timer duration and auto-close options

### 🔧 Improvements

-   **Event Handling**
    -   Implemented single event handler for all modal interactions
    -   Optimized button click handling with event delegation
    -   Improved overlay and keyboard event handling
-   **DOM Performance**
    -   Added DocumentFragment support for better DOM manipulation
    -   Implemented template caching system
    -   Optimized DOM element creation and management
-   **Memory Management**
    -   Enhanced event listener cleanup
    -   Improved reference management
    -   Added circular reference prevention
    -   Better resource cleanup on modal destroy

### 🐛 Bug Fixes

-   Fixed stacked modals issue where modals were not properly closed
-   Fixed button events not working correctly in stacked modals
