# FieldQuote Messaging Integration

This repository contains the code for integrating messaging platforms (WhatsApp and iMessage) with the FieldQuote mobile app.

## Overview

The messaging integration module allows field service professionals to seamlessly share quotes with clients through their preferred messaging platforms. This repository focuses specifically on WhatsApp and iMessage integration, providing a consistent sharing experience across both iOS and Android devices.

## Features

- **WhatsApp Integration**: Deep linking for direct quote sharing
- **iMessage Integration**: Native iOS integration for iMessage
- **PDF Attachment**: Share quotes as PDF attachments
- **Message Formatting**: Professional quote message templates
- **Fallback Options**: SMS and email alternatives
- **Cross-Platform Support**: Works on both iOS and Android

## Directory Structure

```
messaging-integration/
├── src/                      # Source code
│   ├── components/           # UI components for sharing
│   ├── services/             # Integration services
│   ├── utils/                # Utility functions
│   └── platforms/            # Platform-specific code
│       ├── android/          # Android-specific implementations
│       └── ios/              # iOS-specific implementations
├── examples/                 # Example usage
└── docs/                     # Documentation
```

## Implementation Details

### WhatsApp Integration

WhatsApp integration is implemented using deep linking, which allows the app to open WhatsApp with a pre-populated message. The implementation handles:

- Formatting quote messages for WhatsApp
- Creating deep links with recipient phone numbers
- Handling cases where WhatsApp is not installed
- Sharing PDF attachments via the native share sheet

### iMessage Integration (iOS Only)

iMessage integration uses the native iOS `MFMessageComposeViewController` to compose and send messages directly from within the app. The implementation handles:

- Formatting quote messages for iMessage
- Attaching PDF files to messages
- Providing a native iOS messaging experience
- Fallback to SMS when iMessage is not available

### Cross-Platform Strategy

To ensure a consistent experience across both platforms:

1. **Primary Sharing Method**: Native share sheet for maximum flexibility
2. **Direct Platform Integration**: Deep linking for WhatsApp, native module for iMessage
3. **Fallback Strategy**: SMS and Email alternatives when primary methods are unavailable

## Getting Started

### Prerequisites

- React Native project
- `react-native-share` package
- `react-native-fs` package
- `react-native-pdf-lib` package (for PDF generation)

### Installation

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Link the native modules: `react-native link`
4. Add the required permissions to your app

### Usage

```javascript
import { shareViaWhatsApp, shareViaiMessage, sharePDFQuote } from 'fieldquote-messaging';

// Share via WhatsApp
shareViaWhatsApp({
  quoteNumber: 'Q-2025-0042',
  clientName: 'John Smith',
  title: 'Kitchen Renovation',
  items: [
    { description: 'Kitchen Sink Installation', amount: 172.50 },
    { description: 'Kitchen Faucet Installation', amount: 143.75 },
    { description: 'Fixture Removal & Disposal', amount: 75.00 }
  ],
  subtotal: 391.25,
  tax: 31.30,
  total: 422.55
}, '5551234567');

// Share via iMessage (iOS only)
shareViaiMessage(quoteDetails, '5551234567');

// Share via native share sheet
sharePDFQuote(quoteDetails);
```

## Technical Requirements

### Dependencies

```json
{
  "dependencies": {
    "react-native-share": "^7.0.0",
    "react-native-fs": "^2.20.0",
    "react-native-pdf-lib": "^1.0.0",
    "react-native-modal": "^13.0.0",
    "react-native-vector-icons": "^9.0.0"
  }
}
```

### Permissions

#### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<queries>
  <package android:name="com.whatsapp" />
  <package android:name="com.whatsapp.w4b" />
</queries>
```

#### iOS (Info.plist)
```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>We need access to save quote PDFs to your photo library.</string>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>whatsapp</string>
  <string>sms</string>
</array>
```

## Development Guidelines

- Follow the React Native best practices
- Write unit tests for all business logic
- Use TypeScript for type safety
- Follow the Git workflow described in the repository structure document

## Related Repositories

- [mobile-app](../mobile-app): Main FieldQuote mobile application
- [design-system](../design-system): UI/UX design system and assets
- [documentation](../documentation): Comprehensive project documentation
