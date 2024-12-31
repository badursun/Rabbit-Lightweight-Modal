({
    title: "Dynamic Form Example",
    content: `
        <div style="text-align: center;">
            <form id="dynamicForm" onsubmit="handleFormSubmit(event)">
                <div style="margin-bottom: 1rem;">
                    <input type="text" id="userName" placeholder="Enter your name" 
                           style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                </div>
                <button type="submit" class="rabbit-btn rabbit-btn-primary">Submit</button>
            </form>
            <div id="formResult" style="margin-top: 1rem;"></div>
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
