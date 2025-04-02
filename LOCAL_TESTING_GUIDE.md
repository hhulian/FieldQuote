# Local Testing Guide for FieldQuote App

This guide provides detailed instructions for setting up and testing the FieldQuote app on your local machine.

## Environment Setup Checklist

- [ ] Install Node.js and npm
- [ ] Install Expo CLI
- [ ] Clone the FieldQuote repository
- [ ] Install project dependencies
- [ ] Configure the testing environment
- [ ] Run the app with Expo

## Detailed Setup Instructions

### 1. Install Required Software

#### Node.js and npm
1. Download Node.js (v14 or higher) from https://nodejs.org/
2. Follow the installation instructions for your operating system
3. Verify installation by running:
   ```
   node --version
   npm --version
   ```

#### Expo CLI
Install Expo CLI globally:
```
npm install -g expo-cli
```

#### Git
1. Download Git from https://git-scm.com/downloads
2. Follow the installation instructions for your operating system
3. Verify installation by running:
   ```
   git --version
   ```

### 2. Clone and Set Up the Repository

```bash
# Clone the repository
git clone https://github.com/hhulian/FieldQuote.git

# Navigate to the project directory
cd FieldQuote

# Navigate to the mobile app directory
cd development/mobile

# Install dependencies
npm install
```

### 3. Configure the App

1. Create or verify the `.env` file in the mobile directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   Note: For the demo, the app uses a simulated AI service, so this key isn't strictly necessary.

2. Verify the Whisper model file is in the correct location:
   ```
   development/mobile/assets/models/ggml-tiny.en.bin
   ```

### 4. Run the App

```bash
# Start the Expo development server
npx expo start
```

This will open a browser window with a QR code and options for running the app.

## Testing Options

### Option 1: Test on Physical Device (Recommended for Voice Features)

#### For iOS:
1. Install the Expo Go app from the App Store
2. Open your camera app and scan the QR code
3. It will prompt you to open the app in Expo Go

#### For Android:
1. Install the Expo Go app from Google Play Store
2. Open the Expo Go app and tap "Scan QR Code"
3. Scan the QR code

### Option 2: Test on Simulator/Emulator

From the Expo development server in your browser:
- Click "Run on iOS simulator" (requires Xcode on Mac)
- Click "Run on Android device/emulator" (requires Android Studio)

## Testing the Voice Input Feature

1. Launch the app and navigate to the Quote Creation screen
2. Tap the microphone button to start recording
3. Speak a job description clearly (e.g., "I need to paint two bedrooms and repair a leaking faucet in the bathroom")
4. Tap the button again to stop recording
5. The app will transcribe your speech using the Whisper model
6. Tap "Generate Quote" to see the AI-generated quote

## Testing Scenarios

Try these different job descriptions to test the AI quote generation:

1. **Painting Scenario**:
   "I need to paint my living room and dining room with a fresh coat of white paint."

2. **Plumbing Scenario**:
   "The kitchen sink is leaking and the bathroom faucet needs to be replaced."

3. **Electrical Scenario**:
   "I need to install new lighting fixtures in the hallway and replace an outlet in the bedroom."

4. **Multiple Services Scenario**:
   "I need to paint the master bedroom, fix a leaking pipe under the sink, and install a ceiling fan in the living room."

## Troubleshooting

### Common Issues and Solutions

1. **Dependency Issues**:
   ```bash
   npm install --force
   ```

2. **Expo Connection Issues**:
   - Make sure your computer and device are on the same WiFi network
   - Try using the tunnel connection: `npx expo start --tunnel`

3. **Voice Recognition Issues**:
   - Check microphone permissions
   - Ensure the Whisper model file is in the correct location

4. **Metro Bundler Issues**:
   - Clear Metro cache: `npx expo start --clear`

5. **Device Connection Issues**:
   - Restart the Expo Go app
   - Restart the Expo development server

## Additional Resources

- Expo Documentation: https://docs.expo.dev/
- React Native Documentation: https://reactnative.dev/docs/getting-started
- Whisper.rn Documentation: https://github.com/mybigday/whisper.rn

For any other issues, please refer to the project documentation or contact the development team.
