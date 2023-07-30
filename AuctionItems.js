// import { View, Text } from 'react-native-web';
import React from 'react';
import {
  Text, View, StyleSheet, Image,
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
    marginVertical: 20,
    marginHorizontal: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
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

});

function AuctionItem({ item }) {
  return (
    <View style={styles.card}>
      <Image style={styles.thumb} source={{ uri: item.images[0].thumb_url }} />

      <View>
        <Text>{item.title}</Text>
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
  // console.log(itemData);
  // console.log(itemData.length);
  // const { length } = itemData;
  return (

    <View style={styles.deck}>
      {/* <View style={styles.card}>
        <Image style={styles.thumb} source={{ uri: itemData.items[0].images[0].thumb_url }} />

        <View>
          <Text>{itemData.items[0].title}</Text>
          <Text>
            Current Bid: $
            {' '}
            {itemData.items[0].current_bid}
          </Text>
        </View>
      </View> */}
      {/* map returns an array, (item) is reference for each object in array, and => tells it what to return given that item */}
      {itemData.items.map((item) => <AuctionItem item={item} />)}
    </View>

  // <View>
  //   <Image
  //     style={styles.thumb}
  //     source={image}
  //   />
  //   <View style={styles.infoContainer}>
  //     <Text style={styles.name}>{name}</Text>
  //     <Text style={styles.price}>
  //       $
  //       {' '}
  //       {price}
  //     </Text>
  //   </View>
  //   {/* <Text>Auction items will be here</Text>
  //   <Text>itemData</Text> */}
  // </View>
  );
}
