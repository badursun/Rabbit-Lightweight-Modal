new RabbitModal({
  title: "Auto Show Modal",
  content: "This modal opens automatically when initialized!",
  position: "center",
  autoShow: true,
  buttons: [
    {
      text: "Close",
      type: "secondary",
      onClick: (modal) => modal.hide(),
    },
  ],
});
