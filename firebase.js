import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyAG3F6MOsttQaCcefdMwOi-3ovstfuAulw",
    authDomain: "chromeos-chat.firebaseapp.com",
    projectId: "https://chromeos-chat-default-rtdb.firebaseio.com",
    storageBucket: "chromeos-chat.firebasestorage.app",
    messagingSenderId: "417106180756",
    appId: "1:417106180756:web:40f11af986d1d1b59d1281",
    measurementId: "G-X8T1ENPS2V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Get messaging token
getToken(messaging, { vapidKey: 'your-vapid-key' }).then((currentToken) => {
    if (currentToken) {
        console.log("Token received:", currentToken);
    } else {
        console.log("No registration token available.");
    }
});

// Listen for new messages
const messagesCollection = collection(db, "messages");
onSnapshot(messagesCollection, (snapshot) => {
    const messages = snapshot.docs.map(doc => doc.data());
    updateMessages(messages);
});

// Add a message to Firestore
function addMessage(message) {
    addDoc(messagesCollection, { text: message });
}

// Update the UI with new messages
function updateMessages(messages) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = messages.map(msg => `<p>${msg.text}</p>`).join('');
}
