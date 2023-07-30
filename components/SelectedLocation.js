import { Text, View } from 'react-native';
import React from 'react';
import { shape } from 'prop-types';
import AuctionList from './AuctionList';

export default function SelectedLocation({ location }) {
  return (
    <View>
      <Text
        style={{ textAlign: 'center' }}
      >
        {location.name}
      </Text>
      <AuctionList location={location} />

    </View>

  );
}

SelectedLocation.propTypes = {
  location: shape({}).isRequired,
};
