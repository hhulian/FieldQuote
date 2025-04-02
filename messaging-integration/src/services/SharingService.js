import { Platform, Linking, Alert } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

/**
 * SharingService
 * 
 * A service that provides methods for sharing quotes via different messaging platforms.
 * Supports WhatsApp, iMessage/SMS, Email, and native share sheet.
 */
class SharingService {
  /**
   * Format a quote message for sharing
   * 
   * @param {Object} quote - The quote object to format
   * @returns {string} - Formatted message string
   */
  formatQuoteMessage(quote) {
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
  }

  /**
   * Share a quote via WhatsApp
   * 
   * @param {Object} quote - The quote to share
   * @param {string} phoneNumber - The recipient's phone number
   * @param {string} customMessage - Optional custom message to include
   * @returns {Promise<boolean>} - Whether the share was successful
   */
  async shareViaWhatsApp(quote, phoneNumber, customMessage = '') {
    try {
      // Format the quote message
      let message = this.formatQuoteMessage(quote);
      
      // Add custom message if provided
      if (customMessage) {
        message = `${customMessage}\n\n${message}`;
      }
      
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
        return true;
      } else {
        // WhatsApp not installed, show error message
        Alert.alert(
          "WhatsApp Not Installed",
          "WhatsApp is not installed on your device. Would you like to share via another method?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Share via SMS", onPress: () => this.shareViaSMS(quote, phoneNumber, customMessage) },
            { text: "Share via Email", onPress: () => this.shareViaEmail(quote, null, customMessage) }
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert('Error', 'Failed to share via WhatsApp. Please try another method.');
      return false;
    }
  }

  /**
   * Share a quote via iMessage/SMS
   * 
   * @param {Object} quote - The quote to share
   * @param {string} phoneNumber - The recipient's phone number
   * @param {string} customMessage - Optional custom message to include
   * @returns {Promise<boolean>} - Whether the share was successful
   */
  async shareViaSMS(quote, phoneNumber, customMessage = '') {
    try {
      // Format the quote message
      let message = this.formatQuoteMessage(quote);
      
      // Add custom message if provided
      if (customMessage) {
        message = `${customMessage}\n\n${message}`;
      }
      
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
        return true;
      } else {
        Alert.alert('Error', 'SMS is not available on your device.');
        return false;
      }
    } catch (error) {
      console.error('Error opening SMS:', error);
      Alert.alert('Error', 'Failed to share via SMS. Please try another method.');
      return false;
    }
  }

  /**
   * Share a quote via Email
   * 
   * @param {Object} quote - The quote to share
   * @param {string} email - The recipient's email address
   * @param {string} customMessage - Optional custom message to include
   * @returns {Promise<boolean>} - Whether the share was successful
   */
  async shareViaEmail(quote, email, customMessage = '') {
    try {
      // Format the quote message (plain text for email)
      let message = this.formatQuoteMessage(quote).replace(/\*/g, '');
      
      // Add custom message if provided
      if (customMessage) {
        message = `${customMessage}\n\n${message}`;
      }
      
      // Create email link
      const subject = encodeURIComponent(`Quote: ${quote.title}`);
      const body = encodeURIComponent(message);
      const emailLink = `mailto:${email || ''}?subject=${subject}&body=${body}`;
      
      // Open email app
      await Linking.openURL(emailLink);
      return true;
    } catch (error) {
      console.error('Error opening Email:', error);
      Alert.alert('Error', 'Failed to share via Email. Please try another method.');
      return false;
    }
  }

  /**
   * Generate a PDF from a quote
   * 
   * @param {Object} quote - The quote to generate a PDF for
   * @returns {Promise<string>} - Path to the generated PDF file
   */
  async generateQuotePDF(quote) {
    // In a real implementation, this would generate a PDF
    // For this example, we'll create a text file instead
    try {
      const tempFilePath = `${RNFS.CachesDirectoryPath}/quote_${quote.quoteNumber}.txt`;
      
      // Write the quote content to the file
      await RNFS.writeFile(tempFilePath, this.formatQuoteMessage(quote), 'utf8');
      
      return tempFilePath;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate quote PDF');
    }
  }

  /**
   * Share a quote as a PDF via the native share sheet
   * 
   * @param {Object} quote - The quote to share
   * @param {string} customMessage - Optional custom message to include
   * @returns {Promise<Object>} - Result of the share operation
   */
  async sharePDFQuote(quote, customMessage = '') {
    try {
      // Generate PDF
      const pdfPath = await this.generateQuotePDF(quote);
      
      // Share via native share sheet
      const shareOptions = {
        title: 'Share Quote',
        message: customMessage || `Here's your quote for ${quote.title}`,
        url: `file://${pdfPath}`,
        type: 'text/plain', // In a real app, this would be 'application/pdf'
      };
      
      const result = await Share.open(shareOptions);
      return result;
    } catch (error) {
      console.error('Error sharing PDF:', error);
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share the quote. Please try again.');
      }
      throw error;
    }
  }

  /**
   * Get a list of available sharing methods on the device
   * 
   * @returns {Promise<Array>} - Array of available sharing methods
   */
  async getAvailableSharingMethods() {
    const methods = [];
    
    // Check WhatsApp
    try {
      const whatsappAvailable = await Linking.canOpenURL('whatsapp://send?text=test');
      if (whatsappAvailable) {
        methods.push('whatsapp');
      }
    } catch (e) {
      console.log('Error checking WhatsApp availability:', e);
    }
    
    // SMS is generally available on all devices
    methods.push('sms');
    
    // Email is generally available on all devices
    methods.push('email');
    
    // Native share is available on all devices
    methods.push('native');
    
    return methods;
  }
}

// Export a singleton instance
export default new SharingService();
