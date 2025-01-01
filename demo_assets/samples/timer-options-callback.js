({
    title: "Timer with Callback",
    content: `
        <div style="text-align: center;">
            <p>This modal will automatically close after <span class="countdown">5</span> seconds.</p>
            <p>When the timer ends, it will show an alert and log to console.</p>
        </div>
    `,
    timer: {
        enabled: true,
        duration: 5000,
        progress: false,
        closeOnTimeup: false,
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
            
            // Sonra alert göster
            alert('Timer completed! Modal will close now.');
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
