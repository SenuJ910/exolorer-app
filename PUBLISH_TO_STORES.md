# How to Publish Exolorer as a Mobile App

You have two options to turn Exolorer into a mobile app.

## Option 1: Progressive Web App (PWA) - **Ready Now!** ✅

I have already configured your app as a PWA. This means users can install it directly from their browser without going to the App Store.

### How to Install (Test it now):
1.  Open your live Vercel link on your phone (e.g., Chrome on Android or Safari on iOS).
2.  **Android**: Tap the menu (3 dots) -> "Install App" or "Add to Home Screen".
3.  **iOS**: Tap the Share button -> "Add to Home Screen".
4.  The app will appear on your home screen with the Exolorer logo and launch in full-screen mode!

## Option 2: Google Play Store & Apple App Store (Advanced) 🚀

To get into the actual stores, you need to wrap your code using **Capacitor**. This requires installing Android Studio (for Play Store) and Xcode (for App Store, requires a Mac).

### Steps to Build for Stores:

1.  **Initialize Capacitor**:
    Run these commands in your terminal:
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
    npx cap init
    ```
    *   Name: `Exolorer`
    *   Package ID: `com.exolorer.app`

2.  **Build the App**:
    ```bash
    npm run build
    npx cap add android
    npx cap add ios
    npx cap sync
    ```

3.  **Open in Android Studio (for Play Store)**:
    ```bash
    npx cap open android
    ```
    *   Wait for Gradle to sync.
    *   Go to `Build` -> `Generate Signed Bundle / APK`.
    *   Upload the `.aab` file to the Google Play Console ($25 one-time fee).

4.  **Open in Xcode (for App Store)**:
    ```bash
    npx cap open ios
    ```
    *   Select your Team (you need an Apple Developer Account, $99/year).
    *   Go to `Product` -> `Archive`.
    *   Upload to App Store Connect.

### Recommendation
Start with **Option 1 (PWA)**. It's free, instant, and works great for your initial users. Once you have traction, you can invest the time and money ($25 + $99) to do Option 2.
