importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAG3F6MOsttQaCcefdMwOi-3ovstfuAulw",
    authDomain: "chromeos-chat.firebaseapp.com",
    projectId: "https://chromeos-chat-default-rtdb.firebaseio.com",
    storageBucket: "chromeos-chat.firebasestorage.app",
    messagingSenderId: "417106180756",
    appId: "1:417106180756:web:40f11af986d1d1b59d1281",
    measurementId: "G-X8T1ENPS2V"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
