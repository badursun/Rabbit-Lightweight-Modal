({
    content: `
        <div style="text-align: center;">
            <h3>Modal Without Header</h3>
            <p>This modal has no header section, but includes a footer with buttons.</p>
        </div>
    `,
    showHeaderClose: false,
    buttons: [
        {
            key: "close",
            text: "Close Modal",
            type: "primary"
        }
    ]
})
