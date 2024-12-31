({
    title: "Button Callbacks Example",
    content: `
        <div style="text-align: center;">
            <h3>Click Counter: <span id="clickCounter">0</span></h3>
            <p>Click the Increment button to increase the counter</p>
        </div>
    `,
    buttons: [
        {
            key: "increment",
            text: "Increment Counter",
            type: "primary",
            callback: () => {
                const counter = document.getElementById('clickCounter');
                const currentValue = parseInt(counter.textContent);
                counter.textContent = currentValue + 1;
            }
        },
        {
            key: "reset",
            text: "Reset Counter",
            type: "danger",
            callback: () => {
                const counter = document.getElementById('clickCounter');
                counter.textContent = '0';
            }
        },
        {
            key: "close",
            text: "Close",
            type: "secondary"
        }
    ]
})
