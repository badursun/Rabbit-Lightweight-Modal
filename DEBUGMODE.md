## Debug Mode

Enable detailed logging for development and troubleshooting:

```javascript
const modal = new RabbitModal({
	debug: true, // Enable debug mode
	title: "Debug Example",
	// ... other options
});
```

Debug logs include:

-   **Constructor and Initialization**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] ℹ️ Modal instance created {
      options: { title: "Debug Example", ... }
    }
    ```

-   **Events**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔔 Event emitted: show
    ```

-   **AJAX Operations**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔄 Starting AJAX request {
      url: "https://api.example.com/data",
      method: "GET",
      contentType: "json"
    }
    ```

-   **Retry Mechanism**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] ⚠️ AJAX request failed, initiating retry {
      error: "Network error",
      currentAttempt: 1,
      maxAttempts: 3,
      retryDelay: 1000,
      nextAttemptIn: "1000ms"
    }
    ```

-   **Timer Operations**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] ℹ️ Timer started {
      duration: 5000,
      closeOnTimeup: true
    }
    ```

-   **Button Actions**

    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] 🔔 Button clicked {
      button: { key: "submit", text: "Submit" }
    }
    ```

-   **Error States**
    ```
    [RabbitModal Debug 2025-01-01T20:12:31.000Z] ❌ AJAX request failed {
      error: { message: "Failed to fetch" }
    }
    ```

Each log entry includes:

-   Timestamp in ISO format
-   Log type indicator emoji
-   Descriptive message
-   Relevant data object (when applicable)

Log Types:

-   ℹ️ `info`: General information
-   ❌ `error`: Error states
-   ⚠️ `warn`: Warnings
-   ✅ `success`: Successful operations
-   🔔 `event`: Event emissions
-   🔄 `ajax`: AJAX operations
