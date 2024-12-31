# 🐰 Rabbit Lightweight Modal

A lightweight, customizable modal library for modern web applications. No dependencies, just pure JavaScript.

[View Demo](https://badursun.github.io/Rabbit-Lightweight-Modal/)

## Features

- 📦 Lightweight and dependency-free
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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Change History

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
