# WhatsApp and iMessage Integration for FieldQuote

## Overview

This document details the technical implementation approach for integrating WhatsApp and iMessage sharing capabilities into the FieldQuote app. These integrations will allow field service professionals to seamlessly share quotes with clients through their preferred messaging platforms.

## WhatsApp Integration

### Technical Approach

WhatsApp does not provide a direct API for message composition in mobile apps unless you're using the WhatsApp Business API (which requires business verification). However, we can implement deep linking to achieve seamless integration.

### Implementation Method

#### 1. Deep Linking

```javascript
// Function to share quote via WhatsApp
function shareViaWhatsApp(quoteDetails, phoneNumber) {
  // Format the quote message
  const message = formatQuoteMessage(quoteDetails);
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp deep link
  let whatsappLink;
  if (phoneNumber) {
    // If we have the client's phone number, create a direct chat link
    const formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    whatsappLink = `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`;
  } else {
    // Otherwise just open with the message ready to send
    whatsappLink = `whatsapp://send?text=${encodedMessage}`;
  }
  
  // Check if WhatsApp is installed
  Linking.canOpenURL(whatsappLink)
    .then(supported => {
      if (supported) {
        return Linking.openURL(whatsappLink);
      } else {
        // WhatsApp not installed, show error message
        Alert.alert(
          "WhatsApp Not Installed",
          "WhatsApp is not installed on your device. Would you like to share via another method?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Share via SMS", onPress: () => shareViaSMS(quoteDetails, phoneNumber) },
            { text: "Share via Email", onPress: () => shareViaEmail(quoteDetails, phoneNumber) }
          ]
        );
      }
    })
    .catch(err => console.error('Error opening WhatsApp:', err));
}
```

#### 2. PDF Attachment

For PDF attachments, we'll need to:
1. Generate the PDF locally
2. Save it to a temporary file
3. Share it using the device's native share sheet, which will include WhatsApp as an option

```javascript
// Function to share PDF quote via native share sheet (includes WhatsApp)
async function sharePDFQuote(quoteDetails) {
  try {
    // Generate PDF
    const pdfPath = await generateQuotePDF(quoteDetails);
    
    // Share via native share sheet
    const shareOptions = {
      title: 'Share Quote',
      message: `Here's your quote for ${quoteDetails.title}`,
      url: `file://${pdfPath}`,
      type: 'application/pdf',
    };
    
    const result = await Share.open(shareOptions);
    console.log('Share result:', result);
  } catch (error) {
    console.error('Error sharing PDF:', error);
    Alert.alert('Error', 'Failed to share the quote. Please try again.');
  }
}
```

### Message Format

The WhatsApp message will be formatted as follows:

```
📋 *QUOTE: [Quote Title]* 📋
From: [Company Name]
Date: [Quote Date]

Dear [Client Name],

Thank you for your interest in our services. Here's your quote:

*Job Description:*
[Job Description]

*Quote Details:*
[Line Item 1]: $[Amount]
[Line Item 2]: $[Amount]
...

*Subtotal:* $[Subtotal]
*Tax ([Tax Rate]%):* $[Tax Amount]
*Total:* $[Total Amount]

This quote is valid for 30 days.

To accept this quote or if you have any questions, please reply to this message or call us at [Phone Number].

Thank you for your business!

[Company Name]
[Company Phone]
[Company Email]
```

## iMessage Integration (iOS Only)

### Technical Approach

For iOS devices, we can use the MFMessageComposeViewController to compose and send iMessages directly from within the app.

### Implementation Method

```javascript
// Function to share quote via iMessage (iOS only)
function shareViaiMessage(quoteDetails, phoneNumber) {
  // Check if running on iOS
  if (Platform.OS !== 'ios') {
    Alert.alert('Not Available', 'iMessage sharing is only available on iOS devices.');
    return;
  }
  
  // Format the quote message
  const message = formatQuoteMessage(quoteDetails);
  
  // Check if messaging is available
  if (!MessageComposer.canSendText()) {
    Alert.alert('Error', 'Your device cannot send text messages.');
    return;
  }
  
  // Prepare recipients array if phone number is provided
  const recipients = phoneNumber ? [phoneNumber] : [];
  
  // Open message composer
  MessageComposer.send({
    recipients: recipients,
    body: message,
    // If we have a PDF attachment
    attachments: quoteDetails.pdfPath ? [{
      url: quoteDetails.pdfPath,
      typeIdentifier: 'com.adobe.pdf',
      filename: `${quoteDetails.quoteNumber}.pdf`
    }] : []
  }, (error, result) => {
    if (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  });
}
```

### Native Module Requirements

For iMessage integration, we'll need to create a native module bridge for iOS:

```objective-c
// MessageComposer.m
#import "MessageComposer.h"
#import <MessageUI/MessageUI.h>

@implementation MessageComposer

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(canSendText:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(@([MFMessageComposeViewController canSendText]));
}

RCT_EXPORT_METHOD(send:(NSDictionary *)options
                  callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // Implementation details for sending message with attachments
    // ...
  });
}

@end
```

## Cross-Platform Sharing Strategy

To ensure a consistent experience across both Android and iOS:

1. **Primary Sharing Method:**
   - On both platforms, use the native share sheet as the primary method for sharing PDFs
   - This allows users to choose their preferred app (WhatsApp, iMessage, SMS, Email, etc.)

2. **Direct Platform Integration:**
   - Provide direct WhatsApp integration on both platforms via deep linking
   - Provide direct iMessage integration on iOS via MFMessageComposeViewController
   - Fallback to SMS on Android when iMessage is requested

3. **Fallback Strategy:**
   - If WhatsApp is not installed, offer SMS and Email alternatives
   - Always provide a "Copy to Clipboard" option for maximum flexibility

## User Experience Considerations

### Quote Sharing Flow

1. User creates or selects an existing quote
2. User taps "Share Quote" button
3. App presents sharing options:
   - WhatsApp
   - iMessage/SMS
   - Email
   - Other (opens native share sheet)
4. User selects preferred method
5. App prepares the quote in the appropriate format
6. App launches the selected sharing method with pre-populated content
7. User can review and edit the message before sending
8. User sends the quote

### UI Components

#### Share Dialog Component

```jsx
const ShareQuoteDialog = ({ isVisible, quote, onClose, clientPhone, clientEmail }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={styles.dialogContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Share Quote</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subtitle}>Share "{quote.title}" with {quote.clientName}</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.option}
            onPress={() => shareViaWhatsApp(quote, clientPhone)}>
            <View style={[styles.iconCircle, { backgroundColor: '#25D366' }]}>
              <Icon name="whatsapp" size={24} color="#FFF" />
            </View>
            <Text style={styles.optionText}>WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => shareViaiMessage(quote, clientPhone)}>
            <View style={[styles.iconCircle, { backgroundColor: '#34C759' }]}>
              <Icon name="message" size={24} color="#FFF" />
            </View>
            <Text style={styles.optionText}>iMessage/SMS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => shareViaEmail(quote, clientEmail)}>
            <View style={[styles.iconCircle, { backgroundColor: '#1976D2' }]}>
              <Icon name="email" size={24} color="#FFF" />
            </View>
            <Text style={styles.optionText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => sharePDFQuote(quote)}>
            <View style={[styles.iconCircle, { backgroundColor: '#F28C38' }]}>
              <Icon name="share" size={24} color="#FFF" />
            </View>
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Message Preview</Text>
          <ScrollView style={styles.preview}>
            <Text style={styles.previewText}>{formatQuoteMessage(quote)}</Text>
          </ScrollView>
        </View>
        
        <TouchableOpacity 
          style={styles.copyButton}
          onPress={() => copyToClipboard(formatQuoteMessage(quote))}>
          <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
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

## Implementation Timeline

1. **Week 1:** Set up basic sharing infrastructure and PDF generation
2. **Week 2:** Implement WhatsApp deep linking and message formatting
3. **Week 3:** Implement iMessage integration for iOS
4. **Week 4:** Create UI components and test across devices

## Testing Strategy

1. **Unit Tests:** Test message formatting and PDF generation functions
2. **Integration Tests:** Test deep linking and native module integration
3. **Manual Testing:** Test on various devices with and without WhatsApp installed
4. **User Acceptance Testing:** Have field service professionals test the sharing flow

## Future Enhancements

1. **WhatsApp Business API:** For businesses with verified accounts, integrate with the official WhatsApp Business API for more robust messaging
2. **Quote Tracking:** Add tracking capabilities to know when quotes are viewed
3. **Quote Acceptance:** Allow clients to accept quotes directly from the message
4. **Rich Media:** Include images of proposed work in the shared quotes
5. **Automated Follow-ups:** Schedule follow-up messages for quotes that haven't received responses
