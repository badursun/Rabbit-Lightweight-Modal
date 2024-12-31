({
    title: "Basic Auto-close Timer",
    content: `
        <div style="text-align: center;">
            <p>This modal will automatically close after 3 seconds.</p>
            <p>No progress bar is shown.</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 3000,
        progress: false,
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
            text: "Close",
            type: "secondary"
        }
    ]
})
