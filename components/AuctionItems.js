// import { View, Text } from 'react-native-web';
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

  deck: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  hyperlinkStyle: {
    fontSize: 22,
    color: 'blue',
  },

});

function AuctionItem({ item }) {
  return (
    <View style={styles.card}>
      <Image style={styles.thumb} source={{ uri: item.images[0].thumb_url }} />

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

export default function AuctionItems({ itemData }) {
  return (
    <View style={styles.deck}>

      {itemData.items.map((item) => <AuctionItem key={item.id} item={item} />)}
    </View>
  );
}
