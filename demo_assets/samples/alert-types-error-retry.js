({
    type: "error",
    title: "Connection Error",
    content: "Failed to connect to the server. Please check your internet connection.",
    buttons: [
        {
            key: "retry",
            text: "Try Again",
            type: "primary"
        },
        {
            key: "close",
            text: "Cancel",
            type: "secondary"
        }
    ]
})
