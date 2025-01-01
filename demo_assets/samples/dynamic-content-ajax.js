({
    debug: true,  // Debug modu aktif
    title: "Dynamic Content - AJAX Example",
    content: `
        <div style="text-align: center;">
            <div class="loading-message">Loading users data...</div>
        </div>
    `,
    ajax: {
        url: 'https://dummyjson.com/users?limit=4&select=firstName,lastName,email',
        method: 'GET',
        contentType: 'json',
        timeout: 5000,
        delay: 5000,
        retry: {
            enabled: true,
            limit: 2,
            delay: 1000
        },
        onStart: (modal, content) => {
            console.log('Loading started...');
        },
        onSuccess: (modal, data, content) => {
            // JSON verisini HTML tablosuna dönüştür
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            
            // Başlık satırı
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th style="padding: 8px; border-bottom: 2px solid #ddd;">First Name</th>
                    <th style="padding: 8px; border-bottom: 2px solid #ddd;">Last Name</th>
                    <th style="padding: 8px; border-bottom: 2px solid #ddd;">Email</th>
                </tr>
            `;
            table.appendChild(thead);
            
            // Veri satırları
            const tbody = document.createElement('tbody');
            data.users.forEach(user => {
                tbody.innerHTML += `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.firstName}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.lastName}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.email}</td>
                    </tr>
                `;
            });
            table.appendChild(tbody);
            
            // Modal içeriğini güncelle
            content.innerHTML = '';
            content.appendChild(table);
        },
        onError: (modal, error, content) => {
            content.innerHTML = `
                <div style="text-align: center; color: red;">
                    <p>Error loading data: ${error.message}</p>
                    <p>Please try again later.</p>
                </div>
            `;
        }
    },
    buttons: [
        {
            key: "refresh",
            text: "Refresh Data",
            type: "primary",
            callback: (modal, content) => {
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
