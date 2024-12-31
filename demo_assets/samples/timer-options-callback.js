({
    title: "Timer with No Auto-close",
    content: `
        <div style="text-align: center;">
            <p>This modal has a timer but won't close automatically.</p>
            <p>You need to close it manually when the progress is complete. Check console log</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 4000,
        progress: true,
        closeOnTimeup: false,
        onTimeup: async (modal) => {
            // Do something when timer ends
            console.log('onTimeup')
        }
    },
    buttons: [
        {
            key: "close",
            text: "Close",
            type: "primary"
        }
    ]
})
