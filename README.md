# 🐰 Rabbit Lightweight Modal

A lightweight, customizable modal library for modern web applications. No dependencies, just pure JavaScript.

## Features

- 📦 Lightweight and dependency-free
- 🎨 Multiple size variants (small, default, large, xlarge, cover-page)
- 📍 Flexible positioning (center, top, right, bottom, left, corners)
- 🎯 Sidebar support (left and right sliding panels)
- 🎭 Customizable overlays
- 📚 Stackable modals
- 🚀 Smooth animations
- 📱 Responsive design

## Installation

Just include the CSS and JS files in your HTML:

```html
<link rel="stylesheet" href="rabbit-modal.css">
<script src="rabbit-modal.js"></script>
```

## Basic Usage

```javascript
const modal = new RabbitModal({
  title: "Hello World",
  content: "This is a basic modal example",
  size: "default",
  position: "center",
  buttons: {
    close: { text: "Close", type: "secondary" }
  }
});

modal.show();
```

## Size Options

- `small`: Compact size for simple messages
- `default`: Standard size for most use cases
- `large`: Larger size for more content
- `xlarge`: Extra large size for rich content
- `cover-page`: Full viewport coverage

```javascript
const modal = new RabbitModal({
  size: "large",  // small, default, large, xlarge, cover-page
  // ... other options
});
```

## Position Options

- `center`: Center of the screen (default)
- `top`, `right`, `bottom`, `left`: Edge positions
- `top-left`, `top-right`, `bottom-left`, `bottom-right`: Corner positions
- `left-sidebar`, `right-sidebar`: Sliding sidebar panels

```javascript
const modal = new RabbitModal({
  position: "top-right",  // Any position from above
  // ... other options
});
```

## Overlay Options

```javascript
const modal = new RabbitModal({
  overlay: true,  // false to disable overlay
  overlayColor: "rgba(0, 0, 0, 0.5)",  // Custom overlay color
  // ... other options
});
```

## Stacked Modals

```javascript
const modal1 = new RabbitModal({
  stackable: true,
  buttons: {
    next: {
      text: "Open Next",
      onClick: () => {
        const modal2 = new RabbitModal({
          title: "Stacked Modal",
          content: "This modal is stacked on top"
        });
        modal2.show();
      }
    }
  }
});
```

## API Reference

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| title | string | "" | Modal title |
| content | string | "" | Modal content (can include HTML) |
| size | string | "default" | Modal size variant |
| position | string | "center" | Modal position |
| overlay | boolean | true | Show/hide overlay |
| overlayColor | string | "rgba(0, 0, 0, 0.5)" | Overlay color |
| stackable | boolean | false | Allow stacking modals |
| closeOnBackdrop | boolean | true | Close on overlay click |
| closeOnEscape | boolean | true | Close on ESC key |
| buttons | object | {} | Modal buttons configuration |

### Methods

- `show()`: Display the modal
- `hide()`: Hide the modal
- `destroy()`: Remove the modal from DOM

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use in your projects 🚀
