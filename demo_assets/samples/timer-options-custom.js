({
    title: "Custom Timer Duration",
    content: `
        <div style="text-align: center;">
            <p>This modal has a longer timer (10 seconds) with progress bar.</p>
            <p>Perfect for displaying important messages!</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 10000,
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
            type: "primary"
        }
    ]
})
