({
    title: "First Modal",
    content: `
        <div class="stacked-modal-content">
            <p>This is the first modal. Click the button below to open a second modal on top of this one.</p>
        </div>
    `,
    buttons: [
        {
            key: "open-second",
            text: "Open Second Modal",
            type: "primary",
            callback: () => {
                const modal2 = new RabbitModal({
                    title: "Second Modal",
                    content: `
                        <div class="stacked-modal-content">
                            <p>This is the second modal. Click the button below to open a third modal.</p>
                        </div>
                    `,
                    buttons: [
                        {
                            key: "open-third",
                            text: "Open Third Modal",
                            type: "primary",
                            callback: () => {
                                const modal3 = new RabbitModal({
                                    title: "Third Modal",
                                    content: `
                                        <div class="stacked-modal-content">
                                            <p>This is the third modal. You can close all modals one by one.</p>
                                        </div>
                                    `,
                                    buttons: [
                                        {
                                            key: "close",
                                            text: "Close",
                                            type: "secondary"
                                        }
                                    ]
                                });
                                modal3.show();
                            }
                        },
                        {
                            key: "close",
                            text: "Close",
                            type: "secondary"
                        }
                    ]
                });
                modal2.show();
            }
        },
        {
            key: "close",
            text: "Close",
            type: "secondary"
        }
    ]
})