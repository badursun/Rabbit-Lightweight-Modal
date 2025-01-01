({
    title: "Custom Timer Duration",
    content: `
        <div style="text-align: center;">
            <p>This modal has a longer timer (<span class="countdown">10</span> seconds) with progress bar.</p>
            <p>Perfect for displaying important messages!</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 10000,
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
            // Önce console'a log yaz
            console.log('Timer completed! Modal will close after alert...');
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
