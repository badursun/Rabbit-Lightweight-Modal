### Basic Options

| Option   | Type    | Default   | Description                                                                                  | Possible Values                                                                                    |
| -------- | ------- | --------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| title    | string  | ""        | Modal title                                                                                  | Any string                                                                                         |
| content  | string  | ""        | Modal content (supports HTML)                                                                | Any string                                                                                         |
| debug    | boolean | false     | Enable debug mode                                                                            | true, false                                                                                        |
| size     | string  | "default" | Modal size                                                                                   | "small", "default", "large", "xlarge", "cover-page"                                                |
| position | string  | "center"  | Modal position (Note: On mobile devices, all modals are centered regardless of this setting) | "center", "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "right" |
| type     | string  | null      | Modal type for styling                                                                       | null, "success", "error", "warning", "info"                                                        |
| autoShow | boolean | false     | Automatically show modal after initialization                                                | true, false                                                                                        |

### UI Options

| Option          | Type    | Default                 | Description                 | Possible Values     |
| --------------- | ------- | ----------------------- | --------------------------- | ------------------- |
| showHeaderClose | boolean | true                    | Show close button in header | true, false         |
| stackable       | boolean | false                   | Allow multiple modals       | true, false         |
| overlay         | boolean | true                    | Show overlay                | true, false         |
| overlayColor    | string  | "rgba(15, 23, 42, 0.6)" | Overlay color               | Any valid CSS color |
| overlayBlur     | boolean | false                   | Enable overlay blur effect  | true, false         |
| closeOnEscape   | boolean | true                    | Close on ESC key            | true, false         |
| closeOnBackdrop | boolean | true                    | Close on backdrop click     | true, false         |

### Button Options

| Option  | Type  | Default | Description             | Possible Values         |
| ------- | ----- | ------- | ----------------------- | ----------------------- |
| buttons | array | []      | Array of button objects | See Button Object below |

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

| Option | Type   | Default | Description                | Possible Values        |
| ------ | ------ | ------- | -------------------------- | ---------------------- |
| timer  | object | {}      | Timer configuration object | See Timer Object below |

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

| Option | Type   | Default | Description               | Possible Values       |
| ------ | ------ | ------- | ------------------------- | --------------------- |
| ajax   | object | {}      | AJAX configuration object | See AJAX Object below |

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
