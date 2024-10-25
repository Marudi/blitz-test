import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.hospitalmanagement',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: false,
    SPMPackages: [
      {
        name: "Stripe",
        libs: ["Stripe"],
        repositoryURL: "https://github.com/stripe/stripe-ios.git",
        version: "23.18.0"
      }
    ]
  }
} as NativeScriptConfig;