import { Application, isIOS } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

// Initialize Firebase before app starts
firebase().initializeApp()
  .then(() => {
    console.log("Firebase initialized successfully");
  })
  .catch(error => {
    console.error("Firebase initialization error:", error);
  });

// iOS-specific configurations
if (isIOS) {
  Application.on(Application.launchEvent, () => {
    // Enable iOS background modes for calendar
    if (Application.ios) {
      UIApplication.sharedApplication.registerForRemoteNotifications();
    }
  });
}

Application.run({ moduleName: 'app-root' });