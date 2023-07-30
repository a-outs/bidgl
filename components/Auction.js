import { Text, View } from 'react-native';
import React from 'react';
import { shape, string } from 'prop-types';

export default function Auction({ auction }) {
  return (
    <View>
      <Text>
        {auction.title}
      </Text>
    </View>
  );
}

Auction.propTypes = {
  auction: shape({
    title: string,
  }).isRequired,
};
