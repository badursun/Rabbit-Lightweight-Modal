({
    title: "Content Loading Example",
    content: `
        <div style="text-align: center;">
            <p>Click the button to simulate content loading</p>
            <div id="loadingContent">
                <button onclick="simulateLoading()" class="rabbit-btn rabbit-btn-primary">
                    Load Content
                </button>
            </div>
        </div>
    `,
    buttons: [
        {
            key: "close",
            text: "Close",
            type: "secondary"
        }
    ]
})
