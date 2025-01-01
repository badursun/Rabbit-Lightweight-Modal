({
    title: "Dynamic Content - Text Example",
    content: `
        <div style="text-align: center;">
            <div class="loading-message">Loading RabbitCMS information...</div>
        </div>
    `,
    ajax: {
        url: 'https://rabbitcms.adjans.com.tr/RABBITCMS.txt',
        method: 'GET',
        contentType: 'text',
        timeout: 5000,
        retry: {
            enabled: true,
            limit: 2,
            delay: 1000
        },
        onStart: (modal, content) => {
            console.log('Loading started...');
        },
        onSuccess: (modal, data, content) => {
            // Text içeriğini formatlı göster
            content.innerHTML = `
                <div style="text-align: left; white-space: pre-wrap; font-family: monospace; padding: 15px; background: #f5f5f5; border-radius: 4px;">
                    ${data}
                </div>
            `;
        },
        onError: (modal, error, content) => {
            content.innerHTML = `
                <div style="text-align: center; color: red;">
                    <p>Error loading RabbitCMS information: ${error.message}</p>
                    <p>Please try again later.</p>
                </div>
            `;
        }
    },
    buttons: [
        {
            key: "refresh",
            text: "Refresh Content",
            type: "primary",
            callback: (modal) => {
                // AJAX isteğini tekrar başlat
                modal.abortAjax();
                modal.reloadAjax();
            }
        },
        {
            key: "close",
            text: "Close",
            type: "secondary"
        }
    ]
})
