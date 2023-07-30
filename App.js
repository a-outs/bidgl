import React from 'react';
import { Text, View } from 'react-native';
import AuctionItems from './AuctionItems';
import GetItemData from './ItemData';
import styles from './AppStyles';
import LocationSelection from './components/LocationSelection';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <LocationSelection />
      <AuctionItems itemData={GetItemData()} />
    </View>
  );
}
