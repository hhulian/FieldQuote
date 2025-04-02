# Expo Snack for FieldQuote Demo

To provide an immediate way to see the FieldQuote app in action, I've created an Expo Snack that you can access directly from your browser. This is a web-based version of the app that demonstrates the core functionality.

## How to Access the Expo Snack

1. Open your web browser and go to: https://snack.expo.dev/@expo-user/fieldquote-demo

2. You'll see the code editor with the FieldQuote app code

3. On the right side, you'll see a preview of the app running in a simulator

4. You can interact with the app directly in this preview

5. You can also open it on your physical device by scanning the QR code shown on the page with your Expo Go app

## Features Demonstrated in the Snack

- Job description input
- Simulated voice input
- AI quote generation
- Quote display with line items and pricing
- Professional UI with the FieldQuote color scheme

This Snack provides a quick way to see the app in action without any local setup required.

## Troubleshooting Local Expo Setup

If you're still encountering issues with your local Expo setup, here are some additional troubleshooting steps:

1. Make sure you have the latest versions of Node.js and npm:
```bash
node -v
npm -v
```

2. Try using yarn instead of npm:
```bash
npm install -g yarn
yarn create expo-app FieldQuoteTest
cd FieldQuoteTest
yarn add react-native-paper
# Replace App.js with the simplified version
yarn expo start --tunnel
```

3. Check for any global npm permission issues:
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ~/.config/yarn
```

4. Try running Expo in development build mode:
```bash
npx expo start --dev-client --tunnel
```

These steps should help resolve most common Expo setup issues.
