import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  Alert,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

/**
 * ShareQuoteDialog Component
 * 
 * A modal dialog that provides options for sharing quotes via different platforms.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Controls visibility of the dialog
 * @param {Object} props.quote - Quote data to be shared
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {string} props.clientPhone - Client's phone number
 * @param {string} props.clientEmail - Client's email address
 */
const ShareQuoteDialog = ({ 
  isVisible, 
  quote, 
  onClose, 
  clientPhone, 
  clientEmail 
}) => {
  const [customMessage, setCustomMessage] = useState('');
  
  // Format the quote message for sharing
  const formatQuoteMessage = (quote) => {
    return `📋 *QUOTE: ${quote.title}* 📋
From: ${quote.companyName}
Date: ${quote.date}

Dear ${quote.clientName},

Thank you for your interest in our services. Here's your quote:

*Job Description:*
${quote.description}

*Quote Details:*
${quote.items.map(item => `${item.description}: $${item.amount.toFixed(2)}`).join('\n')}

*Subtotal:* $${quote.subtotal.toFixed(2)}
*Tax (${quote.taxRate}%):* $${quote.tax.toFixed(2)}
*Total:* $${quote.total.toFixed(2)}

This quote is valid for 30 days.

To accept this quote or if you have any questions, please reply to this message or call us at ${quote.companyPhone}.

Thank you for your business!

${quote.companyName}
${quote.companyPhone}
${quote.companyEmail}`;
  };

  // Share via WhatsApp
  const shareViaWhatsApp = async (quote, phoneNumber) => {
    try {
      // Format the quote message
      const message = formatQuoteMessage(quote);
      
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
      const canOpen = await Linking.canOpenURL(whatsappLink);
      
      if (canOpen) {
        await Linking.openURL(whatsappLink);
        onClose();
      } else {
        // WhatsApp not installed, show error message
        Alert.alert(
          "WhatsApp Not Installed",
          "WhatsApp is not installed on your device. Would you like to share via another method?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Share via SMS", onPress: () => shareViaSMS(quote, phoneNumber) },
            { text: "Share via Email", onPress: () => shareViaEmail(quote, clientEmail) }
          ]
        );
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert('Error', 'Failed to share via WhatsApp. Please try another method.');
    }
  };

  // Share via iMessage/SMS
  const shareViaSMS = async (quote, phoneNumber) => {
    try {
      // Format the quote message
      const message = formatQuoteMessage(quote);
      
      // Create SMS link
      let smsLink;
      if (Platform.OS === 'ios') {
        smsLink = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
      } else {
        smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      }
      
      // Check if SMS is available
      const canOpen = await Linking.canOpenURL(smsLink);
      
      if (canOpen) {
        await Linking.openURL(smsLink);
        onClose();
      } else {
        Alert.alert('Error', 'SMS is not available on your device.');
      }
    } catch (error) {
      console.error('Error opening SMS:', error);
      Alert.alert('Error', 'Failed to share via SMS. Please try another method.');
    }
  };

  // Share via Email
  const shareViaEmail = async (quote, email) => {
    try {
      // Format the quote message (plain text for email)
      const message = formatQuoteMessage(quote).replace(/\*/g, '');
      
      // Create email link
      const subject = encodeURIComponent(`Quote: ${quote.title}`);
      const body = encodeURIComponent(message);
      const emailLink = `mailto:${email}?subject=${subject}&body=${body}`;
      
      // Open email app
      await Linking.openURL(emailLink);
      onClose();
    } catch (error) {
      console.error('Error opening Email:', error);
      Alert.alert('Error', 'Failed to share via Email. Please try another method.');
    }
  };

  // Share PDF via native share sheet
  const sharePDFQuote = async (quote) => {
    try {
      // In a real implementation, this would generate a PDF
      // For this example, we'll create a text file instead
      const tempFilePath = `${RNFS.CachesDirectoryPath}/quote_${quote.quoteNumber}.txt`;
      
      // Write the quote content to the file
      await RNFS.writeFile(tempFilePath, formatQuoteMessage(quote), 'utf8');
      
      // Share via native share sheet
      const shareOptions = {
        title: 'Share Quote',
        message: customMessage || `Here's your quote for ${quote.title}`,
        url: `file://${tempFilePath}`,
        type: 'text/plain',
      };
      
      await Share.open(shareOptions);
      onClose();
    } catch (error) {
      console.error('Error sharing PDF:', error);
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share the quote. Please try again.');
      }
    }
  };

  // Copy message to clipboard
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Quote message copied to clipboard');
  };

  // Render the component
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
        
        <Text style={styles.subtitle}>Share "{quote?.title}" with {quote?.clientName}</Text>
        
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
            onPress={() => shareViaSMS(quote, clientPhone)}>
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
        
        <View style={styles.customMessageContainer}>
          <Text style={styles.customMessageLabel}>Add a personal message (optional):</Text>
          <TextInput
            style={styles.customMessageInput}
            value={customMessage}
            onChangeText={setCustomMessage}
            placeholder="E.g., Looking forward to working with you!"
            multiline
            maxLength={200}
          />
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

// Default props
ShareQuoteDialog.defaultProps = {
  quote: {
    quoteNumber: 'Q-2025-0042',
    title: 'Kitchen Renovation',
    date: 'Apr 2, 2025',
    clientName: 'John Smith',
    companyName: 'FieldQuote Services',
    companyPhone: '(555) 123-4567',
    companyEmail: 'info@fieldquote.ai',
    description: 'Complete kitchen sink and faucet installation with removal and disposal of old fixtures.',
    items: [
      { description: 'Kitchen Sink Installation', amount: 172.50 },
      { description: 'Kitchen Faucet Installation', amount: 143.75 },
      { description: 'Fixture Removal & Disposal', amount: 75.00 }
    ],
    subtotal: 391.25,
    taxRate: 8.0,
    tax: 31.30,
    total: 422.55
  }
};

// Styles
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  dialogContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C4E80',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    alignItems: 'center',
    width: '22%',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },
  customMessageContainer: {
    marginBottom: 20,
  },
  customMessageLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  customMessageInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  previewContainer: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  preview: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    maxHeight: 200,
    backgroundColor: '#F5F6F5',
  },
  previewText: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 18,
  },
  copyButton: {
    backgroundColor: '#2C4E80',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShareQuoteDialog;
