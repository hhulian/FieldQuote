import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

// Simplified version of the FieldQuote app for testing
const SimplifiedFieldQuoteApp = () => {
  const [description, setDescription] = useState('');
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);

  // Simulate voice input (in a real app, this would use Whisper)
  const handleVoiceInput = () => {
    // Simulate a 2-second delay for "recording"
    setTimeout(() => {
      setDescription('Paint two bedrooms and repair a leaking faucet in the bathroom');
    }, 2000);
  };

  // Simulate AI quote generation
  const handleGenerateQuote = () => {
    if (!description) {
      alert('Please enter a job description first');
      return;
    }
    
    setIsGeneratingQuote(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const quoteData = {
        items: [
          { description: 'Painting service', price: 250 },
          { description: 'Repair work', price: 120 },
          { description: 'Materials', price: 75 },
          { description: 'Labor - 2 hours', price: 120 },
        ],
        subtotal: 565,
        tax: 45,
        total: 610,
        quoteNumber: 'FQ-123456-789'
      };
      
      setGeneratedQuote(quoteData);
      setIsGeneratingQuote(false);
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FieldQuote Demo</Text>
      
      {!generatedQuote ? (
        <View>
          <Text style={styles.sectionTitle}>Create New Quote</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Job Description</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the job or use voice input below"
            />
            
            <TouchableOpacity 
              style={styles.voiceButton}
              onPress={handleVoiceInput}
            >
              <Text style={styles.voiceButtonText}>Simulate Voice Input</Text>
            </TouchableOpacity>
          </View>
          
          {description.length > 0 && (
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={handleGenerateQuote}
              disabled={isGeneratingQuote}
            >
              <Text style={styles.generateButtonText}>
                {isGeneratingQuote ? 'Generating Quote...' : 'Generate Quote'}
              </Text>
            </TouchableOpacity>
          )}
          
          {isGeneratingQuote && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2C4E80" />
              <Text style={styles.loadingText}>Generating your quote...</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteTitle}>Generated Quote</Text>
          <Text style={styles.quoteNumber}>Quote #: {generatedQuote.quoteNumber}</Text>
          
          <View style={styles.jobDescriptionContainer}>
            <Text style={styles.jobDescriptionLabel}>Job Description:</Text>
            <Text style={styles.jobDescriptionText}>{description}</Text>
          </View>
          
          {generatedQuote.items.map((item, index) => (
            <View key={index} style={styles.quoteItem}>
              <Text style={styles.quoteItemDescription}>{item.description}</Text>
              <Text style={styles.quoteItemPrice}>${item.price}</Text>
            </View>
          ))}
          
          <View style={styles.quoteSummary}>
            <View style={styles.quoteSummaryRow}>
              <Text style={styles.quoteSummaryLabel}>Subtotal</Text>
              <Text style={styles.quoteSummaryValue}>${generatedQuote.subtotal}</Text>
            </View>
            <View style={styles.quoteSummaryRow}>
              <Text style={styles.quoteSummaryLabel}>Tax</Text>
              <Text style={styles.quoteSummaryValue}>${generatedQuote.tax}</Text>
            </View>
            <View style={[styles.quoteSummaryRow, styles.quoteTotalRow]}>
              <Text style={styles.quoteTotalLabel}>Total</Text>
              <Text style={styles.quoteTotalValue}>${generatedQuote.total}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share Quote</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.newQuoteButton}
            onPress={() => {
              setGeneratedQuote(null);
              setDescription('');
            }}
          >
            <Text style={styles.newQuoteButtonText}>Create New Quote</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6F5', // Off-White from the color palette
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C4E80', // Deep Blue from the color palette
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C4E80',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Dark Gray from the color palette
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  voiceButton: {
    backgroundColor: '#2C4E80', // Deep Blue
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  voiceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#F28C38', // Bright Orange
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2C4E80',
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C4E80', // Deep Blue
    marginBottom: 4,
  },
  quoteNumber: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  jobDescriptionContainer: {
    backgroundColor: '#F5F6F5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  jobDescriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  jobDescriptionText: {
    fontSize: 14,
    color: '#333333',
  },
  quoteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  quoteItemDescription: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  quoteItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  quoteSummary: {
    marginTop: 16,
  },
  quoteSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  quoteSummaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  quoteSummaryValue: {
    fontSize: 14,
    color: '#333333',
  },
  quoteTotalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  quoteTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  quoteTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F28C38', // Bright Orange
  },
  shareButton: {
    backgroundColor: '#F28C38', // Bright Orange
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newQuoteButton: {
    backgroundColor: '#2C4E80', // Deep Blue
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  newQuoteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SimplifiedFieldQuoteApp;
