({
    title: "Async Button Actions",
    content: `
        <div style="text-align: center;">
            <div id="asyncResult" style="margin: 20px 0;">
                Click the buttons to see async actions in work
            </div>
        </div>
    `,
    buttons: [
        {
            key: "success",
            text: "Simulate Success",
            type: "success",
            callback: async (modal) => {
                const resultDiv = document.getElementById('asyncResult');
                resultDiv.innerHTML = 'Processing...';
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                resultDiv.innerHTML = '✅ Operation completed successfully!';
            }
        },
        {
            key: "error",
            text: "Simulate Error",
            type: "danger",
            callback: async (modal) => {
                const resultDiv = document.getElementById('asyncResult');
                resultDiv.innerHTML = 'Processing...';
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                resultDiv.innerHTML = '❌ Operation failed! Please try again.';
            }
        },
        {
            key: "close",
            text: "Close",
            type: "secondary"
        }
    ]
})
