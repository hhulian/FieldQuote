# FieldQuote Messaging Integration Documentation

## Overview

This document provides comprehensive documentation for the FieldQuote messaging integration module, which enables field service professionals to share quotes with clients via WhatsApp and iMessage.

## Table of Contents

1. [Architecture](#architecture)
2. [Components](#components)
3. [Services](#services)
4. [Platform-Specific Implementations](#platform-specific-implementations)
5. [Integration Guide](#integration-guide)
6. [API Reference](#api-reference)
7. [Troubleshooting](#troubleshooting)

## Architecture

The messaging integration module follows a layered architecture:

1. **UI Layer**: React Native components for user interaction
2. **Service Layer**: JavaScript services that handle business logic
3. **Platform Layer**: Native modules for iOS and Android that interface with platform-specific APIs

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   UI Layer  │────▶│   Service   │────▶│   Platform  │────▶│  Messaging  │
│ Components  │◀────│    Layer    │◀────│    Layer    │◀────│ Applications │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## Components

### ShareQuoteDialog

A modal dialog component that provides options for sharing quotes via different platforms.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| isVisible | boolean | Controls visibility of the dialog |
| quote | Object | Quote data to be shared |
| onClose | Function | Function to call when dialog is closed |
| clientPhone | string | Client's phone number |
| clientEmail | string | Client's email address |

#### Example Usage

```jsx
import ShareQuoteDialog from 'fieldquote-messaging/components/ShareQuoteDialog';

// Inside your component
const [isShareDialogVisible, setShareDialogVisible] = useState(false);

// Render method
return (
  <>
    <Button 
      title="Share Quote" 
      onPress={() => setShareDialogVisible(true)} 
    />
    
    <ShareQuoteDialog
      isVisible={isShareDialogVisible}
      quote={quoteData}
      onClose={() => setShareDialogVisible(false)}
      clientPhone={client.phoneNumber}
      clientEmail={client.email}
    />
  </>
);
```

## Services

### SharingService

A service that provides methods for sharing quotes via different messaging platforms.

#### Methods

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| formatQuoteMessage | quote: Object | string | Formats a quote object into a message string |
| shareViaWhatsApp | quote: Object, phoneNumber: string, customMessage?: string | Promise<boolean> | Shares a quote via WhatsApp |
| shareViaSMS | quote: Object, phoneNumber: string, customMessage?: string | Promise<boolean> | Shares a quote via SMS/iMessage |
| shareViaEmail | quote: Object, email: string, customMessage?: string | Promise<boolean> | Shares a quote via email |
| generateQuotePDF | quote: Object | Promise<string> | Generates a PDF from a quote and returns the file path |
| sharePDFQuote | quote: Object, customMessage?: string | Promise<Object> | Shares a quote as a PDF via the native share sheet |
| getAvailableSharingMethods | None | Promise<Array> | Returns an array of available sharing methods on the device |

#### Example Usage

```javascript
import SharingService from 'fieldquote-messaging/services/SharingService';

// Share via WhatsApp
async function shareQuote(quote, client) {
  try {
    const success = await SharingService.shareViaWhatsApp(
      quote, 
      client.phoneNumber,
      "Here's the quote we discussed. Let me know if you have any questions!"
    );
    
    if (success) {
      console.log('Quote shared successfully');
    }
  } catch (error) {
    console.error('Error sharing quote:', error);
  }
}
```

## Platform-Specific Implementations

### iOS: MessageComposer

A native module for iOS that provides iMessage integration using `MFMessageComposeViewController`.

#### Methods

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| canSendText | None | Promise<boolean> | Checks if the device can send text messages |
| send | options: Object, callback: Function | None | Opens the message composer with the specified options |

#### Options Object

| Property | Type | Description |
|----------|------|-------------|
| recipients | Array<string> | Array of recipient phone numbers |
| body | string | Message body text |
| attachments | Array<Object> | Array of attachment objects |

#### Attachment Object

| Property | Type | Description |
|----------|------|-------------|
| url | string | Local file URL |
| typeIdentifier | string | UTI type identifier (e.g., 'com.adobe.pdf') |
| filename | string | Filename for the attachment |

### Android: WhatsAppModule

A native module for Android that provides WhatsApp integration.

#### Methods

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| isWhatsAppInstalled | None | Promise<boolean> | Checks if WhatsApp is installed on the device |
| shareTextViaWhatsApp | phone: string, message: string | Promise<boolean> | Shares text via WhatsApp |
| shareFileViaWhatsApp | filePath: string, fileType: string, message: string | Promise<boolean> | Shares a file via WhatsApp |
| createTemporaryFile | content: string, fileName: string | Promise<string> | Creates a temporary file from text content |

## Integration Guide

### Installation

1. Add the messaging integration module to your project:

```bash
npm install fieldquote-messaging
# or
yarn add fieldquote-messaging
```

2. Link native modules:

```bash
npx react-native link fieldquote-messaging
```

3. Add required permissions:

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

### Basic Usage

```javascript
import { ShareQuoteDialog } from 'fieldquote-messaging/components';
import SharingService from 'fieldquote-messaging/services/SharingService';

// Using the dialog component
function QuoteDetailScreen({ quote, client }) {
  const [isShareDialogVisible, setShareDialogVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <QuoteDetails quote={quote} />
      
      <Button 
        title="Share Quote" 
        onPress={() => setShareDialogVisible(true)} 
      />
      
      <ShareQuoteDialog
        isVisible={isShareDialogVisible}
        quote={quote}
        onClose={() => setShareDialogVisible(false)}
        clientPhone={client.phoneNumber}
        clientEmail={client.email}
      />
    </View>
  );
}

// Using the service directly
async function shareQuoteDirectly(quote, client) {
  // Check available methods
  const methods = await SharingService.getAvailableSharingMethods();
  
  if (methods.includes('whatsapp')) {
    await SharingService.shareViaWhatsApp(quote, client.phoneNumber);
  } else {
    await SharingService.shareViaSMS(quote, client.phoneNumber);
  }
}
```

## API Reference

### Quote Object Structure

```typescript
interface QuoteItem {
  description: string;
  amount: number;
}

interface Quote {
  quoteNumber: string;
  title: string;
  date: string;
  clientName: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  description: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
}
```

## Troubleshooting

### Common Issues

#### WhatsApp Not Installed

If WhatsApp is not installed on the device, the `shareViaWhatsApp` method will show an alert and return `false`. You should provide alternative sharing methods:

```javascript
const success = await SharingService.shareViaWhatsApp(quote, phoneNumber);
if (!success) {
  // Offer alternatives
  Alert.alert(
    "WhatsApp Not Available",
    "Would you like to share via another method?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "SMS", onPress: () => SharingService.shareViaSMS(quote, phoneNumber) },
      { text: "Email", onPress: () => SharingService.shareViaEmail(quote, email) }
    ]
  );
}
```

#### iMessage Not Available on Android

The iMessage integration is only available on iOS devices. On Android, the `shareViaSMS` method will fall back to the native SMS app:

```javascript
// This will use iMessage on iOS and SMS on Android
await SharingService.shareViaSMS(quote, phoneNumber);
```

#### File Sharing Permissions

If you encounter permission issues when sharing files, ensure you've added the required permissions to your app and implemented a FileProvider for Android:

1. Create a `file_paths.xml` in `android/app/src/main/res/xml/`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
  <cache-path name="cache" path="/" />
  <files-path name="files" path="/" />
</paths>
```

2. Add the FileProvider to your `AndroidManifest.xml`:

```xml
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="${applicationId}.fileprovider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths" />
</provider>
```
