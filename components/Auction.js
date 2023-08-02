import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import axios, { toFormData } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuctionItems from './AuctionItems';

export default function Auction({ auction }) {
  const [items, setItems] = useState(null);

  const itemsKey = `auction-${auction.id}`;

  useEffect(() => {
    const checkAndFetchItems = async () => {
      // check if we have the items for this auction in storage
      const itemData = JSON.parse(await AsyncStorage.getItem(itemsKey));
      if (itemData == null) {
        // fetch from API if not in storage
        axios.post('https://www.bidrl.com/api/getitems', toFormData({
          auction_id: auction.id,
          'filters[perpage]': '120',
          item_type: 'itemlist',
          lotnum: '',
          seqnum: '',
          close_groups: '',
          show_closed: 'closeed',
          perpetual: '',
        })).then((res) => {
          console.log(res.data);
          // save the items
          AsyncStorage.setItem(itemsKey, JSON.stringify(res.data));
          setItems(res.data);
        });
      } else {
        setItems(itemData);
      }
    };
    checkAndFetchItems();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>
        {auction.title}
      </Text>
      <View>
        {items !== null ? <AuctionItems itemData={items} /> : 'Loading...'}
      </View>
    </View>
  );
}

Auction.propTypes = {
  auction: shape({
    title: string,
  }).isRequired,
};
