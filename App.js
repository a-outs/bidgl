import React from 'react';
import { Text, View } from 'react-native';
import styles from './AppStyles';
import LocationSelection from './components/LocationSelection';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={{ fontSize: 64, fontWeight: 900 }}>
        BID
        <span style={{ color: 'GrayText' }}>GL</span>
      </Text>
      <Text>
        <span style={{ color: 'GrayText' }}>Good Luck</span>
        , losers!
      </Text>
      <LocationSelection />
    </View>
  );
}
