({
    title: "Progress Bar Example",
    content: `
        <div style="text-align: center;">
            <p>This modal shows a progress bar and closes after 5 seconds.</p>
            <p>The progress bar indicates the remaining time.</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 5000,
        progress: true,
        closeOnTimeup: true,
        onTimeup: async (modal) => {
            // Do something when timer ends
            console.log('onTimeup')
            console.log(modal)
        }
    },
    buttons: [
        {
            key: "close",
            text: "Close Now",
            type: "secondary"
        }
    ]
})
