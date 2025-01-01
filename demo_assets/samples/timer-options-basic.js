({
    title: "Basic Auto-close Timer",
    content: `
        <div style="text-align: center;">
            <p>This modal will automatically close after <span class="countdown">3</span> seconds.</p>
            <p>No progress bar is shown.</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 3000,
        progress: false,
        closeOnTimeup: true,
        onTick: (remainingSeconds, modal) => {
            // Modal içeriğindeki countdown elementini bul
            const countdownEl = modal.getElement().querySelector('.countdown');
            if (countdownEl) {
                countdownEl.textContent = remainingSeconds;
            }
        },
        onTimeup: async (modal) => {
            console.log('Timer completed!');
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
