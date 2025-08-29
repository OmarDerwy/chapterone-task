# Omar Elderwy's submission
![Light mode tasks view](light_tasks.png)
![Dark mode tasks view](dark_tasks.png)
![Light mode modal view](light_modal.png)
![Dark mode modal view](dark_modal.png)

Todo list app developed using react native expo

## Get started (2 methods)

### 1 - Download the app

Download the app apk from the releases page on the right

### 2 - Run using emulator or Expo go

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## App features

- displays tasks list, create and delete
- swipe gesture to delete any task
- tap checkbox to complete tasks
- press + button on the bottom to open modal to enter a new task
- each action is emphasized by a toast confirming the action
- dark mode and light mode available

## Third party libraries

- expo: platform, framwork and tooling to simplify development of react native software
- expo-blur: provides effect around the "add tasks" modal
- expo-checkbox: provides the checkboxes
- expo-constants: app installation constants inside the code
- expo-font: library that allows loading fonts from the web and using them in the app
- expo-router: file based routing to simplify navigation
- expo-splash-screen: utility to change the splash screen before app opens
- expo-status-bar: utility that controls and changes the color of the status bar
- react-native-gesture-handler, react-native-reanimated, react-native-screens, react-native-svg, react-native-webview: are used together for both the swiping ability of the tasks to delete them and the sonner-native library that enables toasts
- sonner-native: enables toasts that look good
