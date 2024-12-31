({
    type: "success",
    title: "Operation Completed",
    content: "Your changes have been saved successfully!",
    timer: {
        enabled: true,
        duration: 3000,
        progress: true,
        closeOnTimeup: true,
        onTimeup: async (modal) => {
            // Do something when timer ends
            console.log('onTimeup')
            console.log(modal)
        }
    }
})
