# 🐰 Rabbit Lightweight Multi-Purpose Modal

A lightweight, customizable multi-purpose modal library for modern web applications. No dependencies, just pure JavaScript.

[View Demo](https://badursun.github.io/Rabbit-Lightweight-Modal/)

## Features

-   📦 Lightweight (3.9KB gzipped) and dependency-free
-   🎨 Multiple size variants (small, default, large, xlarge, cover-page)
-   📍 Flexible positioning (center, top, right, bottom, left, corners)
-   🎯 Sidebar support (left and right sliding panels)
-   🎭 Customizable overlays
-   📚 Stackable modals
-   🚀 Smooth animations
-   📱 Responsive design
-   🔘 Multiple buttons support with groups and alignment
-   ⚡ Async operation support with loading states
-   🎛️ Dynamic button management
-   ❌ Optional header close button
-   🔄 AJAX support with progress and retry
-   🐛 Debug mode with detailed logging

## Installation

Just include the CSS and JS files in your HTML:

```html
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/badursun/Rabbit-Lightweight-Modal@1.2.0/rabbit-modal.css"
/>
<script src="https://cdn.jsdelivr.net/gh/badursun/Rabbit-Lightweight-Modal@1.2.0/rabbit-modal.min.js"></script>
```

## Basic Usage

```javascript
const modal = new RabbitModal({
	title: "Hello World",
	content: "This is a basic modal example",
	size: "default",
	position: "center",
	autoShow: false,
	buttons: [
		{
			key: "close",
			text: "Close",
			type: "secondary",
		},
	],
});

modal.show();
```

## Size Options

-   `small`: Compact size for simple messages
-   `default`: Standard size for most use cases
-   `large`: Larger size for more content
-   `xlarge`: Extra large size for complex content
-   `cover-page`: Full page coverage

## Position Options

-   `center`: Center of the screen (default)
-   `top`: Top of the screen
-   `right`: Right side
-   `bottom`: Bottom of the screen
-   `left`: Left side
-   `top-left`: Top left corner
-   `top-right`: Top right corner
-   `bottom-left`: Bottom left corner
-   `bottom-right`: Bottom right corner

## Button Configuration

Buttons can be configured in two ways:

1. Simple Close Button:

```javascript
buttons: [
	{
		key: "close",
		text: "Close",
		type: "secondary",
	},
];
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
		},
	},
];
```

Button Properties:

-   `key`: Unique identifier for the button (required)
-   `text`: Button text to display (required)
-   `type`: Button style type (primary, secondary, etc.)
-   `callback`: Custom function to execute (optional)

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
	content: "Your sidebar content here",
});
```

## Overlay Options

Customize the modal backdrop:

```javascript
const modal = new RabbitModal({
	overlayColor: "rgba(0, 0, 0, 0.5)", // Custom overlay color rgb and rgba
	closeOnClick: true,
	overlayBlur: true,
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
					content: "Content of second modal",
				});
				modal2.show();
			},
		},
	],
});
```

## AJAX Support

Load dynamic content with built-in AJAX support. The modal provides a comprehensive AJAX system with progress tracking, retry mechanism, and error handling:

```javascript
const modal = new RabbitModal({
	title: "Dynamic Content",
	ajax: {
		url: "https://api.example.com/data", // Required: URL to fetch
		method: "POST", // Optional: HTTP method (default: GET)
		headers: {
			// Optional: Custom headers
			Authorization: "Bearer token",
		},
		data: { id: 123 }, // Optional: Data to send (for POST/PUT)
		contentType: "json", // Optional: Response type (json, html, text)
		delay: 1000, // Optional: Delay before request (ms)
		timeout: 30000, // Optional: Request timeout (ms)
		retry: {
			// Optional: Retry configuration
			enabled: true, // Enable retry on error
			limit: 3, // Max retry attempts
			delay: 1000, // Delay between retries (ms)
		},
		credentials: "same-origin", // Optional: CORS credentials

		// Callbacks with content element access
		onStart: (modal, content) => {
			console.log("Request starting...");
		},
		onSuccess: (modal, data, content) => {
			content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
		},
		onError: (modal, error, content) => {
			content.innerHTML = `<div class="error">${error.message}</div>`;
		},
		onComplete: (modal, content) => {
			console.log("Request completed");
		},
	},
});

// Manual control methods
modal.abortAjax(); // Abort current request
modal.reloadAjax(); // Reload content
```

### AJAX Features

-   **Automatic Content Loading**

    -   Content is loaded when modal is created
    -   Support for JSON, HTML, and Text responses
    -   Configurable delay and timeout
    -   CORS support with credentials option

-   **Progress Tracking**

    -   Built-in progress bar during loading
    -   Customizable loading state
    -   Visual feedback for long requests

-   **Error Handling**

    -   Comprehensive retry mechanism
    -   Configurable retry attempts and delays
    -   Timeout handling
    -   Error state visualization

-   **Event System**

    -   `ajax-start`: Fired when request starts
    -   `ajax-success`: Fired on successful response
    -   `ajax-error`: Fired on request error
    -   `ajax-complete`: Fired when request ends (success or error)
    -   `ajax-abort`: Fired when request is aborted

-   **Content Management**
    -   Direct access to content element in callbacks
    -   Easy content manipulation
    -   Support for HTML injection
    -   Clean error state handling

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
    };
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
    };
    ```

3. **Dynamic Content**
    ```javascript
    onSuccess: (modal, data, content) => {
    	// Handle different content types
    	switch (modal.options.ajax.contentType) {
    		case "json":
    			content.innerHTML = `<pre>${JSON.stringify(
    				data,
    				null,
    				2
    			)}</pre>`;
    			break;
    		case "html":
    			content.innerHTML = data;
    			break;
    		default:
    			content.textContent = data;
    	}
    };
    ```

## Debug Mode

[View Debug Mode Usage](DEBUGMODE.md)

## Default Options

[View Options](OPTIONS.md)

## Browser Support

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

## Change History

[View Changelog](CHANGELOG.md)

## License

MIT License - feel free to use in your projects.
