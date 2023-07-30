import { Text, View } from 'react-native';
import React from 'react';

export default function Auction({ auction }) {
  return (
    <View>
      <Text>
        {auction.title}
      </Text>
    </View>
  );
}
