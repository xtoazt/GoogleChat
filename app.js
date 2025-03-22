document.getElementById("send-button").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    messageInput.value = '';
    if (message.trim()) {
        addMessage(message);  // Send message to Firestore
    }
});

// Request notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Display ChromeOS notification
function displayNotification(message) {
    if (Notification.permission === "granted") {
        new Notification("New Message", {
            body: message,
            icon: 'icon.png'  // Add a relevant icon for your app
        });
    }
}

// Listen for Firebase message updates and trigger notifications
onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    displayNotification(payload.notification.body);
});
