({
    title: "Progress Bar Example",
    content: `
        <div style="text-align: center;">
            <p>This modal shows a progress bar and closes after <span class="countdown">5</span> seconds.</p>
            <p>The progress bar indicates the remaining time.</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 5000,
        progress: true,
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
