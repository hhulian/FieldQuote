import React from 'react';
import { View, StyleSheet } from 'react-native';
import SimplifiedFieldQuoteApp from './SimplifiedFieldQuoteApp';

export default function App() {
  return (
    <View style={styles.container}>
      <SimplifiedFieldQuoteApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
