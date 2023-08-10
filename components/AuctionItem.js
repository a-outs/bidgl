// import { View, Text } from 'react-native-web';
import { shape } from 'prop-types';
import React from 'react';
import {
  Text, View, Image, Linking, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  thumb: {
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  hyperlinkStyle: {
    fontSize: 22,
    color: 'blue',
  },

});

export default function AuctionItem({ item, showImage }) {
  return (
    <View style={styles.card}>
      <Image style={styles.thumb} source={{ uri: showImage ? item.images[0].thumb_url : '' }} />

      <View>
        <Text
          style={styles.hyperlinkStyle}
          onPress={() => {
            Linking.openURL(item.item_url);
          }}
        >
          {item.title}
        </Text>
        <Text>
          Current Bid: $
          {' '}
          {item.current_bid}
        </Text>
      </View>
    </View>
  );
}

AuctionItem.propTypes = {
  item: shape({
    images: shape([]),
  }).isRequired,
};
